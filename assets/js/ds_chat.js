import displayMessage from './ds_chat_lib.js';  // 預設導出
import data2flask     from './abc_lib.js';      // 預設導出
import { validateChatMessage, rateLimitCheck } from './security.js'; // 安全驗證
import { debugLog, debugError } from './abc_def.js'; // 調試工具

// Copilot: html 傳參數到 js module
// 注意：data-user-id 會轉換成 dataset.userId（駝峰式命名）。
//
const jsElements = document.getElementsByClassName('js-parameter');
const chatTitle = jsElements[0].dataset.chatTitle;

// DeepSeek: 用 js 寫一個可以輸入文字並顯示回覆的對話網頁 ++++++++++++++++++++++
//
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

document.addEventListener('DOMContentLoaded', function() {
    debugLog('CHAT', 'Chat module initialized', {
        chatTitle: chatTitle,
        inputElement: !!userInput,
        sendButton: !!sendButton
    });

    // 發送訊息函數
    function sendMessage() {
        const message = userInput.value.trim();
        debugLog('CHAT', 'Send message attempt', { 
            messageLength: message.length,
            hasContent: message.length > 0 
        });
        
        // 檢查 rate limiting
        if (!rateLimitCheck('chat', 20, 60000)) {  // 每分鐘最多 20 則訊息
            debugLog('CHAT', 'Rate limit exceeded');
            displayMessage('發送太頻繁，請稍後再試', 'bot');
            return;
        }
        
        // 驗證輸入
        const validation = validateChatMessage(message);
        if (!validation.valid) {
            debugError('CHAT', 'Validation failed', validation.error);
            displayMessage(validation.error, 'bot');
            return;
        }
        
        const safeMessage = validation.message;
        debugLog('CHAT', 'Message validated successfully', { 
            original: message,
            safe: safeMessage 
        });

        const data = {
            "UserID"    : "string",
            "message"   : safeMessage
        }
        debugLog('CHAT', 'Sending to API', data);
        data2flask('json', data);

        // 顯示用戶訊息（使用已轉義的安全訊息）
        displayMessage(safeMessage, 'user');
        userInput.value = '';
        debugLog('CHAT', 'Message sent and UI updated');

        /* 模擬機器人回覆 (可替換為實際的API調用)
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            displayMessage(botResponse, 'bot');
        }, 500); */
    }

    /* 簡單的機器人回應邏輯 (可擴展)
    function generateBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('你好') || lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
            return '你好！有什麼我可以幫忙的嗎？';
        } else if (lowerCaseMessage.includes('謝謝') || lowerCaseMessage.includes('感謝')) {
            return '不客氣！隨時為您服務。';
        } else if (lowerCaseMessage.includes('再見') || lowerCaseMessage.includes('bye')) {
            return '再見！期待下次與您交談。';
        } else if (lowerCaseMessage.includes('名字')) {
            return '我是一個簡單的聊天機器人。';
        } else {
            const randomResponses = [
                '我明白了。',
                '這很有趣，請告訴我更多。',
                '我不太確定我理解了，能換個方式說嗎？',
                '感謝您的分享。',
                '這是一個很好的觀點。'
            ];
            return randomResponses[Math.floor(Math.random() * randomResponses.length)];
        }
    } */

    // 事件監聽器
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 初始歡迎訊息
    setTimeout(() => {
        displayMessage(`${chatTitle}`, 'bot');
    }, 500);
});
