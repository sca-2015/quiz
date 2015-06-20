var express = require('express');
var router = express.Router();

var quizcontroller = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET question & answer */
router.get('/quizes/question', quizcontroller.question);
router.get('/quizes/answer', quizcontroller.answer);

/* GET author */
router.get('/quizes/author', quizcontroller.author);

module.exports = router;
