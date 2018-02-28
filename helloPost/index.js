'use strict';

// A simple hello world Lambda function
exports.handler = (event, context, callback) => {

    console.log("Event", event);
    console.log('LOG: Name is ' + event.body.name);
    callback(null,
        {
            statusCode: 200,

            body: JSON.stringify({message: "Hi " + event.body.name })
        }
    );

}
