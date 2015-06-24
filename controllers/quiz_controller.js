var models = require("../models/models.js");

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


// GET con parametro de busqueda de preguntas /quizes?search=
exports.index = function (req,res) {
	if(req.query.search){ 
	  var buscar = req.query.search.replace(/\s/g,"%");
	  models.Quiz.findAll({where:["pregunta like ?", "%"+buscar+"%"], order: "pregunta ASC"})
	    .then(function(quizes){
		res.render('quizes/index', {quizes: quizes, title: 'Quiz'});
	  })
	} else {
	  models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, title: 'Quiz'});
	  })
	}
};

// GET /quizes/:id
exports.show = function (req,res) {
	res.render('quizes/show', {quiz: req.quiz, title: 'Quiz'});
};

// GET /quizes/:id/answer
exports.answer = function (req,res) {
	if (req.query.respuesta === req.quiz.respuesta) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', title: 'Quiz'});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', title: 'Quiz'});
	}
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');  
  })   // res.redirect: Redirección HTTP a lista de preguntas
};

// GET /quizes/author
exports.author = function (req,res) {
	res.render('quizes/author', {autor: 'Miguel Angel Romero', title: 'Quiz', foto: '/images/foto.jpg'});
};
