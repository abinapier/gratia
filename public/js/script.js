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
	$('#children').append(form);
}

function closeOverlay(){
	$('#overlay').hide();
	var e = document.getElementById("children"); 
        
	//e.firstElementChild can be used. 
	var child = e.lastElementChild;  
	while (child) { 
		e.removeChild(child); 
		child = e.lastElementChild; 
	} 
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
	$('#children').append(form);
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

function viewEntryDetail(id){

	data = {entryId: id};
	$.ajax({
		type: 'post',
		url: '/detail',
		data: data
	})
	.done(function(entry){
		var date = new Date(entry.dateadded);
		var form = "<h1>"+date.toDateString()+"</h1>";
		form += "<p>"+entry.content+"</p>"
		form += "<a onclick='viewEditEntry("+entry.id+")' class='italic pink link'>edit entry</a>"
		$('#overlay').show();
		$('#children').append(form);
		
	});
	
}

function viewEditEntry(id){
	data = {entryId: id};
	$.ajax({
		type: 'post',
		url: '/edit',
		data: data
	})
	.done(function(entry){
		
		closeOverlay();
		var form = "<h1>Edit Entry</h1>";
		form += "<form>";
		form += "<textarea name='newContent' required>"+entry.content+"</textarea>"
		form += "<input type='button' value='Save Changes' onclick='saveEntryEdits("+entry.id+")'>";
		form += "</form>";
		form += "<a onclick='viewDeleteConfirmation("+entry.id+")' class='italic pink link'>delete entry</a>";
		$('#overlay').show();
		$('#children').append(form);
		
	});
}

function saveEntryEdits(id){
	const newContent = $('textarea[name="newContent"]').val();
	data = {entryId: id, content: newContent};
	$.ajax({
		type: 'post',
		url: '/saveEdit',
		data: data
	})
	.done(function(entry){
		location.reload();
		
	});
}

function viewDeleteConfirmation(id){
	data = {entryId: id};
	$.ajax({
		type: 'post',
		url: '/viewDeleteConfirmation',
		data: data
	})
	.done(function(entry){
		closeOverlay();
		var date = new Date(entry.dateadded);
		var form = "<h1>Delete entry from "+date.toDateString()+"?</h1>";
		form += "<p>"+entry.content+"</p>"
		form += "<input type='button' value='Delete Entry' onclick='deleteEntry("+entry.id+")'>";
		$('#overlay').show();
		$('#children').append(form);
		
	});
}

function deleteEntry(id){
	data = {entryId: id};
	$.ajax({
		type: 'post',
		url: '/delete',
		data: data
	})
	.done(function(){
		location.reload();
	});
}