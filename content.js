
chrome.runtime.onMessage.addListener(getMessage);
        
function getMessage(message, sender, sendResponse) {
    console.log(message.message);  //display the message from popup window for debug
}