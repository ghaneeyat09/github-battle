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
    heading.innerHTML = "Player Two";
    para.style.display = "none";
    input1.style.display = "none";
    input2.style.display = "block";
    btn.innerHTML = "Continue";
    initiate.style.display = "none";
    reselect.style.display = "none";

}

  else if(userName2 !== "" && heading.innerHTML === "Player Two"){
    heading.innerHTML = "Confirm Players";
    para.style.display = "none";
    input1.style.display = "none";
    input2.style.display = "none";
    btn.style.display = "none";
    initiate.style.display = "block";
    reselect.style.display = "block";

    userInfo();
    



}
}

function userInfo() {
    let userName1 = input1.value;
    let userName2 = input2.value;

    fetch(`https://api.github.com/users/${userName1}`)
       .then((res) => res.json())
       .then((data) => {
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

      fetch(`https://api.github.com/users/${userName2}`)
       .then((res) => res.json())
       .then((data) => {
  
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
 
         mainContainer.style.display = "flex";

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
        if(initiate.innerHTML === "Initiate Battle"){
                let scoreOne = document.getElementById("scoreOne");
                let scoreTwo = document.getElementById("scoreTwo");
                scoreOne.style.display = "block";
                scoreTwo.style.display = "block";
                detectWinner();
                reselect.style.display = "none";
                initiate.innerHTML = "Start Over"
        }else if(initiate.innerHTML === "Start Over"){
                window.location.reload()
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
        let player1 = document.getElementsByClassName("first-player")[0];
        let player2 = document.getElementsByClassName("second-player")[0];
        let fValue = document.getElementById("value1");
        let sValue = document.getElementById("value2");

        fValue = Number.parseInt(fValue.innerText);
        sValue = Number.parseInt(sValue.innerText);

        if(fValue > sValue){
                player1.innerHTML= "Winner";
                player2.innerHTML = "Loser";
        }else if(fValue < sValue){
                player1.innerHTML= "Loser";
                player2.innerHTML = "Winner";
        }else if(fValue === sValue){
                mainContainer.style.display = "none";
                heading.innerHTML = "its a TIE!";
                initiate.innerHTML = "Start Over";
                reselect.style.display = "none";
        }

}

