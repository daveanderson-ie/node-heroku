process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
var assert = require('chai').assert;
let should = chai.should();

let server = require('../server');

describe('Service Test', function(){
    chai.use(chaiHttp);
    var myServer = server.listen();
    var request = chai.request.agent(myServer);

    after(function() {
        myServer.close(null);
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
        // context('When I request a list of elements', function(){
        //     it('It should return status 503', (done) => {
        //         request
        //         .get('/element')
        //         .end((err, res) => {
        //             res.should.have.status(503);
        //             res.should.have.length = 0;
        //             done();
        //         }).catch((err) => {
        //             done(err);
        //         });
        //     });
        // });
    });
    // context('Given I am authorised', function(){
    //     context('When I request a list of elements', function(){
    //         it('It should return an empty list of elements', (done) => {
    //             request
    //             .get('/element')
    //             .set('Authorization', 'Bearer mytoken')
    //             .then((err, res) => {
    //                 assert.isNull(err, 'Error');
    //                 res.should.have.status(200);
    //                 assert.isArray(res.body.elements);
    //                 assert.lengthOf(res.body.elements, 0);
    //                 done();
    //             }).catch((err) => {
    //                 done(err);
    //             });
    //         });
    //     });
    //     context('When I add an element', function(){
    //         it('Should return the added element', (done)=> {
    //             request
    //             .post('/element')
    //             .set('Authorization', 'Bearer mytoken')
    //             .send({name: 'boron'})
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 done();
    //             });
    //         });
    //         context('When there is an existing element', function(){
    //             it('Should return the element in an array', (done) => {
    //                 request
    //                 .get('/element')
    //                 .set('Authorization', 'Bearer mytoken')
    //                 .end((err, res) => {
    //                     assert.isNull(err, 'Error');
    //                     res.should.have.status(200);
    //                     assert.isArray(res.body.elements);
    //                     assert.lengthOf(res.body.elements, 1);
    //                     res.body.elements[0].name.should.be.eql('boron');
    //                     done();
    //                 });    
    //             })
    //         });
    //     });
    // });
});
