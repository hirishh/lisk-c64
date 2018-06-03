import to from 'await-to-js';
import { getPools } from './delegate';
const config = require('config');
const request = require('request-promise-native');
const _ = require('lodash');

const apiUrl = config.get("liskSupportApi");

const getPendings = async function(address) {

  //Pending
  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/pending/" + address,
    json: true
  }));

  if(resError)
    return "API Error.";

  //Estimated
  const [resEstError, resEstCall] = await to(request.get({
    url: apiUrl + "/estimatedpending/" + address,
    json: true
  }));

  if(resEstError)
    return "API Error.";

  resEstCall["TOTAL"] += resCall["TOTAL"];
  delete resCall["TOTAL"];

  const estimated = _.transform(resEstCall, function(result, value, key) {
    result["*" + key] = value;
  }, {});

  const finalArray = _.assign(resCall, estimated);

  return pendingsToTable(finalArray);
};

async function pendingsToTable(pendings) {

  const jsonFormat = true;
  const poolsInfo = await getPools(jsonFormat);

  let html = "<span style='color: gray'>Data from lisk.support. Tnx to @TonyT908</span><br /><br />";
  html += "<table>" +
    "<tr>" +
    "  <th>Pool</th>" +
    "  <th>Pending</th>" +
    "  <th>Payout Date</th>" +
    "</tr>";

  _.forEach(pendings, (value, pool) => {

    if(pool.toUpperCase() !== "TOTAL") {

      html += "<tr>";
      html += "  <td>" + pool + "</td>";
      html += "  <td>" + getColoredValue(pool, value, poolsInfo) + "</td>";
      html += "  <td>" + getNextPayoutDate(pool, value, poolsInfo) + "</td>";
      html += "</tr>";

    }
    else {
      html += "<tr style='color: #FF420E'>";
      html += "  <td>" + pool + "</td>";
      html += "  <td>" + value.toFixed(4) + "</td>";
      html += "  <td></td>";
      html += "</tr>";
    }
  });

  html += "</table>";

  html += "<span style='color: gray'>* Estimated Payout by using Lisk.Support Algorithm.</span>";

  return html;
}

function getColoredValue(pool, value, poolsInfo) {

  if(pool.charAt(0) == "*")
    pool = pool.substring(1);

  value = value.toFixed(4);

  if(!_.isObject(poolsInfo[pool]))
    return value;

  if(value < poolsInfo[pool].minimumPayout)
    return value;
  else
    return "<span style='color: #66FF66'>" + value + "</span>";
}

function getNextPayoutDate(pool, value, poolsInfo) {

  if(pool.charAt(0) == "*")
    pool = pool.substring(1);

  if(!_.isObject(poolsInfo[pool]))
    return "";

  if(value < poolsInfo[pool].minimumPayout)
    return "";
  else
    return poolsInfo[pool].nextPayoutDate;
}

module.exports = { getPendings };