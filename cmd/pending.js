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

  return jsonToHtml(resCall);
};

function jsonToHtml(pendings) {
  let html = "<pre style='font-family:inherit'><span style='color: gray'>Data from lisk.support. Tnx to @TonyT908</span><br /><br />";

  _.forEach(pendings, (value, key) => {

    if(key.toUpperCase() !== "TOTAL") {

      var tabs = 4;

      if(key.length <= 10 && key.length > 7)
        tabs  = 3;
      if(key.length > 10)
        tabs = 2;

      html += key;
      for(var i = 0; i<tabs; i++)
        html +="&#9;"
      html += value + "<br />";
    }
    else {
      html += "<br /><span style='color: #FF420E'>" + key + "&#9;&#9;&#9;&#9;" + value + "</span></pre>";

    }

  });
  return html;
}

module.exports = { getPendings };