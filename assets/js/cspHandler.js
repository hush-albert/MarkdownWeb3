// CSP 問題檢測與處理

/**
 * 檢測 CSP 違規
 */
function setupCSPViolationHandler() {
    document.addEventListener('securitypolicyviolation', (e) => {
        console.group('🚨 CSP Violation Detected');
        console.error('Blocked URI:', e.blockedURI);
        console.error('Violated Directive:', e.violatedDirective);
        console.error('Original Policy:', e.originalPolicy);
        
        // 顯示用戶友好的錯誤訊息
        if (window.displayMessage) {
            window.displayMessage(
                '⚠️ 安全政策阻擋了網路請求。請檢查 API 配置。', 
                'bot'
            );
        }
        
        console.groupEnd();
    });
}

/**
 * 檢查當前環境的 CSP 狀態
 */
function checkCSPStatus() {
    console.group('🔍 CSP Status Check');
    
    // 檢查是否為開發環境
    const isDev = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1';
    console.log('開發環境:', isDev);
    
    // 檢查 CSP 設定
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (cspMeta) {
        const cspContent = cspMeta.getAttribute('content');
        console.log('CSP 設定:', cspContent);
        
        // 檢查 connect-src 是否允許需要的域名
        const connectSrcMatch = cspContent.match(/connect-src\s+([^;]+)/);
        if (connectSrcMatch) {
            console.log('允許的連接:', connectSrcMatch[1]);
        }
    } else {
        console.log('❌ 未發現 CSP 設定');
    }
    
    console.groupEnd();
}

// 自動設置
document.addEventListener('DOMContentLoaded', () => {
    setupCSPViolationHandler();
    
    // 在開發環境中顯示狀態檢查
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1') {
        setTimeout(() => {
            checkCSPStatus();
        }, 1000);
    }
});

export {
    setupCSPViolationHandler,
    checkCSPStatus
};