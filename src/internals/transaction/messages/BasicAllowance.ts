import { Coin } from "@cosmjs/stargate";
import { BasicAllowance as CosmosBasicAllowance } from "cosmjs-types/cosmos/feegrant/v1beta1/feegrant";

import TransactionMsg, { ProtoMsg } from "./TransactionMsg";

export type BasicAllowanceValue = {
  spendLimit: Coin[];
  expiration?: string;
};

export class BasicAllowance extends TransactionMsg<BasicAllowanceValue> {
  static TYPE = "/cosmos.feegrant.v1beta1.BasicAllowance";

  constructor({ spendLimit, expiration }: BasicAllowanceValue) {
    super(BasicAllowance.TYPE, {
      spendLimit,
      expiration,
    });
  }

  toTerraExtensionMsg(): string {
    return JSON.stringify({
      "@type": this.typeUrl,
      spend_limit: this.value.spendLimit,
      expiration: this.value.expiration,
    });
  }

  toProtoMsg(): ProtoMsg {
    const cosmosMsg = this.toCosmosMsg();
    return {
      typeUrl: this.typeUrl,
      value: CosmosBasicAllowance.encode(CosmosBasicAllowance.fromPartial(cosmosMsg.value)).finish(),
    };
  }
}

export default BasicAllowance;
