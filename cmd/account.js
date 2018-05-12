import to from 'await-to-js';
const config = require('config');
const dposWrapper = require('dpos-api-wrapper');
dposWrapper.dposAPI.nodeAddress = config.get("liskNode");
const liskoshi = 100000000;

const getBalance = async function(address) {
  const [resError, resCall] = await to(dposWrapper.dposAPI.accounts.getAccount(address));

  if(resError)
    return "?API Error";

  if(resCall && !resCall.success)
    return "?Account not found.";

  return resCall.account.balance / liskoshi;
};

const getAccountInfo = async function(address) {
  const [resError, resCall] = await to(dposWrapper.dposAPI.accounts.getAccount(address));

  if(resError)
    return "?API Error";

  if(resCall && !resCall.success)
    return "?Account not found.";

  return "PublicKey: " + (resCall.account.publicKey ? resCall.account.publicKey : "Not Initialized") + "<br />" +
    "Balance: " + resCall.account.balance / liskoshi + "<br />" +
    "Has Second Signature? " + (resCall.account.secondSignature ? "Yes" : "No");
};

module.exports = { getBalance, getAccountInfo };