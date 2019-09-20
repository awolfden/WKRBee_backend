const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');



// GET ALL ROUTE FOR POSTMAN DEBUGGING ONLY
router.get('/', async (req, res, next) => {

    try {
        const allUsers = await User.find({});

        res.json({
            status: 200,
            data: allUsers
        });

    } catch(err){
        console.log(err)
        res.send(err)
    }
});

//CREATE NEW ROUTE
router.post('/register', async (req, res) => {
    try {
      const password = req.body.password;
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const userDbEntry = {};
      userDbEntry.userName = req.body.userName;
      userDbEntry.userPassword = passwordHash;

      try{
        const foundUser = await User.findOne({'userName' : userDbEntry.userName});

        if(foundUser){
            console.log('User name not available');
            res.json({
                status: 200,
                data: 'User name not available',
                headers: {
                    "Access-Control-Allow-Origin": true
                }
            })
        } else {
            console.log('successful user creation');
            const createdUser = await User.create(userDbEntry);
            req.session.logged = true;
            req.session.usersDbId = createdUser._id;
            req.session.username = createdUser.userName
            
            res.json({
                status: 200,
                data: {
                    msg: `login successful for ${createdUser.userName}`,
                    user: req.session.username,
                    usersDbId: req.session.usersDbId
                }
            });
        }        
      } catch(err) {
          console.log(err);
      }
  
    } catch(err){
      console.log(err);
    }
  });


//LOGOUT USER 
router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err, 'there was an error destroying the session')
        }
    })

    try {
        res.json({
            status: 200,
            data: 'logged user out'
        })
    } catch(err) {
        console.log(err);
    }
})


//LOGIN USER
router.post('/login', async (req, res) => {
    
    try {
        const foundUser = await User.findOne({
            'userName': req.body.userName
        });

        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.userPassword)){
                req.session.logged = true;
                req.session.usersDbId = foundUser._id;
                req.session.username = foundUser.userName;

                res.json({
                    status: 200,
                    data: {
                        msg: `login successful`,
                        user: req.session.username,
                        usersDbId: req.session.usersDbId
                    },
                    headers: {
                        "Access-Control-Allow-Origin": true
                    }
                });
                
              } else {
                res.json({
                    status: 200,
                    data: 'username or password is incorrect'
                });
              }
            } else {
                res.json({
                    status: 200,
                    data: 'username or password is incorrect'
                });
            }
        
    }catch(err) {
        console.log(err);
    }

})
  
//DELETE ROUTE
router.delete('/:id', async (req, res) => {
    console.log('hit delete route');
    
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        console.log(deletedUser);
        res.json({
            status: 200,
            data: deletedUser
        });

    } catch(err) {
        console.log(err);
    }
})

// EDIT ROUTE FOR POSSIBLY IMPLEMENTATION OF PROFILE PAGE AT SOME POINT 
// NOT USED CURRENTLY

router.put('/:id', async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json({
            status: 200,
            data: updatedUser
        })

    } catch(err) {
        console.log(err);
    }
})


// SHOW ROUTE FOR POSSIBLY IMPLEMENTATION OF PROFILE PAGE AT SOME POINT 
// NOT USED CURRENTLY

router.get('/:id', async (req, res, next) => {
try{
    const foundUser = await User.findById(req.params.id);

    res.json({
        status: 200,
        data: foundUser
    })
} catch(err) {
    console.log(err)
}

});


module.exports = router;