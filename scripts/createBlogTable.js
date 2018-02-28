var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8081"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName: "BlogTable",
    KeySchema: [
        { AttributeName: "title", KeyType: "HASH" }
    ],
    AttributeDefinitions: [
        { AttributeName: "title", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON: ", JSON.stringify(data, null, 2));
    }
});