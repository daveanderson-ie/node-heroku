const { Pool, Client } = require('pg');

async function getElements(){
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'node-heroku-test',
        password: '',
        port: 5432,
    });

    let p = pool.query('SELECT id, name FROM elements').then((res) => {
        return res.rows;
    }).catch((err)=>{
        console.log('Error', err);
        return err;
    });
    let result = await p;

    pool.end();
    return result;
}

async function addElement(name){
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'node-heroku-test',
        password: '',
        port: 5432,
    });

    let p = pool.query("INSERT into ELEMENTS (name) values ('"+name+"')").then((res) => {
        return name;
    }).catch((err)=>{
        console.log('Error', err);
        return err;
    });
    let result = await p;

    pool.end();
    return result;
};

module.exports = { getElements, addElement };