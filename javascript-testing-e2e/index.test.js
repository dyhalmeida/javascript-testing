const { describe, it, before, after } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('Api suite test', () => {
    let app
    before((done) => {
        app = require('./src/app')
        app.once('listening', done)
    })

    after((done) => app.close(done))

    describe('GET /contact', () => {
        it('Should request the contact route and return HTTP status 200', async () => {
            const res = await supertest(app)
                .get('/contact')
                .expect(200)
            assert.strictEqual(res.text, 'contact us route')
        })
    })

    describe('POST /login', () => {
        it('Should request the login route and return HTTP status 200', async () => {
            const res = await supertest(app)
                .post('/login')
                .send({ username: 'dyhalmeida', password: '1234' })
                .expect(200)

            assert.strictEqual(res.text, 'login succeeded')
        })

        it('Should request the login route and return HTTP status 401', async () => {
            const res = await supertest(app)
                .post('/login')
                .send({ username: 'dyhalmeida', password: '9876' })
                .expect(401)
            
            assert.ok(res.unauthorized)
            assert.strictEqual(res.text, 'unauthorized')
        })
    })

    describe('GET 404 route', () => {
        it('Should request for a route that does not exist and return HTTP status 404', async () => {
            const res = await supertest(app)
                .get('/any')
                .expect(404)
            
            assert.strictEqual(res.text, 'route not found')
        })
    })
})