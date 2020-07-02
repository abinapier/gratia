function viewCreateAccount(){
	
	var form = "<h1>Create a New Account</h1>";
	form += "<form>";
	form += "<label class='italic'>First Name: <input type='text' name='createFirstName' required></label>";
	form += "<label class='italic'>Last Name: <input type='text' name='createLastName' required></label>";
	form += "<label class='italic'>Email: <input type='email' name='createEmail' required></label>";
	form += "<label class='italic'>Password: <input type='password' name='createPassword' required></label>";
	form += "<input type='button' value='Create Account' onclick='createNewAccount()'";


	form += "</form>";
	
	$('#overlay').show();
	$('#overlayContent').append(form);
}

function closeOverlay(){
	$('#overlay').hide();
}

function createNewAccount(){
	const firstNameStr = $('input[name="createFirstName"]').val();
	const lastNameStr = $('input[name="createLastName"]').val();
	const emailStr = $('input[name="createEmail"]').val();
	const passwordStr= $('input[name="createPassword"]').val();

	var data = { firstName: firstNameStr, lastName: lastNameStr, email: emailStr, password: passwordStr }
	if(firstNameStr && lastNameStr && emailStr && passwordStr){
		$.ajax({
            type: 'post',
            url: '/createNewAccount',
            data: data
        })
        .done(function(){
			location.reload();
			
        });
	}
	return;
}

function logout(){
	data = {}
	$.ajax({
		type: 'post',
		url: '/logout',
		data: data
	})
	.done(function(){
		location.reload();
		
	});
}

function login(){
	const emailStr = $('input[name="email"]').val();
	const passwordStr= $('input[name="password"]').val();
	data = {email: emailStr, password: passwordStr};
	$.ajax({
		type: 'post',
		url: '/login',
		data: data
	})
	.done(function(){
		location.reload();
		
	});
}

function addEntryView(){
	var form = "<h1>Add an Entry for Today</h1>";
	form += "<form>";
	form += "<textarea name='newContent' required></textarea>"
	form += "<input type='button' value='Add Entry' onclick='addNewEntry()'";
	form += "</form>";
	
	$('#overlay').show();
	$('#overlayContent').append(form);
}

function addNewEntry(){
	const newContent = $('textarea[name="newContent"]').val();
	var today = new Date();
	const date= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	data = {content: newContent, date: date};
	$.ajax({
		type: 'post',
		url: '/addEntry',
		data: data
	})
	.done(function(){
		location.reload();
		
	});
}