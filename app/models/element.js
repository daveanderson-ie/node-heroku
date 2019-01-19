const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

async function getElements(){
    let p = client.query('SELECT id, name FROM elements').then((res) => {
        return res.rows;
    }).catch((err)=>{
        console.log('Error', err);
        return err;
    });
    let result = await p;
    return result;
}

async function addElement(name){
    let p = client.query("INSERT into ELEMENTS (name) values ('"+name+"')").then((res) => {
        return name;
    }).catch((err)=>{
        console.log('Error', err);
        return err;
    });
    let result = await p;
    return result;
};

module.exports = { getElements, addElement };
