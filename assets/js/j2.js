const btnShowImage = document.getElementById(   'showImage');
const j1Elements   = document.getElementsByClassName('jImg');
const jContainer   = document.getElementsByClassName('jDiv');

let i;
let innerHTML = [];
let src = [];

// default hide text
for(i = 0; i < j1Elements.length; i++) { innerHTML.push(j1Elements[i].innerHTML); j1Elements[i].innerHTML = ""; src.push(j1Elements[i].src); j1Elements[i].src = ""; }

// show HTML after parsing
for(i = 0; i < jContainer.length; i++) jContainer[i].style.display = 'inline';

// toggle text display
btnShowImage.onclick = () => {
if (btnShowImage.innerText ==  '秀圖') { btnShowImage.innerText  = '藏圖';
for(i = 0; i < j1Elements.length; i++) { j1Elements[i].innerHTML = innerHTML[i]; j1Elements[i].src = src[i]; } } else { btnShowImage.innerText = '秀圖';
for(i = 0; i < j1Elements.length; i++) { j1Elements[i].innerHTML = "";           j1Elements[i].src = ""; } }
}
