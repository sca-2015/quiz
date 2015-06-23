var path = require('path');

//Postgres DATABASE_URL=postgres://user:password@host:port/database
//SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE; //Solo en local en fichero .env

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
			{dialect:dialect,
			 protocol:protocol,
			 port:port,
			 host:host,
			 storage:storage, //Solo para SQLite (.env)
			 omitNull:true    //Solo para Postgres
			}); 

//Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Exportar definición de la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
//then(...) ejecuta el manejador una vez ejecutada con éxito la operación sobre la que se
//	aplica success
sequelize.sync().then(function() {
	Quiz.count().then(function(count){
		//la tabla se inicializa sólo si está vacía
		if(count===0){ 
			Quiz.create({ pregunta: "Capital de Italia",
				      respuesta: "Roma"
				    });
			Quiz.create({ pregunta: "Capital de Portugal",
				      respuesta: "Lisboa"
				    })
			.then(function(){console.log("Base de datos inicializada")});
		};
	});
});
