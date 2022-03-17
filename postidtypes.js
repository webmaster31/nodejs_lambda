const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {idtype_name, idtype_code, issuer_code, issuer_short_name, bkd_color, text_color, datetimecreated} = JSON.parse(event.body);
  const params = {
    TableName: "id_types", // The name of your DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed title
      idtype_id: generateUUID(),
      idtype_name: idtype_name,
      idtype_code: idtype_code,
      issuer_code: issuer_code,
      issuer_short_name: issuer_short_name,
      bkd_color: bkd_color,
      text_color: text_color,
      datetimecreated: datetimecreated
    }
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200
    };
    return response; // Returning a 200 if the item has been inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};