const userInput = document.querySelectorAll(".userInput");
const randomValueButton = document.getElementById("randomValue");
const acceptButton = document.getElementById("acceptButton");
const gameNumberInput = document.querySelectorAll(".gameNumberInput"); // "." ekledim

var myValues = [];
var gameValues = [];





function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueRandomList(length,min,max){
    if(length > (max-min+1)){
        console.log("hata");
    }

    uniqueList = [];

    while(uniqueList.length < length){
        let randomNumber = getRandomNumber(min, max);
        
        if(uniqueList.indexOf(randomNumber) === -1){
            uniqueList.push(randomNumber);
        } 
    }
    return uniqueList;
}


function arraysController(myArrays){
    let identicalValue = new Set(myArrays);
    let identicalArrays = Array.from(identicalValue)


    return identicalArrays;


}

function removeAlert(){
    var parentDiv = document.querySelector(".row-md");
    var target = document.querySelector(".alert");
    
    if (parentDiv && target) {
        parentDiv.removeChild(target);
    } else {
        console.log("Eksik veya yanlış sınıf adları");
    }
}



function alertBox(alerts, message) {
    removeAlert();
    var target = document.querySelector(".row-md"); // Tek bir elemanı seçiyoruz
    var newAlert = document.createElement("div");

    // Boşluk içermeyen bir sınıf adı kullan
    var alertClass = `alert-${alerts}`;
    newAlert.classList.add("alert", alertClass);
    
    newAlert.innerHTML = message;
    
    target.appendChild(newAlert);
}

function winOrLose(myList,gameList){

    var trueValue = 0;
    for(var i = 0; i <=myList.length-1;i++){
        
        for(var x = 0; x <= gameList.length-1;x++){
//            console.log(myList[i],gameList[x]);
       
            if(myList[i] == gameList[x]){
                trueValue++;
                userInput[i].style.backgroundColor = "#82fc7e";
                gameNumberInput[x].style.backgroundColor = "#82fc7e";
                console.log(myList[i],gameList[x]);
                
            }

        }
    }

    if(trueValue > 0){
        alertBox("success",`${trueValue} adet değer bildiniz`);
    }else{
        alertBox("primary",`Maalesef kaybettiniz`);

    }
}



randomValueButton.addEventListener("click", function () {
    removeAlert();
    myValues = generateUniqueRandomList(10,1,80);

    userInput.forEach(function(input,index){
       

        input.value = myValues[index];
        input.style.backgroundColor = "white";
        myValues.push(input.value);

    })

    gameNumberInput.forEach(function(input){

        input.value = "";
        input.style.backgroundColor = "white";

    });

    
        
    
});


acceptButton.addEventListener("click",function(){
   var start = 0;
   var valueControl = 0;
   gameValues = generateUniqueRandomList(22,1,80);

   myValues = [];

    userInput.forEach(function(controller,index){
        controller.style.backgroundColor = "white";
        if(controller.value != ""){
            start++;

        }else{
           
            console.log(index+1 + " numaralı eleman sorunlu");
        }
        if(controller.value >= 1 && controller.value <= 80){
            valueControl++;
        }
        
    })
    if(valueControl == 10){

        if(start == 10){
            
            userInput.forEach(function(input,index){
            myValues.push(input.value);

    
            })
            if( arraysController(myValues).length === 10){       

                gameNumberInput.forEach(function(input,index){
                    input.style.backgroundColor = "white";
            
                    input.value = gameValues[index];


                });
                winOrLose(myValues,gameValues);

            }else{

                alertBox("danger","lütfen kutulara farklı elemanlar yazınız");
        
                
            }





        }else{
            
    
                alertBox("danger","Lütfen boş eleman bırakmayınız");
                console.log("lütfen boş kutu bırakmayınız");

            

        }

    }else{
        alertBox("danger","Lütfen kutuların içine 1 ve  80 arasında sayı girniz");
        console.log("lütfen boş kutu bırakmayınız");

    }







});