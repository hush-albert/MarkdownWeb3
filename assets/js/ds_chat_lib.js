// DeepSeek: 用 js 寫一個可以輸入文字並顯示回覆的對話網頁 +++++++++++++++++++++++++++++++++++++++++
//
const chatMessages = document.getElementById('chat-messages');

// 顯示訊息到對話框
export default function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender + '-message');
    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
