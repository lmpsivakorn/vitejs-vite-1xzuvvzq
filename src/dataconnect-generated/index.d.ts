import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddToExnessBanListData {
  banListsExness_insert: BanListsExness_Key;
}

export interface AddToExnessBanListVariables {
  clientAccount: string;
}

export interface BanListsExness_Key {
  clientAccount: string;
  __typename?: 'BanListsExness_Key';
}

export interface Config_Key {
  key: string;
  __typename?: 'Config_Key';
}

export interface CreateConfigData {
  config_insert: Config_Key;
}

export interface CreateConfigVariables {
  key: string;
  value: string;
}

export interface CreateExnessAccountData {
  exness_insert: Exness_Key;
}

export interface CreateExnessAccountVariables {
  memberUid?: string | null;
  clientAccount: string;
  clientAccountType?: string | null;
  clientUid?: string | null;
  country?: string | null;
  currency?: string | null;
  fromExnessId?: string | null;
  partnerAccount?: string | null;
  partnerAccountName?: string | null;
  regDate?: DateString | null;
  reward?: string | null;
  rewardUsd?: string | null;
  comment?: string | null;
  volumeLots?: number | null;
  volumeMlnUsd?: number | null;
}

export interface CreateMemberData {
  member_insert: Member_Key;
}

export interface CreateMemberVariables {
  uid: string;
  phone?: string | null;
  avatar?: string | null;
  firstName?: string | null;
}

export interface DeleteExnessData {
  member_update?: Member_Key | null;
  exness_delete?: Exness_Key | null;
}

export interface DeleteExnessVariables {
  clientAccount: string;
}

export interface DeleteMemberData {
  member_deleteMany: number;
}

export interface DeleteMemberVariables {
  uid: string;
}

export interface Exness_Key {
  clientAccount: string;
  __typename?: 'Exness_Key';
}

export interface GetBanExnessData {
  banListsExnesses: ({
    clientAccount: string;
  } & BanListsExness_Key)[];
}

export interface GetBanExnessVariables {
  clientAccount: string;
}

export interface GetConfigData {
  configs: ({
    key: string;
    value: string;
    createdOn?: TimestampString | null;
    updatedAt?: TimestampString | null;
  } & Config_Key)[];
}

export interface GetConfigVariables {
  key: string;
}

export interface GetExnessAccountData {
  exnesses: ({
    member?: {
      uid: string;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      avatar?: string | null;
      email?: string | null;
      birthday?: DateString | null;
      countryCode?: string | null;
      provinceId?: string | null;
      levelScore?: number | null;
      active?: boolean | null;
      updatedAt?: TimestampString | null;
    } & Member_Key;
      clientAccount: string;
      clientAccountType?: string | null;
      clientUid?: string | null;
      country?: string | null;
      createdAt?: TimestampString | null;
      currency?: string | null;
      fromExnessId?: string | null;
      partnerAccount?: string | null;
      partnerAccountName?: string | null;
      regDate?: DateString | null;
      reward?: string | null;
      rewardUsd?: string | null;
      volumeLots?: number | null;
      volumeMlnUsd?: number | null;
      linked?: boolean | null;
  } & Exness_Key)[];
}

export interface GetExnessAccountVariables {
  clientAccount?: string | null;
  memberUid?: string | null;
}

export interface GetMemberByExnessData {
  members: ({
    uid: string;
    phone?: string | null;
    avatar?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    birthday?: DateString | null;
    countryCode?: string | null;
    provinceId?: string | null;
    levelScore?: number | null;
    exness?: {
      clientAccount: string;
      clientAccountType?: string | null;
      clientUid?: string | null;
      country?: string | null;
      currency?: string | null;
      fromExnessId?: string | null;
      partnerAccount?: string | null;
      partnerAccountName?: string | null;
      regDate?: DateString | null;
      reward?: string | null;
      rewardUsd?: string | null;
      comment?: string | null;
      volumeLots?: number | null;
      volumeMlnUsd?: number | null;
      linked?: boolean | null;
      createdAt?: TimestampString | null;
    } & Exness_Key;
  } & Member_Key)[];
}

export interface GetMemberByExnessVariables {
  clientAccount: string;
}

