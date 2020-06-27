function viewCreateAccount(){
	
	var form = "<h1>Create a New Account</h1>";
	form += "<form action='/createNewAccount' method='post'>";
	form += "<label class='italic'>First Name: <input type='text' name='firstName' required></label>";
	form += "<label class='italic'>Last Name: <input type='text' name='lastName' required></label>";
	form += "<label class='italic'>Email: <input type='email' name='email' required></label>";
	form += "<label class='italic'>Password: <input type='password' name='password' required></label>";
	form += "<input type='submit' value='Create Account'>";

	form += "</form>";
	
	$('#overlay').show();
	$('#overlayContent').append(form);
}

function closeOverlay(){
	$('#overlay').hide();
}

function createNewAccount(){
	
}