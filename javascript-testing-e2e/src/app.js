const http = require('http')
const { once } = require('events')

const DEFAULT_USER = {
    username: 'dyhalmeida',
    password: '1234'
}

const toLower = (value) => value.toLowerCase()

const routes = {
    '/contact:get': (req, res) => {
        res.write('contact us route')
        return res.end()
    },
    '/login:post': async (req, res) => {
        const user = JSON.parse(await once(req, 'data'))

        if (toLower(user.username) !== toLower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
            res.writeHead(401)
            return res.end('unauthorized')
        }
        return res.end('login succeeded')
    },
    default(req, res) {
        res.writeHead(404)
        return res.end('route not found')
    }
}

function handler(req, res) {
    const { url, method } = req
    const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`
    const chosen = routes[routeKey] || routes.default
    return chosen(req, res)
}

const app = http.createServer(handler)
    .listen(3333, () => console.log('Server is running at port 3333'))

module.exports = app