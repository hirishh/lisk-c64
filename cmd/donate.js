const config = require('config');

const getDonationInfo = function() {
  return "<pre style='font-family:inherit'>If you love this tool, feel free to: <br /><br />" +
    "Vote for delegate  <span style='color:#FF420E'>hirish</span><br />" +
    "Donate to hirish here: " + config.get("hirishDonation") + "<br /><br />" +

    "This tool uses <span style='color:#FF420E'>Lisk.Support</span> API and Data.<br />" +
    "Feel free to vote for them and<br />" +
    "show some love here: " + config.get("liskSupportDonation") + "<br /><br />" +

    "This tool uses also <span style='color:#FF420E'>vekexasia</span> API-tools and Data.<br />" +
    "Feel free to vote for him and<br />" +
    "show some love here: " + config.get("vekexasiaDonation") + "<br /><br />" +

    "Lisk Commodore is a tool built with love by Delegate <span style='color:#FF420E'>hirish</span></pre>";
};

module.exports = { getDonationInfo };