const express = require('express');
const router = express.Router();
const {UserModel} = require("../modals/user.model"); 
const Calculation = require("../modals/calculation.model"); 


router.post('/calculateBMI', (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ error: 'You must be logged in to access this route' });
    }
    const { height, weight } = req.body;
    const bmi = weight / Math.pow(height, 2);
    const calculation = new Calculation({
        userId: req.userId,
        bmi,
        weight,
        height
    });
    calculation.save()
        .then(() => res.json({ bmi }))
        .catch(error => res.status(500).json({ error }));
});

router.get('/calculationHistory', (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ error: 'You must be logged in to access this route' });
    }
    Calculation.find({ userId: req.userId })
        .then(calculations => res.json(calculations))
        .catch(error => res.status(500).json({ error }));
});

module.exports = router;