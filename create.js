import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
//Request body is parsed as a json string
	const data = JSON.parse(event.body);
	const params = {
		TableName:process.env.TableName,
			Item: {
			//Attributes of item being created by api
			userId: "123", //author user id
			noteId: uuid.v1(), //unique id for each
			content: data.content,
			attachment: data.attachment,
			createdAt: Date.now(),
			}
		};

	try {
		await dynamoDb.put(params).promise();
		return {
			statusCode:200,
			body: JSON.stringify(params.Item)
			};
     } catch (e) {
		return {
			statusCode:500,
			body:JSON.stringify({error: e.message})
			};
		}
	}
