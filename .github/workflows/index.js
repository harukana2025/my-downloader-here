const fs = require('fs');
const axios = require('axios');

// 【ここを保存したいURLに書き換える】
const fileUrl = "https://google.com";
const fileName = "downloaded_by_node.png";

async function downloadFile() {
    console.log(`ダウンロード開始: ${fileUrl}`);
    
    try {
        const response = await axios({
            method: 'get',
            url: fileUrl,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(fileName);
        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log('ダウンロード完了！');
        });

        writer.on('error', (err) => {
            console.error('書き込みエラー:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('取得エラー:', error.message);
        process.exit(1);
    }
}

downloadFile();
