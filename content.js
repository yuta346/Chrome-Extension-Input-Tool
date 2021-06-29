
chrome.runtime.onMessage.addListener(getMessage);
        
function getMessage(message, sender, sendResponse) {
    console.log(message.result);  //display the message from popup window for debug
    console.log(message.word);
}