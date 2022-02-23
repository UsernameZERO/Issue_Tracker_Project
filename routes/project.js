const express = require('express');
const router = express.Router();

//Addded Controllers
const projectController = require('../controllers/project_controller');
const issueController = require('../controllers/issue_controller');

//Added routes
router.post('/create', projectController.create);
router.get('/:id',projectController.projectPage);
router.post('/create-issue', issueController.create);
router.post('/search-title&desc', projectController.search);
router.post('/filterOut', projectController.filter);
// router.post('/:id/tags', projectController.projectPage);

module.exports = router;