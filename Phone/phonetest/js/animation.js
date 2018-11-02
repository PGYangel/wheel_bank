/**
 * Created by Administrator on 2016/3/1.
 */

$(document).ready(function () {
    $('#loading').animate({opacity: 0}, 500, function () {
        $(this).remove();
    });
    $('body').click(function(){
        $('#test').addClass("run");
        setTimeout(function(){
            $('#test').removeClass();
        },5000);
    });
});


