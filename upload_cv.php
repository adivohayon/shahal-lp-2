<?php

if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'];
}
else {
	if ($_FILES['file']["size"] > 500000) {
	    echo "Sorry, your file is too large.";
	} else {
	    if (move_uploaded_file($_FILES['file']['tmp_name'], 'uploads_cv/' . $_FILES['file']['name'])) {
	    	echo $_FILES['file']['tmp_name'];
	    };
	    // echo 'success';
	}
}

?>