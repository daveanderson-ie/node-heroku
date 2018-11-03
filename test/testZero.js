process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var assert = require('chai').assert;
let server = require('../server');

chai.use(chaiHttp);

describe('Service Test', function(){
    var request = chai.request.agent(server.listen());

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
    context('When I am authorised', function(){
        context('When I request a list of elements', function(){
            it('It should return an empty list of elements', (done) => {
                request
                .get('/element').set('Authorization', 'Bearer mytoken')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
            });
        });
    });
});