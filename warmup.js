const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 5000
const listener = ()=>console.log(`Listening on ${port}`)

app.use(morgan('dev'))
app.use(bodyParser.json())


app.get('/ping', function(req, res, next) {
  console.log('Pong 200')
  res.status(200).send({message: 'pong'})

})

app.use((req,res)=> {
  const status = 404
  const message = `Could not ${req.method} ${req.url}`

  next({status,message})
})



app.use(function(err, req, res, next) {
  console.error(err)

  const errorToSendBack = {}

  errorToSendBack = err.status || 500
  errorToSendBack = err.message || {message: 'Something went wrong'}

  if (process.env.NODE)

  res.status(errorToSendBack.status).send(errorToSendBack)

  })


app.listen(port, listener)
