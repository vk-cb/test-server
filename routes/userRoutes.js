const express = require('express')
const { userRegister, userLogin, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const router = express.Router()

router.post('/create',userRegister)
router.post('/login',userLogin)
router.get('/get',getAllUsers)
router.get('/get/:id',getUserById)
router.put('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser)

module.exports = router;
