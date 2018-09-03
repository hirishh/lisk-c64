import to from "await-to-js";
const config = require('config');
const _ = require("lodash");
const request = require('request-promise-native');

const getBlockHeights = async function() {

  const nodeList = config.get("nodeList");
  let nodeHeights = [];

  for(let i = 0; i < nodeList.length; i++)
  {
    const [resError, resCall] = await to(request.get({
      url: "https://" + nodeList[i] + "/api/blocks?limit=1",
      json: true
    }));

    if(!resError && resCall && resCall.data.length !== 0)
      nodeHeights.push({node: nodeList[i], height: resCall.data[0].height});
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