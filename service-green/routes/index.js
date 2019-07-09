const express = require('express');
const router = express.Router();

const VoteModel = require('../models/VoteModel');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    if (req.query.choice) {
      const newVote = new VoteModel({ choice: req.query.choice });
      const saveRes = await newVote.save();
    }

    const spaces = await VoteModel.count({ choice: 'spaces' }).exec();
    const tabs = await VoteModel.count({ choice: 'tabs' }).exec();

    return res.json({ spaces, tabs });
  } catch(err) {
    console.log(err);
    return next(err);
  }
});

module.exports = router;
