var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, 
			{dialect:"sqlite", storage:"quiz.sqlite"});

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
//success(...) ejecuta el manejador una vez ejecutada con éxito la operación sobre la que se
//	aplica success
sequelize.sync().success(function() {
	Quiz.count().success(function(count){
		//la tabla se inicializa sólo si está vacía
		if(count==0){ 
			Quiz.create({ pregunta: "Capital de Italia",
				      respuesta: "Roma"
				    })
			.success(function(){console.log("Base de datos inicializada")});
		};
	});
});
