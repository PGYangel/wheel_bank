/**
 * Created by Administrator on 2016/2/22.
 */

$(document).ready(function () {
    $('#loading').animate({opacity: 0}, 500, function () {
        $(this).remove();
    });
    var startX, startY, x, y;
    var winW = $(window).width();
    var touchState = 0;
    var content = document.getElementById("content");
    $('#content img').each(function () {
        var Zindex = $(this).attr('data-value');
        $(this).css('z-index', Zindex);
    });

    function touchStartFn(e) {
        e.preventDefault();
        var tc = e.touches[0];
        startX = tc.pageX;
        startY = tc.pageY;
    }

    function touchMoveFn(e) {
        var tc = e.touches[0];
        x = tc.pageX;
        y = tc.pageY;
        if (startX < x && $('#content img[data-value=1]').length > 0) {
            $('#content img[data-value=5]').css("left", (x - startX) + "px");
        }
    }

    function touchEndFn(e) {
        if (startX < x && x - startX > 50) {
            changeFn();
        } else {
            $('#content img[data-value=5]').animate({left: "0px"}, 300);
        }
//        changeFn();
    }

    function changeFn() {
        if ($('#content img[data-value=1]').length > 0) {
            $('#content img').each(function () {
                var Zindex = $(this).attr('data-value');
                $(this).attr("data-value", parseInt(Zindex) + 1);
                $(this).css('z-index', Zindex);
            });
            $('#content img[data-value=6]').animate({left: winW + 'px'}, 500, function () {
                $(this).attr("data-value", "1");
                $(this).css({"left": "0px", "z-index": "1"});
            });
        } else {
            return false;
        }
    }

    content.addEventListener('touchstart', touchStartFn, false);
    content.addEventListener('touchmove', touchMoveFn, false);
    content.addEventListener('touchend', touchEndFn, false);

});