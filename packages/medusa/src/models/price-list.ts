import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"
import { ulid } from "ulid"
import { PriceListStatus, PriceListType } from "../types/price-list"
import { DbAwareColumn, resolveDbType } from "../utils/db-aware-column"
import { CustomerGroup } from "./customer-group"
import { MoneyAmount } from "./money-amount"

@Entity()
export class PriceList {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @DbAwareColumn({ type: "enum", enum: PriceListType, default: "sale" })
  type: PriceListType

  @DbAwareColumn({ type: "enum", enum: PriceListStatus, default: "draft" })
  status: PriceListStatus

  @Column({
    type: resolveDbType("timestamptz"),
    nullable: true,
  })
  starts_at: Date

  @Column({ type: resolveDbType("timestamptz"), nullable: true })
  ends_at: Date

  @JoinTable({
    name: "price_list_customer_groups",
    joinColumn: {
      name: "price_list_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "customer_group_id",
      referencedColumnName: "id",
    },
  })
  @ManyToMany(
    () => CustomerGroup,
    (cg) => cg.price_lists,
    { onDelete: "CASCADE" }
  )
  customer_groups: CustomerGroup[]

  @OneToMany(
    () => MoneyAmount,
    (moneyAmount) => moneyAmount.price_list,
    { onDelete: "CASCADE" }
  )
  prices: MoneyAmount[]

  @CreateDateColumn({ type: resolveDbType("timestamptz") })
  created_at: Date

  @UpdateDateColumn({ type: resolveDbType("timestamptz") })
  updated_at: Date

  @DeleteDateColumn({ type: resolveDbType("timestamptz") })
  deleted_at: Date

  @BeforeInsert()
  private beforeInsert(): undefined | void {
    if (this.id) {
      return
    }
    const id = ulid()
    this.id = `pl_${id}`
  }
}

/**
 * @schema price_list
 * title: "Price List"
 * description: "Price Lists represents a set of prices that overrides the default price for one or more product variants."
 * x-resourceId: price_list
 * properties:
 *   id:
 *     description: "The id of the Price List. This value will be prefixed by `pl_`."
 *     type: string
 *   type:
 *     description: "The type of Price List. This can be one of either `sale` or `override`."
 *     type: string
 *     enum:
 *       - sale
 *       - override
 *   starts_at:
 *     description: "The date with timezone that the Price List starts being valid."
 *     type: date-time
 *   ends_at:
 *     description: "The date with timezone that the Price List stops being valid."
 *     type: date-time
 *   customer_groups:
 *     description: "The Customer Groups that the Price List applies to."
 *     type: array
 *     items:
 *       $ref: "#/components/schemas/customer_group"
 *   created_at:
 *     description: "The date with timezone at which the resource was created."
 *     type: string
 *     format: date-time
 *   updated_at:
 *     description: "The date with timezone at which the resource was last updated."
 *     type: string
 *     format: date-time
 *   deleted_at:
 *     description: "The date with timezone at which the resource was deleted."
 *     type: string
 *     format: date-time
 */
