/**
 * Created by Administrator on 2018/9/3.
 * 换装游戏主逻辑
 */

function createImg(){
    html2canvas(document.getElementById("capture"),{"scale":2}).then(function(canvas) {
        $(".canvas").html(canvas);
        var dataURL = canvas.toDataURL("image/png");
        $("#personImg").attr("src",dataURL);
        $(".s1").hide();
        $(".s2").show();
    });
}

function changeDress(num){
    switch (num){
        case 1:
            $(".img2").removeClass("p3").addClass("p1");
            break;
        case 2:
            $(".img3").removeClass("p4").addClass("p2");
            break;
        case 3:
            $(".img2").removeClass("p1").addClass("p3");
            break;
        case 4:
            $(".img3").removeClass("p2").addClass("p4");
            break;
        case 5:
            $(".img4").removeClass("p6").addClass("p5");
            break;
        case 6:
            $(".img4").removeClass("p5").addClass("p6");
            break;
        case 7:
            $(".img1").removeClass("p8").addClass("p7");
            break;
        case 8:
            $(".img1").removeClass("p7").addClass("p8");
            break;
    }
}