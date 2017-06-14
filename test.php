<?php
	phpinfo();
    if ( 0 < $_FILES['cvFile']['error'] ) {
        echo 'Error: ' . $_FILES['cvFile']['error'] . '<br>';
    }
    else {
        move_uploaded_file($_FILES['cvFile']['tmp_name'], 'uploads_cv/' . $_FILES['cvFile']['name']);
    }

?>