import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  uuid.abc.gibberish;
  console.log("inside function==>");
  const data = JSON.parse(event.body);
  console.log("event.body==>" + data);
  console.log("event.requestContext.identity.cognitoIdentityId==>" + event.requestContext.identity.cognitoIdentityId);
  console.log("uuid.v1=>" + uuid.v1());
  console.log("data.content==>" + data.content);
  console.log("data.attachment==>" + data.attachment);
  console.log("Date.now()==>" + Date.now());
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };
	console.log("Params==>" + params);
	console.log("process.env.tableName==>" + process.env.tableName);
	try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
   console.log(e);
    return failure({ status: false });
  }
}