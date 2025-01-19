import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendPackageJsonPath = path.resolve(__dirname, 'package.json');
const backendPackageJson = JSON.parse(fs.readFileSync(backendPackageJsonPath, 'utf8'));
const backendVersion = backendPackageJson.version;

const frontendPackageJsonPath = path.resolve(__dirname, 'frontend/package.json');
const frontendPackageJson = JSON.parse(fs.readFileSync(frontendPackageJsonPath, 'utf8'));
const frontendVersion = frontendPackageJson.version;

const buildNoPath = path.resolve(__dirname, 'buildno.txt');
const buildNo = parseInt(fs.readFileSync(buildNoPath, 'utf8')) + 1;
fs.writeFileSync(buildNoPath, `${buildNo}`, 'utf8');

const currentDate = new Date().toISOString();

const versionData = {
  backend: backendVersion,
  frontend: frontendVersion,
  build: buildNo,
  date: currentDate
};

const versionJsPath = path.resolve(__dirname, 'frontend/src/version.js');
const versionJsContent = `export const VERSION = ${JSON.stringify(versionData)};`;
fs.writeFileSync(versionJsPath, versionJsContent, 'utf8');

console.log(`Updated version.js with version data: ${JSON.stringify(versionData)}`);