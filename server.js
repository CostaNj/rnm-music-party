const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.use(compression())
        server.use(bodyParser.json())

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.post('*', (req, res) => {
            return handle(req, res)
        })

        const PORT = process.env.PORT || 3000

        server.listen(PORT, (err) => {
            if(err) throw err

            console.log(`ready on port ${PORT}`)
        })

    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })