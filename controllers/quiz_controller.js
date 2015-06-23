var models = require("../models/models.js");

<<<<<<< HEAD
//Autoload - factoriza el código si la ruta incluye el parámetro :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz){
		  req.quiz = quiz;
		  next();
		} else {
		  next(new Error("No existe quizId="+quizId));
		}
	}).catch(function(error){ next(error);});
};

=======
>>>>>>> e6ecaec5d6d4b5f97d03c8ce4a2da9f525446fc4
// GET /quizes
exports.index = function (req,res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, title: 'Quiz'});
	})
};

// GET /quizes/:id
exports.show = function (req,res) {
<<<<<<< HEAD
	res.render('quizes/show', {quiz: req.quiz, title: 'Quiz'});
=======
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz, title: 'Quiz'});
	})
>>>>>>> e6ecaec5d6d4b5f97d03c8ce4a2da9f525446fc4
};

// GET /quizes/:id/answer
exports.answer = function (req,res) {
<<<<<<< HEAD
	if (req.query.respuesta === req.quiz.respuesta) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', title: 'Quiz'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', title: 'Quiz'});
	}
=======
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto', title: 'Quiz'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Quiz'});
		}
	})
>>>>>>> e6ecaec5d6d4b5f97d03c8ce4a2da9f525446fc4
};

// GET /quizes/author
exports.author = function (req,res) {
	res.render('quizes/author', {autor: 'Miguel Angel Romero', title: 'Quiz', foto: '/images/foto.jpg'});
};
