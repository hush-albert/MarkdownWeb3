# Jekyll 開發環境使用說明

## 🚀 快速啟動 (三種方式)

### 方式一：直接在終端執行 (推薦)
```powershell
cd "C:\Users\mail\OneDrive\文件\MarkdownWeb3"
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

### 方式二：使用 PowerShell 腳本
```powershell
# 在專案目錄執行
.\start.ps1
```

### 方式三：使用批次檔案
1. 雙擊 `start_jekyll.bat` 檔案
2. 等待啟動完成
3. 在瀏覽器開啟 http://127.0.0.1:4000/MarkdownWeb3/

### 方式二：命令列啟動
```bash
# 在專案根目錄執行
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --livereload
```

## 開發模式功能

### 即時重載
- 檔案變更會自動重新載入網站
- CSS/JS 變更即時生效
- 新增或修改文章自動更新

### 除錯功能
- 開發環境會自動啟用除錯模式
- JavaScript 控制台會顯示詳細資訊
- API 錯誤會有詳細的錯誤訊息

### 測試 AI 聊天功能
1. 確保後端 API 正在運行（本地或遠端）
2. 在首頁測試聊天介面
3. **開啟瀏覽器 Console (F12) 查看 debug 日誌**
4. 檢查瀏覽器控制台的 API 回應

### 查看 Debug 日誌 🔍
- **開啟方式**: 按 `F12` → 點擊 "Console" 標籤
- **自動啟用**: 在 `127.0.0.1` 或 `localhost` 環境自動啟用
- **日誌格式**: `[時間戳] 模組名: 訊息內容 數據`
- **詳細說明**: 參見 `DEBUG_GUIDE.md`

### 測試圖片上傳功能
1. 在相關頁面測試多檔案上傳
2. 確認 AI 識別功能正常運作
3. 檢查上傳進度和錯誤處理

### 故障排除

### 常見問題
1. **端口被佔用**: 修改 `--port` 參數
2. **權限錯誤**: 以管理員身份執行
3. **依賴問題**: 執行 `bundle install`
4. **配置錯誤**: 檢查 `_config.yml` 語法
5. **⚠️ X-Frame-Options 警告**: 已修正，參見 `SECURITY_HEADERS.md`

### 安全標頭問題 🛡️
如果遇到 `X-Frame-Options may only be set via an HTTP header` 警告：
- **已自動修正**: 移除無效的 meta 標籤
- **使用 CSP**: `frame-ancestors 'none'` 提供相同保護
- **詳細說明**: 查看 `SECURITY_HEADERS.md`

### 重置環境
```bash
# 清理並重新安裝依賴
bundle clean --force
bundle install

# 清理 Jekyll 快取
bundle exec jekyll clean
```

### 檢查系統需求
- Ruby 3.0+
- Bundler 2.0+
- Node.js (用於 LiveReload)

## 部署前檢查

1. 確認所有 JavaScript 模組正常載入
2. 測試響應式設計
3. 檢查安全功能（XSS 防護、檔案驗證）
4. 驗證 API 端點配置
5. 測試錯誤處理機制