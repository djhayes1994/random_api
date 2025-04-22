const fs = require("fs");

function readJSONFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8'); // Use sync version
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

exports.readJSONFile = readJSONFile;
