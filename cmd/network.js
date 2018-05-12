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
      url: nodeList[i] + "/api/blocks/getHeight",
      json: true
    }));

    if(!resError && (resCall && resCall.success))
      nodeHeights.push({node: nodeList[i], height: resCall.height});
  }

  _.sortBy(nodeHeights, ['node']);
  return resultToHtml(nodeHeights);
};

function resultToHtml(nodeHeights) {
  let html = "<pre style='font-family:inherit'>Heights from Lisk Public Nodes<br /><br />";
  _.forEach(nodeHeights, (obj) => {
    html += obj.node + "&#9;&#9;" + obj.height + "<br />";
  });
  html += "</pre>";
  return html;
}

module.exports = { getBlockHeights };