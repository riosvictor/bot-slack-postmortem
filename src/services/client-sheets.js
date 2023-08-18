const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/cloud-platform'
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function createCredentialsFile() {
  try {
    await fs.readFile(CREDENTIALS_PATH);
  } catch (error) {
    await fs.writeFile(CREDENTIALS_PATH, process.env.GOOGLE_CREDENTIALS);
  }
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  await createCredentialsFile()

  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function appendValues(page, _values) {
  const spreadsheetId = process.env.SHEETS_ID
  const {google} = require('googleapis');

  const auth = await authorize()

  const service = google.sheets({version: 'v4', auth});
  let values = [_values];
  const resource = {
    values,
  };
  try {
    const result = await service.spreadsheets.values.append({
      range: page,
      spreadsheetId,
      resource,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
    return result;
  } catch (err) {
    console.error(JSON.stringify(err.response.data));
    throw err;
  }
}

authorize().catch(console.error);

module.exports = {
  appendValues
}