export interface GetMemberData {
  members: ({
    uid: string;
    phone?: string | null;
    avatar?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    birthday?: DateString | null;
    countryCode?: string | null;
    provinceId?: string | null;
    levelScore?: number | null;
    updatedAt?: TimestampString | null;
    exness?: {
      clientAccount: string;
      clientAccountType?: string | null;
      clientUid?: string | null;
      country?: string | null;
      currency?: string | null;
      fromExnessId?: string | null;
      partnerAccount?: string | null;
      partnerAccountName?: string | null;
      regDate?: DateString | null;
      reward?: string | null;
      rewardUsd?: string | null;
      comment?: string | null;
      volumeLots?: number | null;
      volumeMlnUsd?: number | null;
      linked?: boolean | null;
      createdAt?: TimestampString | null;
    } & Exness_Key;
  } & Member_Key)[];
}

export interface GetMemberVariables {
  uid: string;
}

export interface ListMembersData {
  members: ({
    uid: string;
    phone?: string | null;
    avatar?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    birthday?: DateString | null;
    countryCode?: string | null;
    provinceId?: string | null;
    levelScore?: number | null;
    active?: boolean | null;
    updatedAt?: TimestampString | null;
    exness?: {
      clientAccount: string;
    } & Exness_Key;
  } & Member_Key)[];
}

export interface ListMembersVariables {
  limit?: number | null;
}

export interface Member_Key {
  uid: string;
  __typename?: 'Member_Key';
}

export interface UpdateConfigData {
  config_update?: Config_Key | null;
}

export interface UpdateConfigVariables {
  key: string;
  value: string;
}

export interface UpdateExnessAccountData {
  exness_update?: Exness_Key | null;
}

export interface UpdateExnessAccountVariables {
  memberUid?: string | null;
  clientAccount: string;
  clientAccountType?: string | null;
  clientUid?: string | null;
  country?: string | null;
  currency?: string | null;
  fromExnessId?: string | null;
  partnerAccount?: string | null;
  partnerAccountName?: string | null;
  regDate?: DateString | null;
  reward?: string | null;
  rewardUsd?: string | null;
  comment?: string | null;
  volumeLots?: number | null;
  volumeMlnUsd?: number | null;
  linked?: boolean | null;
}

export interface UpdateMemberData {
  member_update?: Member_Key | null;
}

export interface UpdateMemberVariables {
  uid: string;
  phone?: string | null;
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  birthday?: DateString | null;
  countryCode?: string | null;
  provinceId?: string | null;
  levelScore?: number | null;
  active?: boolean | null;
  exness?: string | null;
}

interface CreateMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
  operationName: string;
}
export const createMemberRef: CreateMemberRef;

export function createMember(vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;
export function createMember(dc: DataConnect, vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface UpdateMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
  operationName: string;
}
export const updateMemberRef: UpdateMemberRef;

export function updateMember(vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;
export function updateMember(dc: DataConnect, vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface DeleteMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
  operationName: string;
}
export const deleteMemberRef: DeleteMemberRef;

export function deleteMember(vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;
export function deleteMember(dc: DataConnect, vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface AddToExnessBanListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddToExnessBanListVariables): MutationRef<AddToExnessBanListData, AddToExnessBanListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddToExnessBanListVariables): MutationRef<AddToExnessBanListData, AddToExnessBanListVariables>;
  operationName: string;
}
export const addToExnessBanListRef: AddToExnessBanListRef;

export function addToExnessBanList(vars: AddToExnessBanListVariables): MutationPromise<AddToExnessBanListData, AddToExnessBanListVariables>;
export function addToExnessBanList(dc: DataConnect, vars: AddToExnessBanListVariables): MutationPromise<AddToExnessBanListData, AddToExnessBanListVariables>;

interface CreateConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConfigVariables): MutationRef<CreateConfigData, CreateConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateConfigVariables): MutationRef<CreateConfigData, CreateConfigVariables>;
  operationName: string;
}
export const createConfigRef: CreateConfigRef;

export function createConfig(vars: CreateConfigVariables): MutationPromise<CreateConfigData, CreateConfigVariables>;
export function createConfig(dc: DataConnect, vars: CreateConfigVariables): MutationPromise<CreateConfigData, CreateConfigVariables>;

interface UpdateConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConfigVariables): MutationRef<UpdateConfigData, UpdateConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateConfigVariables): MutationRef<UpdateConfigData, UpdateConfigVariables>;
  operationName: string;
}
export const updateConfigRef: UpdateConfigRef;

export function updateConfig(vars: UpdateConfigVariables): MutationPromise<UpdateConfigData, UpdateConfigVariables>;
export function updateConfig(dc: DataConnect, vars: UpdateConfigVariables): MutationPromise<UpdateConfigData, UpdateConfigVariables>;

interface CreateExnessAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExnessAccountVariables): MutationRef<CreateExnessAccountData, CreateExnessAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateExnessAccountVariables): MutationRef<CreateExnessAccountData, CreateExnessAccountVariables>;
  operationName: string;
}
export const createExnessAccountRef: CreateExnessAccountRef;

