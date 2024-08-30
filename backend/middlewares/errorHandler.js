module.exports = (err, req, res, next) => {
    console.error(err.stack);
    // レスポンスがまだ送信されていない場合のみエラーレスポンスを送信
    if (!res.headersSent) {
        res.status(500).json({ error: err.message });
    }
};