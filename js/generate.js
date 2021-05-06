function generateInfo(e){
  e.preventDefault();
  let firstName = document.getElementById("firstName").value;
  let secondName = document.getElementById("secondName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let creditType = document.getElementById("statementType").value;
  let creditValue = document.getElementById("statementTypeValue").value;

  let curp =  document.getElementById("curp1").value +
              document.getElementById("curp2").value +
              document.getElementById("curp3").value +
              document.getElementById("curp4").value +
              document.getElementById("curp5").value +
              document.getElementById("curp6").value;

 let rfc =    document.getElementById("rfc1").value +
              document.getElementById("rfc2").value +
              document.getElementById("rfc3").value;

let imss =   document.getElementById("imss1").value +
             document.getElementById("imss2").value +
             document.getElementById("imss3").value;

let file =  document.getElementById("file").value;

  if(firstName === "" || secondName === "" || phoneNumber === "" || curp === "" || rfc === "" || imss === "" || creditValue === "" || file === null)
    document.getElementById("log").innerHTML = "<p class='php_messages'>There are empty fields.</p>";
  else
    generate();
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
    },
    success: function(res){
      document.getElementById("loading").style.display = "none";
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
