const Router = require("koa-router")
const router = new Router()

const Pip = require("../models/pipmodel")
const Tip = require("../models/taskmodel")

const funcApi = {
  getAllPipCount: async ctx => {
    ctx.body =
      (await Pip.find()
        .count()
        .exec()) + 1;
  },
  getAllPip: async ctx => {
    var countPip = await Pip.find()
      .count()
      .exec()
    var pip = await Pip.find().exec()
    var taskArr = []
    var resptip = []
    for (let i = 0; i < countPip; i++) {
      taskArr.push(pip[i].pip_task)
    }

    for (let j = 0; j < taskArr.length; j++) {
      var pipname = pip[j].pip_name
      var piid = pip[j]._id
      var task = []
      for (let k = 0; k < taskArr[j].length; k++) {
        task = taskArr[j]
      }
      //ищем задачи по именам
      var tip = await Tip.find({ _id: task }).exec()
      resptip.push({_id: piid, pip_name: pipname, pip_time: pip[j].pip_time, pip_task: tip })
    }

    ctx.body = { respons: resptip }
  }
}

router.get("/pipapi/count/pip", funcApi.getAllPipCount)

router.get("/pipapi", funcApi.getAllPip)

router.get("/pipapi/:id", async (ctx, next) => {
  await Pip.findOne({ _id: ctx.params.id }, function (err, pipone) {
    if (err) {
      console.log("errr", err)
    } else {
      ctx.body = pipone
    }
  })
})
router.put("/pipapi/:id", async ctx => {
  console.log(ctx.request.body.data.tasks)
  console.log(ctx.request.body.data.id)
  if (ctx.request.body.data && ctx.request.body.data !== "") {
    await Pip.findOneAndUpdate(
      { _id: ctx.request.body.data.id },
      { pip_task: ctx.request.body.data.tasks }
    )
      .then(console.log("Запись " + ctx.request.body.data.id + " обновлена"))
      .catch(err => {
        console.log("No update-" + err)
      });
  } else {
    console.log("Error: not data")
  }
});

router.post("/pipapi", async ctx => {
  if (ctx.request.body.datapip) {
    const pipadd = ctx.request.body.datapip
    console.log(ctx.request.body)
    if (pipadd.pip_name !== "") {
      const pip = new Pip({
        pip_user: pipadd.pip_user,
        pip_name: pipadd.pip_name,
        pip_time: pipadd.pip_time
      });
      pip.save(function (err) {
        if (err) {
          console.log("конвейер не добавлен" + err)
        } else {
          console.log("конвейер добавлен")
        }
      });
    } else {
      console.log("Нет нужных данных")
    }
  } else {
    console.log("ddddddddddddddddd")
  }
});

module.exports = router
