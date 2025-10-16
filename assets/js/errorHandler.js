// 統一錯誤處理模組
// 提供一致的錯誤處理和日誌記錄功能

/**
 * 錯誤處理類
 */
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.maxLogSize = 100; // 最多保存 100 條錯誤記錄
    }

    /**
     * 處理並記錄錯誤
     * @param {Error|string} error - 錯誤對象或錯誤訊息
     * @param {string} context - 錯誤上下文 (例如: 'chat', 'upload', 'api')
     * @param {Object} additionalInfo - 額外資訊
     */
    handleError(error, context = 'unknown', additionalInfo = {}) {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            context: context,
            message: error.message || error,
            stack: error.stack || null,
            userAgent: navigator.userAgent,
            url: window.location.href,
            additionalInfo: additionalInfo
        };

        // 記錄到本地日誌
        this.logError(errorInfo);

        // 顯示用戶友好的錯誤訊息
        this.showUserError(context, error);

        // 在開發環境中顯示詳細錯誤
        if (this.isDevelopment()) {
            console.error(`[${context.toUpperCase()}] Error:`, errorInfo);
        }
    }

    /**
     * 記錄錯誤到本地存儲
     * @param {Object} errorInfo - 錯誤資訊
     */
    logError(errorInfo) {
        this.errorLog.push(errorInfo);
        
        // 保持日誌大小限制
        if (this.errorLog.length > this.maxLogSize) {
            this.errorLog.shift(); // 移除最舊的記錄
        }

        // 嘗試保存到 localStorage (忽略可能的存儲錯誤)
        try {
            localStorage.setItem('errorLog', JSON.stringify(this.errorLog));
        } catch (e) {
            // 存儲空間可能已滿，忽略此錯誤
        }
    }

    /**
     * 顯示用戶友好的錯誤訊息
     * @param {string} context - 錯誤上下文
     * @param {Error|string} error - 原始錯誤
     */
    showUserError(context, error) {
        let userMessage;
        
        switch (context) {
            case 'chat':
                userMessage = '發送訊息時發生錯誤，請稍後再試';
                break;
            case 'upload':
                userMessage = '檔案上傳失敗，請檢查檔案格式和網路連線';
                break;
            case 'api':
                if (error.message && error.message.includes('NetworkError')) {
                    userMessage = '網路連線問題，請檢查您的網路狀態';
                } else if (error.message && error.message.includes('500')) {
                    userMessage = '伺服器暫時無法處理請求，請稍後再試';
                } else {
                    userMessage = '服務暫時不可用，請稍後再試';
                }
                break;
            case 'validation':
                userMessage = error.message || '輸入驗證失敗';
                break;
            default:
                userMessage = '發生未知錯誤，請重新整理頁面後再試';
        }

        // 使用現有的訊息顯示函數 (非同步)
        this.displayErrorMessage(userMessage).catch(err => {
            console.error('Error displaying error message:', err);
        });
    }

    /**
     * 顯示錯誤訊息到用戶界面
     * @param {string} message - 要顯示的訊息
     */
    async displayErrorMessage(message) {
        try {
            // 動態導入 displayMessage 函數以避免循環依賴
            const { default: displayMessage } = await import('./ds_chat_lib.js');
            displayMessage(message, 'bot');
        } catch (error) {
            // 如果動態導入失敗，嘗試其他方法
            console.error('Failed to load displayMessage:', error);
            
            // 嘗試直接查找聊天訊息容器
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', 'bot-message');
                messageElement.textContent = `❌ ${message}`;
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            } else {
                // 最後回退到 alert
                alert(message);
            }
        }
    }

    /**
     * 檢查是否為開發環境
     * @returns {boolean}
     */
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.protocol === 'file:';
    }

    /**
     * 獲取錯誤日誌
     * @returns {Array} 錯誤日誌陣列
     */
    getErrorLog() {
        return [...this.errorLog]; // 返回副本
    }

    /**
     * 清除錯誤日誌
     */
    clearErrorLog() {
        this.errorLog = [];
        try {
            localStorage.removeItem('errorLog');
        } catch (e) {
            // 忽略錯誤
        }
    }

    /**
     * 從 localStorage 載入錯誤日誌
     */
    loadErrorLog() {
        try {
            const stored = localStorage.getItem('errorLog');
            if (stored) {
                this.errorLog = JSON.parse(stored);
            }
        } catch (e) {
            // 載入失敗，使用空陣列
            this.errorLog = [];
        }
    }
}

// 創建全域錯誤處理器實例
const globalErrorHandler = new ErrorHandler();

// 載入之前的錯誤日誌
globalErrorHandler.loadErrorLog();

// 設置全域錯誤處理
window.addEventListener('error', function(event) {
    globalErrorHandler.handleError(event.error, 'global', {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// 設置 Promise 拒絕錯誤處理
window.addEventListener('unhandledrejection', function(event) {
    globalErrorHandler.handleError(event.reason, 'promise');
});

// 導出錯誤處理器
export default globalErrorHandler;