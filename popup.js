
document.querySelector("button").addEventListener("click", setup);

function setup(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

                let existingMessage = document.getElementById("statusMessage");
                if(existingMessage){
                  existingMessage.remove()
                }

                let input = document.getElementById("word");
                let userInput = input.value;

                async function sendDataToServer(){

                  const config = {
                                  method: "POST",
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({word:userInput})}  

                  const response = await fetch("http://127.0.0.1:5000/", config);
                  
                  const data = await response.json();

                  let newParagraph = document.createElement('p');
                  newParagraph.setAttribute("id", "statusMessage");

                  let cardBody = document.getElementsByClassName("card-body")[0];
                  
                  if(data.status === "success"){
                    var text = document.createTextNode("Added Successfully ")
                    newParagraph.appendChild(text);
                    cardBody.appendChild(newParagraph);
                  }else{
                    var text = document.createTextNode("Error. This word is not present in the dictionary.")
                    newParagraph.appendChild(text);
                    cardBody.appendChild(newParagraph);
                  }
                  
                  chrome.tabs.sendMessage(tabs[0].id, {result:data.status, word:data.word});  //send message to content.js to display in the console
                }
                sendDataToServer()
              }) 
}
