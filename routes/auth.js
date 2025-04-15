const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', (req, res) => res.render('auth/login', { error: null }));
router.post('/student/login', authController.studentLogin);
router.post('/admin/login', authController.adminLogin);
router.get('/logout', authController.logout);

module.exports = router;