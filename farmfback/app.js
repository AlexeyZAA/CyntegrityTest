const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require('mongoose')
const BodyParser = require("koa-bodyparser");
const taskRoutes = require("./routes/routestask.js");

const app = new Koa();
const router = new Router();

app.use(BodyParser({
  multipart: true,
  urlencoded: true
}));

mongoose.Promise = global.Promise;
const connStr = "mongodb://localhost/task";
mongoose.connect(connStr, { useNewUrlParser: true, useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected");
});


app.use(taskRoutes.routes());

app.listen(8888, () => {
  console.log("listening on port 8888");
});
