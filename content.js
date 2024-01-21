console.log('content.js')
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'postSnippet') {
    const savedText = localStorage.getItem('savedText');

    if (savedText) {
      const slackToken = 'xoxb-749785472871-6412691851025-potApIXxgz1nWC2ssiy6tu28';
      const channelID = 'CN230JUT0';

      postToSlack(slackToken, channelID, savedText)
        .then(() => {
          localStorage.removeItem('savedText');
          sendResponse({ success: true }); // 非同期処理が終了した後にsendResponseを呼び出す
          console.log('then')
        })
        .catch(error => {
          console.error('Error posting snippet to Slack:', error);
          sendResponse({ success: false, error });
          console.log('catch')
        });
        
        console.log('then~catchの後')
      return true; // 非同期処理がある場合、sendResponseを後で呼び出すためにtrueを返す
    }
  }
});

function postToSlack(token, channel, text) {
  return new Promise((resolve, reject) => {
    const apiUrl = 'https://slack.com/api/chat.postMessage';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        channel: channel,
        text: text
      })
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          console.log('Snippet posted to Slack successfully!');
          resolve(); // 成功時にresolve
        } else {
          console.error('Failed to post snippet to Slack:', data.error);
          reject(data.error); // 失敗時にreject
        }
      })
      .catch(error => {
        console.error('Error posting snippet to Slack:', error);
        reject(error); // エラー時にreject
      });
  });
}
