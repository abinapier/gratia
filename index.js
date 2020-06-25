const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/login', handleLogin);
app.get('/createAccount', handleCreateAccount);

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

	const email = request.query.email;
	const password = request.query.password;
	//const weight = Number(request.query.weight);
	console.log(email);

	// TODO: 

	response.end();
}

function handleCreateAccount(request, response) {

	//const weight = Number(request.query.weight);
	console.log("create account");

	// TODO: 

	response.end();
}

