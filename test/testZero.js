process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var assert = require('chai').assert;

const { execSync } = require('child_process');

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node-heroku-test',
    password: '',
    port: 5432,
});

let server = require('../server');

function getDropDatabaseCommand(poolOptions){
    return 'dropdb --if-exists' + 
        ' -h ' + poolOptions.host +
        ' -p ' + poolOptions.port +
        ' -U ' + poolOptions.user +
        ' ' + poolOptions.database;
}

function getRestoreDatabaseCommand(poolOptions, fileName){
    return 'psql' +
        ' -h ' + poolOptions.host +
        ' -p ' + poolOptions.port +
        ' -U ' + poolOptions.user +
        ' -f ' + fileName;
}

describe('Service Test', function(){
    chai.use(chaiHttp);
    var request = chai.request.agent(server.listen());

    before(function() {
        var cmd = getDropDatabaseCommand(pool.options);
        var result = execSync(cmd);

        cmd = getRestoreDatabaseCommand(pool.options, './node-heroku-test.sql');
        result = execSync(cmd);

        pool.query('SELECT NOW()', (err, res) => {
            assert.isUndefined(err, 'Database connection error.');
            pool.end()
        });
    });

    context('When the universe is empty', function(){
        it('Everything should be ok', function(done){
            'true'.should.be.eql('true');
            done();
        });
    });
    context('Given I am not logged in', function(){
        context('When I request a URL that doesn\'t exist', function(){
            it('It should return status 404', (done) => {
                request
                .get('/nmtch-pkjl-ftmsh')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
            });
        });
        context('When I request the homepage', function(){
            it('It should return the homepage', (done) => {
                request
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.message, 'Welcome to Server.');
                    done();
                });
            });
        });
        context('When I request a list of elements', function(){
            it('It should return status 503', (done) => {
                request
                .get('/element')
                .end((err, res) => {
                    res.should.have.status(503);
                    res.should.have.length = 0;
                    done();
                });
            });
        });
    });
    context('Given I am authorised', function(){
        context('When I request a list of elements', function(){
            it('It should return an empty list of elements', (done) => {
                request
                .get('/element').set('Authorization', 'Bearer mytoken')
                .end((err, res) => {
                    assert.isNull(err, 'Error');
                    res.should.have.status(200);
                    assert.isArray(res.body.elements);
                    done();
                });
            });
        });
    });
});