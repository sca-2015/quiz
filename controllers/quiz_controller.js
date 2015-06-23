var models = require("../models/models.js");

// GET /quizes
exports.index = function (req,res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, title: 'Quiz'});
	})
};

// GET /quizes/:id
exports.show = function (req,res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz, title: 'Quiz'});
	})
};

// GET /quizes/:id/answer
exports.answer = function (req,res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', {respuesta: 'Correcto', title: 'Quiz'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Quiz'});
		}
	})
};

// GET /quizes/author
exports.author = function (req,res) {
	res.render('quizes/author', {autor: 'Miguel Angel Romero', title: 'Quiz', foto: '/images/foto.jpg'});
};
