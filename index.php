$(document).ready(function() {

    $("#feedBackForm").on("submit", function(event) {
	event.preventDefault()
	var captcha = grecaptcha.getResponse();

	if (!captcha.length) {
	    $('#recaptchaError').text('* Вы не прошли проверку капчей');
	} else {
	    $('#recaptchaError').text('');

	    let dataForm = $(this).serialize()

	    $.ajax({
		url: '/form.php',
		method: 'post',
		dataType: 'html',
		data: dataForm,
		success: function(data){
			console.log(data);
			grecaptcha.reset();
		}
	    });

	}
		
   })

})