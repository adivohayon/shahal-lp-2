console.log('\'Allo \'Allo!');
const index = app.templates.index();
$('body').html(index);
// console.log(index);
// import swal from 'sweetalert2';
$(document).ready(function() {
	$('.form-success-container').hide();
	function submitForm(formType) {
		$('#' + formType + '-form').submit(function (e) {
		    e.preventDefault();

		    // $("input[type='submit']").addClass("loading");

		    var name = $('#' + formType + '-name').val();
		    var phone = $('#' + formType + '-phone').val();
		    var phoneFirst = $('#' + formType + '-phone-first').val();
		    var email = $('#' + formType + '-email').val();
		    var go = true;

		    if (!name) {
		        go = false;
		         $('#' + formType + '-name').addClass('error');
		    } 
		    if (!phone) {
		        go = false;
		        $('#' + formType + '-phone').addClass('error');
		    }
		    if (!phoneFirst) {
		        go = false;
		        $('#' + formType + '-phone-first').addClass('error');
		    }

		    var cvFile= $( '#file-upload' ).val();
		    console.log('cvFile', cvFile);
		    if (!cvFile) {
		    	 console.log('no cvFile', cvFile);
		    	$('#' + formType + '-form .upload-file-button').addClass('error');
		    	go = false;
		    }

		    var ext = cvFile.split('.').pop();
		    if(ext=='pdf' || ext=='docx' || ext=='doc'){
		    	// console.log('aaaaa')
		        
		    } else {
		    	go = false;
		    	$('#' + formType + ' .upload-file-button').addClass('error');
		    }

		    
		   
		    if (!go){
		        return;
		    }
			
		    var index = name.indexOf(' ');  // Gets the first index where a space occours
		    var firstName, lastName = '';
			if (index == -1){
				firstName = name; // Gets the first part
				lastName = '';
				
			} else {
				firstName = name.substr(0, index); // Gets the first part
				lastName = name.substr(index + 1);
			}
			var fullPhone = phoneFirst + ' ' + phone;
		    var $url = 'http://web2lead.shahal.co.il/web2lead/';  
		    var $values = {
		        FIRSTNAME: firstName,
		        LASTNAME: lastName,
		        EMAIL: email,
		        PHONE1: fullPhone,
		        CAMPAIGN_KEY: 'facebookms',
		        REDIRECTURL: '',
				CITYNAME: '',
		        ERRORURL: '',
		        numberOfNames: 5,
		        Pid: 443,
		        Sid: 67,
		        strCAPTCHA: 'E301'

		    };

		    // $.get($url, $values).done(function (res) { 
		    //     // fbq('track', 'shachal_lead');
      //   	    $('#' + formType + '-form .hide-on-success').hide();
      //           $('#' + formType + '-form .form-success-container').show();
		    // });

		    // swal('נשלח בהצלחה');
		    
		    $('#' + formType + '-form .hide-on-success').hide();
	        $('#' + formType + '-form .form-success-container').show();
	        var files = $('#file-upload').prop('files');
	        console.log(files);
	        var data  = new FormData();
	        data.append(cvFile, files[0]);

		    var cv_url = 'http://dev.jetwebserver.com/shahal/postcv.php';

		    console.log('cvFile', data);
		    // $.ajax({
		    //     url: 'http://dev.jetwebserver.com/shahal/postcv.php',
		    //     data: data,
		    //     cache: false,
		    //     contentType: 'multipart/form-data',
		    //     processData: false,
		    //     type: 'POST',
		    //     success: function(data){
		    //         console.log('success',data);
		    //     },
		    //     error: function(resp) {
		    //     	console.log('error', resp);
		    //     }
		    // });


		    $.post($cv_url, $mail_values).done(function (res) { 
		    	console.log(res);
		    });

		    $('#' + formType + '-form').submit(function () {
		        return;
		    });
		    e.preventDefault();
		});
	}

	submitForm('desktop-lead');
	submitForm('mobile-lead');
	$('.upload-file-button').click(function(e) {
		e.preventDefault();
		$('#file-upload').trigger('click');
	});

	$( '#file-upload' ).on('change', function() {
		var cvFile= $( '#file-upload' ).val();
		$('.file-selected').append(cvFile);
	});


	$('.send-cv').click(function(e) {
		e.preventDefault();

		var job = $(this).attr('data-job');
		console.log(job);
		$('#desktop-lead-job option[value=' + job +']').attr('selected','selected');
		$('#desktop-lead-job').val(job);
		$('#mobile-lead-job option[value=' + job +']').attr('selected','selected');
		$('#mobile-lead-job').val(job);
		$('body').animate({'scrollTop': '0px'}, 300);
	});
});
