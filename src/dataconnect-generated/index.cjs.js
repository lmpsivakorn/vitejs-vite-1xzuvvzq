const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'tkt-project-602fe-service',
  location: 'asia-southeast1'
};
exports.connectorConfig = connectorConfig;

const createMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateMember', inputVars);
}
createMemberRef.operationName = 'CreateMember';
exports.createMemberRef = createMemberRef;

exports.createMember = function createMember(dcOrVars, vars) {
  return executeMutation(createMemberRef(dcOrVars, vars));
};

const updateMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMember', inputVars);
}
updateMemberRef.operationName = 'UpdateMember';
exports.updateMemberRef = updateMemberRef;

exports.updateMember = function updateMember(dcOrVars, vars) {
  return executeMutation(updateMemberRef(dcOrVars, vars));
};

const deleteMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteMember', inputVars);
}
deleteMemberRef.operationName = 'DeleteMember';
exports.deleteMemberRef = deleteMemberRef;

exports.deleteMember = function deleteMember(dcOrVars, vars) {
  return executeMutation(deleteMemberRef(dcOrVars, vars));
};

const addToExnessBanListRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddToExnessBanList', inputVars);
}
addToExnessBanListRef.operationName = 'AddToExnessBanList';
exports.addToExnessBanListRef = addToExnessBanListRef;

exports.addToExnessBanList = function addToExnessBanList(dcOrVars, vars) {
  return executeMutation(addToExnessBanListRef(dcOrVars, vars));
};

const createConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createConfig', inputVars);
}
createConfigRef.operationName = 'createConfig';
exports.createConfigRef = createConfigRef;

exports.createConfig = function createConfig(dcOrVars, vars) {
  return executeMutation(createConfigRef(dcOrVars, vars));
};

const updateConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateConfig', inputVars);
}
updateConfigRef.operationName = 'updateConfig';
exports.updateConfigRef = updateConfigRef;

exports.updateConfig = function updateConfig(dcOrVars, vars) {
  return executeMutation(updateConfigRef(dcOrVars, vars));
};

const createExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'createExnessAccount', inputVars);
}
createExnessAccountRef.operationName = 'createExnessAccount';
exports.createExnessAccountRef = createExnessAccountRef;

exports.createExnessAccount = function createExnessAccount(dcOrVars, vars) {
  return executeMutation(createExnessAccountRef(dcOrVars, vars));
};

const updateExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'updateExnessAccount', inputVars);
}
updateExnessAccountRef.operationName = 'updateExnessAccount';
exports.updateExnessAccountRef = updateExnessAccountRef;

exports.updateExnessAccount = function updateExnessAccount(dcOrVars, vars) {
  return executeMutation(updateExnessAccountRef(dcOrVars, vars));
};

const deleteExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'deleteExness', inputVars);
}
deleteExnessRef.operationName = 'deleteExness';
exports.deleteExnessRef = deleteExnessRef;

exports.deleteExness = function deleteExness(dcOrVars, vars) {
  return executeMutation(deleteExnessRef(dcOrVars, vars));
};

const listMembersRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMembers', inputVars);
}
listMembersRef.operationName = 'ListMembers';
exports.listMembersRef = listMembersRef;

exports.listMembers = function listMembers(dcOrVars, vars) {
  return executeQuery(listMembersRef(dcOrVars, vars));
};

const getMemberRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMember', inputVars);
}
getMemberRef.operationName = 'GetMember';
exports.getMemberRef = getMemberRef;

exports.getMember = function getMember(dcOrVars, vars) {
  return executeQuery(getMemberRef(dcOrVars, vars));
};

const getMemberByExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMemberByExness', inputVars);
}
getMemberByExnessRef.operationName = 'GetMemberByExness';
exports.getMemberByExnessRef = getMemberByExnessRef;

exports.getMemberByExness = function getMemberByExness(dcOrVars, vars) {
  return executeQuery(getMemberByExnessRef(dcOrVars, vars));
};

const getBanExnessRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getBanExness', inputVars);
}
getBanExnessRef.operationName = 'getBanExness';
exports.getBanExnessRef = getBanExnessRef;

exports.getBanExness = function getBanExness(dcOrVars, vars) {
  return executeQuery(getBanExnessRef(dcOrVars, vars));
};

const getConfigRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getConfig', inputVars);
}
getConfigRef.operationName = 'getConfig';
exports.getConfigRef = getConfigRef;

exports.getConfig = function getConfig(dcOrVars, vars) {
  return executeQuery(getConfigRef(dcOrVars, vars));
};

const getExnessAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'getExnessAccount', inputVars);
}
getExnessAccountRef.operationName = 'getExnessAccount';
exports.getExnessAccountRef = getExnessAccountRef;

exports.getExnessAccount = function getExnessAccount(dcOrVars, vars) {
  return executeQuery(getExnessAccountRef(dcOrVars, vars));
};
