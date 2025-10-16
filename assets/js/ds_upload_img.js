import data2flask from './abc_lib.js';              // 預設導出
import displayMessage from './ds_chat_lib.js';     // 聊天訊息顯示函數
import { validateFileUpload, rateLimitCheck } from './security.js'; // 安全驗證
import { debugLog, debugError } from './abc_def.js'; // 調試工具

// DeepSeek: 用 js 寫一個可以上傳圖片檔的網頁 ++++++++++++++++++++++++++++++++++
//
// 獲取DOM元素
const fileInput = document.getElementById('file-input'); /*
const previewContainer = document.getElementById('preview-container');
const uploadBtn = document.getElementById('upload-btn');
const dropArea = document.getElementById('drop-area'); */

// 存儲選擇的文件
let files = [];

// 監聽文件選擇事件 (使用 async 版本)
fileInput.addEventListener('change', function(e) {
    handleFilesAsync(e.target.files);
});

/* 拖放功能
dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropArea.style.borderColor = '#4CAF50';
});

dropArea.addEventListener('dragleave', function() {
    dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    dropArea.style.borderColor = '#ccc';
    handleFiles(e.dataTransfer.files);
}); */

// 檢查檔案頭以驗證是否為真實的圖片檔案
function isValidImageFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arr = new Uint8Array(e.target.result).subarray(0, 4);
            let header = '';
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            
            // 檢查檔案頭
            const validHeaders = [
                'ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8', // JPEG
                '89504e47', // PNG
                '47494638', // GIF
                '52494646', // WebP (RIFF)
                '424d'      // BMP
            ];
            
            resolve(validHeaders.some(validHeader => header.startsWith(validHeader)));
        };
        reader.readAsArrayBuffer(file.slice(0, 4));
    });
}

// 使用 async/await 來處理檔案驗證
async function handleFilesAsync(selectedFiles) {
    files = [];
    debugLog('UPLOAD', 'File selection started', { 
        fileCount: selectedFiles.length 
    });

    if (selectedFiles.length === 0) {
        debugLog('UPLOAD', 'No files selected');
        displayMessage('請選擇至少一個檔案', 'bot');
        return;
    }

    if (!rateLimitCheck('upload', 5, 60000)) {
        debugLog('UPLOAD', 'Rate limit exceeded');
        displayMessage('上傳太頻繁，請稍後再試', 'bot');
        return;
    }

    const file = selectedFiles[0];
    debugLog('UPLOAD', 'Processing file', { 
        name: file.name, 
        size: file.size, 
        type: file.type 
    });
    
    const validation = validateFileUpload(file);
    if (!validation.valid) {
        debugError('UPLOAD', 'File validation failed', validation.error);
        displayMessage(validation.error, 'bot');
        return;
    }

    // 檢查檔案頭
    debugLog('UPLOAD', 'Starting file header validation');
    const isValid = await isValidImageFile(file);
    if (!isValid) {
        debugError('UPLOAD', 'File header validation failed');
        displayMessage('檔案不是有效的圖片格式', 'bot');
        return;
    }

    files.push(file);
    debugLog('UPLOAD', 'File validation completed successfully', { 
        fileName: file.name 
    });
    displayMessage(`檔案 "${file.name}" 驗證通過，正在上傳...`, 'bot');
    
    debugLog('UPLOAD', 'Starting file upload to API');
    data2flask('form', file);
    
    setTimeout(() => {
        files = [];
        fileInput.value = '';
        debugLog('UPLOAD', 'Upload process completed, form reset');
    }, 1000);
}

/* 上傳按鈕點擊事件
uploadBtn.addEventListener('click', function() {
    if (files.length === 0) {
        showStatus('沒有可上傳的圖片', 'error');
        return;
    }

    // 這裡是上傳邏輯，實際應用中需要替換為你的API端點
    showStatus('正在上傳圖片...', '');

    // 模擬上傳過程 (實際應用中應該使用fetch或XMLHttpRequest)
    setTimeout(() => {
        showStatus(`成功上傳 ${files.length} 張圖片`, 'success');

        // 重置表單
        files = [];
        previewContainer.innerHTML = '';
        uploadBtn.disabled = true;
        fileInput.value = '';
    }, 1500);

    // 實際的上傳代碼可能類似這樣:

    const formData = new FormData();
    files.forEach(file => {
        formData.append('images', file);
    });

    fetch('你的上傳API端點', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showStatus('上傳成功!', 'success');
        // 重置表單
        files = [];
        previewContainer.innerHTML = '';
        uploadBtn.disabled = true;
        fileInput.value = '';
    })
    .catch(error => {
        showStatus('上傳失敗: ' + error.message, 'error');
    });
}); */