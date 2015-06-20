// GET /quizes/question
exports.question = function (req,res) {
	res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Quiz'});
};

// GET /quizes/answer
exports.answer = function (req,res) {
	if (req.query.respuesta === 'Roma') {
		res.render('quizes/answer', {respuesta: 'Correcto', title: 'Quiz'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Quiz'});
	}
};

// GET /quizes/author
exports.author = function (req,res) {
	res.render('quizes/author', {autor: 'Miguel Angel Romero', title: 'Quiz', foto: '/images/foto.jpg'});
};
