# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListMembers*](#listmembers)
  - [*GetMember*](#getmember)
  - [*GetMemberByExness*](#getmemberbyexness)
  - [*getBanExness*](#getbanexness)
  - [*getConfig*](#getconfig)
  - [*getExnessAccount*](#getexnessaccount)
- [**Mutations**](#mutations)
  - [*CreateMember*](#createmember)
  - [*UpdateMember*](#updatemember)
  - [*DeleteMember*](#deletemember)
  - [*AddToExnessBanList*](#addtoexnessbanlist)
  - [*createConfig*](#createconfig)
  - [*updateConfig*](#updateconfig)
  - [*createExnessAccount*](#createexnessaccount)
  - [*updateExnessAccount*](#updateexnessaccount)
  - [*deleteExness*](#deleteexness)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListMembers
You can execute the `ListMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMembers(vars?: ListMembersVariables): QueryPromise<ListMembersData, ListMembersVariables>;

interface ListMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
}
export const listMembersRef: ListMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMembers(dc: DataConnect, vars?: ListMembersVariables): QueryPromise<ListMembersData, ListMembersVariables>;

interface ListMembersRef {
  ...
  (dc: DataConnect, vars?: ListMembersVariables): QueryRef<ListMembersData, ListMembersVariables>;
}
export const listMembersRef: ListMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMembersRef:
```typescript
const name = listMembersRef.operationName;
console.log(name);
```

### Variables
The `ListMembers` query has an optional argument of type `ListMembersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMembersVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `ListMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMembersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMembers, ListMembersVariables } from '@dataconnect/generated';

// The `ListMembers` query has an optional argument of type `ListMembersVariables`:
const listMembersVars: ListMembersVariables = {
  limit: ..., // optional
};

// Call the `listMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMembers(listMembersVars);
// Variables can be defined inline as well.
const { data } = await listMembers({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMembersVariables` argument.
const { data } = await listMembers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMembers(dataConnect, listMembersVars);

console.log(data.members);

// Or, you can use the `Promise` API.
listMembers(listMembersVars).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

### Using `ListMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMembersRef, ListMembersVariables } from '@dataconnect/generated';

// The `ListMembers` query has an optional argument of type `ListMembersVariables`:
const listMembersVars: ListMembersVariables = {
  limit: ..., // optional
};

// Call the `listMembersRef()` function to get a reference to the query.
const ref = listMembersRef(listMembersVars);
// Variables can be defined inline as well.
const ref = listMembersRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `ListMembersVariables` argument.
const ref = listMembersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMembersRef(dataConnect, listMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.members);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

## GetMember
You can execute the `GetMember` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMember(vars: GetMemberVariables): QueryPromise<GetMemberData, GetMemberVariables>;

interface GetMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
}
export const getMemberRef: GetMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMember(dc: DataConnect, vars: GetMemberVariables): QueryPromise<GetMemberData, GetMemberVariables>;

interface GetMemberRef {
  ...
  (dc: DataConnect, vars: GetMemberVariables): QueryRef<GetMemberData, GetMemberVariables>;
}
export const getMemberRef: GetMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMemberRef:
```typescript
const name = getMemberRef.operationName;
console.log(name);
```

### Variables
The `GetMember` query requires an argument of type `GetMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMemberVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `GetMember` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMember, GetMemberVariables } from '@dataconnect/generated';

// The `GetMember` query requires an argument of type `GetMemberVariables`:
const getMemberVars: GetMemberVariables = {
  uid: ..., 
};

// Call the `getMember()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMember(getMemberVars);
// Variables can be defined inline as well.
const { data } = await getMember({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMember(dataConnect, getMemberVars);

console.log(data.members);

// Or, you can use the `Promise` API.
getMember(getMemberVars).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

### Using `GetMember`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMemberRef, GetMemberVariables } from '@dataconnect/generated';

// The `GetMember` query requires an argument of type `GetMemberVariables`:
const getMemberVars: GetMemberVariables = {
  uid: ..., 
};

// Call the `getMemberRef()` function to get a reference to the query.
const ref = getMemberRef(getMemberVars);
// Variables can be defined inline as well.
const ref = getMemberRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMemberRef(dataConnect, getMemberVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.members);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

## GetMemberByExness
You can execute the `GetMemberByExness` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMemberByExness(vars: GetMemberByExnessVariables): QueryPromise<GetMemberByExnessData, GetMemberByExnessVariables>;

interface GetMemberByExnessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemberByExnessVariables): QueryRef<GetMemberByExnessData, GetMemberByExnessVariables>;
}
export const getMemberByExnessRef: GetMemberByExnessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMemberByExness(dc: DataConnect, vars: GetMemberByExnessVariables): QueryPromise<GetMemberByExnessData, GetMemberByExnessVariables>;

interface GetMemberByExnessRef {
  ...
  (dc: DataConnect, vars: GetMemberByExnessVariables): QueryRef<GetMemberByExnessData, GetMemberByExnessVariables>;
}
export const getMemberByExnessRef: GetMemberByExnessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMemberByExnessRef:
```typescript
const name = getMemberByExnessRef.operationName;
console.log(name);
```

### Variables
The `GetMemberByExness` query requires an argument of type `GetMemberByExnessVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMemberByExnessVariables {
  clientAccount: string;
}
```
### Return Type
Recall that executing the `GetMemberByExness` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMemberByExnessData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMemberByExness`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMemberByExness, GetMemberByExnessVariables } from '@dataconnect/generated';

// The `GetMemberByExness` query requires an argument of type `GetMemberByExnessVariables`:
const getMemberByExnessVars: GetMemberByExnessVariables = {
  clientAccount: ..., 
};

// Call the `getMemberByExness()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMemberByExness(getMemberByExnessVars);
// Variables can be defined inline as well.
const { data } = await getMemberByExness({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMemberByExness(dataConnect, getMemberByExnessVars);

console.log(data.members);

// Or, you can use the `Promise` API.
getMemberByExness(getMemberByExnessVars).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

### Using `GetMemberByExness`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMemberByExnessRef, GetMemberByExnessVariables } from '@dataconnect/generated';

// The `GetMemberByExness` query requires an argument of type `GetMemberByExnessVariables`:
const getMemberByExnessVars: GetMemberByExnessVariables = {
  clientAccount: ..., 
};

// Call the `getMemberByExnessRef()` function to get a reference to the query.
const ref = getMemberByExnessRef(getMemberByExnessVars);
// Variables can be defined inline as well.
const ref = getMemberByExnessRef({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMemberByExnessRef(dataConnect, getMemberByExnessVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.members);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.members);
});
```

## getBanExness
You can execute the `getBanExness` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getBanExness(vars: GetBanExnessVariables): QueryPromise<GetBanExnessData, GetBanExnessVariables>;

interface GetBanExnessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBanExnessVariables): QueryRef<GetBanExnessData, GetBanExnessVariables>;
}
export const getBanExnessRef: GetBanExnessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBanExness(dc: DataConnect, vars: GetBanExnessVariables): QueryPromise<GetBanExnessData, GetBanExnessVariables>;

interface GetBanExnessRef {
  ...
  (dc: DataConnect, vars: GetBanExnessVariables): QueryRef<GetBanExnessData, GetBanExnessVariables>;
}
export const getBanExnessRef: GetBanExnessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBanExnessRef:
```typescript
const name = getBanExnessRef.operationName;
console.log(name);
```

### Variables
The `getBanExness` query requires an argument of type `GetBanExnessVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBanExnessVariables {
  clientAccount: string;
}
```
### Return Type
Recall that executing the `getBanExness` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBanExnessData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetBanExnessData {
  banListsExnesses: ({
    clientAccount: string;
  } & BanListsExness_Key)[];
}
```
### Using `getBanExness`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBanExness, GetBanExnessVariables } from '@dataconnect/generated';

// The `getBanExness` query requires an argument of type `GetBanExnessVariables`:
const getBanExnessVars: GetBanExnessVariables = {
  clientAccount: ..., 
};

// Call the `getBanExness()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBanExness(getBanExnessVars);
// Variables can be defined inline as well.
const { data } = await getBanExness({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBanExness(dataConnect, getBanExnessVars);

console.log(data.banListsExnesses);

// Or, you can use the `Promise` API.
getBanExness(getBanExnessVars).then((response) => {
  const data = response.data;
  console.log(data.banListsExnesses);
});
```

### Using `getBanExness`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBanExnessRef, GetBanExnessVariables } from '@dataconnect/generated';

// The `getBanExness` query requires an argument of type `GetBanExnessVariables`:
const getBanExnessVars: GetBanExnessVariables = {
  clientAccount: ..., 
};

// Call the `getBanExnessRef()` function to get a reference to the query.
const ref = getBanExnessRef(getBanExnessVars);
// Variables can be defined inline as well.
const ref = getBanExnessRef({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBanExnessRef(dataConnect, getBanExnessVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.banListsExnesses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.banListsExnesses);
});
```

## getConfig
You can execute the `getConfig` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getConfig(vars: GetConfigVariables): QueryPromise<GetConfigData, GetConfigVariables>;

interface GetConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConfigVariables): QueryRef<GetConfigData, GetConfigVariables>;
}
export const getConfigRef: GetConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConfig(dc: DataConnect, vars: GetConfigVariables): QueryPromise<GetConfigData, GetConfigVariables>;

interface GetConfigRef {
  ...
  (dc: DataConnect, vars: GetConfigVariables): QueryRef<GetConfigData, GetConfigVariables>;
}
export const getConfigRef: GetConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConfigRef:
```typescript
const name = getConfigRef.operationName;
console.log(name);
```

### Variables
The `getConfig` query requires an argument of type `GetConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConfigVariables {
  key: string;
}
```
### Return Type
Recall that executing the `getConfig` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConfigData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetConfigData {
  configs: ({
    key: string;
    value: string;
    createdOn?: TimestampString | null;
    updatedAt?: TimestampString | null;
  } & Config_Key)[];
}
```
### Using `getConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConfig, GetConfigVariables } from '@dataconnect/generated';

// The `getConfig` query requires an argument of type `GetConfigVariables`:
const getConfigVars: GetConfigVariables = {
  key: ..., 
};

// Call the `getConfig()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConfig(getConfigVars);
// Variables can be defined inline as well.
const { data } = await getConfig({ key: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConfig(dataConnect, getConfigVars);

console.log(data.configs);

// Or, you can use the `Promise` API.
getConfig(getConfigVars).then((response) => {
  const data = response.data;
  console.log(data.configs);
});
```

### Using `getConfig`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConfigRef, GetConfigVariables } from '@dataconnect/generated';

// The `getConfig` query requires an argument of type `GetConfigVariables`:
const getConfigVars: GetConfigVariables = {
  key: ..., 
};

// Call the `getConfigRef()` function to get a reference to the query.
const ref = getConfigRef(getConfigVars);
// Variables can be defined inline as well.
const ref = getConfigRef({ key: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConfigRef(dataConnect, getConfigVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.configs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.configs);
});
```

## getExnessAccount
You can execute the `getExnessAccount` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExnessAccount(vars?: GetExnessAccountVariables): QueryPromise<GetExnessAccountData, GetExnessAccountVariables>;

interface GetExnessAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetExnessAccountVariables): QueryRef<GetExnessAccountData, GetExnessAccountVariables>;
}
export const getExnessAccountRef: GetExnessAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExnessAccount(dc: DataConnect, vars?: GetExnessAccountVariables): QueryPromise<GetExnessAccountData, GetExnessAccountVariables>;

interface GetExnessAccountRef {
  ...
  (dc: DataConnect, vars?: GetExnessAccountVariables): QueryRef<GetExnessAccountData, GetExnessAccountVariables>;
}
export const getExnessAccountRef: GetExnessAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExnessAccountRef:
```typescript
const name = getExnessAccountRef.operationName;
console.log(name);
```

### Variables
The `getExnessAccount` query has an optional argument of type `GetExnessAccountVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExnessAccountVariables {
  clientAccount?: string | null;
  memberUid?: string | null;
}
```
### Return Type
Recall that executing the `getExnessAccount` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExnessAccountData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `getExnessAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExnessAccount, GetExnessAccountVariables } from '@dataconnect/generated';

// The `getExnessAccount` query has an optional argument of type `GetExnessAccountVariables`:
const getExnessAccountVars: GetExnessAccountVariables = {
  clientAccount: ..., // optional
  memberUid: ..., // optional
};

// Call the `getExnessAccount()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExnessAccount(getExnessAccountVars);
// Variables can be defined inline as well.
const { data } = await getExnessAccount({ clientAccount: ..., memberUid: ..., });
// Since all variables are optional for this query, you can omit the `GetExnessAccountVariables` argument.
const { data } = await getExnessAccount();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExnessAccount(dataConnect, getExnessAccountVars);

console.log(data.exnesses);

// Or, you can use the `Promise` API.
getExnessAccount(getExnessAccountVars).then((response) => {
  const data = response.data;
  console.log(data.exnesses);
});
```

### Using `getExnessAccount`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExnessAccountRef, GetExnessAccountVariables } from '@dataconnect/generated';

// The `getExnessAccount` query has an optional argument of type `GetExnessAccountVariables`:
const getExnessAccountVars: GetExnessAccountVariables = {
  clientAccount: ..., // optional
  memberUid: ..., // optional
};

// Call the `getExnessAccountRef()` function to get a reference to the query.
const ref = getExnessAccountRef(getExnessAccountVars);
// Variables can be defined inline as well.
const ref = getExnessAccountRef({ clientAccount: ..., memberUid: ..., });
// Since all variables are optional for this query, you can omit the `GetExnessAccountVariables` argument.
const ref = getExnessAccountRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExnessAccountRef(dataConnect, getExnessAccountVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exnesses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exnesses);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateMember
You can execute the `CreateMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMember(vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface CreateMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
}
export const createMemberRef: CreateMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMember(dc: DataConnect, vars: CreateMemberVariables): MutationPromise<CreateMemberData, CreateMemberVariables>;

interface CreateMemberRef {
  ...
  (dc: DataConnect, vars: CreateMemberVariables): MutationRef<CreateMemberData, CreateMemberVariables>;
}
export const createMemberRef: CreateMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMemberRef:
```typescript
const name = createMemberRef.operationName;
console.log(name);
```

### Variables
The `CreateMember` mutation requires an argument of type `CreateMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMemberVariables {
  uid: string;
  phone?: string | null;
  avatar?: string | null;
  firstName?: string | null;
}
```
### Return Type
Recall that executing the `CreateMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMemberData {
  member_insert: Member_Key;
}
```
### Using `CreateMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMember, CreateMemberVariables } from '@dataconnect/generated';

// The `CreateMember` mutation requires an argument of type `CreateMemberVariables`:
const createMemberVars: CreateMemberVariables = {
  uid: ..., 
  phone: ..., // optional
  avatar: ..., // optional
  firstName: ..., // optional
};

// Call the `createMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMember(createMemberVars);
// Variables can be defined inline as well.
const { data } = await createMember({ uid: ..., phone: ..., avatar: ..., firstName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMember(dataConnect, createMemberVars);

console.log(data.member_insert);

// Or, you can use the `Promise` API.
createMember(createMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_insert);
});
```

### Using `CreateMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMemberRef, CreateMemberVariables } from '@dataconnect/generated';

// The `CreateMember` mutation requires an argument of type `CreateMemberVariables`:
const createMemberVars: CreateMemberVariables = {
  uid: ..., 
  phone: ..., // optional
  avatar: ..., // optional
  firstName: ..., // optional
};

// Call the `createMemberRef()` function to get a reference to the mutation.
const ref = createMemberRef(createMemberVars);
// Variables can be defined inline as well.
const ref = createMemberRef({ uid: ..., phone: ..., avatar: ..., firstName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMemberRef(dataConnect, createMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_insert);
});
```

## UpdateMember
You can execute the `UpdateMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMember(vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface UpdateMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
}
export const updateMemberRef: UpdateMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMember(dc: DataConnect, vars: UpdateMemberVariables): MutationPromise<UpdateMemberData, UpdateMemberVariables>;

interface UpdateMemberRef {
  ...
  (dc: DataConnect, vars: UpdateMemberVariables): MutationRef<UpdateMemberData, UpdateMemberVariables>;
}
export const updateMemberRef: UpdateMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMemberRef:
```typescript
const name = updateMemberRef.operationName;
console.log(name);
```

### Variables
The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMemberData {
  member_update?: Member_Key | null;
}
```
### Using `UpdateMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMember, UpdateMemberVariables } from '@dataconnect/generated';

// The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`:
const updateMemberVars: UpdateMemberVariables = {
  uid: ..., 
  phone: ..., // optional
  avatar: ..., // optional
  firstName: ..., // optional
  lastName: ..., // optional
  email: ..., // optional
  birthday: ..., // optional
  countryCode: ..., // optional
  provinceId: ..., // optional
  levelScore: ..., // optional
  active: ..., // optional
  exness: ..., // optional
};

// Call the `updateMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMember(updateMemberVars);
// Variables can be defined inline as well.
const { data } = await updateMember({ uid: ..., phone: ..., avatar: ..., firstName: ..., lastName: ..., email: ..., birthday: ..., countryCode: ..., provinceId: ..., levelScore: ..., active: ..., exness: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMember(dataConnect, updateMemberVars);

console.log(data.member_update);

// Or, you can use the `Promise` API.
updateMember(updateMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_update);
});
```

### Using `UpdateMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMemberRef, UpdateMemberVariables } from '@dataconnect/generated';

// The `UpdateMember` mutation requires an argument of type `UpdateMemberVariables`:
const updateMemberVars: UpdateMemberVariables = {
  uid: ..., 
  phone: ..., // optional
  avatar: ..., // optional
  firstName: ..., // optional
  lastName: ..., // optional
  email: ..., // optional
  birthday: ..., // optional
  countryCode: ..., // optional
  provinceId: ..., // optional
  levelScore: ..., // optional
  active: ..., // optional
  exness: ..., // optional
};

// Call the `updateMemberRef()` function to get a reference to the mutation.
const ref = updateMemberRef(updateMemberVars);
// Variables can be defined inline as well.
const ref = updateMemberRef({ uid: ..., phone: ..., avatar: ..., firstName: ..., lastName: ..., email: ..., birthday: ..., countryCode: ..., provinceId: ..., levelScore: ..., active: ..., exness: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMemberRef(dataConnect, updateMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_update);
});
```

## DeleteMember
You can execute the `DeleteMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMember(vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface DeleteMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
}
export const deleteMemberRef: DeleteMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMember(dc: DataConnect, vars: DeleteMemberVariables): MutationPromise<DeleteMemberData, DeleteMemberVariables>;

interface DeleteMemberRef {
  ...
  (dc: DataConnect, vars: DeleteMemberVariables): MutationRef<DeleteMemberData, DeleteMemberVariables>;
}
export const deleteMemberRef: DeleteMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMemberRef:
```typescript
const name = deleteMemberRef.operationName;
console.log(name);
```

### Variables
The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMemberVariables {
  uid: string;
}
```
### Return Type
Recall that executing the `DeleteMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMemberData {
  member_deleteMany: number;
}
```
### Using `DeleteMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMember, DeleteMemberVariables } from '@dataconnect/generated';

// The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`:
const deleteMemberVars: DeleteMemberVariables = {
  uid: ..., 
};

// Call the `deleteMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMember(deleteMemberVars);
// Variables can be defined inline as well.
const { data } = await deleteMember({ uid: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMember(dataConnect, deleteMemberVars);

console.log(data.member_deleteMany);

// Or, you can use the `Promise` API.
deleteMember(deleteMemberVars).then((response) => {
  const data = response.data;
  console.log(data.member_deleteMany);
});
```

### Using `DeleteMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMemberRef, DeleteMemberVariables } from '@dataconnect/generated';

// The `DeleteMember` mutation requires an argument of type `DeleteMemberVariables`:
const deleteMemberVars: DeleteMemberVariables = {
  uid: ..., 
};

// Call the `deleteMemberRef()` function to get a reference to the mutation.
const ref = deleteMemberRef(deleteMemberVars);
// Variables can be defined inline as well.
const ref = deleteMemberRef({ uid: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMemberRef(dataConnect, deleteMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_deleteMany);
});
```

## AddToExnessBanList
You can execute the `AddToExnessBanList` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addToExnessBanList(vars: AddToExnessBanListVariables): MutationPromise<AddToExnessBanListData, AddToExnessBanListVariables>;

interface AddToExnessBanListRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddToExnessBanListVariables): MutationRef<AddToExnessBanListData, AddToExnessBanListVariables>;
}
export const addToExnessBanListRef: AddToExnessBanListRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addToExnessBanList(dc: DataConnect, vars: AddToExnessBanListVariables): MutationPromise<AddToExnessBanListData, AddToExnessBanListVariables>;

interface AddToExnessBanListRef {
  ...
  (dc: DataConnect, vars: AddToExnessBanListVariables): MutationRef<AddToExnessBanListData, AddToExnessBanListVariables>;
}
export const addToExnessBanListRef: AddToExnessBanListRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addToExnessBanListRef:
```typescript
const name = addToExnessBanListRef.operationName;
console.log(name);
```

### Variables
The `AddToExnessBanList` mutation requires an argument of type `AddToExnessBanListVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddToExnessBanListVariables {
  clientAccount: string;
}
```
### Return Type
Recall that executing the `AddToExnessBanList` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddToExnessBanListData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddToExnessBanListData {
  banListsExness_insert: BanListsExness_Key;
}
```
### Using `AddToExnessBanList`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addToExnessBanList, AddToExnessBanListVariables } from '@dataconnect/generated';

// The `AddToExnessBanList` mutation requires an argument of type `AddToExnessBanListVariables`:
const addToExnessBanListVars: AddToExnessBanListVariables = {
  clientAccount: ..., 
};

// Call the `addToExnessBanList()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addToExnessBanList(addToExnessBanListVars);
// Variables can be defined inline as well.
const { data } = await addToExnessBanList({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addToExnessBanList(dataConnect, addToExnessBanListVars);

console.log(data.banListsExness_insert);

// Or, you can use the `Promise` API.
addToExnessBanList(addToExnessBanListVars).then((response) => {
  const data = response.data;
  console.log(data.banListsExness_insert);
});
```

### Using `AddToExnessBanList`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addToExnessBanListRef, AddToExnessBanListVariables } from '@dataconnect/generated';

// The `AddToExnessBanList` mutation requires an argument of type `AddToExnessBanListVariables`:
const addToExnessBanListVars: AddToExnessBanListVariables = {
  clientAccount: ..., 
};

// Call the `addToExnessBanListRef()` function to get a reference to the mutation.
const ref = addToExnessBanListRef(addToExnessBanListVars);
// Variables can be defined inline as well.
const ref = addToExnessBanListRef({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addToExnessBanListRef(dataConnect, addToExnessBanListVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.banListsExness_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.banListsExness_insert);
});
```

## createConfig
You can execute the `createConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createConfig(vars: CreateConfigVariables): MutationPromise<CreateConfigData, CreateConfigVariables>;

interface CreateConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConfigVariables): MutationRef<CreateConfigData, CreateConfigVariables>;
}
export const createConfigRef: CreateConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConfig(dc: DataConnect, vars: CreateConfigVariables): MutationPromise<CreateConfigData, CreateConfigVariables>;

interface CreateConfigRef {
  ...
  (dc: DataConnect, vars: CreateConfigVariables): MutationRef<CreateConfigData, CreateConfigVariables>;
}
export const createConfigRef: CreateConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConfigRef:
```typescript
const name = createConfigRef.operationName;
console.log(name);
```

### Variables
The `createConfig` mutation requires an argument of type `CreateConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateConfigVariables {
  key: string;
  value: string;
}
```
### Return Type
Recall that executing the `createConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConfigData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConfigData {
  config_insert: Config_Key;
}
```
### Using `createConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConfig, CreateConfigVariables } from '@dataconnect/generated';

// The `createConfig` mutation requires an argument of type `CreateConfigVariables`:
const createConfigVars: CreateConfigVariables = {
  key: ..., 
  value: ..., 
};

// Call the `createConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConfig(createConfigVars);
// Variables can be defined inline as well.
const { data } = await createConfig({ key: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConfig(dataConnect, createConfigVars);

console.log(data.config_insert);

// Or, you can use the `Promise` API.
createConfig(createConfigVars).then((response) => {
  const data = response.data;
  console.log(data.config_insert);
});
```

### Using `createConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConfigRef, CreateConfigVariables } from '@dataconnect/generated';

// The `createConfig` mutation requires an argument of type `CreateConfigVariables`:
const createConfigVars: CreateConfigVariables = {
  key: ..., 
  value: ..., 
};

// Call the `createConfigRef()` function to get a reference to the mutation.
const ref = createConfigRef(createConfigVars);
// Variables can be defined inline as well.
const ref = createConfigRef({ key: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConfigRef(dataConnect, createConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.config_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.config_insert);
});
```

## updateConfig
You can execute the `updateConfig` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateConfig(vars: UpdateConfigVariables): MutationPromise<UpdateConfigData, UpdateConfigVariables>;

interface UpdateConfigRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConfigVariables): MutationRef<UpdateConfigData, UpdateConfigVariables>;
}
export const updateConfigRef: UpdateConfigRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateConfig(dc: DataConnect, vars: UpdateConfigVariables): MutationPromise<UpdateConfigData, UpdateConfigVariables>;

interface UpdateConfigRef {
  ...
  (dc: DataConnect, vars: UpdateConfigVariables): MutationRef<UpdateConfigData, UpdateConfigVariables>;
}
export const updateConfigRef: UpdateConfigRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateConfigRef:
```typescript
const name = updateConfigRef.operationName;
console.log(name);
```

### Variables
The `updateConfig` mutation requires an argument of type `UpdateConfigVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateConfigVariables {
  key: string;
  value: string;
}
```
### Return Type
Recall that executing the `updateConfig` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateConfigData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateConfigData {
  config_update?: Config_Key | null;
}
```
### Using `updateConfig`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateConfig, UpdateConfigVariables } from '@dataconnect/generated';

// The `updateConfig` mutation requires an argument of type `UpdateConfigVariables`:
const updateConfigVars: UpdateConfigVariables = {
  key: ..., 
  value: ..., 
};

// Call the `updateConfig()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateConfig(updateConfigVars);
// Variables can be defined inline as well.
const { data } = await updateConfig({ key: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateConfig(dataConnect, updateConfigVars);

console.log(data.config_update);

// Or, you can use the `Promise` API.
updateConfig(updateConfigVars).then((response) => {
  const data = response.data;
  console.log(data.config_update);
});
```

### Using `updateConfig`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateConfigRef, UpdateConfigVariables } from '@dataconnect/generated';

// The `updateConfig` mutation requires an argument of type `UpdateConfigVariables`:
const updateConfigVars: UpdateConfigVariables = {
  key: ..., 
  value: ..., 
};

// Call the `updateConfigRef()` function to get a reference to the mutation.
const ref = updateConfigRef(updateConfigVars);
// Variables can be defined inline as well.
const ref = updateConfigRef({ key: ..., value: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateConfigRef(dataConnect, updateConfigVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.config_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.config_update);
});
```

## createExnessAccount
You can execute the `createExnessAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createExnessAccount(vars: CreateExnessAccountVariables): MutationPromise<CreateExnessAccountData, CreateExnessAccountVariables>;

interface CreateExnessAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExnessAccountVariables): MutationRef<CreateExnessAccountData, CreateExnessAccountVariables>;
}
export const createExnessAccountRef: CreateExnessAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createExnessAccount(dc: DataConnect, vars: CreateExnessAccountVariables): MutationPromise<CreateExnessAccountData, CreateExnessAccountVariables>;

interface CreateExnessAccountRef {
  ...
  (dc: DataConnect, vars: CreateExnessAccountVariables): MutationRef<CreateExnessAccountData, CreateExnessAccountVariables>;
}
export const createExnessAccountRef: CreateExnessAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createExnessAccountRef:
```typescript
const name = createExnessAccountRef.operationName;
console.log(name);
```

### Variables
The `createExnessAccount` mutation requires an argument of type `CreateExnessAccountVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `createExnessAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateExnessAccountData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateExnessAccountData {
  exness_insert: Exness_Key;
}
```
### Using `createExnessAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createExnessAccount, CreateExnessAccountVariables } from '@dataconnect/generated';

// The `createExnessAccount` mutation requires an argument of type `CreateExnessAccountVariables`:
const createExnessAccountVars: CreateExnessAccountVariables = {
  memberUid: ..., // optional
  clientAccount: ..., 
  clientAccountType: ..., // optional
  clientUid: ..., // optional
  country: ..., // optional
  currency: ..., // optional
  fromExnessId: ..., // optional
  partnerAccount: ..., // optional
  partnerAccountName: ..., // optional
  regDate: ..., // optional
  reward: ..., // optional
  rewardUsd: ..., // optional
  comment: ..., // optional
  volumeLots: ..., // optional
  volumeMlnUsd: ..., // optional
};

// Call the `createExnessAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createExnessAccount(createExnessAccountVars);
// Variables can be defined inline as well.
const { data } = await createExnessAccount({ memberUid: ..., clientAccount: ..., clientAccountType: ..., clientUid: ..., country: ..., currency: ..., fromExnessId: ..., partnerAccount: ..., partnerAccountName: ..., regDate: ..., reward: ..., rewardUsd: ..., comment: ..., volumeLots: ..., volumeMlnUsd: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createExnessAccount(dataConnect, createExnessAccountVars);

console.log(data.exness_insert);

// Or, you can use the `Promise` API.
createExnessAccount(createExnessAccountVars).then((response) => {
  const data = response.data;
  console.log(data.exness_insert);
});
```

### Using `createExnessAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createExnessAccountRef, CreateExnessAccountVariables } from '@dataconnect/generated';

// The `createExnessAccount` mutation requires an argument of type `CreateExnessAccountVariables`:
const createExnessAccountVars: CreateExnessAccountVariables = {
  memberUid: ..., // optional
  clientAccount: ..., 
  clientAccountType: ..., // optional
  clientUid: ..., // optional
  country: ..., // optional
  currency: ..., // optional
  fromExnessId: ..., // optional
  partnerAccount: ..., // optional
  partnerAccountName: ..., // optional
  regDate: ..., // optional
  reward: ..., // optional
  rewardUsd: ..., // optional
  comment: ..., // optional
  volumeLots: ..., // optional
  volumeMlnUsd: ..., // optional
};

// Call the `createExnessAccountRef()` function to get a reference to the mutation.
const ref = createExnessAccountRef(createExnessAccountVars);
// Variables can be defined inline as well.
const ref = createExnessAccountRef({ memberUid: ..., clientAccount: ..., clientAccountType: ..., clientUid: ..., country: ..., currency: ..., fromExnessId: ..., partnerAccount: ..., partnerAccountName: ..., regDate: ..., reward: ..., rewardUsd: ..., comment: ..., volumeLots: ..., volumeMlnUsd: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createExnessAccountRef(dataConnect, createExnessAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exness_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exness_insert);
});
```

## updateExnessAccount
You can execute the `updateExnessAccount` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateExnessAccount(vars: UpdateExnessAccountVariables): MutationPromise<UpdateExnessAccountData, UpdateExnessAccountVariables>;

interface UpdateExnessAccountRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExnessAccountVariables): MutationRef<UpdateExnessAccountData, UpdateExnessAccountVariables>;
}
export const updateExnessAccountRef: UpdateExnessAccountRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateExnessAccount(dc: DataConnect, vars: UpdateExnessAccountVariables): MutationPromise<UpdateExnessAccountData, UpdateExnessAccountVariables>;

interface UpdateExnessAccountRef {
  ...
  (dc: DataConnect, vars: UpdateExnessAccountVariables): MutationRef<UpdateExnessAccountData, UpdateExnessAccountVariables>;
}
export const updateExnessAccountRef: UpdateExnessAccountRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateExnessAccountRef:
```typescript
const name = updateExnessAccountRef.operationName;
console.log(name);
```

### Variables
The `updateExnessAccount` mutation requires an argument of type `UpdateExnessAccountVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `updateExnessAccount` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateExnessAccountData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateExnessAccountData {
  exness_update?: Exness_Key | null;
}
```
### Using `updateExnessAccount`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateExnessAccount, UpdateExnessAccountVariables } from '@dataconnect/generated';

// The `updateExnessAccount` mutation requires an argument of type `UpdateExnessAccountVariables`:
const updateExnessAccountVars: UpdateExnessAccountVariables = {
  memberUid: ..., // optional
  clientAccount: ..., 
  clientAccountType: ..., // optional
  clientUid: ..., // optional
  country: ..., // optional
  currency: ..., // optional
  fromExnessId: ..., // optional
  partnerAccount: ..., // optional
  partnerAccountName: ..., // optional
  regDate: ..., // optional
  reward: ..., // optional
  rewardUsd: ..., // optional
  comment: ..., // optional
  volumeLots: ..., // optional
  volumeMlnUsd: ..., // optional
  linked: ..., // optional
};

// Call the `updateExnessAccount()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateExnessAccount(updateExnessAccountVars);
// Variables can be defined inline as well.
const { data } = await updateExnessAccount({ memberUid: ..., clientAccount: ..., clientAccountType: ..., clientUid: ..., country: ..., currency: ..., fromExnessId: ..., partnerAccount: ..., partnerAccountName: ..., regDate: ..., reward: ..., rewardUsd: ..., comment: ..., volumeLots: ..., volumeMlnUsd: ..., linked: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateExnessAccount(dataConnect, updateExnessAccountVars);

console.log(data.exness_update);

// Or, you can use the `Promise` API.
updateExnessAccount(updateExnessAccountVars).then((response) => {
  const data = response.data;
  console.log(data.exness_update);
});
```

### Using `updateExnessAccount`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateExnessAccountRef, UpdateExnessAccountVariables } from '@dataconnect/generated';

// The `updateExnessAccount` mutation requires an argument of type `UpdateExnessAccountVariables`:
const updateExnessAccountVars: UpdateExnessAccountVariables = {
  memberUid: ..., // optional
  clientAccount: ..., 
  clientAccountType: ..., // optional
  clientUid: ..., // optional
  country: ..., // optional
  currency: ..., // optional
  fromExnessId: ..., // optional
  partnerAccount: ..., // optional
  partnerAccountName: ..., // optional
  regDate: ..., // optional
  reward: ..., // optional
  rewardUsd: ..., // optional
  comment: ..., // optional
  volumeLots: ..., // optional
  volumeMlnUsd: ..., // optional
  linked: ..., // optional
};

// Call the `updateExnessAccountRef()` function to get a reference to the mutation.
const ref = updateExnessAccountRef(updateExnessAccountVars);
// Variables can be defined inline as well.
const ref = updateExnessAccountRef({ memberUid: ..., clientAccount: ..., clientAccountType: ..., clientUid: ..., country: ..., currency: ..., fromExnessId: ..., partnerAccount: ..., partnerAccountName: ..., regDate: ..., reward: ..., rewardUsd: ..., comment: ..., volumeLots: ..., volumeMlnUsd: ..., linked: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateExnessAccountRef(dataConnect, updateExnessAccountVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exness_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exness_update);
});
```

## deleteExness
You can execute the `deleteExness` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteExness(vars: DeleteExnessVariables): MutationPromise<DeleteExnessData, DeleteExnessVariables>;

interface DeleteExnessRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExnessVariables): MutationRef<DeleteExnessData, DeleteExnessVariables>;
}
export const deleteExnessRef: DeleteExnessRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteExness(dc: DataConnect, vars: DeleteExnessVariables): MutationPromise<DeleteExnessData, DeleteExnessVariables>;

interface DeleteExnessRef {
  ...
  (dc: DataConnect, vars: DeleteExnessVariables): MutationRef<DeleteExnessData, DeleteExnessVariables>;
}
export const deleteExnessRef: DeleteExnessRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteExnessRef:
```typescript
const name = deleteExnessRef.operationName;
console.log(name);
```

### Variables
The `deleteExness` mutation requires an argument of type `DeleteExnessVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteExnessVariables {
  clientAccount: string;
}
```
### Return Type
Recall that executing the `deleteExness` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteExnessData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteExnessData {
  member_update?: Member_Key | null;
  exness_delete?: Exness_Key | null;
}
```
### Using `deleteExness`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteExness, DeleteExnessVariables } from '@dataconnect/generated';

// The `deleteExness` mutation requires an argument of type `DeleteExnessVariables`:
const deleteExnessVars: DeleteExnessVariables = {
  clientAccount: ..., 
};

// Call the `deleteExness()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteExness(deleteExnessVars);
// Variables can be defined inline as well.
const { data } = await deleteExness({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteExness(dataConnect, deleteExnessVars);

console.log(data.member_update);
console.log(data.exness_delete);

// Or, you can use the `Promise` API.
deleteExness(deleteExnessVars).then((response) => {
  const data = response.data;
  console.log(data.member_update);
  console.log(data.exness_delete);
});
```

### Using `deleteExness`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteExnessRef, DeleteExnessVariables } from '@dataconnect/generated';

// The `deleteExness` mutation requires an argument of type `DeleteExnessVariables`:
const deleteExnessVars: DeleteExnessVariables = {
  clientAccount: ..., 
};

// Call the `deleteExnessRef()` function to get a reference to the mutation.
const ref = deleteExnessRef(deleteExnessVars);
// Variables can be defined inline as well.
const ref = deleteExnessRef({ clientAccount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteExnessRef(dataConnect, deleteExnessVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.member_update);
console.log(data.exness_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.member_update);
  console.log(data.exness_delete);
});
```

