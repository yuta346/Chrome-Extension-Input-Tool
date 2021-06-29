
document.querySelector("button").addEventListener("click", setup);

function setup(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let input = document.getElementById("word");
                let userInput = input.value;

                async function sendDataToServer(){

                  const config = {
                                  method: "POST",
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({word:userInput})}  

                  const response = await fetch("http://127.0.0.1:5000/", config);
                  
                  const data = await response.json();

                  chrome.tabs.sendMessage(tabs[0].id, {message: data.word});  //send message to content.js to displau in the console
                }
                sendDataToServer()
              }) 
}
