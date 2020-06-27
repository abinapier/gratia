const express = require('express');
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
require('dotenv').config();
const { Pool } = require('pg');
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;


const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString: connectionString,
	ssl: {
		rejectUnauthorized: false}
		
});



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
	

	console.log(passwordHash.verify(password, hashedPassword));
	
	console.log(email);

	// TODO: 

	response.end();
}

function handleNewAccount(request, response){
	const firstName = request.body.firstName;
	const lastName = request.body.lastName;
	const email = request.body.email;
	const password = request.body.password;

	var hashedPassword = passwordHash.generate(password);
	var sql = "INSERT INTO users (firstName, lastName, email, password) VALUES('"+firstName+"', '"+lastName+"', '"+email+"', '"+hashedPassword+"')";

	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		if (res !== undefined) {
			// log the response to console
			console.log("Postgres response:", res);
		
			// get the keys for the response object
			var keys = Object.keys(res);
		
			// log the response keys to console
			console.log("\nkeys type:", typeof keys);
			console.log("keys for Postgres response:", keys);
		
			if (res.rowCount > 0) {
			  console.log("# of records inserted:", res.rowCount);
			} else {
			  console.log("No records were inserted.");
			}
		  }
	});

	
	response.render('pages/index');
	
}

function handleCreateAccount(request, response) {
	
	
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