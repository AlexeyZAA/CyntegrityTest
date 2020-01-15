const Router = require('koa-router')
const router = new Router()
var bodyParser = require("koa-bodyparser")
//импортируем модель задач
const Task = require("../models/taskmodel");
const mongoose = require("mongoose");

var funcApi = {
  getAllTask: async ctx => {
    let tasks = await Task.find().exec();
    ctx.body = tasks;
  }
};

router.get("/taskapi", funcApi.getAllTask);

router.get("/taskapi/:id", async (ctx, next) => {
  await Task.findOne({ _id: ctx.params.id }, function(err, taskone) {
    if (err) {
      console.log("errr", err);
    } else {
      ctx.body = taskone;
    }
  });
});

router.post("/taskapi", async ctx => {
  if (ctx.request.body.datatask) {
    const taskadd = ctx.request.body.datatask;
    console.log(taskadd);
    if (taskadd.task_name !== "") {
      let task = new Task({
        task_name: taskadd.task_name,
        task_time: taskadd.task_time
      });
      task.save(function(err) {
        if (err) {
          console.log("Задача не добавлена" + err);
        } else {
          console.log("Задача добавлена");
        }
      });
    } else {
      console.log("Нет нужных данных");
    }
  } else {
    console.log("ddddddddddddddddd");
  }
});

router.put("/taskapi/:id", async ctx => {
  const tasknameupdate = ctx.request.body;
  if (tasknameupdate.task_name && tasknameupdate.task_name !== "") {
    await Task.findOneAndUpdate(
      { _id: ctx.params.id },
      { task_name: tasknameupdate.task_name }
    )
      .then(console.log("Запись " + ctx.params.id) + " обновлена")
      .catch(err => {
        console.log("No update-" + err);
      });
  } else {
    console.log("Error: not data");
  }
});

router.delete("/taskapi/:id", async ctx => {
  await Task.deleteOne({
    _id: ctx.params.id
  })
    .then(console.log("Task delete"))
    .catch(err => {
      console.log("Error - " + err);
    });
});

module.exports = router;
