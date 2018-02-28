# AWS SAM Play #

A simple AWS SAM template that specifies a few Lambda functions

## Usage ##

To start off with I copied this project from the AWS Sam Local Examples page. Make sure you've followed all of the instructions for setup listed here: https://github.com/awslabs/aws-sam-local/tree/develop/samples

### Test your application locally ###

To test the api run:
    
    sam local start-api


### Package artifacts ###

Run the following command, replacing `BUCKET-NAME` with the name of your bucket:

    sam package --template-file template.yaml --s3-bucket BUCKET-NAME --output-template-file packaged-template.yaml

This creates a new template file, packaged-template.yaml, that you will use to deploy your serverless application.

### Deploy to AWS CloudFormation ###

Run the following command, replacing `MY-NEW-STACK` with a name for your CloudFormation stack.

    sam deploy --template-file packaged-template.yaml --stack-name MY-NEW-STACK --capabilities CAPABILITY_IAM

This uploads your template to an S3 bucket and deploys the specified resources using AWS CloudFormation.

## Setting up DynamoDB Locally ##

You can run DynamoDB locally too, but you'll need to download and install a .jar package to get it running. The AWS documentation is here: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html#DynamoDBLocal.DownloadingAndRunning

Make sure that in any serverless functions that use DyanmoDB that you update the local config to point to the correct port. By default DynamoDB will run on port 8000, but I have it configured to run on port 8081 on my machine.

Another note with trying to access the local DynamoDB, that because it's running in docker, you'll notice that we don't access it from the Lambda function with `http://localhost:8000`, you need to to access `http://docker.for.mac.localhost:8081` or it will not work.

Once you have it up and running, you can run `npm scripts/createBlogTable.js` and `npm scripts/createVotesTable.js` to create the DynamoDB tables locally for those little applications.
