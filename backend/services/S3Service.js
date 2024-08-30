const AWS = require('aws-sdk');
AWS.config.update({
    region: 'ap-northeast-1', // 必要なリージョンに設定
  });
const s3 = new AWS.S3();

const bucketName = '20240830employeephotobucket';

exports.uploadPhoto = async (buffer, key, contentType) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
    };

    return s3.upload(params).promise();
};

exports.getSignedUrl = (key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 60, // 1 hour expiration
    };

    return s3.getSignedUrl('getObject', params);
};
