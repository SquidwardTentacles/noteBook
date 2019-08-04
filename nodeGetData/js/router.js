const express = require('express')
const router = express.Router()
const service = require('./serve')

router.post('/saveData',service.saveData)
module.exports = router