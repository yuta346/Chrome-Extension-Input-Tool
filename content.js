
chrome.runtime.onMessage.addListener(getMessage);
        
function getMessage(message, sender, sendResponse) {
    console.log(message.status);  //display the message from popup window for debug
    console.log(message.word);
    console.log(message.username);
    console.log(message.session_id);
}