document.querySelector("#addWord").addEventListener("click", setup);
document.querySelector("#logout").addEventListener("click", logout);

function logout(){
  chrome.tabs.query({active: true, currentWindow: true}, async function(tabs){
    async function getFromStorage(key) {
      return new Promise((resolve, reject) => {
          chrome.storage.sync.get(key, resolve);
      }).then(result => {
              let session_id = result[key]
              console.log(session_id)
              return session_id;
          });
    }
    let session_id = await getFromStorage("session_id");
    async function sendDataToServer(session_id){
      const config = {
                      method: "POST",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify({session_id:session_id})}  
      
      const response = await fetch("http://127.0.0.1:5000/api/popup/logout", config);
      const data = await response.json();

      let newParagraph = document.createElement('p');
      newParagraph.setAttribute("id", "statusMessage");

      let cardBody = document.getElementsByClassName("card-body")[0];

      if(data.status === "success"){
        chrome.storage.sync.set({session_id:null}, function(){});
        chrome.browserAction.setPopup({popup: "login.html"});
        var text = document.createTextNode("You've been logged out")
        newParagraph.appendChild(text);
        cardBody.appendChild(newParagraph);
        setTimeout(()=>{
          window.close();
        }, 1500)
      }
    }
      sendDataToServer(session_id)
    })
  }

function setup(){
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {

                let existingMessage = document.getElementById("statusMessage");
                if(existingMessage){
                  existingMessage.remove()
                }

                let input = document.getElementById("word");
                let userInput = input.value;


                async function getFromStorage(key) {
                  return new Promise((resolve, reject) => {
                      chrome.storage.sync.get(key, resolve);
                  }).then(result => {
                          let session_id = result[key]
                          console.log(session_id)
                          return session_id;
                      });
                }
 
                let session_id = await getFromStorage("session_id");
            

                async function sendDataToServer(session_id){

                  const config = {
                                  method: "POST",
                                  headers: {"Content-Type": "application/json"},
                                  body: JSON.stringify({word:userInput, session_id:session_id})}  
                  
                  const response = await fetch("http://127.0.0.1:5000/api/add/popup", config);
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
                  chrome.tabs.sendMessage(tabs[0].id, {status:data.status, word:data.word});  //send message to content.js to display in the console
                }
                sendDataToServer(session_id)
              }) 
}