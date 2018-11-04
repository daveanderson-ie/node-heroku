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

    return result;
}

module.exports = { getElements };