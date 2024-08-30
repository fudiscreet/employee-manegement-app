## ローカル環境構築
employee-manegement-app/配下に、`.env`ファイルを作成し、下記を設定  
```
AWS_ACCESS_KEY_ID=ここにアクセスキーIDを入力
AWS_SECRET_ACCESS_KEY=ここにアクセスキーを入力
AWS_REGION=ap-northeast-1
S3_BUCKET=バケット名を入力
DYNAMODB_TABLE=DynamoDBテーブル名を入力
PORT=3000
```
コマンドプロンプトを開き、employee-manegement-app/backendに移動します。  
必要なパッケージをインストールします。
```bash
npm install
```
employee-manegement-app/frontendでも同じようなことをします。  
backend・frontendの両方でサーバを起動します。  
```bash
npm start
```

### Postmanを用いたAPIの確認
* GETメソッド
  Postmanを開き、`http://localhost:3000/employees`と入力し、SENDボタンを押すことでDynamoDBに保存されている従業員情報を取得できます。  
  `http://localhost:3000/employees/{id}`の{id}の部分に従業員IDを入力することで、従業員IDに対応する従業員情報を取得できます。
* POSTメソッド
  Postmanを開き、`http://localhost:3000/employees`と入力し、name(Text)/position(Text)/photo(ファイル)を入力し送信することで従業員情報を登録できます。

