const express = require('express');
const dotenv = require('dotenv');
const ghl = require('./ghlActions');

dotenv.config();
const app = express();
app.use(express.json());

app.post('/gpt-ghl-handler', async (req, res) => {
  const { action, data } = req.body;

  try {
    let result;
    switch (action) {
      case 'create_sub_account':
        result = await ghl.createSubAccount(data);
        break;
      case 'add_user_to_location':
        result = await ghl.addUserToLocation(data);
        break;
      case 'send_sms':
        result = await ghl.sendSMS(data);
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('🔥 ERROR in /gpt-ghl-handler:', err.message);

    if (err.response) {
      console.error('GHL API Error Response:', {
        status: err.response.status,
        data: err.response.data,
      });
    } else {
      console.error('Unexpected Error Object:', err);
    }

    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);

