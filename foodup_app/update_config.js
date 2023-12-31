const fs = require('fs');
const axios = require('axios');

const updateConfig = async () => {
  try {
    // Fetch the public IP address
    const response = await axios.get('https://api.ipify.org/?format=json');
    const publicIp = response.data.ip;
    // Read the config.js file
    message = "export const BACKEND_URL = 'http://"+publicIp+":8000'"
    // Write the updated config.js file
    await fs.promises.writeFile('./config.js', updatedData, 'utf8');
    console.log('Config file updated successfully.');
  } catch (error) {
    console.error('Failed to fetch public IP:', error.message);
  }
};

updateConfig();
