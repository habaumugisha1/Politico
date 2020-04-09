/// Variable to count number of attempts.
// Below function Executes on click of login button.
function direction(){
var username = document.getElementById("email").value;
var password = document.getElementById("pass").value;
if ( username == "admin@gmail.com" && password == "1234567890"){
// alert ("Login successfully");
window.location =  "admin-dash.html"; // Redirecting to other page.
Console.log('sdfghj')
return false;
// return false;
}
else{
    window.location = "./user-dash.html";

}
}