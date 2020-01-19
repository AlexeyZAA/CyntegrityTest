const Koa = require('koa')
const mongoose = require('mongoose')
const BodyParser = require('koa-bodyparser')
const taskRoutes = require('./routes/routestask.js')
const pipRoutes = require('./routes/routespip.js')
const cors = require('@koa/cors')
const json = require('koa-json')
//const IO = require('koa-socket-2')
//const io = new IO();
//const koaRequest = require('koa-http-request');

const app = new Koa()
app.use(cors())
/*
app.use(koaRequest({
  json: true,
  timeout: 3000, 
  host: 'https://localhost:777'
  //host: 'https://api.github.com'
}));
*/
app.use(BodyParser())

mongoose.Promise = global.Promise
const connStr = 'mongodb://localhost/task'
mongoose.connect(connStr, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected')
})

app.use(taskRoutes.routes())
app.use(pipRoutes.routes())
app.use(json())
/*
io.attach(app)
io.on('message', (ctx, data) => {
  console.log('client sent data to message endpoint', data);
})
*/
app.listen(8888, () => console.log('listening on port 8888'))
