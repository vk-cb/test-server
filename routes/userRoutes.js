const express = require('express')
const { userRegister, userLogin, getAllUsers, getUserById, updateUser } = require('../controllers/userController')
const router = express.Router()

router.post('/create',userRegister)
router.post('/login',userLogin)
router.get('/get',getAllUsers)
router.get('/get/:id',getUserById)
router.put('/update/:id',updateUser)

module.exports = router;
