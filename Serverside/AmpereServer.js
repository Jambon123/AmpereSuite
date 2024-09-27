const express = require('express')
const app = express()
const fs = require('fs');

function gettime() {
    const dateObject = new Date();
    const date = (`0 ${dateObject.getDate()}`).slice(-2);
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const milliseconds = dateObject.getMilliseconds();
    time = (`${year}-${month}-${date} ${hours}:${minutes}:${seconds}:${milliseconds}`);
    return time
}

// Start serv & listen on port 3000.
app.listen(3000, function () {
    console.log('Node listening on port 3000')
    console.log()
})

//Listen for get request on root url. eg. http://localhost:3000
app.get('/getnationfromid/:id', function (req, res) {
    fs.readFile('nationdb.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log("Search for Name With ID:" + req.params.id + " at: " + gettime());
        let sorteddata = (JSON.parse(data)[req.params.id]).name
        res.send(sorteddata.toString());
    });
})

app.get('/getidfromnation/:nation', function (req, res) {
    fs.readFile('nationdb.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log("Search for Id With Name:" + req.params.nation + "at:" + gettime());
        let sorteddata = (JSON.parse(data).find(x => x.name.split(' ').join('_').toLowerCase() === req.params.nation.split(' ').join('_').toLowerCase())).id
        res.send(sorteddata.toString());
    });
})

app.get('/getdata', function (req, res) {
    fs.readFile('nationdb.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log("Search for Whole Doc at:" + gettime());
        res.send(data);
    });
})

app.post('/setdata', function (req, res) {
    fs.writeFile("nationdb.json", (req.body), (err) => { });
});

app.get('/getfactionfid', function (req, res) {
    fs.readFile('commands.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log("Search for FactionFID at:" + gettime());
        let sorteddata = (JSON.parse(data).FID)
        res.send(sorteddata.toString());
    });
})

app.get('/getenemyfid', function (req, res) {
    fs.readFile('commands.json', 'utf8', function (err, data) {
        if (err) throw err;
        console.log("Search for EnemyFID at:" + gettime());
        let sorteddata = (JSON.parse(data).EnemyFID)
        res.send(sorteddata.toString());
    });
})

//let getstoredasjson = await (databasecontents).json();
//foundid = (getstoredasjson.find(x => x.name.toUpperCase() === nation.toUpperCase()).id);