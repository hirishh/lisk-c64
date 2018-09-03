import to from "await-to-js";
const config = require('config');
const _ = require("lodash");
const request = require('request-promise-native');
const lisk = require("lisk-elements");

const devMode = config.get("devMode");
let client = lisk.APIClient.createMainnetAPIClient();
if (devMode) client = lisk.APIClient.createTestnetAPIClient();

const liskoshi = 100000000;

const apiUrl = config.get("liskSupportApi");

function removeSpaces(str) {
  return str.replace(/\s+/g, '_');
}

const getDelegateInfo = async function(username) {

  const [resError, resCall] = await to(client.delegates.get({ username }));

  if(resError)
    return "?API Error";

  if(resCall && resCall.data.length === 0)
    return "?Delegate not found.";

  const [forgError, forgCall] = await to(client.delegates.getForgingStatistics(resCall.data[0].account.address));

  if(forgError || !forgCall)
    return "?API Error";

  return "Address: " + resCall.data[0].account.address + "<br />" +
    "Rank: " + resCall.data[0].rank + "<br />" +
    "VoteWeight: " + resCall.data[0].vote / liskoshi + "<br />" +
    "Approval: " + resCall.data[0].approval + "%<br />" +
    "Productivity: " +  resCall.data[0].productivity + "%<br />" +
    "Produced Blocks: " + resCall.data[0].producedBlocks + "<br />" +
    "Missed BLocks: " + resCall.data[0].missedBlocks + "<br />" +
    "Forged Fees: " + forgCall.data.fees / liskoshi+ "<br />" +
    "Forged Rewards: " + forgCall.data.rewards / liskoshi + "<br />" +
    "Total Forged: " + forgCall.data.forged / liskoshi;
};

const getPools = async function(onlyData) {
  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/delegatepayoutinfo/",
    json: true
  }));

  if(resError)
    return "?API Error.";

  const keyTransformationObj = _.transform(resCall, function(result, value, key) {
    result[removeSpaces(key)] = value;
  }, {});

  if(onlyData)
    return keyTransformationObj;

  return "Active Paying pools are: <br /><br />" + _.keys(keyTransformationObj).join(", ") + "<br /><br />" +
    "Use command PI or POOLINFO &lt;poolname&gt; to get more info."
};

const getPoolsInfo = async function(pool) {
  pool = pool.toLowerCase();
  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/delegatepayoutinfo/",
    json: true
  }));

  if(resError)
    return "?API Error.";

  const keyTransformationObj = _.transform(resCall, function(result, value, key) {
    result[removeSpaces(key)] = value;
  }, {});

  const activePools = _.keys(keyTransformationObj);
  if(_.indexOf(activePools, pool) === -1)
    return "Pool not found.";

  const poolObj = keyTransformationObj[pool];

  return 'Pool Link: <a href="' + poolObj.poolLink + '" target="_blank">Click Here</a><br />' +
    'Min Payout: ' + poolObj.minimumPayout + ' Lisk<br />' +
    'Shares: ' + poolObj.sharingPercentage + '<br />' +
    'Payout Frequency: ' + poolObj.payoutFrequency + '<br />' +
    'Next Payout: ' + poolObj.nextPayoutDate;
};

const getGroups = function() {
  return "Active Pools: " + "<br /><br />" + config.get("pools").join("<br />") + "<br /><br />" +
    "Use GM or GROUPMEM &lt;group&gt; to get pool members list"
};

const getGroupsMembers = async function(groupname) {
  const groupList = config.get("pools");
  const group = groupname.toLowerCase();
  if(_.indexOf(groupList, group) === -1)
    return "Group not found.";

  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/pools/" + group,
    json: true
  }));

  if(resError)
    return "API Error.";

  return group + " Member List: <br /><br />" + resCall.join(", ");

};


module.exports = { getDelegateInfo, getPools, getPoolsInfo, getGroups, getGroupsMembers };