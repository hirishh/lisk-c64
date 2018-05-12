const express = require('express');
const router = express.Router();
const log = require('../utils/log')('lisk-c64:cmd');

import { getBalance, getAccountInfo } from "../cmd/account";
import { getDelegateInfo, getPools, getPoolsInfo, getGroups, getGroupsMembers } from "../cmd/delegate";
import { getPriceInfo } from "../cmd/price";
import { getBlockHeights } from "../cmd/network";
import { getPendings } from "../cmd/pending";
import { getHelp } from "../cmd/help";
import { getDonationInfo } from "../cmd/donate";

/* GET users listing. */
router.post('/', async function(req, res, next) {

  const command = req.body.cmd;
  log.debug(command);

  const [ parsedCmd, argsCmd ] = parseCommand(command);

  let result = "";

  switch (parsedCmd.toUpperCase()) {
    case "H":
    case "HELP":

      result = getHelp();
      break;

    case "PRICE":
      result = await getPriceInfo();
      break;

    case "B":
    case "BALANCE":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }
      result = await getBalance(argsCmd[0]);
      break;

    case "A":
    case "ACCOUNT":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }
      result = await getAccountInfo(argsCmd[0]);
      break;

    case "D":
    case "DELEGATE":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }
      result = await getDelegateInfo(argsCmd[0]);
      break;

    case "P":
    case "PENDING":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }

      result = await getPendings(argsCmd[0]);
      break;

    case "PO":
    case "POOLS":

      result = await getPools();
      break;

    case "PI":
    case "POOLINFO":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }

      result = await getPoolsInfo(argsCmd[0]);
      break;

    case "G":
    case "GROUPS":

      result = getGroups();
      break;

    case "GM":
    case "GROUPMEM":

      if(!checkArgsNumber(argsCmd, 1)) {
        sendCommandError(res, "Wrong Arguments");
        return;
      }

      result = await getGroupsMembers(argsCmd[0]);
      break;

    case "BH":
    case "BLOCKHEIGHTS":

      result = await getBlockHeights();
      break;

    case "DONATE":

      result = getDonationInfo();
      break;

    default:
      sendCommandNotFound(res);
      return;
  }

  let response = {
    success: true,
    data: result
  };
  res.send(response);
});


function parseCommand(cmd) {
  var cmdSplit = cmd.split(" ");
  return [ cmdSplit[0], cmdSplit.slice(1) ];
}

function checkArgsNumber(args, expectedLength) {
  return args.length === expectedLength;
}

function sendCommandError(res, msg) {
  res.status(500).send({error: msg})
}

function sendCommandNotFound(res) {
  res.status(404).send({error: "Command Not Found"})
}

module.exports = router;
