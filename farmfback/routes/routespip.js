const Router = require('koa-router')
const router = new Router()

const Pip = require('../models/pipmodel')

const funcApi = {
  getAllPipCount: async ctx => {
    ctx.body = await Pip.find().count().exec() + 1
  },
  getAllPip: async ctx => {
    ctx.body = await Pip.find().exec()
  }
}

router.get('/pipapi/count', funcApi.getAllPipCount)

router.get('/pipapi', funcApi.getAllPip)

router.get('/pipapi/:id', async (ctx, next) => {
  await Pip.findOne({ _id: ctx.params.id }, function(err, taskone) {
    if (err) {
      console.log('errr', err)
    } else {
      ctx.body = taskone
    }
  })
})

router.post('/pipapi', async ctx => {
  if (ctx.request.body.datatask) {
    const taskadd = ctx.request.body.datatask
    console.log(taskadd)
    if (taskadd.task_name !== '') {
      const pip = new Pip({
        task_name: taskadd.task_name,
        task_time: taskadd.task_time
      })
      pip.save(function(err) {
        if (err) {
          console.log('Конвеер не добавлена' + err)
        } else {
          console.log('Конвеер добавлена')
        }
      });
    } else {
      console.log('Нет нужных данных')
    }
  } else {
    console.log('ddddddddddddddddd')
  }
});

router.put('/pipapi/:id', async ctx => {
  const tasknameupdate = ctx.request.body
  if (tasknameupdate.task_name && tasknameupdate.task_name !== '') {
    await Pip.findOneAndUpdate(
      { _id: ctx.params.id },
      { task_name: tasknameupdate.task_name }
    )
      .then(console.log('Конвеер ' + ctx.params.id) + ' обновлена')
      .catch(err => {
        console.log('No update-' + err)
      })
  } else {
    console.log('Error: not data')
  }
})

router.delete('/pipapi/:id', async ctx => {
  await Pip.deleteOne({
    _id: ctx.params.id
  })
    .then(console.log('Конвеер удален'))
    .catch(err => {
      console.log('Error - ' + err)
    })
})

module.exports = router
