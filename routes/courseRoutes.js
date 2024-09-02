const express = require('express')
const { createCourse } = require('../controllers/courseController')

const router = express.Router()

router.post('/course/create', createCourse)

module.exports = router