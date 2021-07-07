document.querySelector("#login").addEventListener("click", login);

function login(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

              let existingMessage = document.getElementById("statusMessage");
              if(existingMessage){
                existingMessage.remove()
              }

              let username = document.getElementById("username").value
              let password = document.getElementById("password").value

              async function sendDataToServer(){

                const config = {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({username:username, password:password})}  

                const response = await fetch("http://127.0.0.1:5000/api/login", config);
                
                const data = await response.json();

                let newParagraph = document.createElement('p');
                newParagraph.setAttribute("id", "statusMessage");

                let cardBody = document.getElementsByClassName("card-body")[0];
                
                if(data.status === "success"){
                    chrome.storage.sync.set({session_id:data.session_id}, function(){
                        console.log('Value is set to ' + data.session_id);
                    });
                    var text = document.createTextNode("Login Successful")





                    chrome.browserAction.setPopup({popup: "popup.html"});
                    newParagraph.appendChild(text);
                    cardBody.appendChild(newParagraph);
                }else{
                    var text = document.createTextNode("Login Failed")
                    chrome.browserAction.setPopup({popup: "login.html"});
                    newParagraph.appendChild(text);
                    cardBody.appendChild(newParagraph);
                }
                chrome.tabs.sendMessage(tabs[0].id, {status:data.status, username:data.username, session_id:data.session_id});  //send message to content.js to display in the console
              }
              sendDataToServer()
            }) 
}


