const Router = require("koa-router");
const router = new Router();
//const bodyParser = require("koa-bodyparser");
const convert = require('koa-convert');
const KoaBody = require('koa-body');
const koaBody = convert(KoaBody());
//импортируем модель задач
const Task = require("../models/taskmodel");
const mongoose = require("mongoose");

var funcApi = {
  //для роута без параметров
  getAllTask: async ctx => {
    let tasks = await Task.find().exec();
    ctx.body = tasks;
  }
};
//all tasks
router.get("/taskapi", funcApi.getAllTask);
//one task
router.get("/taskapi/:id", async (ctx, next) => {
  //console.log(ctx.params.name)
  await Task.findOne({ _id: ctx.params.id }, function (
    err,
    taskone
  ) {
    if (err) {
      console.log("errr", err);
    } else {
      ctx.body = taskone;
    }
  });
});

router.post("/taskapi", koaBody, async ctx => {
  let taskadd = JSON.parse(ctx.request.body)
  console.log(taskadd)
    if (ctx.request.body) {
      let task = new Task({ task_name: ctx.request.body });
      task.save(function (err) {
        if (err) {
          console.log("Задача не добавлена" + err);
        } else {
          console.log("Задача добавлена");
        }
      });
    } else {
      console.log("Нет нужных данных");
    }
});

router.put("/taskapi/:id", koaBody, async ctx => {
  //console.log(ctx.params.id)
  let tasknameupdate = JSON.parse(ctx.request.body)
  if (tasknameupdate.task_name && tasknameupdate.task_name !== '') {
    await Task.findOneAndUpdate(
      { _id: ctx.params.id },
      { task_name: tasknameupdate.task_name }
    )
      .then(
        console.log('Запись ' + ctx.params.id) + ' обновлена'
      )
      .catch(err => {
        console.log('No update')
      })
    //console.log(tasknameupdate.task_name)
  } else {
    console.log('Error: not data')
  }
});

router.delete("/taskapi/:id", async ctx => {
  await Task.deleteOne({
    _id: ctx.params.id
  })
    .then(
      console.log('Task delete')
    )
    .catch(err => {
      console.log('Error - ' + err)
    })
});

module.exports = router;