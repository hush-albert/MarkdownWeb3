import displayMessage from './ds_chat_lib.js';          // 預設導出
import errorHandler   from './errorHandler.js';         // 統一錯誤處理
import apiConfig, { getApiUrl, getRequestConfig } from './apiConfig.js'; // API 配置

// DeepSeek: 從 js trigger flask +++++++++++++++++++++++++++++++++++++++++++++++
// Copilot:: js 取得目前的 url
//
export default function data2flask(type, data) {
    switch (type) {

        // AIGC (Artificial Intelligence Generated Content)
        case 'json':
            const chatConfig = getRequestConfig('POST', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            // 直接使用 fetch 調用 API
            fetch(getApiUrl('chat'), chatConfig)
            .then(response => {
                if (!response.ok) { 
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`); 
                }
                return response.json();
            })
            .then(data => {
                if ("ReplyMsg" in data) {
                    displayMessage(data.ReplyMsg, 'bot');
                } else {
                    throw new Error('伺服器回應格式錯誤');
                }
            })
            .catch(error => {
                console.error('API Error:', error);
                
                errorHandler.handleError(error, 'api', {
                    endpoint: 'chat',
                    requestData: data
                });
            });
            break

        // image identification
        case 'form':
            const formData = new FormData();
            formData.append('file', data);
            displayMessage('檔案上傳中，請稍候...', 'bot');

            const uploadConfig = getRequestConfig('POST', {
                body: formData
                // 注意：FormData 不需要設置 Content-Type
            });

            // 直接使用 fetch 調用 API
            fetch(getApiUrl('upload'), uploadConfig)
            .then(response => {
                if (!response.ok) { 
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`); 
                }
                return response.json();
            })
            .then(data => {
                if ("Model" in data) {
                    displayMessage('您上傳的是 ' + data.Model, 'bot');
                } else {
                    throw new Error('識別結果格式錯誤');
                }
            })
            .catch(error => {
                console.error('Upload API Error:', error);
                
                errorHandler.handleError(error, 'api', {
                    endpoint: 'upload',
                    fileInfo: {
                        name: data.name,
                        size: data.size,
                        type: data.type
                    }
                });
            });
            break;
        default:
          // 如果沒有匹配的值，執行這段代碼
          return;
    }
}
