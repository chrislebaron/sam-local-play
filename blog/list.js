'use strict';

const AWS = require('aws-sdk');
let table = "";

if(process.env.AWS_SAM_LOCAL) {
    console.log('being run locally');
    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://docker.for.mac.localhost:8000"
    });
    table = "BlogTable"
} else {
    table = process.env.TABLE_NAME
}



const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    console.log("Event", event);
    const params = {
        TableName: table,
    };

    console.log("Params: ", params);

    // return callback(null, {statusCode: 200, body: JSON.stringify({message: 'success'})})


    new AWS.DynamoDB().listTables({}, function(err, data) {
        if (err) console.log("Error listing tables", err, err.stack); // an error occurred
        else     console.log("Tables: ", data);           // successful response
        /*
        data = {
         TableNames: [
            "Forum",
            "ProductCatalog",
            "Reply",
            "Thread"
         ]
        }
        */
    });


    dynamodb.scan(params, function(err, data){
        if(err){
            console.error('Unable to get data. ', err);
            callback(err, null);
        }else{
            console.log("Data from Dynamo", data);
            callback(null,
                {
                    statusCode: 200,

                    body: JSON.stringify({articles: data.Items})
                }
            );
        }
    });




}
