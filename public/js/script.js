function viewCreateAccount(){
	
	var form = "<h1>Create a New Account</h1>";
	form += "<form>";
	form += "<label class='italic'>First Name: <input type='text' name='createFirstName' required></label>";
	form += "<label class='italic'>Last Name: <input type='text' name='createLastName' required></label>";
	form += "<label class='italic'>Email: <input type='email' name='createEmail' required></label>";
	form += "<label class='italic'>Password: <input type='password' name='createPassword' required></label>";
	form += "<input type='submit' value='Create Account' onclick='createNewAccount()'>";

	form += "</form>";
	
	$('#overlay').show();
	$('#overlayContent').append(form);
}

function closeOverlay(){
	$('#overlay').hide();
}

function createNewAccount(){
	const firstName = $('input[name="createFirstName"]').val();
	const lastName = $('input[name="createLastName"]').val();
	const email = $('input[name="createFirstName"]').val();
}