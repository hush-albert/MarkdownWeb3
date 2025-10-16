# 🔍 Debug 日誌查看指南

## 📋 **如何查看 debugLog 輸出**

### 🌐 **在瀏覽器中查看**

1. **開啟網站**
   - 訪問：http://127.0.0.1:4000/MarkdownWeb3/
   - 或任何包含聊天功能的頁面

2. **開啟開發者工具**
   - **Windows**: `F12` 或 `Ctrl + Shift + I`
   - **Mac**: `Cmd + Option + I`
   - 右鍵點擊頁面 → "檢查元素"

3. **切換到 Console 標籤**
   - 在開發者工具中點擊 "Console" 標籤
   - 這裡會顯示所有 JavaScript 日誌

### 🔧 **Debug 功能自動啟用條件**

系統會在以下情況自動啟用 debug 模式：
- ✅ `localhost` 域名
- ✅ `127.0.0.1` IP 地址  
- ✅ `file://` 協議（本地檔案）
- ✅ URL 包含 `?debug=true` 參數

### 📊 **Debug 日誌格式**

```javascript
// 一般日誌
[2025-10-15T23:15:30.123Z] CHAT: Message validated successfully {original: "Hello", safe: "Hello"}

// 錯誤日誌
[2025-10-15T23:15:30.456Z] CHAT ERROR: Validation failed {error: "Message too long"}

// 表格格式數據
[CHAT] Data table:
┌─────────┬──────────────┐
│ (index) │    Values    │
├─────────┼──────────────┤
│  field1 │   "value1"   │
│  field2 │   "value2"   │
└─────────┴──────────────┘
```

### 🎯 **聊天模組的 Debug 事件**

當您使用聊天功能時，Console 會顯示：

1. **模組初始化**
   ```
   [時間戳] CHAT: Chat module initialized {chatTitle: "...", inputElement: true, sendButton: true}
   ```

2. **發送訊息嘗試**
   ```
   [時間戳] CHAT: Send message attempt {messageLength: 10, hasContent: true}
   ```

3. **速率限制檢查**
   ```
   [時間戳] CHAT: Rate limit exceeded
   ```

4. **訊息驗證**
   ```
   [時間戳] CHAT: Message validated successfully {original: "原始訊息", safe: "安全訊息"}
   ```

5. **API 呼叫**
   ```
   [時間戳] CHAT: Sending to API {UserID: "string", message: "訊息內容"}
   ```

### 🛠️ **實際操作步驟**

1. **啟動網站** (如果還沒啟動)
   ```bash
   bundle exec jekyll serve --host 127.0.0.1 --port 4000
   ```

2. **開啟瀏覽器**
   - 訪問 http://127.0.0.1:4000/MarkdownWeb3/

3. **開啟 Console**
   - 按 `F12` → 點擊 "Console"

4. **測試聊天功能**
   - 在聊天輸入框輸入文字
   - 點擊發送按鈕
   - 觀察 Console 中的 debug 輸出

### 🎨 **進階 Debug 技巧**

#### 手動觸發 Debug
```javascript
// 在 Console 中直接執行
import { debugLog, debugError } from './assets/js/abc_def.js';
debugLog('TEST', 'Manual debug test', {test: 'data'});
```

#### 過濾日誌
在 Console 中使用過濾器：
- 輸入 `CHAT` 只顯示聊天相關日誌
- 輸入 `ERROR` 只顯示錯誤日誌

#### 查看特定模組
```javascript
// 目前系統中的模組標籤
- CHAT: 聊天功能
- UPLOAD: 圖片上傳
- API: API 通訊
- SECURITY: 安全驗證
```

### 🚨 **常見問題**

**Q: 看不到任何 debug 輸出？**
- 確認網址是 `127.0.0.1:4000` 而不是其他域名
- 檢查 Console 有沒有過濾設定
- 確認 JavaScript 沒有錯誤阻止載入

**Q: Debug 在正式環境會顯示嗎？**
- 不會，系統會自動偵測環境，正式環境不會輸出 debug 訊息

**Q: 如何強制啟用 Debug？**
- 在 URL 後加上 `?debug=true`
- 例如：`https://yoursite.com/?debug=true`

### 📱 **行動裝置 Debug**

在手機瀏覽器中：
1. 使用 Chrome 遠端除錯
2. 或在 URL 加上 `?debug=true` 並查看頁面行為