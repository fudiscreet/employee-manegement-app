require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-northeast-1', // 必要なリージョンに設定
  });

// AWSの設定を読み込む
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

module.exports = {
    S3_BUCKET: process.env.S3_BUCKET,
    DYNAMODB_TABLE: process.env.DYNAMODB_TABLE,
};
