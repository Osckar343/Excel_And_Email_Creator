<?php
    include 'getInfoFromForm.php';


    require_once "PHPExcel.php";
    include 'PHPExcel/IOFactory.php';
    include 'PHPExcel/Style.php';
    require_once 'PHPExcel/Cell/AdvancedValueBinder.php';

    function setCellColor($cellPosition,$colorRGB,$objPHPExcel){
      $objPHPExcel->getActiveSheet()
      ->getStyle($cellPosition)
      ->getFill()
      ->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
      ->getStartColor()
      ->setRGB($colorRGB);
    }

    function setBorder($cellPosition,$typeBorder,$objPHPExcel){
      $BStyle = array('borders' => array($typeBorder => array('style' => PHPExcel_Style_Border::BORDER_THIN)));
      $objPHPExcel->getActiveSheet()
      ->getStyle($cellPosition)
      ->applyFromArray($BStyle);
    }

    function boldText($text,$cell,$objPHPExcel){
      $objRichText = new PHPExcel_RichText();
      $objBold = $objRichText->createTextRun($text);
      $objBold->getFont()->setBold(true);
      $objPHPExcel->getActiveSheet()->getCell($cell)->setValue($objRichText);
    }

    function setRightAlignment($cell,$objPHPExcel){
      $objPHPExcel->getActiveSheet()->getStyle($cell)->getAlignment()->applyFromArray(
       array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_RIGHT)
      );
    }

    if($generateExcel === true){
      $firstNameDivided = explode(" ",$firstName);
      $secondNameDivided = explode(" ",$secondName);

      $objPHPExcel = new PHPExcel(); //create object

      //Set properties
      $objPHPExcel->getProperties()->setCreator("Promotecnicas y Ventas")
      ->setLastModifiedBy("María Elena Hernández Herrera")
      ->setTitle("Formato de Validacion")
      ->setSubject("Validación")
      ->setDescription("Este formato valida a las personas que se han postulado.")
      ->setKeyWords("validacion")
      ->setCategory("Validación");

      //Set DefaultWidht of cells
      $width = 11;
      $objPHPExcel->getActiveSheet()->getDefaultColumnDimension()
      ->setWidth($width);

      //Set Scale (Zoom)
      $objPHPExcel->getActiveSheet()
      ->getSheetView()->setZoomScale(145);

      /*--STYLES---*/
      setCellColor('A2:L20','A6A6A6',$objPHPExcel); //gray
      setCellColor('D2:K12','FFFFFF',$objPHPExcel); //white

      //Outline border of gray background
      setBorder('A2:L20','outline',$objPHPExcel);
      setBorder('D2:K12','outline',$objPHPExcel);
      setBorder('A8:C8','top',$objPHPExcel);

      //Background and border of each cell
      for ($cellNumber = 2; $cellNumber < 18; $cellNumber++) {
        if($cellNumber < 7 && $cellNumber%2 == 0){ //if par
          setCellColor("B$cellNumber",'FFFFFF',$objPHPExcel); //white
          setBorder("B$cellNumber",'outline',$objPHPExcel);
          setRightAlignment("A$cellNumber",$objPHPExcel);
        } else if($cellNumber > 7 && $cellNumber%2 != 0){ //if impar
          setCellColor("B$cellNumber",'FFFFFF',$objPHPExcel); //white
          setBorder("B$cellNumber",'outline',$objPHPExcel);
          setRightAlignment("A$cellNumber",$objPHPExcel);
        }
      }

      //D: 68
      //L: 76
      //H: 72
      for ($cellLetter = 68 ; $cellLetter < 76 ; $cellLetter++) {
        if($cellLetter < 72 && $cellLetter%2 == 0){ //if par
          setCellColor(chr($cellLetter)."17",'FFFFFF',$objPHPExcel); //white
          setBorder(chr($cellLetter)."17",'outline',$objPHPExcel);
          setRightAlignment(chr($cellLetter - 1)."17",$objPHPExcel);
        } else if($cellLetter > 72 && $cellLetter%2 != 0){ //if impar
          setCellColor(chr($cellLetter)."17",'FFFFFF',$objPHPExcel); //white
          setBorder(chr($cellLetter)."17",'outline',$objPHPExcel);
          setRightAlignment(chr($cellLetter - 1)."17",$objPHPExcel);
        }
      }

      //Merge celss
      $objPHPExcel->getActiveSheet()->mergeCells('F14:G14');
      setCellColor("F14",'FFFFFF',$objPHPExcel); //white
      setBorder("F14:G14",'outline',$objPHPExcel);

      //Left alignment for imss field (number)
      $objPHPExcel->getActiveSheet()->getStyle("B11")->getAlignment()->applyFromArray(
       array('horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT) );

      //Width of each column
      $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(false);
      $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth("22");

      $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(false);
      $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth("24");

      $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(false);
      $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth("10");

      $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setAutoSize(false);
      $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setWidth("3");

      $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setAutoSize(false);
      $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setWidth("6");

      /*--BOLD TEXT---*/
      boldText("Ciudad:",'A2',$objPHPExcel);
      boldText("Programa:",'A4',$objPHPExcel);
      boldText("Nombre de quien envía:",'A6',$objPHPExcel);
      boldText("Fecha:",'A9',$objPHPExcel);
      boldText("IMSS:",'A11',$objPHPExcel);
      boldText("CURP:",'A13',$objPHPExcel);
      boldText("RFC:",'A15',$objPHPExcel);
      boldText("Tiene INFONAVIT",'A17',$objPHPExcel);
      boldText("FONACOT",'C17',$objPHPExcel);
      boldText("%",'E17',$objPHPExcel);
      boldText("Sí",'H17',$objPHPExcel);
      boldText("No",'J17',$objPHPExcel);
      boldText("Teléfono del empleado:",'D14',$objPHPExcel);

      //Set text and values
      $objPHPExcel->setActiveSheetIndex(0)
      ->setCellValue("B2", "San Luis Potosí")
      ->setCellValue("B4", "CDT")
      ->setCellValue("B6", "María Elena Hernández")
      ->setCellValue("B9", date("d/m/Y"))
      ->setCellValue("B11", $imss)
      ->setCellValue("B13", $curp)
      ->setCellValue("B15", $rfc)
      ->setCellValue("F17", "")
      ->setCellValue("I17", "")
      ->setCellValue("K17", "")
      ->setCellValue("F14", $phoneNumber)
      ->setCellValue("A19", "FOLIO DE VALIDACION NO.________________________________________");

      if($creditType === 'INFONAVIT'){
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B17","SÍ");
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("D17","NO");
      } else if($creditType === 'FONACOT'){
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B17","NO");
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("D17","SÍ");
      } else if($creditType === 'NONE') {
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("B17","NO");
        $objPHPExcel->setActiveSheetIndex(0)->setCellValue("D17","NO");
      }

      $objDrawing = new PHPExcel_Worksheet_Drawing();
      $objDrawing->setName('INE');
      $objDrawing->setDescription('INE');
      $routeImg= $fileDestination; //fileDestination is from 'getInfoFromForm.php'
      $objDrawing->setPath($routeImg);
      $objDrawing->setCoordinates("E3");

      // set resize to false first
      $objDrawing->setResizeProportional(false);
      // set width later
      $objDrawing->setWidth(320);
      $objDrawing->setHeight(180);

      $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

      //Pie de página
      $objPHPExcel->getActiveSheet(0)
      ->getHeaderFooter()
      ->setOddFooter('Formato de validación');

      $fileName = "$firstNameDivided[0]_$secondNameDivided[0]";
      //echo "$fileName";

      $objPHPExcel->getActiveSheet(0)->setTitle($fileName);

      $route_fileExcel = '../uploads/'.$fileName.'.xlsx';
      $route_fileExcelDownload = 'uploads/'.$fileName.'.xlsx';

      $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
      $objWriter->save($route_fileExcel);

      if(file_exists($route_fileExcel)){
        echo '<div class="container">
              <a id="file_generated_link" href="'.$route_fileExcelDownload.'">
                  <div id="file_generated" class="part_of_info wow animate__animated animate__bounceIn">
                    <div class="container_img">
                      <img src="img/excel_icon.png">
                </div>
                  <p>'.$firstNameDivided[0].'_'.$secondNameDivided[0].'.'.'xlsx'.'</p>
                </div>
              </a>

                <div id="create_email" class="part_of_info animate__animated animate__bounceIn animate__delay-1s" onclick="generateEmail(event)">
                  <div class="container_img">
                    <img src="img/outlook_icon.png">
                  </div>
                  <p>Create email</p>
                </div>

                <div id="show_data" class="part_of_info">

                </div>
          </div>';
      }else{
        printMessageError(5);
      }

      unlink($fileDestination); //we delete the file (because this code manage sensible information (ID CARD))
    } else {
      printMessageError(6);
    }
?>
