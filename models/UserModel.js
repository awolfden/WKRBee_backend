const mongoose = require('mongoose');
const EmployeeModel = require('./EmployeeModel');

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true},
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: EmployeeModel
    }]
})

module.exports = mongoose.model('User', userSchema); 