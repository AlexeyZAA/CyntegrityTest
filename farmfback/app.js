const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require('mongoose')
const BodyParser = require("koa-bodyparser");
const taskRoutes = require("./routes/routestask.js");
const cors = require('@koa/cors');
const json = require('koa-json');

const app = new Koa();
const router = new Router();

app.use(BodyParser())

mongoose.Promise = global.Promise;
const connStr = "mongodb://localhost/task";
mongoose.connect(connStr, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected");
});
//маршруты для апи задач
app.use(taskRoutes.routes());
app.use(cors());
app.use(json());

app.listen(8888, () => {
  console.log("listening on port 8888");
});
