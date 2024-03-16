/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { Staking, StakingInterface } from "../../contracts/Staking";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_projectSubmission",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "staker",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ProjectStaked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "calculateReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "distributeRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
    ],
    name: "getProjectStakers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
    ],
    name: "getProjectTotalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projectStakers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projects",
    outputs: [
      {
        internalType: "contract ProjectSubmission",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stakeOnProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userStakes",
    outputs: [
      {
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620017ec380380620017ec83398181016040528101906200003791906200016f565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001b6565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000f282620000c5565b9050919050565b60006200010682620000e5565b9050919050565b6200011881620000f9565b81146200012457600080fd5b50565b60008151905062000138816200010d565b92915050565b6200014981620000e5565b81146200015557600080fd5b50565b60008151905062000169816200013e565b92915050565b60008060408385031215620001895762000188620000c0565b5b6000620001998582860162000127565b9250506020620001ac8582860162000158565b9150509250929050565b61162680620001c66000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80636f4a2cd0116100715780636f4a2cd01461019f57806372f702f3146101a9578063817b1cd2146101c75780638b79543c146101e5578063b5d5b5fa14610203578063f68f580514610234576100b4565b80630660f1e8146100b9578063156faf39146100e95780631852e8d914610105578063372500ab1461013557806339a084331461013f5780635f702fe21461016f575b600080fd5b6100d360048036038101906100ce9190610c21565b610264565b6040516100e09190610c67565b60405180910390f35b61010360048036038101906100fe9190610cae565b61027c565b005b61011f600480360381019061011a9190610cee565b6104bf565b60405161012c9190610c67565b60405180910390f35b61013d6105ea565b005b61015960048036038101906101549190610cae565b610758565b6040516101669190610d3d565b60405180910390f35b61018960048036038101906101849190610d58565b6107a6565b6040516101969190610e43565b60405180910390f35b6101a7610847565b005b6101b1610a5a565b6040516101be9190610ec4565b60405180910390f35b6101cf610a7e565b6040516101dc9190610c67565b60405180910390f35b6101ed610a84565b6040516101fa9190610f00565b60405180910390f35b61021d60048036038101906102189190610cee565b610aaa565b60405161022b929190610f1b565b60405180910390f35b61024e60048036038101906102499190610d58565b610aeb565b60405161025b9190610c67565b60405180910390f35b60046020528060005260406000206000915090505481565b600081116102bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102b690610fa1565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161031c93929190610fc1565b6020604051808303816000875af115801561033b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035f9190611030565b50600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180604001604052808481526020018381525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010155505060036000838152602001908152602001600020339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060056000828254610479919061108c565b925050819055507f14e91cfeb81fe5914a78b9494da4f55867233f6b14fafc93185f7101826109813383836040516104b3939291906110c0565b60405180910390a15050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610512576105116110f7565b5b906000526020600020906002020160010154600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcc601286040518163ffffffff1660e01b8152600401600060405180830381865afa158015610591573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906105ba91906114a3565b83815181106105cc576105cb6110f7565b5b6020026020010151608001516105e291906114ec565b905092915050565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111610671576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106689061157a565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016106cc92919061159a565b6020604051808303816000875af11580156106eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070f9190611030565b506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555050565b6003602052816000526040600020818154811061077457600080fd5b906000526020600020016000915091509054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606003600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561083b57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116107f1575b50505050509050919050565b60005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633bcff3b06040518163ffffffff1660e01b8152600401602060405180830381865afa1580156108b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108db91906115c3565b811015610a57576000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcc601286040518163ffffffff1660e01b8152600401600060405180830381865afa158015610951573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061097a91906114a3565b828151811061098c5761098b6110f7565b5b602002602001015160000151905060005b6109a6826107a6565b51811015610a485760006109b9836107a6565b82815181106109cb576109ca6110f7565b5b6020026020010151905060006109e182856104bf565b905080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610a32919061108c565b925050819055505050808060010191505061099d565b5050808060010191505061084a565b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528160005260406000208181548110610ac657600080fd5b9060005260206000209060020201600091509150508060000154908060010154905082565b6000806000905060005b610afe846107a6565b51811015610ba55760026000610b13866107a6565b8381518110610b2557610b246110f7565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208481548110610b7957610b786110f7565b5b90600052602060002090600202016001015482610b96919061108c565b91508080600101915050610af5565b5080915050919050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bee82610bc3565b9050919050565b610bfe81610be3565b8114610c0957600080fd5b50565b600081359050610c1b81610bf5565b92915050565b600060208284031215610c3757610c36610bb9565b5b6000610c4584828501610c0c565b91505092915050565b6000819050919050565b610c6181610c4e565b82525050565b6000602082019050610c7c6000830184610c58565b92915050565b610c8b81610c4e565b8114610c9657600080fd5b50565b600081359050610ca881610c82565b92915050565b60008060408385031215610cc557610cc4610bb9565b5b6000610cd385828601610c99565b9250506020610ce485828601610c99565b9150509250929050565b60008060408385031215610d0557610d04610bb9565b5b6000610d1385828601610c0c565b9250506020610d2485828601610c99565b9150509250929050565b610d3781610be3565b82525050565b6000602082019050610d526000830184610d2e565b92915050565b600060208284031215610d6e57610d6d610bb9565b5b6000610d7c84828501610c99565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610dba81610be3565b82525050565b6000610dcc8383610db1565b60208301905092915050565b6000602082019050919050565b6000610df082610d85565b610dfa8185610d90565b9350610e0583610da1565b8060005b83811015610e36578151610e1d8882610dc0565b9750610e2883610dd8565b925050600181019050610e09565b5085935050505092915050565b60006020820190508181036000830152610e5d8184610de5565b905092915050565b6000819050919050565b6000610e8a610e85610e8084610bc3565b610e65565b610bc3565b9050919050565b6000610e9c82610e6f565b9050919050565b6000610eae82610e91565b9050919050565b610ebe81610ea3565b82525050565b6000602082019050610ed96000830184610eb5565b92915050565b6000610eea82610e91565b9050919050565b610efa81610edf565b82525050565b6000602082019050610f156000830184610ef1565b92915050565b6000604082019050610f306000830185610c58565b610f3d6020830184610c58565b9392505050565b600082825260208201905092915050565b7f5374616b6520616d6f756e742063616e6e6f74206265207a65726f0000000000600082015250565b6000610f8b601b83610f44565b9150610f9682610f55565b602082019050919050565b60006020820190508181036000830152610fba81610f7e565b9050919050565b6000606082019050610fd66000830186610d2e565b610fe36020830185610d2e565b610ff06040830184610c58565b949350505050565b60008115159050919050565b61100d81610ff8565b811461101857600080fd5b50565b60008151905061102a81611004565b92915050565b60006020828403121561104657611045610bb9565b5b60006110548482850161101b565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061109782610c4e565b91506110a283610c4e565b92508282019050808211156110ba576110b961105d565b5b92915050565b60006060820190506110d56000830186610d2e565b6110e26020830185610c58565b6110ef6040830184610c58565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111748261112b565b810181811067ffffffffffffffff821117156111935761119261113c565b5b80604052505050565b60006111a6610baf565b90506111b2828261116b565b919050565b600067ffffffffffffffff8211156111d2576111d161113c565b5b602082029050602081019050919050565b600080fd5b600080fd5b600080fd5b60008151905061120181610c82565b92915050565b600080fd5b600067ffffffffffffffff8211156112275761122661113c565b5b6112308261112b565b9050602081019050919050565b60005b8381101561125b578082015181840152602081019050611240565b60008484015250505050565b600061127a6112758461120c565b61119c565b90508281526020810184848401111561129657611295611207565b5b6112a184828561123d565b509392505050565b600082601f8301126112be576112bd611126565b5b81516112ce848260208601611267565b91505092915050565b6000815190506112e681610bf5565b92915050565b60006101008284031215611303576113026111e8565b5b61130e61010061119c565b9050600061131e848285016111f2565b600083015250602082015167ffffffffffffffff811115611342576113416111ed565b5b61134e848285016112a9565b602083015250604082015167ffffffffffffffff811115611372576113716111ed565b5b61137e848285016112a9565b6040830152506060611392848285016112d7565b60608301525060806113a6848285016111f2565b60808301525060a06113ba848285016111f2565b60a08301525060c06113ce848285016111f2565b60c08301525060e06113e28482850161101b565b60e08301525092915050565b60006114016113fc846111b7565b61119c565b90508083825260208201905060208402830185811115611424576114236111e3565b5b835b8181101561146b57805167ffffffffffffffff81111561144957611448611126565b5b80860161145689826112ec565b85526020850194505050602081019050611426565b5050509392505050565b600082601f83011261148a57611489611126565b5b815161149a8482602086016113ee565b91505092915050565b6000602082840312156114b9576114b8610bb9565b5b600082015167ffffffffffffffff8111156114d7576114d6610bbe565b5b6114e384828501611475565b91505092915050565b60006114f782610c4e565b915061150283610c4e565b925082820261151081610c4e565b915082820484148315176115275761152661105d565b5b5092915050565b7f4e6f207265776172647320746f20636c61696d00000000000000000000000000600082015250565b6000611564601383610f44565b915061156f8261152e565b602082019050919050565b6000602082019050818103600083015261159381611557565b9050919050565b60006040820190506115af6000830185610d2e565b6115bc6020830184610c58565b9392505050565b6000602082840312156115d9576115d8610bb9565b5b60006115e7848285016111f2565b9150509291505056fea2646970667358221220f62f4423dc0eb1c68bbf6d0e52f779fbf7b9d6219c1168098a7463a61145160b64736f6c63430008180033";

type StakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Staking__factory extends ContractFactory {
  constructor(...args: StakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _stakingToken: AddressLike,
    _projectSubmission: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _stakingToken,
      _projectSubmission,
      overrides || {}
    );
  }
  override deploy(
    _stakingToken: AddressLike,
    _projectSubmission: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _stakingToken,
      _projectSubmission,
      overrides || {}
    ) as Promise<
      Staking & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Staking__factory {
    return super.connect(runner) as Staking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingInterface {
    return new Interface(_abi) as StakingInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Staking {
    return new Contract(address, _abi, runner) as unknown as Staking;
  }
}
