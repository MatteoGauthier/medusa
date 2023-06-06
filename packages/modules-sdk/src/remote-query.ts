import { RemoteJoiner } from "@medusajs/orchestration"
import {
  JoinerRelationship,
  JoinerServiceConfig,
  ModuleDefinition,
  RemoteExpandProperty,
} from "@medusajs/types"
import { toPascalCase } from "@medusajs/utils"
import { ModuleQueryPropertyMap } from "./definitions"
import { MedusaModule } from "./medusa-module"

export class RemoteQuery {
  private remoteJoiner: RemoteJoiner
  private modulesMap: Map<string, any> = new Map()

  constructor(
    modulesLoaded?: (any & {
      __joinerConfig: JoinerServiceConfig
      __definition: ModuleDefinition
    })[],
    remoteFetchData?: (
      expand: RemoteExpandProperty,
      keyField: string,
      ids?: (unknown | unknown[])[],
      relationship?: JoinerRelationship
    ) => Promise<{
      data: unknown[] | { [path: string]: unknown[] }
      path?: string
    }>
  ) {
    if (!modulesLoaded?.length) {
      modulesLoaded = [...MedusaModule.getLoadedModules().entries()].map(
        ([, mod]) => mod
      )
    }

    const servicesConfig: JoinerServiceConfig[] = []
    for (const modService of modulesLoaded) {
      const mod: any = Object.values(modService)[0]

      if (!mod.__definition.isQueryable) {
        continue
      }

      if (this.modulesMap.has(mod.__definition.key)) {
        throw new Error(
          `Duplicated instance of module ${mod.__definition.key} is not allowed.`
        )
      }

      this.modulesMap.set(mod.__definition.key, mod)
      servicesConfig.push(mod.__joinerConfig)
    }

    this.remoteJoiner = new RemoteJoiner(
      servicesConfig,
      remoteFetchData ?? this.remoteFetchData.bind(this)
    )
  }

  private static getAllFieldsAndRelations(
    data: any,
    prefix = ""
  ): { select: string[]; relations: string[] } {
    let fields: Set<string> = new Set()
    let relations: string[] = []

    data.fields?.forEach((field: string) => {
      fields.add(prefix ? `${prefix}.${field}` : field)
    })

    if (data.expands) {
      for (const property in data.expands) {
        const newPrefix = prefix ? `${prefix}.${property}` : property

        relations.push(newPrefix)
        fields.delete(newPrefix)

        const result = RemoteQuery.getAllFieldsAndRelations(
          data.expands[property],
          newPrefix
        )

        result.select.forEach(fields.add, fields)
        relations = relations.concat(result.relations)
      }
    }

    return { select: [...fields], relations }
  }
  public async remoteFetchData(
    expand: RemoteExpandProperty,
    keyField: string,
    ids?: (unknown | unknown[])[],
    relationship?: JoinerRelationship
  ): Promise<{
    data: unknown[] | { [path: string]: unknown[] }
    path?: string
  }> {
    const serviceConfig = expand.serviceConfig
    const service = this.modulesMap.get(serviceConfig.serviceName)
    const methodName = relationship?.inverse
      ? `getBy${toPascalCase(keyField)}`
      : relationship?.args?.single
      ? "retrieve"
      : "list"

    if (typeof service[methodName] !== "function") {
      throw new Error(
        `Method "${methodName}" does not exist on "${serviceConfig.serviceName}"`
      )
    }

    let filters = {}
    const options = {
      ...RemoteQuery.getAllFieldsAndRelations(expand),
    }

    const availableOptions = ["skip", "take", "limit", "offset", "sort"]
    const availableOptionsAlias = new Map([
      ["limit", "take"],
      ["offset", "skip"],
    ])

    for (const arg of expand.args || []) {
      if (arg.name === "filters" && arg.value) {
        filters = { ...arg.value }
      } else if (availableOptions.includes(arg.value)) {
        const argName = availableOptionsAlias.has(arg.name)
          ? availableOptionsAlias.get(arg.name)!
          : arg.name
        options[argName] = arg.value
      }
    }

    if (ids) {
      filters[keyField] = ids
    }

    const result = await service[methodName](filters, options)
    return { data: result }
  }

  public async query(query: string, variables: any = {}): Promise<any> {
    return await this.remoteJoiner.query(
      RemoteJoiner.parseQuery(query, variables, ModuleQueryPropertyMap)
    )
  }
}
