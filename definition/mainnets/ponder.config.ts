import { createConfig } from "@ponder/core";
import { http } from "viem";

import { ORMPAbi as ORMPAbiV2 } from "./abis/v2/ORMPAbi";
import { SignaturePubAbi } from "./abis/v2/SignaturePubAbi";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const BLAST_API_KEY = process.env.BLAST_API_KEY;
const MAX_REQUESTS_PER_SECOND = 5;
const FAST_MAX_REQUESTS_PER_SECOND = 10;

export default createConfig({
  networks: {
    arbitrum: {
      chainId: 42161,
      transport: http(
        // `https://arbitrum-one.blastapi.io/${BLAST_API_KEY}`
        // "https://arb1.arbitrum.io/rpc"
        "https://arbitrum-hrpc.vercel.app/"
      ),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    blast: {
      chainId: 81457,
      transport: http("https://rpc.blast.io"),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    crab: {
      chainId: 44,
      transport: http("http://c2.crab-rpc.itering.io:9944/"),
      // transport: http("https://crab-hrpc.vercel.app/"),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    darwinia: {
      chainId: 46,
      transport: http("http://c1.darwinia-rpc.itering.io:9944/"),
      // transport: http("https://darwinia-hrpc.vercel.app/"),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    ethereum: {
      chainId: 1,
      // transport: http(`https://eth-mainnet.blastapi.io/${BLAST_API_KEY}`),
      transport: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),

      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    moonbeam: {
      chainId: 1284,
      transport: http(`https://moonbeam.blastapi.io/${BLAST_API_KEY}`),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    polygon: {
      chainId: 137,
      transport: http(`https://polygon-mainnet.blastapi.io/${BLAST_API_KEY}`),
      // transport: http(`https://polygon-hrpc.vercel.app/`),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
    tron: {
      chainId: 728126428,
      transport: http("https://api.trongrid.io/jsonrpc"),
      maxRequestsPerSecond: MAX_REQUESTS_PER_SECOND,
    },
  },
  contracts: {
    // === V2
    ORMPV2: {
      abi: ORMPAbiV2,
      address: "0x13b2211a7cA45Db2808F6dB05557ce5347e3634e",
      network: {
        arbitrum: {
          startBlock: 218870631,
        },
        blast: {
          startBlock: 4416712,
        },
        crab: {
          startBlock: 2917100,
        },
        darwinia: {
          startBlock: 2849900,
        },
        ethereum: {
          startBlock: 20030000,
        },
        moonbeam: {
          startBlock: 6314163,
        },
        polygon: {
          startBlock: 57819611,
        },
        tron: {
          startBlock: 62333124,
          address: "0x5C5c383FEbE62F377F8c0eA1de97F2a2Ba102e98", // TJPZeFEdc4TBEcNbku5xVZLQ6B2Q1oGnd1
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
          startBlock: 2849900,
        },
      },
    },
  },
});
