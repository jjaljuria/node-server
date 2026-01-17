import { createServer } from 'node:http'
import { json } from 'stream/consumers'

const port = 3000

const server = createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Hello World' }))
    }
  }

  if (method === 'POST') {
    if (url === '/data') {
      const user = await json(req)
      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Data received', data: user }))
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end()
})

server.listen(port, () => {
  console.log(`server running at port ${port}`)
})
