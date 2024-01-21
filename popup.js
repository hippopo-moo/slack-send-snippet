document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('sendButton').addEventListener('click', function() {
    sendMessageToBackground();
  });
});

function sendMessageToBackground() {
  var message = document.getElementById('slackMessage').value;
  if (message.trim() !== '') {
    chrome.runtime.sendMessage({ message: "sendToSlack", text: message }, function(response) {
      if (response && response.success) {
        alert('Message sent to Slack!');
      } else {
        alert('Failed to send message to Slack. Check console for details.');
        console.error(response ? response.error : 'No response received');
      }
    });
  }
}
