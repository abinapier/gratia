const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up a rule that says requests to "/math" should be handled by the
// handleMath function below
app.get('/getPerson', handlePerson);

// start the server listening
app.listen(port, function() {
  console.log('Node app is running on port', port);
});


/**********************************************************************
 * Ideally the functions below here would go into a different file
 * but for ease of reading this example and seeing all of the pieces
 * they are listed here.
 **********************************************************************/

function handlePerson(request, response) {

	const id = request.query.id;
	//const weight = Number(request.query.weight);
	console.log(id);

	// TODO: 

	response.end();
}

