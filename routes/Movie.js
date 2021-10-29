const router = require('express').Router();
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const verify = require('../verifyToken');



// CREATE OR ADD MOVIE

router.post('/', verify, async (req, res) => {

    if(req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();

            res.status(200).json(savedMovie); 

        } catch (err) {

            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not allowed to add Movie !');
    }
})

// UPDATE

router.put('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {

        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body,
            },
            { new : true }
            )

            res.status(200).json(updateMovie);

        } catch (err) {

            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You are not allowed to Change anything !')
    }
})


//Get All

router.get("/", verify, async (req, res) => {
    try {
        const movies = await Movie.find();

        res.status(200).json(movies);
        
    } catch (err) {

        res.status(500).json(err);
    }
})

//get by id 



//GET Random
router.get('/random', verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === 'serie') {
            movie = await Movie.aggregate([
                { $match : { isSeries : true } },
                { $sample: { size: 1 } },
            ]);

        } else {
            movie = await Movie.aggregate([
                { $match : { isSeries : false}},
                { $sample: { size: 1} },
            ])
        }

        res.status(201).json(movie);


    } catch (err) {
        res.status(500).json(err);
    }
})



router.get('/:id', verify, async (req, res) => {
    try {
        const response = await Movie.findOne({_id: req.params.id})
        res.status(200).json(response)
    } catch (err) {
        res.status(500).json(err);
    }
})


// DELETE


router.delete('/:id', verify, async (req, res) => {
    if(req.user.isAdmin) {

        try {
            await Movie.findByIdAndDelete(req.params.id)

            res.status(200).json('Movie has been deleted !');

        } catch (err) {

            res.status(500).json(err)
        }
    } else {
        res.status(500).json('You are not allowed to change anything !')
    }
})









module.exports = router;

