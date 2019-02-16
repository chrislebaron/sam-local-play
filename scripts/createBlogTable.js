var AWS = require("aws-sdk");

var config = AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

console.log('config', config);

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

console.log('params for blog table: ', params);

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Full Error: ", err);
        console.log(" ");
        console.log(" ");
        console.error("Unable to create table. Error JSON: ", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON: ", JSON.stringify(data, null, 2));
    }
});

// aws dynamodb create-table --table-name Article --attribute-definitions AttributeName=title,AttributeType=S --key-schema AttributeName=title,KeyType=HASH  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 ----endpoint-url http://localhost:8000