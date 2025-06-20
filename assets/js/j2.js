const btnShowImage = document.getElementById(   'showImage');
const jContainer   = document.getElementsByClassName('jDiv');

let i;
let innerHTML = [];

// DeepSeek: src = '' 後，手機 browser 上的 image 還存在
// 優先使用 removeAttribute('src') 而非設置空字串
//
// ChatGPT: html src = '' 後，手機 browser 上的 image 還存在
// 這是常見的瀏覽器行為問題，尤其在手機端的 Safari 上，以下是原因與解法
// 使用 display: none 隱藏整張圖（如果只是想消失）
//
/* default hide text
for(i = 0; i < j1Elements.length; i++) { innerHTML.push(j1Elements[i].innerHTML); j1Elements[i].innerHTML = ""; j1Elements[i].style.display = 'none'; }

// show HTML after parsing
for(i = 0; i < jContainer.length; i++) jContainer[i].style.display = 'inline';

// toggle text display
btnShowImage.onclick = () => {
if (btnShowImage.innerText ==  '秀圖') { btnShowImage.innerText  = '藏圖';
for(i = 0; i < j1Elements.length; i++) { j1Elements[i].innerHTML = innerHTML[i]; j1Elements[i].style.display = 'inline'; } } else { btnShowImage.innerText = '秀圖';
for(i = 0; i < j1Elements.length; i++) { j1Elements[i].innerHTML = "";           j1Elements[i].style.display = 'none'; } }
}
*/
// ChatGPT: github pages display: none 在 safari 無效
// GitHub Pages 有 CDN 快取機制
// Safari 本身又極度 aggressive 快取 CSS 和 JS
//
// [abc] 測試 container 顯示與隱藏對 Safari 有效，對 img 無效
btnShowImage.onclick = () => {
    for(i = 0; i < jContainer.length; i++) {
        if (jContainer[i].style.display == 'inline') {
            jContainer[i].style.display =    'none'; btnShowImage.innerText = '秀圖'; } else {
            jContainer[i].style.display =  'inline'; btnShowImage.innerText = '藏圖'; } }
}
