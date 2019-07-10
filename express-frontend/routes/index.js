const express = require('express');
const router = express.Router();
const request = require('request');

const votes = {
  spaces: [],
  tabs: [],
};

const visits = [];

module.exports = () => {

  router.get('/', async (req, res, next) => {
    try {

      // const str = new Array(100000).join('*');


      if (req.query.choice && req.query.choice !== 'spaces' && req.query.choice !== 'tabs') {
        return res.status(400).end();
      }
      const httpres = request.get(`http://localhost:3001?choice=${req.query.choice}`, (e, r) => {
        if (e) return next(e);
        return res.render('index', JSON.parse(r.body));
      });

    } catch (err) {
      return next(err);
    }
  });


  router.get('/traces', (req, res, next) => {
    const host = req.headers['host'];
    return res.redirect(`http://${host}:16686`);
  });

  router.get('/metrics', (req, res, next) => {
    const host = req.headers['host'];
    return res.redirect(`http://${host}:3000`);
  });


  return router;
}

