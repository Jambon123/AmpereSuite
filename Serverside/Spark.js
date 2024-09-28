const path = require('path');
const fs = require('fs');

// Correct file paths using __dirname
const puppetslistPath = path.join(__dirname, 'Data', 'puppets_list.txt');
const containerlinksPath = path.join(__dirname, 'Data', 'containerlinks.txt');
const semidbPath = path.join(__dirname, 'Data', 'nationdb.json');

// Open files with corrected paths
const puppetslist = fs.readFileSync(puppetslistPath, 'utf-8');
const containerlinks = fs.createWriteStream(containerlinksPath, { flags: 'w' });

let count = 0;
let componentlist = [];

// Split the file content by new lines
const lines = puppetslist.split('\n');

for (let line of lines) {
    if (!line.trim()) continue; // Skip empty lines

    const componentjs = { name: line.trim(), id: count, password: "", specialisation: "" };
    componentlist.push(componentjs);

    let a = `${line.trim()}`;
    let b = a.toLowerCase();
    let c = b.replace(/\s+/g, "_");

 // Write to containerlinks.txt in the desired format
    let nationName = `${line.trim()}`;
    let nationUrlFormat = nationName.toLowerCase().replace(/\s+/g, "_");
    containerlinks.write(`@^.*\\.nationstates\\.net/(.*/)?nation=${nationUrlFormat}(/.*)?$ , ${nationName}\n`);

    console.log(count);
    console.log(line.trim());

    count++;
}

// Write to semidb.json (overwrite mode)
fs.writeFileSync(semidbPath, JSON.stringify(componentlist, null, 4));

// Close the containerlinks stream
containerlinks.end();