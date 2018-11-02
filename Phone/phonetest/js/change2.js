/**
 * Created by Administrator on 2016/3/1.
 */

$(document).ready(function () {
    $('#loading').animate({opacity: 0}, 500, function () {
        $(this).remove();
    });
    var startX, startY, x, y;
    var winW = $(window).width();
    var content = document.getElementById("content");
    $('#content img').each(function () {
        var Zindex = $(this).attr('data-value');
        $(this).css('z-index', Zindex);
    });

    function touchStartFn(e) {
        e.preventDefault();
    }

    function touchMoveFn(e) {
    }

    function touchEndFn(e) {
        /*$('#content img[data-value=5]').addClass('run');
        setTimeout(function(){
            $('#content img[data-value=5]').removeClass('run');
        },1000);*/
        $('#content img[data-value=5]').addClass("run");
    }

    content.addEventListener('touchstart', touchStartFn, false);
    content.addEventListener('touchmove', touchMoveFn, false);
    content.addEventListener('click', touchEndFn, false);

});