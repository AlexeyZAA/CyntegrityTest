const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PipSchema = new Schema(
  {
    pip_name: {
      type: String
    },
    pip_time: {
      type: Date
    }
  },
  {
    collection: 'pipuser'
  }
)

module.exports = mongoose.model('PipSchema', PipSchema)
