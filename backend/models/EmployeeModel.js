module.exports = {
    TableName: 'Employees', // DynamoDBで使用するテーブル名
    KeySchema: [
        { AttributeName: 'EmployeeId', KeyType: 'HASH' }, // Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: 'EmployeeId', AttributeType: 'S' }, // 'S' for string
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};
