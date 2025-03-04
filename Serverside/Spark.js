const path = require('path');
const fs = require('fs');

// Correct file paths using __dirname
const puppetslistPath = path.join(__dirname, 'Data', 'puppets_list.txt');
const containerlinksPath = path.join(__dirname, 'Data', 'containerlinks.txt');
const nationdbPath = path.join(__dirname, 'Data', 'nationdb.json');
const csv_listPath = path.join(__dirname, 'Data', 'csv_list.txt');  // New file path for csv_list.txt

// Open files with corrected paths
const puppetslist = fs.readFileSync(puppetslistPath, 'utf-8');
const containerlinks = fs.createWriteStream(containerlinksPath, { flags: 'w' });
const csv_list = fs.createWriteStream(csv_listPath, { flags: 'w' });  // Open csv_list.txt in append mode

let count = 0;
let componentlist = [];

// Split the file content by new lines
const lines = puppetslist.split('\n');

for (let line of lines) {
    if (!line.trim()) continue; // Skip empty lines

    const componentjs = { name: line.trim(), id: count, password: "", specialisation: "" };
    componentlist.push(componentjs);

    let nationName = line.trim();
    let nationUrlFormat = nationName.toLowerCase().replace(/\s+/g, "_");

    // Write to containerlinks.txt in the desired format
    containerlinks.write(`@^.*\\.nationstates\\.net/(.*/)?container=${nationUrlFormat}(/.*)?$ , ${nationName}\n`);

    // Write to csv_list.txt in the desired format (comma-separated)
    csv_list.write(`${line.trim()},`);

    console.log(count);
    console.log(nationName);

    count++;
}

// Write to nationdb.json (overwrite mode)
fs.writeFileSync(nationdbPath, JSON.stringify(componentlist, null, 4));

// Close the containerlinks and csv_list streams
containerlinks.end();
csv_list.end();
