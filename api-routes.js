
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Getir crafted with love!'
    });
});

var requestController = require('./requestController');

router.route('/')
    .post(requestController.new);


module.exports = router;