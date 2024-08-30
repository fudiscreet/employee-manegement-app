const EmployeeService = require('../services/EmployeeService');
const EmployeeModel = require('../models/EmployeeModel');
const DynamoDBService = require('../services/DynamoDBService')

exports.createEmployee = async (req, res, next) => {
    try {
        const { name, position } = req.body;
        const photo = req.file;
        
        const employee = await EmployeeService.createEmployee(name, position, photo);
        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
};

exports.getEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeService.getEmployee(id);
        res.status(200).json(employee);
    } catch (error) {
        next(error);
    }
};

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await DynamoDBService.getAllEmployees();  // DynamoDBServiceのメソッドを呼び出し
        res.json(employees);
    } catch (error) {
        console.error('DynamoDB Scan Error:', error);
        next(error);
    }
};