import to from "await-to-js";
const config = require('config');
const _ = require("lodash");
const request = require('request-promise-native');
const dposWrapper = require('dpos-api-wrapper');
dposWrapper.dposAPI.nodeAddress = config.get("liskNode");


const getBlockHeights = async function(username) {

  const nodeList = config.get("nodeList");
  let nodeHeights = [];

  for(let i = 0; i < nodeList.length; i++)
  {
    const [resError, resCall] = await to(request.get({
      url: "https://" + nodeList[i] + "/api/blocks/getHeight",
      json: true
    }));

    if(!resError && (resCall && resCall.success))
      nodeHeights.push({node: nodeList[i], height: resCall.height});
  }

  _.sortBy(nodeHeights, [function(o) { return o.node; }]);
  return resultToHtml(nodeHeights);
};

function resultToHtml(nodeHeights) {

  let html = "<table>" +
    "<tr>" +
    "  <th>Node</th>" +
    "  <th>Block Height</th>" +
    "</tr>";

  _.forEach(nodeHeights, (obj) => {

    html += "<tr>";
    html += "  <td>" + obj.node + "</td>";
    html += "  <td>" + obj.height + "</td>";
    html += "</tr>";

  });
  html += "</table>";
  return html;
}

module.exports = { getBlockHeights };