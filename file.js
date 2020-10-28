//queried elements
 let heading = document.querySelector(".heading");
 let para = document.querySelector(".para");
 let input1 = document.querySelector(".input1");
 let input2 = document.querySelector(".input2")
 let btn = document.querySelector(".btn");
 let container01 = document.querySelector(".container01");
 let container02 = document.querySelector(".container02");
 let mainContainer = document.querySelector(".main-container");
 let userName1 = input1.value;
 let userName2 = input2.value;
 let initiate = document.querySelector(".initiate");
 let reselect = document.querySelector(".reselect");
 let content = document.querySelector(".content");
 let message01 = document.querySelector(".message01");
 let message02 = document.querySelector(".message02");
 let invalid01 = document.querySelector(".invalid01");
 let invalid02 = document.querySelector('.invalid02');
 
 
//functon
 btn.onclick = function() {
   let userName1 = input1.value;
   let userName2 = input2.value;
   if(btn.innerHTML === "Get Started"){
    heading.innerHTML = "Player One";
    para.style.display = "none";
    input1.style.display = "block";
    input2.style.display = "none";
    btn.innerHTML = "Continue";
    initiate.style.display = "none";
    reselect.style.display = "none";
}

    else if(userName1 !== "" && heading.innerHTML === "Player One"){
            checkWhitespace01();
}

    else if(userName1 == "" && heading.innerHTML === "Player One"){    
     message01.innerHTML = "please input your username";
     setTimeout(() => {
             message01.innerHTML = "";
     }, 1000);

    
}

    else if(userName2 !== "" && heading.innerHTML === "Player Two" ){
            checkWhitespace02();

}
    else if(userName2 == "" && heading.innerHTML === "Player Two"){
    message02.innerHTML = "please input your username";
     setTimeout(() => {
             message02.innerHTML = "";
     }, 1000);
    }
}

function fetchUserInfo1() {
    let userName1 = input1.value;

    fetch(`https://api.github.com/users/${userName1}`)
       .then(res => {
          if (res.ok){
             return res.json()
       .then((data) => {
               console.log("data", data);
        let subCon01 = document.createElement('div');
        subCon01.classList.add("subCon01"); 
        subCon01.innerHTML = `<li id="scoreOne"></li>
                              <li><img src="${data.avatar_url}"></li>
                              <li>Name: ${data.login}</li>
                              <li>Username: ${userName1}</li>
                              <li>followers: ${data.followers}</li>
                              <li>following: ${data.following}</li>
                              <li>Public Repos: ${data.public_repos}</li>`;
        container01.appendChild(subCon01);
        container01.style.display = "block";
        const element = document.getElementById("scoreOne");
        const scoreValue = "value1";

        calcScore(element, data, data.followers, data.following, data.public_repos, scoreValue);
   

});
} else{
        return Promise.reject({
        status: res.status,
        statusText: res.statusText
        })

        .catch(error =>{
                if(error.status === 404){
                        console.log("error is", error)
                  invalid01.style.display = "block";
                  invalid01.innerHTML = "Player One, please enter a valid username";
                  return false;
                }
        })
}
       })
         //mainContainer.style.display = "flex";
}

function fetchUserInfo2(){
      let userName2 = input2.value; 
      fetch(`https://api.github.com/users/${userName2}`)
       .then(res =>{
            if(res.ok){
             return res.json()
        .then((data) => {
                console.log("data", data);
  
        let subCon02 = document.createElement('div');
        subCon02.classList.add("subCon02");
        subCon02.innerHTML = `<li id="scoreTwo"></li>
                              <li><img src="${data.avatar_url}"></li>
                              <li>Name: ${data.login}</li>
                              <li>Username: ${userName2}</li>
                              <li>followers: ${data.followers}</li>
                              <li>following: ${data.following}</li>
                              <li>Public Repos: ${data.public_repos}</li>`; 
        container02.appendChild(subCon02);
        container02.style.display = "block";
        const element = document.getElementById("scoreTwo");
        const scoreValue = "value2"
        
        calcScore(element, data, data.followers, data.following, data.public_repos, scoreValue);
  

});
            }else{
                return Promise. reject({
                        status: res.status,
                        statusText: res.statusText
                })
             .catch(error => {
                if(error.status === 404){
                        console.log("error is", error)
                        invalid02.style.display = "block";
                        invalid02.innerHTML = "Player Two, please enter a valid username";
                        return false;
                }
             })
            }

})
     // mainContainer.style.display = "flex";
}
 

