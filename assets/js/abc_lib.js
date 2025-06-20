import showStatus     from './ds_upload_img_lib.js';    // 預設導出
import displayMessage from './ds_chat_lib.js';          // 預設導出

let url = 'http://127.0.0.1:8080'
// let url = 'https://aws.holymap.com.tw'

// DeepSeek: 從 js trigger flask +++++++++++++++++++++++++++++++++++++++++++++++
// Copilot:: js 取得目前的 url
//
export default function data2flask(type, data) {
    switch (type) {

        // AIGC (Artificial Intelligence Generated Content)
        case 'json':
            fetch(url+'/api/aigc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                return response.json();
            })
            .then(data => {
                if ("ReplyMsg" in data) displayMessage(data.ReplyMsg, 'bot');
                else displayMessage('對話失敗', 'bot');
            })
            .catch(error => displayMessage('連線失敗: ' + error.message, 'bot'));
            break

        // image identification
        case 'form':
            const formData = new FormData();
            formData.append('file', data);
            displayMessage('檔案上傳中，給我幾秒鐘比對一下 ...', 'bot');

            fetch(url+'/api/identify', {
                method: 'POST',
                // 注意：使用 FormData 時通常不需要設置 Content-Type 標頭
                // 瀏覽器會自動設置正確的 multipart/form-data 邊界
                body: formData
            })
            .then(response => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                return response.json();
            })
            .then(data => {
                if ("Model" in data) displayMessage('您上傳的是 ' + data.Model, 'bot');
                else displayMessage('識別失敗', 'bot');

            })
            .catch(error => showStatus('上傳失敗: ' + error.message, 'error'));
                    break;
        default:
          // 如果沒有匹配的值，執行這段代碼
          return;
    }
}
