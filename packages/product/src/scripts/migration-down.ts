import { LoaderOptions, Logger } from "@medusajs/types"
import { EntitySchema } from "@mikro-orm/core"
import * as ProductModels from "@models"
import {
  ProductServiceInitializeCustomDataLayerOptions,
  ProductServiceInitializeOptions,
} from "../types"
import { createConnection, loadDatabaseConfig } from "../utils"

/**
 * This script is only valid for mikro orm managers. If a user provide a custom manager
 * he is in charge of reverting the migrations.
 * @param options
 * @param logger
 * @param moduleDeclaration
 */
export async function revertMigration({
  options,
  logger,
}: Pick<
  LoaderOptions<
    | ProductServiceInitializeOptions
    | ProductServiceInitializeCustomDataLayerOptions
  >,
  "options" | "logger"
> = {}) {
  logger ??= console as unknown as Logger

  const dbData = loadDatabaseConfig(options)
  const entities = Object.values(ProductModels) as unknown as EntitySchema[]

  const orm = await createConnection(dbData, entities)

  try {
    const migrator = orm.getMigrator()
    await migrator.down()

    logger?.info("Product module migration executed")
  } catch (error) {
    logger?.error(`Product module migration failed to run - Error: ${error}`)
  }

  await orm.close()
}
