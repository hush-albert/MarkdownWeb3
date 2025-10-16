---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
chat-title: "Agentic AI"
---
<a href="https://lin.ee/W6omKRA"><img src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png" alt="加入好友" height="36" border="0"></a>

<!-- DeepSeek: 用 js 寫一個可以輸入文字並顯示回覆的對話網頁 ++++++++++++++++++++
-->
<div class="chat-container">
    <div class="chat-header">
        <h1>{{ page.chat-title }}</h1>
    </div>
    <div class="chat-messages" id="chat-messages">
    <!-- 對話內容將在這裡顯示 -->
    </div>
    <div class="chat-input">
        <input type="text" id="user-input" placeholder="輸入訊息...">
        <button id="send-button">發送</button>
    </div>
</div>

<input type="file" id="file-input" accept="image/*" multiple>
<button class="upload-btn" onclick="document.getElementById('file-input').click()">選擇圖片</button>
<div id="status" class="status" style="display: none;"></div>

<button id="showImage">秀圖</button>

<div class="jDiv" style="display:none">
    <img class="jImg" src="{{ '/assets/images/abc.jpg' | relative_url }}">
</div>

<!-- Copilot: html 傳參數到 js module ++++++++++++++++++++++++++++++++++++++++++
-->
<div class="js-parameter" data-chat-title="歡迎加入開發中的 AI 代理人測試">
    <!-- Copilot: <script type="module" 中 module 的意義
    module 的意思是告訴瀏覽器：這是一個 ES6 模組（ES Module），而不是傳統的 JavaScript 腳本。
    這種寫法解鎖了許多現代 JavaScript 的強大功能，以下是它的幾個關鍵意義：
    -->
    <script type="module" src="./assets/js/security.js"></script>
    <script type="module" src="./assets/js/errorHandler.js"></script>
    <script type="module" src="./assets/js/apiConfig.js"></script>
    <script type="module" src="./assets/js/cspHandler.js"></script>
    <script type="module" src="./assets/js/abc_def.js"></script>
    <script type="module" src="./assets/js/j2.js"></script>
    <script type="module" src="./assets/js/ds_chat.js"></script>
    <script type="module" src="./assets/js/ds_upload_img.js"></script>
</div>
