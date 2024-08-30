const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-northeast-1', // 必要なリージョンに設定
  });
const EmployeeModel = require('../models/EmployeeModel');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.createEmployee = async (employeeData) => {
    console.log('DynamoDBService received:', employeeData);

    const params = {
        TableName: EmployeeModel.TableName,
        Item: employeeData,
    };

    try {
        await dynamoDB.put(params).promise();
        console.log('Employee saved successfully:', employeeData);
        return employeeData;
    } catch (error) {
        console.error('Error saving employee:', error);
        throw error;
    }
};

exports.getEmployee = async (EmployeeId) => {
    const params = {
        TableName: EmployeeModel.TableName,
        Key: {
            EmployeeId: EmployeeId,
        },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
};

exports.getAllEmployees = async () => {
    const params = {
        TableName: EmployeeModel.TableName
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    } catch (error) {
        console.error('Error getting all employees:', error);
        throw error;
    }
};
