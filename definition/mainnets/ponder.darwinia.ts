import {createConfig} from "@ponder/core";
import {http} from "viem";

import {ORMPAbi as ORMPAbiV2} from "./abis/v2/ORMPAbi";
import {SignaturePubAbi} from "./abis/v2/SignaturePubAbi";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const BLAST_API_KEY = process.env.BLAST_API_KEY;
const MAX_REQUESTS_PER_SECOND = 5;
const FAST_MAX_REQUESTS_PER_SECOND = 20;

export default createConfig({
  networks: {
    darwinia: {
      chainId: 46,
      transport: http(process.env.ENDPOINT_46 || "http://c2.darwinia-rpc.itering.io:9944/"),
      // transport: http("https://hrpc.darwinia.network/darwinia"),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
  },
  contracts: {
    // === V2
    ORMPV2: {
      abi: ORMPAbiV2,
      address: "0x13b2211a7cA45Db2808F6dB05557ce5347e3634e",
      network: {
        darwinia: {
          startBlock: 2830100,
        },
      },
      filter: {
        event: [
          "MessageAccepted",
          "MessageDispatched",
          "MessageAssigned",
          "HashImported",
        ],
      },
    },
    SignaturePub: {
      abi: SignaturePubAbi,
      address: "0x57aa601a0377f5ab313c5a955ee874f5d495fc92",
      network: {
        darwinia: {
          startBlock: 5000000,
        },
      },
    },
  },
});
