const express = require('express');
const router = express.Router();

const projectController = require('../controllers/project_controller');

router.get('/', projectController.mainPage);

router.use('/project', require('./project'));
module.exports = router;