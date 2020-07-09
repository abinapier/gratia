const express = require('express');
var session = require('express-session');
const bodyParser = require("body-parser");
const passwordHash = require('password-hash');
require('dotenv').config();
const { Pool } = require('pg');
const router = express.Router();
const app = express();
app.use(session({secret: 'ssshhhhh',saveUninitialized: false,resave: false}));

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
app.get('/', handleMain);
app.post('/login', handleLogin);
app.post('/logout', handleLogout);
app.get('/viewCreateAccount', handleCreateAccount);
app.post('/createNewAccount', handleNewAccount);
app.post('/addEntry', handleAddEntry);
app.post('/detail', handleDetail);
app.post('/edit', handleEdit);
app.post('/saveEdit', handleSaveEdit);
app.post('/viewDeleteConfirmation', handleDetail)
app.post('/delete', handleDelete);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/
var ssn;
function handleMain(request, response){
	console.log('mainHandler');
	if(!ssn){
		console.log('set');
		ssn = request.session; 
		
	}
	if(ssn.user){
		console.log('ssn');
		app.locals.entryPage = true;
		createLoggedInView(request, response);
		
	}else {
		console.log('session not set');
		entrypage = null;
		response.render('pages/index');
		return;
	}
	
}

function createLoggedInView(request, response){
	
	var sql = "SELECT * FROM journalentry WHERE usersid="+ssn.user;
	let entries=[];
	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		
		if (res !== undefined) {
			console.log(res);
			for(var i = res.rows.length-1; i>=0; i--){
				let curEntry = {date: res.rows[i].dateadded, content: res.rows[i].content, id: res.rows[i].id};
				entries.push(curEntry);
			}
			console.log('entries: ', entries);
			var sql = "SELECT firstname FROM users WHERE id="+ssn.user;

			pool.query(sql, function(err, res) {
				// If an error occurred...
				if (err) {
					console.log("Error in query: ")
					console.log(err);
				}
				if (res !== undefined) {
					//console.log(res.rows[0].firstname);
					var name = res.rows[0].firstname;
					data = {entrypage: 'true', entries: entries, name: name};
				
					response.render('pages/index', data);
				}
			});
		
		}
		  
	});

	
}


function handleLogout(request, response){
	console.log('loggin out');
	request.session.destroy((err) => {
		ssn = null;
        if(err) {
            return console.log(err);
        }
        
	});
	response.redirect('/');
}

function handleLogin(request, response) {

	const email = request.body.email;
	const password = request.body.password;

	console.log(email);
	console.log(passwordHash);

	var sql = "SELECT email, password, id FROM users";

	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		if (res !== undefined) {
			for(var i = 0; i< res.rows.length; i++){
				//console.log(res.rows[i].email);
				if(res.rows[i].email == email){
					console.log("email match");
					if(passwordHash.verify(password, res.rows[i].password)){
						console.log("valid login");
						ssn.user = res.rows[i].id;
					}
					break;
				}
			}
		
		}

		if(ssn.user){
			createLoggedInView(request, response);
		}else {
			response.render('pages/index');
			return;
		}
		response.end()
		  
	});
	
}

function handleNewAccount(request, response){
	
	const firstName = request.body.firstName;
	const lastName = request.body.lastName;
	const email = request.body.email;
	const password = request.body.password;

	var hashedPassword = passwordHash.generate(password);
	var sql = "INSERT INTO users (firstName, lastName, email, password) VALUES('"+firstName+"', '"+lastName+"', '"+email+"', '"+hashedPassword+"') RETURNING id";

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
			  console.log("id:", res.rows[0].id);
			  ssn.user = res.rows[0].id;
			} else {
			  console.log("No records were inserted.");
			}
		}
		if(ssn.user){
			createLoggedInView(request, response); 
		}else {
			response.render('pages/index');
			return;
		}
		  
	});

	
	
}

function handleCreateAccount(request, response) {
	
	
}

function handleAddEntry(request, response) {
	console.log("add entry");
	const content = request.body.content;
	const date = request.body.date;
	var sql = "INSERT INTO journalentry (dateadded, content, usersid) VALUES('"+date+"', '"+content+"', '"+ssn.user+"') RETURNING id";

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
			  createLoggedInView(request, response); 
			} else {
			  console.log("No records were inserted.");
			}
		}
		
		  
	});
 
}
function handleDetail(request, response) {

	//const weight = Number(request.query.weight);
	console.log("view detail");

	// TODO: const content = request.body.content;
	const id = request.body.entryId;
	var sql = "SELECT * FROM journalentry WHERE id="+id;

	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		if (res !== undefined) {
			//console.log(res.rows[0].firstname);
			var entry = res.rows[0];
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(entry));
		}else{
			console.log('nothing selected');
		}
	});
}
function handleEdit(request, response) {

	//const weight = Number(request.query.weight);
	console.log("edit entry");

	// TODO: 
	const id = request.body.entryId;
	var sql = "SELECT * FROM journalentry WHERE id="+id;

	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		if (res !== undefined) {
			//console.log(res.rows[0].firstname);
			var entry = res.rows[0];
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(entry));
		}
	});
}
function handleDelete(request, response) {

	//const weight = Number(request.query.weight);
	console.log("delete entry");

	// TODO: 

	const id = request.body.entryId;
	var sql = "DELETE FROM journalentry WHERE id="+id;

	pool.query(sql, function(err, res) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
		}
		if (res !== undefined) {
			//console.log(res.rows[0].firstname);
			var entry = res.rows[0];
			response.end();
		}
	});

	
}

function handleSaveEdit(request, response) {
	console.log("updating entry");
	const content = request.body.content;
	const id = request.body.entryId;
	var sql = "UPDATE journalentry SET content = '"+content+"' WHERE id="+id;

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
		
		}else{
			console.log("no update");
		}

		response.end()
		
		  
	});
}
