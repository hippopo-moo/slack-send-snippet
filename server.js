const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Slack APIトークン（取得した実際のトークンを使用してください）
const slackToken = 'xoxb-749785472871-6398931455861-wKKdqmaH9dppgfF2BilfkBkO';

app.post('/sendToSlack', async (req, res) => {
  const message = req.body.text;

  try {
    // Slackにメッセージを投稿
    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: 'CN230JUT0', // SlackチャンネルID
        text: message
      },
      {
        headers: {
          'Authorization': `Bearer ${slackToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, response: response.data });
  } catch (error) {
    console.error('Error sending message to Slack:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
