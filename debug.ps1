# Jekyll 開發環境啟動腳本 (PowerShell)
# 使用方法: .\debug.ps1

Write-Host "正在啟動 Jekyll 開發伺服器..." -ForegroundColor Green
Write-Host ""

# 設置開發環境變數
$env:JEKYLL_ENV = "development"

# 檢查是否已安裝 Ruby 和 Bundler
try {
    $rubyVersion = ruby --version
    Write-Host "Ruby 版本: $rubyVersion" -ForegroundColor Blue
} catch {
    Write-Host "錯誤: 未找到 Ruby，請先安裝 Ruby" -ForegroundColor Red
    Read-Host "按任意鍵退出"
    exit 1
}

try {
    $bundlerVersion = bundle --version
    Write-Host "Bundler 版本: $bundlerVersion" -ForegroundColor Blue
} catch {
    Write-Host "錯誤: 未找到 Bundler，正在安裝..." -ForegroundColor Yellow
    gem install bundler
}

# 啟動開發伺服器
Write-Host "啟動 Jekyll 開發伺服器..." -ForegroundColor Green
Write-Host "網站將在 http://127.0.0.1:4000/MarkdownWeb3/ 上運行" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止伺服器" -ForegroundColor Yellow
Write-Host ""

# 使用預設配置啟動
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --livereload --incremental

Write-Host "Jekyll 伺服器已停止" -ForegroundColor Yellow
Read-Host "按任意鍵退出"