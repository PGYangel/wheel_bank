/**
 * Created by Administrator on 2016/2/25.
 */

$(document).ready(function () {
    var startX, startY, x, y;
    var content = document.getElementById("content");

    function touchStartFn(e) {
    }

    function touchMoveFn(e) {

    }

    function touchEndFn(e) {
        /*$('#i1').css({"animation":"myfirst 2s",
            "-webkit-animation":"myfirst 2s",
            "-o-animation":"myfirst 2s",
            "-moz-animation":"myfirst 2s",
            "-ms-animation":"myfirst 2s"
        });*/
        $('#i1').css({"height":"500px"
         });
    }

    content.addEventListener("touchstart", touchStartFn, false);
    content.addEventListener("touchmove", touchMoveFn, false);
    content.addEventListener("click", touchEndFn, false);

});
