const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TaskSchema = new Schema({
    task_name: {
        type: String,
        required: true
    },
    task_time: {
        type: Date,
        default: Date.now,
    }
},{ 
    collection: 'taskuser'
});

module.exports = mongoose.model('TaskSchema', TaskSchema)