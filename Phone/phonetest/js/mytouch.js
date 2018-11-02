/**
 * Created by Administrator on 2016/2/22.
 */
var startX, startY, x, y;
var content = document.getElementById("content");
var i = 0;
function touchStartFn(e) {
    e.preventDefault();//修复move和end不触发的bug
    var touch = e.touches[0];
    startX = touch.pageX;
    startY = touch.pageY;
    $('#main').html("x坐标：" + startX + ";y坐标：" + startY);
}
function touchMoveFn(e) {
    var touch = e.touches[0];
    x = touch.pageX;
    y = touch.pageY;
    $('#main').html("x坐标：" + x + ";y坐标：" + y);
}
function touchEndFn(e) {
    if (startX > x && startX - x > 50) {
        $('#main').html("向左滑动达到可切换程度");
    }
    else if (startX < x && x - startX > 50) {
        $('#main').html("向右滑动达到可切换程度");
    }
}
content.addEventListener("touchstart", touchStartFn, false);
content.addEventListener("touchmove", touchMoveFn, false);
content.addEventListener("touchend", touchEndFn, false);