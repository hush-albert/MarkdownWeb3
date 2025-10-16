---
layout: page
title: Debug Console
permalink: /debug/
---

<h1>Jekyll Debug Console</h1>

<div class="debug-panel">
    <h2>系統資訊</h2>
    <div id="system-info">
        <p><strong>Jekyll 環境:</strong> {{ jekyll.environment }}</p>
        <p><strong>網站 URL:</strong> {{ site.url }}{{ site.baseurl }}</p>
        <p><strong>建構時間:</strong> {{ site.time | date: "%Y-%m-%d %H:%M:%S" }}</p>
        <p><strong>頁面總數:</strong> {{ site.pages | size }}</p>
        <p><strong>文章總數:</strong> {{ site.posts | size }}</p>
    </div>

    <h2>JavaScript 模組測試</h2>
    <div class="js-test-panel">
        <button id="test-security" class="test-btn">測試安全模組</button>
        <button id="test-api" class="test-btn">測試 API 配置</button>
        <button id="test-error" class="test-btn">測試錯誤處理</button>
        <button id="clear-console" class="test-btn">清除控制台</button>
    </div>

    <h2>API 端點測試</h2>
    <div class="api-test-panel">
        <button id="test-chat-api" class="test-btn">測試聊天 API</button>
        <button id="test-upload-api" class="test-btn">測試上傳 API</button>
        <div id="api-status"></div>
    </div>

    <h2>調試日誌</h2>
    <div id="debug-log" class="debug-log">
        <p>調試訊息將顯示在瀏覽器控制台中...</p>
        <p>按 F12 開啟開發者工具查看詳細日誌</p>
    </div>
</div>

<style>
.debug-panel {
    background: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

.debug-panel h2 {
    color: #333;
    border-bottom: 2px solid #007cba;
    padding-bottom: 10px;
}

#system-info {
    background: white;
    padding: 15px;
    border-radius: 4px;
    margin: 10px 0;
}

.js-test-panel, .api-test-panel {
    margin: 15px 0;
}

.test-btn {
    background: #007cba;
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.test-btn:hover {
    background: #005a8b;
}

#api-status {
    background: white;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    min-height: 50px;
}

.debug-log {
    background: #2d3748;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    max-height: 300px;
    overflow-y: auto;
}
</style>

<script type="module">
import { debugLog, debugError, debugTable } from '/MarkdownWeb3/assets/js/abc_def.js';
import { validateChatMessage, validateFileUpload, rateLimitCheck } from '/MarkdownWeb3/assets/js/security.js';
import errorHandler from '/MarkdownWeb3/assets/js/errorHandler.js';
import apiConfig from '/MarkdownWeb3/assets/js/apiConfig.js';

document.addEventListener('DOMContentLoaded', function() {
    debugLog('DEBUG', 'Debug console initialized');
    
    // 測試安全模組
    document.getElementById('test-security').addEventListener('click', function() {
        debugLog('TEST', 'Testing security module...');
        
        // 測試聊天驗證
        const testMessage = "Hello World!";
        const validation = validateChatMessage(testMessage);
        debugLog('TEST', 'Chat validation result', validation);
        
        // 測試 rate limiting
        const rateLimitResult = rateLimitCheck('test', 5, 60000);
        debugLog('TEST', 'Rate limit check', { allowed: rateLimitResult });
        
        console.log('✅ Security module test completed');
    });
    
    // 測試 API 配置
    document.getElementById('test-api').addEventListener('click', function() {
        debugLog('TEST', 'Testing API configuration...');
        
        try {
            const chatUrl = apiConfig.getUrl('chat');
            const uploadUrl = apiConfig.getUrl('upload');
            
            debugTable('TEST', {
                'Chat URL': chatUrl,
                'Upload URL': uploadUrl,
                'Base URL': apiConfig.baseUrl,
                'Timeout': apiConfig.timeout
            });
            
            console.log('✅ API configuration test completed');
        } catch (error) {
            debugError('TEST', 'API configuration error', error);
        }
    });
    
    // 測試錯誤處理
    document.getElementById('test-error').addEventListener('click', function() {
        debugLog('TEST', 'Testing error handler...');
        
        // 模擬一個錯誤
        const testError = new Error('This is a test error');
        errorHandler.handleError(testError, 'test', { testData: 'debug console' });
        
        console.log('✅ Error handler test completed');
    });
    
    // 清除控制台
    document.getElementById('clear-console').addEventListener('click', function() {
        console.clear();
        debugLog('DEBUG', 'Console cleared');
    });
    
    // API 端點測試
    document.getElementById('test-chat-api').addEventListener('click', async function() {
        const statusDiv = document.getElementById('api-status');
        statusDiv.innerHTML = '<p>測試聊天 API 連線...</p>';
        
        try {
            const response = await fetch(apiConfig.baseUrl + '/health');
            if (response.ok) {
                statusDiv.innerHTML = '<p style="color: green;">✅ API 連線正常</p>';
            } else {
                statusDiv.innerHTML = '<p style="color: orange;">⚠️ API 回應異常: ' + response.status + '</p>';
            }
        } catch (error) {
            statusDiv.innerHTML = '<p style="color: red;">❌ API 連線失敗: ' + error.message + '</p>';
        }
    });
    
    console.log('🚀 Debug console ready!');
    console.log('Use the buttons above to test different modules.');
});
</script>