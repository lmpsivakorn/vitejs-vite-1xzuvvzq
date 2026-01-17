# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createMember, updateMember, deleteMember, addToExnessBanList, createConfig, updateConfig, createExnessAccount, updateExnessAccount, deleteExness, listMembers } from '@dataconnect/generated';


// Operation CreateMember:  For variables, look at type CreateMemberVars in ../index.d.ts
const { data } = await CreateMember(dataConnect, createMemberVars);

// Operation UpdateMember:  For variables, look at type UpdateMemberVars in ../index.d.ts
const { data } = await UpdateMember(dataConnect, updateMemberVars);

// Operation DeleteMember:  For variables, look at type DeleteMemberVars in ../index.d.ts
const { data } = await DeleteMember(dataConnect, deleteMemberVars);

// Operation AddToExnessBanList:  For variables, look at type AddToExnessBanListVars in ../index.d.ts
const { data } = await AddToExnessBanList(dataConnect, addToExnessBanListVars);

// Operation createConfig:  For variables, look at type CreateConfigVars in ../index.d.ts
const { data } = await CreateConfig(dataConnect, createConfigVars);

// Operation updateConfig:  For variables, look at type UpdateConfigVars in ../index.d.ts
const { data } = await UpdateConfig(dataConnect, updateConfigVars);

// Operation createExnessAccount:  For variables, look at type CreateExnessAccountVars in ../index.d.ts
const { data } = await CreateExnessAccount(dataConnect, createExnessAccountVars);

// Operation updateExnessAccount:  For variables, look at type UpdateExnessAccountVars in ../index.d.ts
const { data } = await UpdateExnessAccount(dataConnect, updateExnessAccountVars);

// Operation deleteExness:  For variables, look at type DeleteExnessVars in ../index.d.ts
const { data } = await DeleteExness(dataConnect, deleteExnessVars);

// Operation ListMembers:  For variables, look at type ListMembersVars in ../index.d.ts
const { data } = await ListMembers(dataConnect, listMembersVars);


```