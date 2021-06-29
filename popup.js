
document.querySelector("button").addEventListener("click", setup);

function setup(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                let input = document.getElementById("word");
                let userInput = input.value;
                console.log(userInput)
                console.log(tabs)
                chrome.tabs.sendMessage(tabs[0].id, {message: userInput})
              }) 
}
