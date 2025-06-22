const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const util = require('util');

function readFileUsingCallback(filePath, callback) {
  const fullPath = path.join(__dirname, filePath);
  fs.readFile(fullPath, 'utf-8', (err, data) => {
    if (err) return callback(err);
    callback(null, data);
  });
}

async function readFileUsingAsyncAwait(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const data = await fsPromises.readFile(fullPath, 'utf-8');
    console.log('[Async/Await] File content:\n', data);
  } catch (err) {
    console.error('[Async/Await] Error reading file:', err.message);
  }
}

const readFilePromisified = util.promisify(fs.readFile);

async function readFileUsingPromisify(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const data = await readFilePromisified(fullPath, 'utf-8');
    console.log('[util.promisify] File content:\n', data);
  } catch (err) {
    console.error('[util.promisify] Error reading file:', err.message);
  }
}

const fileName = 'example.txt';

readFileUsingCallback(fileName, (err, data) => {
  if (err) {
    console.error('[Callback] Error reading file:', err.message);
  } else {
    console.log('[Callback] File content:\n', data);
  }

  readFileUsingAsyncAwait(fileName);

  readFileUsingPromisify(fileName);
});
