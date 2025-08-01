// DeepSeek: 用 js 寫一個可以上傳圖片檔的網頁 +++++++++++++++++++++++++++++++++++++++++++++++
//
const statusDiv = document.getElementById('status');

// 顯示狀態消息
export default function showStatus(message, type) {
    statusDiv.style.display = 'block';
    statusDiv.textContent = message;
    statusDiv.className = 'status';

    if (type === 'success') {
        statusDiv.classList.add('success');
    } else if (type === 'error') {
        statusDiv.classList.add('error');
    }

    // 5秒後自動隱藏
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 5000);
}
