const fs = require('fs');
const request = require('request');

const csvFilePath = '/path/to/your/file.csv'; // Replace with the path to your CSV file
const api_key = '';
const domain = '';
const category_id = 1234; // Replace with the ID of the category where you want to create the articles

// Read the CSV file and parse the data
const csvData = fs.readFileSync(csvFilePath, 'utf-8');
const rows = csvData.split('\n');
const articles = rows.map((row) => {
  const [title, description] = row.split(','); // Replace with the column names in your CSV file
  return {
    title,
    description,
    category_id,
  };
});

// Make POST API calls to create the articles
articles.forEach((article) => {
  const options = {
    url: `https://${domain}.freshservice.com/api/v2/knowledge_base/solutions/categories/${category_id}/articles`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(api_key).toString('base64')}`,
    },
    body: JSON.stringify(article),
  };
  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
});
