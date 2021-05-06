<?php

  function printMessageError($errorID){

    if($errorID === 1)
      $messageError = 'Your file is too big. (MAX: 4MB) (ERROR: 1)';
    if($errorID === 2)
      $messageError = 'There was an error uploading your file. (ERROR: 2)';
    if($errorID === 3)
      $messageError = 'This type file is not allowed. (ERROR: 3)';
    if($errorID === 4)
      $messageError = 'There is empty fields. (ERROR: 4)';
    if($errorID === 5)
      $messageError = 'The Excel file was not created. (ERROR: 5)';
    if($errorID === 6)
      $messageError = 'There was a problem getting the information (ERROR: 6)';

    $string = '<p class="php_messages">
                Server: '.$messageError.'
               </p>
              <br><br>';


   echo $string;
 }
?>
