// 安全性驗證工具模組
// 用於防止 XSS 攻擊和驗證用戶輸入

/**
 * HTML 轉義函數，防止 XSS 攻擊
 * @param {string} str - 要轉義的字符串
 * @returns {string} 轉義後的安全字符串
 */
export function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * 驗證聊天訊息
 * @param {string} message - 用戶輸入的訊息
 * @returns {Object} 驗證結果 {valid: boolean, error: string}
 */
export function validateChatMessage(message) {
    // 基本檢查
    if (!message || typeof message !== 'string') {
        return { valid: false, error: '訊息不能為空' };
    }
    
    const trimmedMessage = message.trim();
    
    // 長度檢查
    if (trimmedMessage.length === 0) {
        return { valid: false, error: '訊息不能為空' };
    }
    
    if (trimmedMessage.length > 1000) {
        return { valid: false, error: '訊息長度不能超過 1000 字符' };
    }
    
    // 檢查惡意腳本模式
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(trimmedMessage)) {
            return { valid: false, error: '訊息包含不安全的內容' };
        }
    }
    
    return { valid: true, message: escapeHtml(trimmedMessage) };
}

/**
 * 驗證檔案上傳
 * @param {File} file - 要上傳的檔案
 * @returns {Object} 驗證結果
 */
export function validateFileUpload(file) {
    if (!file) {
        return { valid: false, error: '請選擇檔案' };
    }
    
    // 檔案大小限制 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        return { valid: false, error: '檔案大小不能超過 5MB' };
    }
    
    // 允許的檔案類型
    const allowedTypes = [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: '只允許上傳圖片檔案 (JPG, PNG, GIF, WebP)' };
    }
    
    // 檢查檔案名稱
    const dangerousExtensions = /\.(exe|bat|cmd|com|pif|scr|vbs|js|jar|php|asp|aspx)$/i;
    if (dangerousExtensions.test(file.name)) {
        return { valid: false, error: '不允許的檔案類型' };
    }
    
    return { valid: true };
}

/**
 * 簡單的 rate limiting
 * @param {string} action - 動作類型 ('chat', 'upload')
 * @param {number} limit - 時間窗口內的限制次數
 * @param {number} windowMs - 時間窗口 (毫秒)
 * @returns {boolean} 是否允許執行
 */
export function rateLimitCheck(action, limit = 10, windowMs = 60000) {
    const now = Date.now();
    const key = `rateLimit_${action}`;
    
    // 從 localStorage 獲取歷史記錄
    let history = [];
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            history = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Rate limit storage error:', e);
    }
    
    // 清除過期記錄
    history = history.filter(timestamp => now - timestamp < windowMs);
    
    // 檢查是否超過限制
    if (history.length >= limit) {
        return false;
    }
    
    // 記錄當前請求
    history.push(now);
    
    // 存回 localStorage
    try {
        localStorage.setItem(key, JSON.stringify(history));
    } catch (e) {
        console.warn('Rate limit storage error:', e);
    }
    
    return true;
}