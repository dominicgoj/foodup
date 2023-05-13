const fs = require('fs');
const axios = require('axios');

// Fetch the public IP address
axios.get('https://api.ipify.org/?format=json')
  .then(response => {
    const publicIp = response.data.ip;

    // Read the config.js file
    fs.readFile('./config.js', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      // Update the backend URL in the config.js file
      const updatedData = data.replace(/http:\/\/\d+\.\d+\.\d+\.\d+:\d+/, `http://${publicIp}:8000`);

      // Write the updated config.js file
      fs.writeFile('./config.js', updatedData, 'utf8', err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Config file updated successfully.');
      });
    });
  })
  .catch(error => {
    console.error('Failed to fetch public IP:', error.message);
  });
