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
		res.render('quizes/index', {quizes: quizes, title: 'Quiz', errors: []});
	  })
	} else {
	  models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', {quizes: quizes, title: 'Quiz', errors: []});
	  })
	}
};

// GET /quizes/:id
exports.show = function (req,res) {
	res.render('quizes/show', {quiz: req.quiz, title: 'Quiz', errors: []});
};

// GET /quizes/:id/answer
exports.answer = function (req,res) {
	if (req.query.respuesta === req.quiz.respuesta) {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Correcto', title: 'Quiz', errors: []});
	} else {
		res.render('quizes/answer', {quiz: req.quiz, respuesta: 'Incorrecto', title: 'Quiz', errors: []});
	}
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
console.log("V> " + quiz.validate() + " P> " + quiz.pregunta + " R> " + quiz.respuesta);
// valida y guarda en DB los campos pregunta y respuesta de quiz
    quiz.validate().then(function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then(function(){ 
	       res.redirect('/quizes')}) // res.redirect: Redirección HTTP a lista de preguntas
      }      
    }
  );
};


// GET /quizes/author
exports.author = function (req,res) {
	res.render('quizes/author', {autor: 'Miguel Angel Romero', title: 'Quiz', foto: '/images/foto.jpg', errors: []});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  );
};

// DELETE
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};
