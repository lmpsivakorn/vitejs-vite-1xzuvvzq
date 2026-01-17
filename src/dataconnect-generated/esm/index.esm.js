import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'tkt-project-602fe-service',
  location: 'asia-southeast1'
};

export const createMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMember', inputVars);
}
createMemberRef.operationName = 'CreateMember';

export function createMember(dcOrVars, vars) {
  return executeMutation(createMemberRef(dcOrVars, vars));
}

export const updateMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMember', inputVars);
}
updateMemberRef.operationName = 'UpdateMember';

export function updateMember(dcOrVars, vars) {
  return executeMutation(updateMemberRef(dcOrVars, vars));
}

export const deleteMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMember', inputVars);
}
deleteMemberRef.operationName = 'DeleteMember';

export function deleteMember(dcOrVars, vars) {
  return executeMutation(deleteMemberRef(dcOrVars, vars));
}

export const addToExnessBanListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddToExnessBanList', inputVars);
}
addToExnessBanListRef.operationName = 'AddToExnessBanList';

export function addToExnessBanList(dcOrVars, vars) {
  return executeMutation(addToExnessBanListRef(dcOrVars, vars));
}

export const createConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createConfig', inputVars);
}
createConfigRef.operationName = 'createConfig';

export function createConfig(dcOrVars, vars) {
  return executeMutation(createConfigRef(dcOrVars, vars));
}

export const updateConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateConfig', inputVars);
}
updateConfigRef.operationName = 'updateConfig';

export function updateConfig(dcOrVars, vars) {
  return executeMutation(updateConfigRef(dcOrVars, vars));
}

export const createExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createExnessAccount', inputVars);
}
createExnessAccountRef.operationName = 'createExnessAccount';

export function createExnessAccount(dcOrVars, vars) {
  return executeMutation(createExnessAccountRef(dcOrVars, vars));
}

export const updateExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateExnessAccount', inputVars);
}
updateExnessAccountRef.operationName = 'updateExnessAccount';

export function updateExnessAccount(dcOrVars, vars) {
  return executeMutation(updateExnessAccountRef(dcOrVars, vars));
}

export const deleteExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'deleteExness', inputVars);
}
deleteExnessRef.operationName = 'deleteExness';

export function deleteExness(dcOrVars, vars) {
  return executeMutation(deleteExnessRef(dcOrVars, vars));
}

export const listMembersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMembers', inputVars);
}
listMembersRef.operationName = 'ListMembers';

export function listMembers(dcOrVars, vars) {
  return executeQuery(listMembersRef(dcOrVars, vars));
}

export const getMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMember', inputVars);
}
getMemberRef.operationName = 'GetMember';

export function getMember(dcOrVars, vars) {
  return executeQuery(getMemberRef(dcOrVars, vars));
}

export const getMemberByExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMemberByExness', inputVars);
}
getMemberByExnessRef.operationName = 'GetMemberByExness';

export function getMemberByExness(dcOrVars, vars) {
  return executeQuery(getMemberByExnessRef(dcOrVars, vars));
}

export const getBanExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getBanExness', inputVars);
}
getBanExnessRef.operationName = 'getBanExness';

export function getBanExness(dcOrVars, vars) {
  return executeQuery(getBanExnessRef(dcOrVars, vars));
}

export const getConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getConfig', inputVars);
}
getConfigRef.operationName = 'getConfig';

export function getConfig(dcOrVars, vars) {
  return executeQuery(getConfigRef(dcOrVars, vars));
}

export const getExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getExnessAccount', inputVars);
}
getExnessAccountRef.operationName = 'getExnessAccount';

export function getExnessAccount(dcOrVars, vars) {
  return executeQuery(getExnessAccountRef(dcOrVars, vars));
}

