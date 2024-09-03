const EmployeeController = require('../controllers/EmployeeController'); // ルーティングファイルのインポート
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const errorHandler = require('../middlewares/errorHandler');
const serverless = require('serverless-http');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ storage: multer.memoryStorage() });

// APIエンドポイント
app.post('/employees', upload.single('photo'), (req, res, next) => {
    EmployeeController.createEmployee(req, res, next);
});
app.get('/employees/:id', (req, res, next) => {
    EmployeeController.getEmployee(req, res, next);
});
app.get('/employees', (req, res, next) =>{
   EmployeeController.getAllEmployees(req, res, next);  // 新しいルート
});
// エラーハンドリングミドルウェア
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
// Lambda用のハンドラーをエクスポート
module.exports.handler = serverless(app);