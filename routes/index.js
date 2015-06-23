var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

<<<<<<< HEAD
//Autoload de comandos con :quizId
router.param("quizId", quizController.load);

=======
>>>>>>> e6ecaec5d6d4b5f97d03c8ce4a2da9f525446fc4
// Definición de rutas de /quizes (varias preguntas)
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

/* GET author */
router.get('/quizes/author', quizController.author);

module.exports = router;
