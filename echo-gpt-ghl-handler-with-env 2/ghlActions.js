const axios = require('axios');
const GHL_API = 'https://rest.gohighlevel.com/v1';
const headers = {
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  'Content-Type': 'application/json',
};

exports.createSubAccount = async ({ name, email, phone, company, snapshot }) => {
  const response = await axios.post(
    `${GHL_API}/locations/`,
    {
      name,
      email,
      phone,
      companyName: company,
      snapshot,
    },
    { headers }
  );
  return response.data;
};

exports.addUserToLocation = async ({ locationId, userEmail, name }) => {
  const response = await axios.post(
    `${GHL_API}/locations/${locationId}/users/`,
    {
      name,
      email: userEmail,
      role: 'admin',
    },
    { headers }
  );
  return response.data;
};

exports.sendSMS = async ({ contactId, message }) => {
  const response = await axios.post(
    `${GHL_API}/contacts/${contactId}/messages/`,
    {
      message,
      type: 'SMS',
    },
    { headers }
  );
  return response.data;
};
