// 自動檢測是否為開發環境
function isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.protocol === 'file:' ||
           window.location.search.includes('debug=true');
}

// 調試輔助函數 - 自動判斷是否啟用
export function debugLog(module, message, data = null) {
    if (isDevelopment()) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${module}: ${message}`, data || '');
    }
}

export function debugError(module, error, context = null) {
    if (isDevelopment()) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ${module} ERROR:`, error, context || '');
    }
}

export function debugTable(module, data) {
    if (isDevelopment() && data) {
        console.log(`[${module}] Data table:`);
        console.table(data);
    }
}
