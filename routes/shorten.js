var express = require('express');
var router = express.Router();
var Base62 = require('base62')
var valid = require('url-valid');
var validator = require('validator');
router.get('/new/(*)', function (req, res, next) {
  console.log(req.originalUrl.substring(5))
  const db = require('../db/database.js')
  const text = 'INSERT INTO links(original) VALUES($1)'
  const values = [req.originalUrl.substring(5)]
  const original = req.originalUrl.substring(5)
  const domain = 'lnk-sh.herokuapp.com/'
  if (validator.isURL(original)) {
    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack)
      } else {
        db.query("SELECT * FROM links WHERE original ='" + original + "'", (err, result) => {
          const encoded = domain + Base62.encode(result.rows[0].id)
          res.send({ "shorten": encoded, "original": result.rows[0].original })
        })
      }
    })
  } else {
    res.send("NOT A VALID URL. MUST BEGIN WITH HTTPS/HTTP.")
  }
});

module.exports = router;