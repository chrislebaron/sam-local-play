'use strict';

// A simple hello world Lambda function
exports.handler = (event, context, callback) => {

    console.log("Event", event);
    console.log('LOG: Name is ' + event.queryStringParameters.name);

    if (event.httpMethod === "GET") {
        let resp = votes_table.scan();
        for()
        callback(null, {
            statusCode: 200,
            body: JSON.stringify()
        })
    }


    callback(null,
        {
            statusCode: 200,

            body: JSON.stringify({message: "Hi " + event.queryStringParameters.name })
        }
    );

}
