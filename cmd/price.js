import to from "await-to-js";
const config = require('config');
const request = require('request-promise-native');

const apiUrl = config.get("coinMarketCapApi_TickerLisk");

const nfUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const nfNumberFloat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const getPriceInfo = async function(username) {

  const [resError, resCall] = await to(request.get({
    url: apiUrl,
    json: true
  }));

  if(resError || !resCall)
    return "?API Error";

  return "<pre style='font-family:inherit'><span style='color: gray'>Data from CoinMarketCap</span><br />" +
    "Symbol: " + resCall.data.symbol + "<br />" +
    "Rank: #" + resCall.data.rank + "<br />" +
    "Supply: " + nfNumberFloat.format(resCall.data.circulating_supply) + "<br />" +
    "Total Supply: " +  nfNumberFloat.format(resCall.data.total_supply) + "<br /><br />" +

    "<span style='color: gray'>Price and Market Data:</span><br />" +
    "Price: <span style='color: #B266FF'>" + nfUSD.format(resCall.data.quotes.USD.price) + "</span><br />" +
    "Volume 24h: " + nfUSD.format(resCall.data.quotes.USD.volume_24h) + "<br />" +
    "MarketCap: " + nfUSD.format(resCall.data.quotes.USD.market_cap) + "<br /><br />" +

    "Percentage Change 1h: " + formatChange(resCall.data.quotes.USD.percent_change_1h) + "<br />" +
    "Percentage Change 24h: " + formatChange(resCall.data.quotes.USD.percent_change_24h) + "<br />" +
    "Percentage Change 7d: " + formatChange(resCall.data.quotes.USD.percent_change_7d) + "</pre>";
};

function formatChange(change) {
  return "<span style='color: " + (change < 0 ? "#FF420E" : "#66FF66")  + "'>" + change + "%</span>";
}

module.exports = { getPriceInfo };