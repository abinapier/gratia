const express = require('express');
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
const { Pool } = require('pg');
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;


const connectionString = process.env.DATABASE_URL || "postgres://yuxepmxcwsfddy:b10bafa234871212b3332090112be0d3b455414cb919f0edb30b46c15591bd8c@ec2-18-214-211-47.compute-1.amazonaws.com:5432/d1j3tgksg948o8";
const pool = new Pool({connectionString: connectionString});


// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('handle',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(request.body);
});

// add router in the Express app.
app.use("/", router);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.render('pages/index');
});
app.post('/login', handleLogin);
app.get('/viewCreateAccount', handleCreateAccount);
app.post('/createNewAccount', handleNewAccount);
app.get('/addEntry', handleAddEntry);
app.get('/detail', handleDetail);
app.get('/edit', handleEdit);
app.get('/delete', handleDelete)

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/


function handleLogin(request, response) {

	const email = request.body.email;
	const password = request.body.password;
	//var hashedPassword = passwordHash.generate(password);

	console.log(passwordHash.verify('password123', hashedPassword));
	//const weight = Number(request.query.weight);
	console.log(email);

	// TODO: 

	response.end();
}

function handleNewAccount(request, response){

}

function handleCreateAccount(request, response) {

	//response.render('pages/index', {overlay: '<div>Hi!</div>'});

	// TODO: 

	
}

function handleAddEntry(request, response) {

	//const weight = Number(request.query.weight);
	console.log("add entry");

	// TODO: 

	response.end();
}
function handleDetail(request, response) {

	//const weight = Number(request.query.weight);
	console.log("view detail");

	// TODO: 

	response.end();
}
function handleEdit(request, response) {

	//const weight = Number(request.query.weight);
	console.log("edit entry");

	// TODO: 

	response.end();
}
function handleDelete(request, response) {

	//const weight = Number(request.query.weight);
	console.log("delete entry");

	// TODO: 

	response.end();
}
