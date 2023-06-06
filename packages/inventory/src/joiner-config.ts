import { Modules } from "@medusajs/modules-sdk"
import { JoinerServiceConfig } from "@medusajs/types"

export const joinerConfig: JoinerServiceConfig = {
  serviceName: Modules.INVENTORY,
  primaryKeys: ["id"],
}