export function createExnessAccount(vars: CreateExnessAccountVariables): MutationPromise<CreateExnessAccountData, CreateExnessAccountVariables>;
export function createExnessAccount(dc: DataConnect, vars: CreateExnessAccountVariables): MutationPromise<CreateExnessAccountData, CreateExnessAccountVariables>;

interface UpdateExnessAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExnessAccountVariables): MutationRef<UpdateExnessAccountData, UpdateExnessAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateExnessAccountVariables): MutationRef<UpdateExnessAccountData, UpdateExnessAccountVariables>;
  operationName: string;
}
export const updateExnessAccountRef: UpdateExnessAccountRef;

export function updateExnessAccount(vars: UpdateExnessAccountVariables): MutationPromise<UpdateExnessAccountData, UpdateExnessAccountVariables>;
export function updateExnessAccount(dc: DataConnect, vars: UpdateExnessAccountVariables): MutationPromise<UpdateExnessAccountData, UpdateExnessAccountVariables>;

interface DeleteExnessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExnessVariables): MutationRef<DeleteExnessData, DeleteExnessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteExnessVariables): MutationRef<DeleteExnessData, DeleteExnessVariables>;
  operationName: string;
}
export const deleteExnessRef: DeleteExnessRef;

export function deleteExness(vars: DeleteExnessVariables): MutationPromise<DeleteExnessData, DeleteExnessVariables>;
export function deleteExness(dc: DataConnect, vars: DeleteExnessVariables): MutationPromise<DeleteExnessData, DeleteExnessVariables>;

interface ListMembersRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
  operationName: string;
}
export const listMembersRef: ListMembersRef;

export function listMembers(vars?: ListMembersVariables): QueryPromise<ListMembersData, ListMembersVariables>;
export function listMembers(dc: DataConnect, vars?: ListMembersVariables): QueryPromise<ListMembersData, ListMembersVariables>;

interface GetMemberRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
  operationName: string;
}
export const getMemberRef: GetMemberRef;

export function getMember(vars: GetMemberVariables): QueryPromise<GetMemberData, GetMemberVariables>;
export function getMember(dc: DataConnect, vars: GetMemberVariables): QueryPromise<GetMemberData, GetMemberVariables>;

interface GetMemberByExnessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberByExnessVariables): QueryRef<GetMemberByExnessData, GetMemberByExnessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMemberByExnessVariables): QueryRef<GetMemberByExnessData, GetMemberByExnessVariables>;
  operationName: string;
}
export const getMemberByExnessRef: GetMemberByExnessRef;

export function getMemberByExness(vars: GetMemberByExnessVariables): QueryPromise<GetMemberByExnessData, GetMemberByExnessVariables>;
export function getMemberByExness(dc: DataConnect, vars: GetMemberByExnessVariables): QueryPromise<GetMemberByExnessData, GetMemberByExnessVariables>;

interface GetBanExnessRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBanExnessVariables): QueryRef<GetBanExnessData, GetBanExnessVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBanExnessVariables): QueryRef<GetBanExnessData, GetBanExnessVariables>;
  operationName: string;
}
export const getBanExnessRef: GetBanExnessRef;

export function getBanExness(vars: GetBanExnessVariables): QueryPromise<GetBanExnessData, GetBanExnessVariables>;
export function getBanExness(dc: DataConnect, vars: GetBanExnessVariables): QueryPromise<GetBanExnessData, GetBanExnessVariables>;

interface GetConfigRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConfigVariables): QueryRef<GetConfigData, GetConfigVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConfigVariables): QueryRef<GetConfigData, GetConfigVariables>;
  operationName: string;
}
export const getConfigRef: GetConfigRef;

export function getConfig(vars: GetConfigVariables): QueryPromise<GetConfigData, GetConfigVariables>;
export function getConfig(dc: DataConnect, vars: GetConfigVariables): QueryPromise<GetConfigData, GetConfigVariables>;

interface GetExnessAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetExnessAccountVariables): QueryRef<GetExnessAccountData, GetExnessAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetExnessAccountVariables): QueryRef<GetExnessAccountData, GetExnessAccountVariables>;
  operationName: string;
}
export const getExnessAccountRef: GetExnessAccountRef;

export function getExnessAccount(vars?: GetExnessAccountVariables): QueryPromise<GetExnessAccountData, GetExnessAccountVariables>;
export function getExnessAccount(dc: DataConnect, vars?: GetExnessAccountVariables): QueryPromise<GetExnessAccountData, GetExnessAccountVariables>;

