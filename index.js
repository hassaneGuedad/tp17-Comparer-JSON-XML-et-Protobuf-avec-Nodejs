const fs = require('fs');
const convert = require('xml-js');
const protobuf = require('protobufjs');

// Charger la définition Protobuf depuis employee.proto
const root = protobuf.loadSync('employee.proto');
const EmployeeList = root.lookupType('Employees');

// Construire la liste d'employés
const employees = [];
employees.push({ id: 1, name: 'Ali', salary: 9000 });
employees.push({ id: 2, name: 'Kamal', salary: 22000 });
employees.push({ id: 3, name: 'Amal', salary: 23000 });

// Objet racine compatible avec message Employees
let jsonObject = { employee: employees };

// ---------- JSON ----------
console.log("--- JSON ---");
// Encodage
console.time('JSON encode');
let jsonData = JSON.stringify(jsonObject);
console.timeEnd('JSON encode');

// Decodage
console.time('JSON decode');
let jsonDecoded = JSON.parse(jsonData);
console.timeEnd('JSON decode');


// ---------- XML ----------
console.log("\n--- XML ---");
const options = { compact: true, ignoreComment: true, spaces: 0 };

// Encodage
console.time('XML encode');
let xmlData = "<root>\n" + convert.json2xml(jsonObject, options) + "\n</root>";
console.timeEnd('XML encode');

// Decodage
console.time('XML decode');
let xmlJson = convert.xml2json(xmlData, { compact: true });
let xmlDecoded = JSON.parse(xmlJson);
console.timeEnd('XML decode');


// ---------- Protobuf ----------
console.log("\n--- Protobuf ---");
// Vérification
let errMsg = EmployeeList.verify(jsonObject);
if (errMsg) { throw Error(errMsg); }

// Encodage
console.time('Protobuf encode');
let message = EmployeeList.create(jsonObject);
let buffer = EmployeeList.encode(message).finish();
console.timeEnd('Protobuf encode');

// Decodage
console.time('Protobuf decode');
let decodedMessage = EmployeeList.decode(buffer);
// Conversion vers objet JS "classique" pour vérifier la symétrie
let protoDecoded = EmployeeList.toObject(decodedMessage);
console.timeEnd('Protobuf decode');


// ---------- Écriture des fichiers ----------
fs.writeFileSync('data.json', jsonData);
fs.writeFileSync('data.xml', xmlData);
fs.writeFileSync('data.proto', buffer);

// ---------- Mesure des tailles ----------
console.log("\n--- File Sizes ---");
const jsonFileSize = fs.statSync('data.json').size;
const xmlFileSize = fs.statSync('data.xml').size;
const protoFileSize = fs.statSync('data.proto').size;

console.log(`Taille de 'data.json' : ${jsonFileSize} octets`);
console.log(`Taille de 'data.xml'  : ${xmlFileSize} octets`);
console.log(`Taille de 'data.proto': ${protoFileSize} octets`);
