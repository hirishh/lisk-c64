import to from "await-to-js";
const config = require('config');
const _ = require("lodash");
const request = require('request-promise-native');
const dposWrapper = require('dpos-api-wrapper');
dposWrapper.dposAPI.nodeAddress = config.get("liskNode");
const liskoshi = 100000000;

const apiUrl = config.get("liskSupportApi");

const getDelegateInfo = async function(username) {

  const [resError, resCall] = await to(dposWrapper.dposAPI.delegates.getByUsername(username));

  if(resError)
    return "?API Error";

  if(resCall && !resCall.success)
    return "?Delegate not found.";

  const [forgError, forgCall] = await to(dposWrapper.dposAPI.delegates.getForgedByAccount(resCall.delegate.publicKey));

  if(forgError || (forgCall && !forgCall.success))
    return "?API Error";

  return "Address: " + resCall.delegate.address + "<br />" +
    "Rank: " + resCall.delegate.rank + "<br />" +
    "VoteWeight: " + resCall.delegate.vote / liskoshi + "<br />" +
    "Approval: " + resCall.delegate.approval + "%<br />" +
    "Productivity: " +  resCall.delegate.productivity + "%<br />" +
    "Produced Blocks: " + resCall.delegate.producedblocks + "<br />" +
    "Missed BLocks: " + resCall.delegate.missedblocks + "<br />" +
    "Forged Fees: " + forgCall.fees / liskoshi+ "<br />" +
    "Forged Rewards: " + forgCall.rewards / liskoshi + "<br />" +
    "Total Forged: " + forgCall.forged / liskoshi;
};

const getPools = async function() {
  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/delegatepayoutinfo/",
    json: true
  }));

  if(resError)
    return "?API Error.";

  return "Active Paying pools are: <br /><br />" + _.keys(resCall).join(", ") + "<br /><br />" +
    "Use command PI or POOLINFO &lt;poolname&gt; to get more info."
};

const getPoolsInfo = async function(pool) {
  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/delegatepayoutinfo/",
    json: true
  }));

  if(resError)
    return "?API Error.";

  const activePools = _.keys(resCall);
  if(_.indexOf(activePools, pool) === -1)
    return "Pool not found.";

  const poolObj = resCall[pool];

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