const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function getElements(){
    client.connect();
    let p = client.query('SELECT id, name FROM elements').then((res) => {
        return res.rows;
    }).catch((err)=>{
        client.end();
        console.log('Error', err);
        return err;
    });
    client.end();
    let result = await p;
    return result;
}

async function addElement(name){
    client.connect();
    let p = client.query("INSERT into ELEMENTS (name) values ('"+name+"')").then((res) => {
        return name;
    }).catch((err)=>{
        client.end();
        console.log('Error', err);
        return err;
    });
    client.end();
    let result = await p;
    return result;
};

module.exports = { getElements, addElement };
