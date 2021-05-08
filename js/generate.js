function generateInfo(e){
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let secondName = document.getElementById("secondName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let creditType = document.getElementById("statementType").value;
  let creditValue = document.getElementById("statementTypeValue").value;

  let curp1 = document.getElementById("curp1").value;
  let curp2 = document.getElementById("curp2").value;
  let curp3 = document.getElementById("curp3").value;
  let curp4 = document.getElementById("curp4").value;
  let curp5 = document.getElementById("curp5").value;
  let curp6 = document.getElementById("curp6").value;

  let rfc1 =  document.getElementById("rfc1").value;
  let rfc2 =  document.getElementById("rfc2").value;
  let rfc3 =  document.getElementById("rfc3").value;

  let imss1 =  document.getElementById("imss1").value;
  let imss2 =  document.getElementById("imss2").value;
  let imss3 =  document.getElementById("imss3").value;

  let file =  document.getElementById("file").value;


  if(validateFields(firstName,secondName,phoneNumber,curp1,curp2,curp3,curp4,curp5,curp6,rfc1,rfc2,rfc3,imss1,imss2,imss3,creditType,creditValue,file))
    generate();
  else
    document.getElementById("log").innerHTML = "<p class='php_messages'>You have incomplete fields.</p>";
}

function validateFields(firstName,secondName,phoneNumber,curp1,curp2,curp3,curp4,curp5,curp6,rfc1,rfc2,rfc3,imss1,imss2,imss3,creditType,creditValue,file){
  if(firstName === "")
    invalidFieldAnimation("firstName");
  if(secondName === "")
    invalidFieldAnimation("secondName");

  if(curp1.length < 4)
    invalidFieldAnimation("curp1");
  if(curp2.length < 6)
    invalidFieldAnimation("curp2");
  if(curp3.length < 1)
    invalidFieldAnimation("curp3");
  if(curp4.length < 2)
    invalidFieldAnimation("curp4");
  if(curp5.length < 3)
    invalidFieldAnimation("curp5");
  if(curp6.length < 2)
    invalidFieldAnimation("curp6");

  if(rfc1.length < 4)
    invalidFieldAnimation("rfc1");
  if(rfc2.length < 6)
    invalidFieldAnimation("rfc2");
  if(rfc3.length < 3)
    invalidFieldAnimation("rfc3");

  if(imss1.length < 4)
    invalidFieldAnimation("imss1");
  if(imss2.length < 2)
    invalidFieldAnimation("imss2");
  if(imss3.length < 5)
    invalidFieldAnimation("imss3");

  if(phoneNumber.length < 14)
    invalidFieldAnimation("phoneNumber");

  let typeIsCorrect = false;
  if(creditType !== "NONE" && (creditValue === "" || creditValue === "0")){
    document.getElementById("statementTypeValue").style.display = "block";
    invalidFieldAnimation("statementTypeValue");
    typeIsCorrect = true;
  }

  if(firstName === "" || secondName === "" || curp1.length < 4 || curp2.length < 6 || curp3.length <  1 || curp4.length < 2 || curp5.length < 3 || curp6.length < 2 ||
      rfc1.length < 4 || rfc2.length < 6 || rfc3.length < 3 || imss1.length < 4 || imss2.length < 2 || imss3.length < 5 || phoneNumber.length < 14 || typeIsCorrect === true)
       return false;
     else
       return true;

}

function invalidFieldAnimation(elementID){
    animation = document.getElementById(elementID);
    if(animation.style.animation === "1s ease 0s 1 normal none running invalidField")
       animation.style.animation = "invalidField2 1s 1";
    else
      animation.style.animation = "invalidField 1s 1";
}

function generateEmail(e){
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let secondName = document.getElementById("secondName").value;
  let creditType = document.getElementById("statementType").value;
  let creditValue = document.getElementById("statementTypeValue").value;

 createEmail(firstName,secondName,creditType,creditValue);
}

function generate(){
  // create FormData object
  var parameters = new FormData($("#form")[0]);

  $.ajax({
    url: 'php/generateExcel.php',
    type: "POST",
    data: parameters,
    //data: $('form').serialize(),
    contentType: false,
    processData: false,
    beforeSend: function(){
      document.getElementById("loading").style.display = "flex";
      document.getElementById("log").style.display = "none";
    },
    success: function(res){
      document.getElementById("loading").style.display = "none";
      document.getElementById("log").style.display = "flex";
      $('#log').html(res);
    },
  });
}

function showLoading(){
  document.getElementById("loading").style.display = "flex";
}

function hideLoading(){
  document.getElementById("loading").style.display = "none";
}

function createEmail(firstName,secondName,creditType,creditValue){
  let separator = " ";
  let firstNameDivided = firstName.split(separator);
  let secondNameDivided = secondName.split(separator);
  let stringCredit = "";

  if(creditType === 'NONE')
    stringCredit = 'No tienen ningún crédito' + '%0D%0A';
  else
    stringCredit = 'Tiene ' + creditType + ' de $' + creditValue + ' a la semana.' + '%0D%0A' + '%0D%0A';

  window.open('mailto:karina.delgado@promo-tecnicas.com;ivonne.chavarria@promo-tecnicas.com' + //emails
              '?subject=Validación ' + firstNameDivided[0] + ' ' + secondNameDivided[0] + ' S.L.P.' + //subject

              '&body=Buen día, esta es la validación de ' + firstName + ' ' + secondName + '%0D%0A' + '%0D%0A' +
              stringCredit + '%0D%0A' +
              'Saludos.' + '%0D%0A' +
              'María Elena Hernández.'
            );
            //create the mail message
}
