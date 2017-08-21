var express = require('express');
var router = express.Router();
var Base62 = require('base62')

/* GET home page. */
router.get('/', function (req, res, next) {
  const db = require('../db/database.js')
  let test = 1
  db.query("SELECT original FROM links WHERE id =" + test, (err, result) => {
    let originalLink = result.rows[0].original
    console.log(Base62.encode(1))
    console.log(originalLink)
    res.send({ "link": originalLink })
  })
});

module.exports = router;
