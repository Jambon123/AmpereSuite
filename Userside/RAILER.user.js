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
    PLeaderboard: "l",
    PProduction: "p",
    PFaction: "f",
    PEnemyFaction: "e",
    AReload: "r",
    AJoin: "j",
    NNext: "w",
    NLast: "q",
    DTest: "t",
    Marker0 : "0",
    Marker1 : "1",
    Marker2 : "2",
    Marker3 : "3",
    Marker4 : "4",
    Marker5 : "5",
    Marker6 : "6",
    Marker7 : "7",
    Marker8 : "8",
    Marker9 : "9",
}

//Startup

//Page Tags
Mousetrap.bind([setup.PMain], async function (ev) { GotoNationstatesPage("nation=" + await GetNationFromSite()) })
Mousetrap.bind([setup.PLeaderboard], async function (ev) { GotoNationstatesPage("page=factions") })
Mousetrap.bind([setup.PNukes], async function (ev) { GotoNationstatesPage("page=nukes") })
Mousetrap.bind([setup.PProduction], async function (ev) { GotoNationstatesPage("page=nukes/view=production") })
Mousetrap.bind([setup.PFaction], async function (ev) { GotoNationstatesPage("page=faction/fid=" + await GetFactionFID()) })
Mousetrap.bind([setup.PEnemyFaction], async function (ev) { GotoNationstatesPage("page=faction/fid=" + await GetEnemyFID())})

//Nation Tags
var alreadyPressed = false
Mousetrap.bind([setup.NNext], async function (ev) { await GoToNextNation() })
Mousetrap.bind([setup.NLast], async function (ev) { await GoToLastNation() })
Mousetrap.bind([setup.Marker0], async function (ev) { GotoNationName("The Flyin") })
Mousetrap.bind([setup.Marker1], async function (ev) { GotoNationName("Railgun Manager") })
Mousetrap.bind([setup.Marker2], async function (ev) { GotoNationName("Rod 1") })
Mousetrap.bind([setup.Marker3], async function (ev) { GotoNationName("Rod 25") })
Mousetrap.bind([setup.Marker4], async function (ev) { GotoNationName("Rod 50") })
Mousetrap.bind([setup.Marker5], async function (ev) { GotoNationName("Rod 75") })
Mousetrap.bind([setup.Marker6], async function (ev) { GotoNationName("Rod 100") })

//Action Tags

//Turbo Mode

//Function Definitions
function GotoNationstatesPage(direction) {
    window.location.replace("https://www.nationstates.net/" + direction)
}

async function GetIDFromNation(nationname) {
    const dataint = { method: "GET" }
    let request = await fetch("http://localhost:3000/getidfromnation/" + nationname, dataint)
    let ID = (await request.json())
    return ID
}

async function GetNationFromID(nationid) {
    const dataint = { method: "GET" }
    let request = await(fetch("http://localhost:3000/getnationfromid/" + nationid, dataint))
    let nation = (await request.text())
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

async function GetFactionFID() {
    const dataint = { method: "GET" }
    let request = await(fetch("http://localhost:3000/getfactionfid/", dataint))
    let FID = (await request.json())
    return FID
}

async function GetEnemyFID() {
    const dataint = { method: "GET" }
    let request = await(fetch("http://localhost:3000/getenemyfid/", dataint))
    let EnemyFID = (await request.json())
    return EnemyFID
}

function GotoNationName(targetnation) {
    return window.location.replace("https://www.nationstates.net/container=" + targetnation.split(' ').join('_').toLowerCase() + "/page=nukes/view=production")
}

function GotoNationID(targetid) { 
    GotoNationName(GetIDFromNation(targetid))
}

async function GoToNextNation() {
    if (alreadyPressed == true)
        return
    alreadyPressed = true
    let currentnation = await GetNationFromSite()
    let currentid = await GetIDFromNation(currentnation)
    let nextid = currentid + 1
    let nextnation = await GetNationFromID(nextid)
    GotoNationName(nextnation)
    alreadyPressed = false
}

async function GoToLastNation() { 
    if (alreadyPressed == true)
        return
    alreadyPressed = true
    let currentnation = await GetNationFromSite()
    let currentid = await GetIDFromNation(currentnation)
    let nextid = currentid - 1
    let nextnation = await GetNationFromID(nextid)
    GotoNationName(nextnation)
    alreadyPressed = false
}


function UseProduction() { }

function inHref(str) {
    return window.location.href.includes(str);
}