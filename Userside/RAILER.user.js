// ==UserScript==
// @name         RAILER
// @version      0.1
// @namespace    NDay
// @description  Userscript for Ampere Suite
// @author       Jambon
// @match        https://*.nationstates.net/*
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?a4098
// @require      http://code.jquery.com/jquery-2.1.0.min.js
// @grant        window.close
// @grant        window.reload
// @grant        window.focus
// ==/UserScript==

//Mousetrap
(function () {
    'use strict';
    function noinput_mousetrap(event) {
        if (event.target.classList.contains("mousetrap")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
});

//Definitions
let setup = {
    PMain: "m",
    PNukes: "n",
    PLeaderboard: "s",
    PProduction: "p",
    PFaction: "f",
    PEnemyFaction: "e",
    PTargets: "t",
    AReload: "r",
    AJoin: "j",
    NNext: "w",
    NLast: "q"
}

//Startup

//Page Tags
Mousetrap.bind([setup.PMain], function(ev) {GotoPageRegular("nation="+ GetNationFromSite())})
Mousetrap.bind([setup.PNukes], function(ev) {GotoPageRegular("page=nukes")})
Mousetrap.bind([setup.PLeaderboard], function(ev) {GotoPageRegular("page=factions")})
Mousetrap.bind([setup.PLeaderboard], function(ev) {GotoPageRegular("page=factions")})

//Nation Tags

//Action Tags

//Turbo Mode

//Function Definitions
function GotoPageRegular(direction) {
    window.location.replace("https://www.nationstates.net/" + direction)
}

async function GetIDFromNation(nationname) {
    const dataint = {method: "GET"}
    let id = await fetch("http://localhost:3000/getifromnation/" + nationname, dataint)
    return id
}

async function GetNationFromID(nationid) { 
    const dataint = {method: "GET"}
    let nation = await fetch("http://localhost:3000/getnationfromid/" + nationid, dataint)
    return nation
}

function GetNationFromSite() {
    let nation = (document.getElementsByClassName("bellink quietlink")[0].innerText);
    return nation;
}

function GetIDFromSite() {
    let ID = GetIDFromNation(GetNationFromSite)
    return ID
}

function GetFactionFID() { }

function GetEnemyFID() { }

function GotoNationName() { }

function GotoNationID() { }

function GoToNextNation() { }

function GoToLastNation() { }

function UseProduction() { }