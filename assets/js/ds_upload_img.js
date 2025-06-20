import data2flask from './abc_lib.js';              // 預設導出
import showStatus from './ds_upload_img_lib.js';    // 預設導出

// DeepSeek: 用 js 寫一個可以上傳圖片檔的網頁 ++++++++++++++++++++++++++++++++++
//
// 獲取DOM元素
const fileInput = document.getElementById('file-input'); /*
const previewContainer = document.getElementById('preview-container');
const uploadBtn = document.getElementById('upload-btn');
const dropArea = document.getElementById('drop-area'); */

// 存儲選擇的文件
let files = [];

// 監聽文件選擇事件
fileInput.addEventListener('change', function(e) {
    handleFiles(e.target.files);
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

// 處理選擇的文件
function handleFiles(selectedFiles) {
    /* 清空預覽區域
    previewContainer.innerHTML = ''; */
    files = [];

    /* 檢查是否有文件
    if (selectedFiles.length === 0) {
        uploadBtn.disabled = true;
        return;
    } */

    // 過濾非圖片文件
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (!file.type.match('image.*')) {
            showStatus(`文件 "${file.name}" 不是圖片格式`, 'error');
            continue;
        }
        files.push(file);
    }

    /* 顯示預覽
    if (files.length > 0) {
        uploadBtn.disabled = false;

        files.forEach((file, index) => {
            const reader = new FileReader();
                    
            reader.onload = function(e) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';

                const img = document.createElement('img');
                img.className = 'preview-img';
                img.src = e.target.result;
                img.alt = file.name;

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.innerHTML = '×';
                removeBtn.onclick = function() {
                    files.splice(index, 1);
                    previewContainer.removeChild(previewItem);
                    if (files.length === 0) {
                        uploadBtn.disabled = true;
                    }
                };

                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                previewContainer.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        });
    } else {
        uploadBtn.disabled = true;
    } */

    // 調用 data2flask 函數進行上傳處理
    data2flask('form', files[0]);
    // 重置表單
    files = []; /*
    previewContainer.innerHTML = '';
    uploadBtn.disabled = true;
    fileInput.value = ''; */
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