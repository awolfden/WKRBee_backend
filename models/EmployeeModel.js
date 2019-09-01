const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    middleInitial: String,
    lastName: String,
    dateOfBirth: String,
    dateOfEmployment: String,
    status: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    }
})

const workout = mongoose.model('EmployeeModel', employeeSchema);

module.exports = workout;