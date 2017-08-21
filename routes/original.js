var express = require('express');
var router = express.Router();
var Base62 = require('base62')
var base62 = require('base-62')
/* GET home page. */
router.get('/:id', function (req, res, next) {
    const db = require('../db/database.js')
    const id = Base62.decode(req.params.id)
    console.log(Base62.encode(28474575))
    db.query("SELECT original FROM links WHERE id =" + id, (err, result) => {
        if (err) {
            console.log(result)
            res.send('link not found')
        } else {
            console.log()
            res.redirect(result.rows[0].original)
        }
    })
});

module.exports = router;