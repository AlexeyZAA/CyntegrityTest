const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    task_name: {
        type: String
    },
    task_time: {
        type: String
    },
    task_user: {
        type: String
    }
},{ 
    collection: 'taskuser'
});

module.exports = mongoose.model('TaskSchema', TaskSchema)