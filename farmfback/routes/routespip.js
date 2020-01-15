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
  if (ctx.request.body.datapip) {
    const pipadd = ctx.request.body.datapip
    console.log(ctx.request.body)
    if (pipadd.pip_name !== '') {
      const pip = new Pip({
        pip_name: pipadd.pip_name,
        pip_time: pipadd.pip_time
      })
      pip.save(function(err) {
        if (err) {
          console.log('Конвеер не добавлен' + err)
        } else {
          console.log('Конвеер добавлен')
        }
      });
    } else {
      console.log('Нет нужных данных')
    }
  } else {
    console.log('ddddddddddddddddd')
  }
})

module.exports = router
