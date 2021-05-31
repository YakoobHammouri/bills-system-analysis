const { join } = require('path');

const { readFileSync } = require('fs');

const connection = require('./connection');

const sql = readFileSync(join(__dirname, 'dbBuild.sql')).toString();
const dummySql = readFileSync(join(__dirname, 'dummyData.sql')).toString();

connection
  .query(sql)
  .then((res) => {
    connection.query(dummySql).then((result) => result);
    console.log('successfully build database');
  })
  .catch((e) => console.error('failed to build', e.stack));
