const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient({
  // commit when deploy on aws
  // region: "localhost",
  // accessKeyId: "aws_key_id",
  // secretAccessKeyId: "aws_key_secret",
  // endpoint: "http://localhost:8000"
});
module.exports = client;