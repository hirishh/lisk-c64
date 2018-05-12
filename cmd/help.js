const getHelp = function() {
  return "<pre style='font-family:inherit'>Lisk Commodore V1.0 - Available Commands: <br /><br />" +
    "H, HELP &#9;&#9;&#9;&#9; Print this message <br />" +
    "PRICE &#9;&#9;&#9;&#9; Return Lisk Price and Market Data <br />" +
    "B, BALANCE &lt;Addr&gt; &#9; Return Lisk Balance <br />" +
    "A, ACCOUNT &lt;Addr&gt; &#9; Return Lisk Account Info <br />" +
    "D, DELEGATE &lt;Name&gt; &#9; Return Lisk Delegate Info <br />" +
    "P, PENDING &lt;Addr&gt; &#9; Return Pending Rewards from Delegates <br />" +
    "PO, POOLS &#9;&#9;&#9; Return the List of Active Lisk Pools <br />" +
    "PI, POOLINFO &lt;Pool&gt; &#9; Return Pool Information <br />" +
    "G, GROUPS &#9;&#9;&#9; Return the List of Lisk Groups <br />" +
    "GM, GROUPMEM &lt;Grp&gt; &#9; Return Member List of specified group <br />" +
    "BH, BLOCKHEIGHTS &#9; Return the block heights from Public Nodes <br />" +
    "CLEAR &#9;&#9;&#9;&#9; Clear the monitor<br /><br />" +
    "DONATE &#9;&#9;&#9;&#9; Return Donation Addresses <span style='color:#FF420E'><3</span><br /><br />" +
    "Lisk Commodore is a tool built with love by Delegate <span style='color:#FF420E'>hirish</span></pre>";
};

module.exports = { getHelp };