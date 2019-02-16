'use strict';

const AWS = require('aws-sdk');
const slugify = require('slugify');
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

exports.handler = async (event, context, callback) => {
    console.log("Event", event);

    let body = JSON.parse(event.body);
    body.createdAt = Math.floor(Date.now() / 1000);

    if(!body.title && !body.content) {
        return callback({statusCode: 400, body: {message: 'Invalid Request! "title" and "content" fields required'}})
    }

    body.slug = await slugify(body.title, {lower: true});


    const params = {
        TableName: table,
        Item: body
    };

    console.log("Params: ", params);

    try {
        const createdArticle = await dynamodb.put(params).promise();
        console.log('We created this article!', createdArticle)
        return callback(null, {statusCode: 200, body: createdArticle});
    }catch (e) {
        console.error(e);
        return callback(e);
    }
}
