import to from 'await-to-js';
const config = require('config');
const request = require('request-promise-native');
const _ = require('lodash');

const apiUrl = config.get("liskSupportApi");

const getPendings = async function(address) {

  const [resError, resCall] = await to(request.get({
    url: apiUrl + "/pending/" + address,
    json: true
  }));

  if(resError)
    return "API Error.";

  return pendingsToTable(resCall);
};

function pendingsToTable(pendings) {
  let html = "<span style='color: gray'>Data from lisk.support. Tnx to @TonyT908</span><br /><br />";
  html += "<table>" +
    "<tr>" +
    "  <th>Pool</th>" +
    "  <th>Pending</th>" +
    "</tr>";

  _.forEach(pendings, (value, key) => {

    if(key.toUpperCase() !== "TOTAL") {

      html += "<tr>";
      html += "  <td>" + key + "</td>";
      html += "  <td>" + value + "</td>";
      html += "</tr>";

    }
    else {
      html += "<tr style='color: #FF420E'>";
      html += "  <td>" + key + "</td>";
      html += "  <td>" + value + "</td>";
      html += "</tr>";
    }
  });

  html += "</table>";
  return html;
}

module.exports = { getPendings };