import { createConfig } from "@ponder/core";
import { http } from "viem";

import { ORMPAbi as ORMPAbiV2 } from "./abis/v2/ORMPAbi";
import { ORMPAbi as ORMPAbiV1 } from "./abis/v1/ORMPAbi";
import { ORMPOracleAbi as ORMPOracleAbiV1 } from "./abis/v1/ORMPOracleAbi";
import { ORMPRelayerAbi as ORMPRelayerAbiV1 } from "./abis/v1/ORMPRelayerAbi";

export default createConfig({
  networks: {
    // testnets
    arbitrum_sepolia: {
      chainId: 421614,
      transport: http("https://ethereum-sepolia.publicnode.com"),
    },
    pangolin: {
      chainId: 43,
      transport: http("https://pangolin-rpc.darwinia.network"),
    },
    sepolia: {
      chainId: 11155111,
      transport: http("https://ethereum-sepolia.publicnode.com"),
    },
    tron_shasta: {
      chainId: 2494104990,
      transport: http("https://api.shasta.trongrid.io/jsonrpc"),
    },
    // mainnets
    arbitrum: {
      chainId: 42161,
      transport: http("https://arbitrum-one.publicnode.com"),
    },
    blast: {
      chainId: 81457,
      transport: http("https://rpc.blast.io"),
    },
    crab: {
      chainId: 44,
      transport: http("https://crab-rpc.darwinia.network"),
    },
    darwinia: {
      chainId: 46,
      transport: http("http://c2.collator.itering.io:9944"),
    },
    ethereum: {
      chainId: 1,
      transport: http("https://ethereum.publicnode.com"),
    },
    polygon: {
      chainId: 137,
      transport: http("https://polygon-bor-rpc.publicnode.com"),
    },
  },
  contracts: {
    // === V2
    ORMPV2: {
      abi: ORMPAbiV2,
      address: "0x00000000001523057a05d6293C1e5171eE33eE0A",
      network: {
        tron_shasta: {
          startBlock: 42281878,
          address: "0x4a7C839b0a32c90ad3b397875df73B905b1Bf0CA", // TGm4AeM42R9ocbbN3ibrDtf5kkQVTTFMYS
        },
      },
      filter: {
        event: ["MessageAccepted", "MessageDispatched", "MessageAssigned"],
      },
    },

    // === V1
    ORMPV1: {
      abi: ORMPAbiV1,
      address: "0x00000000001523057a05d6293C1e5171eE33eE0A",
      network: {
        // testnets
        arbitrum_sepolia: {
          startBlock: 860637,
        },
        pangolin: {
          startBlock: 2275723,
        },
        sepolia: {
          startBlock: 4728915,
        },
        // mainnets
        arbitrum: {
          startBlock: 148555417,
        },
        blast: {
          startBlock: 364290,
        },
        crab: {
          startBlock: 1658340,
        },
        darwinia: {
          startBlock: 1389410,
        },
        ethereum: {
          startBlock: 18753083,
        },
        polygon: {
          startBlock: 54050910,
        },
      },
      filter: {
        event: ["MessageAccepted", "MessageDispatched"],
      },
    },
    ORMPOracleV1: {
      abi: ORMPOracleAbiV1,
      address: "0x0000000003ebeF32D8f0ED406a5CA8805c80AFba",
      network: {
        // testnets
        arbitrum_sepolia: {
          startBlock: 860637,
        },
        pangolin: {
          startBlock: 2275723,
        },
        sepolia: {
          startBlock: 4728915,
        },
        // mainnets
        arbitrum: {
          startBlock: 148555417,
        },
        blast: {
          startBlock: 364290,
        },
        crab: {
          startBlock: 1658340,
        },
        darwinia: {
          startBlock: 1389410,
        },
        ethereum: {
          startBlock: 18753083,
        },
        polygon: {
          startBlock: 54050910,
        },
      },
      filter: {
        event: ["Assigned"],
      },
    },
    ORMPRelayerV1: {
      abi: ORMPRelayerAbiV1,
      address: "0x0000000000808fE9bDCc1d180EfbF5C53552a6b1",
      network: {
        // testnets
        arbitrum_sepolia: {
          startBlock: 860637,
        },
        pangolin: {
          startBlock: 2275723,
        },
        sepolia: {
          startBlock: 4728915,
        },
        // mainnets
        arbitrum: {
          startBlock: 148555417,
        },
        blast: {
          startBlock: 364290,
        },
        crab: {
          startBlock: 1658340,
        },
        darwinia: {
          startBlock: 1389410,
        },
        ethereum: {
          startBlock: 18753083,
        },
        polygon: {
          startBlock: 54050910,
        },
      },
      filter: {
        event: ["Assigned"],
      },
    },
  },
});
