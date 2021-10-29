const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');




// UPDATE

router.put('/:id', verify, async (req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
       
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString;
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
              $set: req.body,
            },
            { new: true }
            );

          res.status(200).json(updateUser);  

        } catch (err) {

            res.status(500).json(err);

        }


    } else {
        res.status(401).json('You can update only your account.')
    }

})


// DELETE

router.delete('/:id', verify, async (req, res) => {

    if(req.user.id === req.params.id || req.user.isAdmin) {

        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json('User has been deleted !');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can delete only your account');
    }

})


// GET ONE

router.get('/find/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user) 
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET ALL 

router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {

        try {
            const users = query ? await User.find().sort({_id: -1}).limit(2) : await User.find();

            res.status(200).json(users);

        } catch (err) {

            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You are not allowed to get all users !');
    }

})


// STATS


router.get('/stats', verify, async (req, res) => {

    try {

        const data = await User.aggregate({
            $project: {
                month : { $year : '$createAt' },
            },
            $group: {
                _id : $month,
                total: { $sum : 1}   
            }
        })

        res.status(200).json(data);
    } catch (err) {
        res.status(403).json(err);
    }
})





module.exports = router;