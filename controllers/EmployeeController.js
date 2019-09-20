const express = require('express');
const router = express.Router();
const Employee = require('../models/EmployeeModel');



// GET ALL ROUTE
router.get('/', async (req, res) => {
    try {
        const allEmployees = await Employee.find();
        res.json({
            status: 200,
            data: allEmployees
        });

    } catch(err){
        console.log(err)
        res.send(err)
    }
});

//CREATE NEW ROUTE
router.post('/', async (req, res) => {
    try {
      const createdEmployee = await Employee.create(req.body);
      const updatedUserEmployee = await Employee.findByIdAndUpdate(createdEmployee._id, {user : req.session.usersDbId}, {new: true});

      res.json({
        status: 200,
        message: 'successfully added employee',
        data: updatedUserEmployee
      });
  
    } catch(err){
      console.log(err);
    }
  });
  
//DELETE ROUTE

router.delete('/:id', async (req, res) => {

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        //console.log(deletedEmployee);
        res.json({
            status: 200,
            data: deletedEmployee
        });

    } catch(err) {
        console.log(err);
    }
})


//EDIT ROUTE

router.put('/:id', async (req, res) => {

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updatedEmployee
        })

    } catch(err) {
        console.log(err);
    }
})


// SHOW ROUTE - CREATED FOR BACKEND, BUT DEALT WITH FILTERING ON THE FRONT END
// DECIDED IT WOULD BE MORE EFFICIENT THIS WAY BC OF HOW THE USER FLOW WAS SET UP
router.get('/:id', async (req, res, next) => {
    try{
        const foundEmployee = await Employee.findById(req.params.id);

        res.json({
            status: 200,
            data: foundEmployee
        })
    } catch(err) {
        console.log(err)
    }

});


module.exports = router;