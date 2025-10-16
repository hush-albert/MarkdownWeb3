# Jekyll 快速啟動腳本
Write-Host "=== Jekyll 快速啟動 ===" -ForegroundColor Green
Write-Host "網站地址: http://127.0.0.1:4000/MarkdownWeb3/" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止伺服器" -ForegroundColor Yellow
Write-Host ""

Set-Location $PSScriptRoot
bundle exec jekyll serve --host 127.0.0.1 --port 4000