reselect.onclick = function() {
        clearInput();
        location.reload();
};

function clearInput() {
        input1.value = "";
        input2.value = "";
}
initiate.onclick = function(){
        if(initiate.innerHTML === "Initiate Battle" && 
           invalid01.innerHTML === "" && invalid02.innerHTML === ""){
                heading.style.display = "none";
                let scoreOne = document.getElementById("scoreOne");
                let scoreTwo = document.getElementById("scoreTwo");
                scoreOne.style.display = "block";
                scoreTwo.style.display = "block";
                detectWinner();
                reselect.style.display = "none";
                initiate.innerHTML = "Start Over"
                return true;
        }else if(initiate.innerHTML === "Start Over"){
                window.location.reload()
        }else if(invalid01.innerHTML != "" && invalid02.innerHTML != ""){
                invalid01.style.display = "block";
                invalid02.style.display = "none";
                invalid01.innerHTML = 'Player One and Two, please enter valid usernames';
                return false;
        }
};
function calcScore(element, data, firstScore, secondScore, thirdScore, scoreValue) {
        
        firstScore = Number.parseInt(data.followers);
        secondScore = Number.parseInt(data.following);
        thirdScore = Number.parseInt(data.public_repos);
        totalScore = (firstScore + secondScore +(thirdScore / 2));
        element.innerHTML = `<h4>Score: <span id="${scoreValue}">${totalScore}</span></h4>`


}
function detectWinner() {
        let heading = document.querySelector(".heading");
        let player1 = document.getElementsByClassName("first-player")[0];
        let player2 = document.getElementsByClassName("second-player")[0];
        let fValue = document.getElementById("value1");
        let sValue = document.getElementById("value2");

        fValue = Number.parseInt(fValue.innerText);
        sValue = Number.parseInt(sValue.innerText);

        if(fValue > sValue){
                player1.innerHTML= "Winner";
                player1.style.color = "green";
                player2.innerHTML = "Loser";
                player2.style.color = "red";
        }else if(fValue < sValue){
                player1.innerHTML= "Loser";
                player1.style.color = "red";
                player2.innerHTML = "Winner";
                player2.style.color = "green";
        }else if(fValue === sValue){
                mainContainer.style.display = "none";
                initiate.innerHTML = "Start Over";
                reselect.style.display = "none";
                heading.style.display = "block";
                heading.innerHTML = "it's a TIE!";

        }

}

//checking whitespaces for username 01
function checkWhitespace01() {
   let userName1 = input1.value;
   let sample = userName1;
   let whiteSpace = /\s/g;
        if(sample.match(whiteSpace)){
            alert("pls no whitespaces");
        }
        else if(!sample.match(whiteSpace)){
                heading.innerHTML = "Player Two";
                para.style.display = "none";
                input1.style.display = "none";
                input2.style.display = "block";
                btn.innerHTML = "Continue";
                initiate.style.display = "none";
                reselect.style.display = "none";
                message01.innerHTML = "";
        }
}
//checking whitespaces for username 02
function checkWhitespace02() {
        let userName2 = input2.value;
        let sample = userName2;
        let whiteSpace = /\s/g;
             if(sample.match(whiteSpace)){
                 alert("pls no whitespaces");
             }
             else if(!sample.match(whiteSpace)){
                heading.innerHTML = "Confirm Players";
                para.style.display = "none";
                input1.style.display = "none";
                input2.style.display = "none";
                btn.style.display = "none";
                initiate.style.display = "block";
                reselect.style.display = "block";
                message02.innerHTML = "";
            
                fetchUserInfo1();
                fetchUserInfo2();
            
            
            
             }    
}


    


