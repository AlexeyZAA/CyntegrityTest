const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PipSchema = new Schema(
  {
    pip_user: {
      type: String
    },
    pip_name: {
      type: String
    },
    pip_time: {
      type: String
    },
    pip_task: {
      type: []
    }
  },
  {
    collection: 'pipuser'
  }
)

module.exports = mongoose.model('PipSchema', PipSchema)
