const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');
const multer = require('multer');

const router = express.Router();
const upload = multer(); // ファイルアップロードのためのMulter設定

// POST: 新しい従業員を作成
router.post('/', upload.single('photo'), EmployeeController.createEmployee);

// GET: 特定の従業員情報を取得
router.get('/:id', EmployeeController.getEmployee);

// GET: すべての従業員情報を取得
router.get('/', EmployeeController.getAllEmployees);

module.exports = router;
