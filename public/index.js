let timeTd= document.querySelector(".time-disabled");

timeTd.value= new Date().getHours()+":"+ new Date().getMinutes();

//timeTd.disabled= true;

function goToHome(){
location.href="/";
}
