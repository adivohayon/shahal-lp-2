<?php
$target_dir = "uploads_cv/";
$target_file = $target_dir .uniqid('cv_')
$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "0";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}


$values = $_POST;

$body = '';
$body .= 'First Name : ' .$values['FIRSTNAME'] ."\r\n";
$body .= 'Last Name : '  .$values['LASTNAME']."\r\n";
$body .= 'Telephone : ' .$values['PHONE1']."\r\n";
$body .= 'Email : ' .$values['EMAIL']."\r\n";
$body .= 'APPROVE_MARKETING : ' .$values['APPROVE_MARKETING']."\r\n";
$body .= 'APPROVE_CALL : ' .$values['APPROVE_CALL']."\r\n";
$body .= 'Source :' . $values['CAMPAIGN_KEY'] ."\r\n";
$body .= 'target_file :' . $target_file ."\r\n";



$fp = fopen('cv_leads.csv', 'a+');

fputcsv($fp, $values);

fclose($fp);


//mail ('editr@shahal.co.il, lizi@shahal.co.il, ravit@gofmans.co.il, liorg@shahal.co.il, oren+shahalleads@jetweb.co.il', 'New lead Shahal' , $body );
mail ('oren@jetweb.co.il', 'New lead Shahal' , $body );
exit;

?>