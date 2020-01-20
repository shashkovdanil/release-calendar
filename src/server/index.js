import express from 'express'
import next from 'next'
import checkAndCorrectURL from '../lib/check-and-correct-url'

const port = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'

const app = next({
  dir: '.',
  dev,
})

const handle = app.getRequestHandler()

function redirect(req, res) {
  res.writeHead(303, { Location: checkAndCorrectURL(req.url).url })
  res.end()
}

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/films|games/:date', (req, res) => {
      return app.render(req, res, checkAndCorrectURL(req.url).url, {
        date: req.params.date,
      })
    })

    server.get('/films|games', (req, res) => {
      redirect(req, res)
    })

    server.get('/', (req, res) => {
      redirect(req, res)
    })

    server.all('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
