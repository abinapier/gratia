function getJSON(){
	let one = document.getElementsByName('num-one')[0].value;
	let two = document.getElementsByName('num-one')[0].value;
	let operate = document.getElementsByName('operator')[0].value;

	let url ="/math_service?num-one="+one+"&operator="+encodeURIComponent(operate)+"&num-two="+two;

	$.ajax({ success: function(result){
    	window.location.href = url;
  }});
}