const DynamoDBService = require('./DynamoDBService');
const S3Service = require('./S3Service');
const { v4: uuidv4 } = require('uuid');

// 従業員作成
async function createEmployee(Name, Position, photo) {
    const EmployeeId = uuidv4();
    const photoKey = `${EmployeeId}.jpg`;

    // S3に写真をアップロード
    await S3Service.uploadPhoto(photo.buffer, photoKey, photo.mimetype);

    // DynamoDBに従業員情報を保存
    const employeeData = {
        EmployeeId,
        Name,
        Position,
        photoKey,
    };
    await DynamoDBService.createEmployee(employeeData);

    return employeeData;
}

// 従業員取得
async function getEmployee(employeeId) {
    const employee = await DynamoDBService.getEmployee(employeeId);
    if (!employee) {
        throw new Error('Employee not found');
    }

    // S3の写真URLを取得
    employee.photoUrl = S3Service.getSignedUrl(employee.photoKey);

    return employee;
}

const getAllEmployees = async () => {
    const params = {
        TableName: EmployeeModel.TableName,
    };

    try {
        const data = await dynamoDB.scan(params).promise(); // DynamoDBの全スキャン
        return data.Items; // 取得した従業員情報のリストを返す
    } catch (error) {
        console.error('DynamoDB Scan Error:', error);
        throw new Error('従業員データの取得に失敗しました');
    }
};
module.exports = {
    createEmployee,
    getEmployee,
    getAllEmployees
};