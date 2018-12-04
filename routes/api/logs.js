const express = require('express')
const router = express.Router()

// @route GET api/logs/test
// @desc  Tests logs route
// @access Public
router.get('/test', (req, res)=> res.json({msg: 'logs works'}))

module.exports = router