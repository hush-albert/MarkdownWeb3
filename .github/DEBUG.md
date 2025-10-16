# Jekyll 本地調試指南

## 基本調試命令

### 1. 標準本地伺服器啟動
```bash
# 標準啟動（最常用）
bundle exec jekyll serve

# 指定端口
bundle exec jekyll serve --port 4001

# 啟用實時重新載入
bundle exec jekyll serve --livereload

# 顯示詳細輸出
bundle exec jekyll serve --verbose
```

### 2. 開發模式調試
```bash
# 開發環境（顯示草稿和未來文章）
JEKYLL_ENV=development bundle exec jekyll serve --drafts --future

# 增量構建（只重新構建變更的檔案）
bundle exec jekyll serve --incremental

# 強制重新構建
bundle exec jekyll serve --force_polling
```

## 專案特定調試設置

### 1. 環境變數設置
```bash
# Windows PowerShell
$env:JEKYLL_ENV="development"
bundle exec jekyll serve --config _config.yml,_config_dev.yml

# Windows CMD
set JEKYLL_ENV=development
bundle exec jekyll serve

# Linux/Mac
export JEKYLL_ENV=development
bundle exec jekyll serve
```

### 2. 創建開發配置檔案
創建 `_config_dev.yml` 用於本地調試：
```yaml
# 開發環境專用設置
show_drafts: true
future: true
incremental: true
livereload: true

# 本地 API 端點設置
api_base_url: "http://127.0.0.1:8080"

# 調試選項
sass:
  style: expanded
  sourcemap: true

# 禁用一些外部服務
google_analytics: false
```

## JavaScript 模組調試

### 1. 瀏覽器開發者工具設置
```javascript
// 調試功能已自動化，根據環境自動啟用
// 本地開發時：自動啟用調試日誌
// 生產環境：自動禁用調試日誌
// 手動啟用：URL 加上 ?debug=true

// 使用調試函數
import { debugLog, debugError } from './abc_def.js';
```

### 2. 在模組中使用調試
```javascript
// 在 ds_chat.js 中添加調試
import { debugLog, debugError } from './abc_def.js';

function sendMessage() {
    const message = userInput.value.trim();
    debugLog('CHAT', 'Sending message', { message, length: message.length });
    
    // ... 其餘代碼
}
```

## 常見問題調試

### 1. 模組載入問題
```javascript
// 檢查模組載入狀態
console.log('Security module loaded:', typeof validateChatMessage);
console.log('Error handler loaded:', typeof errorHandler);
console.log('API config loaded:', typeof getApiUrl);
```

### 2. CSS 樣式調試
```bash
# 生成未壓縮的 CSS
bundle exec jekyll serve --config _config.yml,_config_dev.yml
```

### 3. 檔案監控問題
```bash
# 如果檔案變更沒有自動重新載入
bundle exec jekyll serve --force_polling

# Windows 特定問題
bundle exec jekyll serve --incremental --livereload
```

## 網路調試

### 1. API 連線測試
```javascript
// 在瀏覽器控制台測試 API 連線
fetch('http://127.0.0.1:8080/health')
    .then(response => console.log('API Status:', response.status))
    .catch(error => console.error('API Error:', error));
```

### 2. 網路請求調試
檢查瀏覽器控制台的網路請求狀態：
```
檢查 API 請求是否成功回應
```

## 性能調試

### 1. 構建時間分析
```bash
# 顯示構建時間詳情
bundle exec jekyll serve --profile

# 追蹤慢速檔案
time bundle exec jekyll build
```

### 2. 檔案大小檢查
```bash
# 檢查生成的檔案大小
ls -la _site/assets/js/
ls -la _site/assets/css/
```

## 調試工具推薦

### 1. Jekyll Admin (可選)
```bash
# 安裝 Jekyll Admin
gem install jekyll-admin

# 在 Gemfile 中添加
gem 'jekyll-admin'

# 訪問 http://127.0.0.1:4000/admin
```

### 2. 瀏覽器擴展
- Vue.js devtools (用於調試 JavaScript)
- Web Developer (用於 CSS 調試)
- Lighthouse (性能分析)

## 常用調試技巧

### 1. 快速重啟技巧
```bash
# 快速停止並重啟
Ctrl+C
bundle exec jekyll serve
```

### 2. 清除快取
```bash
# 清除 Jekyll 快取
bundle exec jekyll clean

# 清除瀏覽器快取
Ctrl+Shift+R (硬重新整理)
```

### 3. 檔案權限問題 (Windows)
```bash
# 以管理員身份執行 PowerShell
bundle exec jekyll serve
```

## 專案特定調試檢查清單

### 啟動前檢查：
- [ ] Ruby 版本是否正確 (`ruby --version`)
- [ ] Bundler 已安裝 (`gem install bundler`)
- [ ] 依賴已安裝 (`bundle install`)
- [ ] _config.yml 語法正確

### 運行時檢查：
- [ ] 端口 4000 是否可用
- [ ] baseurl 設置是否正確 (`/MarkdownWeb3`)
- [ ] JavaScript 模組是否正常載入
- [ ] CSS 樣式是否正確應用
- [ ] API 端點是否可訪問

### 調試輸出範例：
```
Configuration file: /path/to/_config.yml
            Source: /path/to/project
       Destination: /path/to/project/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.123 seconds.
 Auto-regeneration: enabled for '/path/to/project'
    Server address: http://127.0.0.1:4000/MarkdownWeb3/
  Server running... press ctrl-c to stop.
```

記住：修改 `_config.yml` 後需要重啟 Jekyll 伺服器！