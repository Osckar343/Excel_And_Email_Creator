<?php
    include 'errorLog.php';
    
    $firstName = $_POST['firstName'];
    $secondName = $_POST['secondName'];
    $phoneNumber = $_POST['phoneNumber'];
    $creditType = $_POST['statementType'];
    $creditValue = $_POST['statementTypeValue'];
    $curp = $_POST['curp1'].$_POST['curp2'].$_POST['curp3'].$_POST['curp4'].$_POST['curp5'].$_POST['curp6'];
    $rfc = $_POST['rfc1'].$_POST['rfc2'].$_POST['rfc3'];
    $imss = $_POST['imss1'].$_POST['imss2'].$_POST['imss3'];
    $file = $_FILES['file'];

    $generateExcel = false;

    if(!empty($firstName) and !empty($secondName) and !empty($phoneNumber) and !empty($creditType) and !empty($curp) and !empty($rfc) and !empty($imss) and !empty($file)){
      //Extrac image information
      $fileName = $file['name'];
      $fileTmpName = $file['tmp_name'];
      $fileSize = $file['size'];
      $fileError = $file['error'];
      $fileType = $file['type'];

      $fileExt = explode('.',$fileName); //Separate the name of the file with a '.' (EXAMPLE: image.jpg => [image][jpg])
      $fileActualExt = strtolower(end($fileExt));

      $allowedFormats = array('jpg','jpeg','png');

      if(in_array($fileActualExt,$allowedFormats)){ //If the extension is inside the array...
        if($fileError === 0 ){
          if($fileSize < 4000000){ //Size limite of the file (50 MB)
            $fileNameNew = uniqid('', true).".".$fileActualExt; //uniqid avoid repetitive names, even if they are random

            $fileDestination = '../uploads/'.$fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination); //Uploads the file into the folder "uploads";

            //The image was uploaded succesfuly at this point!!
            $generateExcel = true;

          } else {
            printMessageError(1); //the file is too big
          }
        } else {
          printMessageError(2);
        }

      } else {
        printMessageError(3);
      }

    } else {
      printMessageError(4);
    }

?>
