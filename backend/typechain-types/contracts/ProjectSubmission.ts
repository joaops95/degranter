/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace ProjectSubmission {
  export type ProjectStruct = {
    id: BigNumberish;
    name: string;
    description: string;
    creator: AddressLike;
    monthlyYield: BigNumberish;
    grantTotal: BigNumberish;
    period: BigNumberish;
    approved: boolean;
  };

  export type ProjectStructOutput = [
    id: bigint,
    name: string,
    description: string,
    creator: string,
    monthlyYield: bigint,
    grantTotal: bigint,
    period: bigint,
    approved: boolean
  ] & {
    id: bigint;
    name: string;
    description: string;
    creator: string;
    monthlyYield: bigint;
    grantTotal: bigint;
    period: bigint;
    approved: boolean;
  };
}

export interface ProjectSubmissionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "approveProject"
      | "getProject"
      | "getProjectCount"
      | "getProjects"
      | "owner"
      | "projectCount"
      | "projects"
      | "renounceOwnership"
      | "submitProject"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "OwnershipTransferred"
      | "ProjectApproved"
      | "ProjectSubmitted"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "approveProject",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProject",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProjects",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "projectCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "projects",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "submitProject",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getProject", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getProjectCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjects",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "projectCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "projects", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProjectApprovedEvent {
  export type InputTuple = [projectId: BigNumberish];
  export type OutputTuple = [projectId: bigint];
  export interface OutputObject {
    projectId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ProjectSubmittedEvent {
  export type InputTuple = [
    id: BigNumberish,
    name: string,
    description: string,
    creator: AddressLike,
    monthlyYield: BigNumberish,
    grantTotal: BigNumberish,
    period: BigNumberish,
    approved: boolean
  ];
  export type OutputTuple = [
    id: bigint,
    name: string,
    description: string,
    creator: string,
    monthlyYield: bigint,
    grantTotal: bigint,
    period: bigint,
    approved: boolean
  ];
  export interface OutputObject {
    id: bigint;
    name: string;
    description: string;
    creator: string;
    monthlyYield: bigint;
    grantTotal: bigint;
    period: bigint;
    approved: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ProjectSubmission extends BaseContract {
  connect(runner?: ContractRunner | null): ProjectSubmission;
  waitForDeployment(): Promise<this>;

  interface: ProjectSubmissionInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  approveProject: TypedContractMethod<
    [_projectId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getProject: TypedContractMethod<
    [_projectId: BigNumberish],
    [ProjectSubmission.ProjectStructOutput],
    "view"
  >;

  getProjectCount: TypedContractMethod<[], [bigint], "view">;

  getProjects: TypedContractMethod<
    [],
    [ProjectSubmission.ProjectStructOutput[]],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  projectCount: TypedContractMethod<[], [bigint], "view">;

  projects: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, bigint, boolean] & {
        id: bigint;
        name: string;
        description: string;
        creator: string;
        monthlyYield: bigint;
        grantTotal: bigint;
        period: bigint;
        approved: boolean;
      }
    ],
    "view"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  submitProject: TypedContractMethod<
    [
      _name: string,
      _description: string,
      _monthlyYield: BigNumberish,
      _grantTotal: BigNumberish,
      _period: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveProject"
  ): TypedContractMethod<[_projectId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "getProject"
  ): TypedContractMethod<
    [_projectId: BigNumberish],
    [ProjectSubmission.ProjectStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getProjectCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getProjects"
  ): TypedContractMethod<[], [ProjectSubmission.ProjectStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "projectCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "projects"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, string, string, bigint, bigint, bigint, boolean] & {
        id: bigint;
        name: string;
        description: string;
        creator: string;
        monthlyYield: bigint;
        grantTotal: bigint;
        period: bigint;
        approved: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "submitProject"
  ): TypedContractMethod<
    [
      _name: string,
      _description: string,
      _monthlyYield: BigNumberish,
      _grantTotal: BigNumberish,
      _period: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "ProjectApproved"
  ): TypedContractEvent<
    ProjectApprovedEvent.InputTuple,
    ProjectApprovedEvent.OutputTuple,
    ProjectApprovedEvent.OutputObject
  >;
  getEvent(
    key: "ProjectSubmitted"
  ): TypedContractEvent<
    ProjectSubmittedEvent.InputTuple,
    ProjectSubmittedEvent.OutputTuple,
    ProjectSubmittedEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "ProjectApproved(uint256)": TypedContractEvent<
      ProjectApprovedEvent.InputTuple,
      ProjectApprovedEvent.OutputTuple,
      ProjectApprovedEvent.OutputObject
    >;
    ProjectApproved: TypedContractEvent<
      ProjectApprovedEvent.InputTuple,
      ProjectApprovedEvent.OutputTuple,
      ProjectApprovedEvent.OutputObject
    >;

    "ProjectSubmitted(uint256,string,string,address,uint256,uint256,uint256,bool)": TypedContractEvent<
      ProjectSubmittedEvent.InputTuple,
      ProjectSubmittedEvent.OutputTuple,
      ProjectSubmittedEvent.OutputObject
    >;
    ProjectSubmitted: TypedContractEvent<
      ProjectSubmittedEvent.InputTuple,
      ProjectSubmittedEvent.OutputTuple,
      ProjectSubmittedEvent.OutputObject
    >;
  };
}
