chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "sendToSlack") {
        sendMessageToSlack(request.text, sendResponse);
        return true;
      }
    }
  );
  
  function sendMessageToSlack(message, sendResponse) {
    // Slack APIトークン（取得した実際のトークンを使用してください）
    const slackToken = 'xoxb-749785472871-6398931455861-wKKdqmaH9dppgfF2BilfkBkO';
  
    // SlackチャンネルID（対象のチャンネルのIDに変更してください）
    const channelID = '#general';
  
    fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${slackToken}`,
      },
      body: JSON.stringify({
        channel: channelID,
        text: message,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        console.log('Message sent to Slack:', data);
        sendResponse({ success: true, message: 'Message sent to Slack' });
      } else {
        console.error('Failed to send message to Slack:', data.error);
        sendResponse({ success: false, message: 'Failed to send message to Slack', error: data.error });
      }
    })
    .catch(error => {
      console.error('Error sending message to Slack:', error);
      sendResponse({ success: false, message: 'Error sending message to Slack', error: error.message });
    });
  }
  