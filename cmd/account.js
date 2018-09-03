import to from 'await-to-js';
const config = require('config');
const lisk = require("lisk-elements");

const devMode = config.get("devMode");
let client = lisk.APIClient.createMainnetAPIClient();
if (devMode) client = lisk.APIClient.createTestnetAPIClient();

const liskoshi = 100000000;

const getBalance = async function(address) {
  const [resError, resCall] = await to(client.accounts.get( { address } ));

  if(resError)
    return "?API Error";

  if(resCall && resCall.data.length === 0)
    return "?Account not found.";

  return resCall.data[0].balance / liskoshi;
};

const getAccountInfo = async function(address) {
  const [resError, resCall] = await to(client.accounts.get( { address } ));

  if(resError)
    return "?API Error";

  if(resCall && resCall.data.length === 0)
    return "?Account not found.";

  return "PublicKey: " + (resCall.data[0].publicKey ? resCall.data[0].publicKey : "Not Initialized") + "<br />" +
    "Balance: " + resCall.data[0].balance / liskoshi + "<br />" +
    "Has Second Signature? " + (resCall.data[0].secondPublicKey ? "Yes" : "No");
};

module.exports = { getBalance, getAccountInfo };