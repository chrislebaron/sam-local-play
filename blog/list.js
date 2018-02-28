'use strict';

const AWS = require('aws-sdk');
let table = "";

if(process.env.AWS_SAM_LOCAL) {
    console.log('being run locally');
    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://docker.for.mac.localhost:8081"
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

    dynamodb.scan(params, function(err, data){
        if(err){
            console.error('Unable to add item. ', err);
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
