function HitHamster(cb){
    var hitObj=new Object();
    hitObj.hammerSum=3;//锤子总共种类*
    hitObj.hammer=1;//当前锤子种类*
    hitObj.useHammer=1;//当前需要使用的锤子*
    hitObj.sumNum=120;//需要砸中个数*
    hitObj.nowNum=0;//当前砸中数*
    hitObj.time=0;//时间记录*
    hitObj.setTime=null;//定时器记录*
    hitObj.isGame=false;//是否正在进行游戏*
    hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];//地鼠可出现位置数组*
    hitObj.callFn=cb;//成功后的回调函数*

    regScrollHammer();//注册滚轮切换锤子
    regKeyHammer();//注册键盘切换锤子
    //初始化
    hitObj.init=function(){
        hitObj.hammer=1;
        hitObj.time=0;
        hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
        hitObj.nowNum=0;
        $('#sumNum').text(hitObj.sumNum);
        $('#num').text(hitObj.nowNum);
        changeHammer();
    };
    hitObj.init();
    //启动游戏
    hitObj.beginGame=function(){
        hitObj.isGame=true;
        timeFn();
        hitObj.init();
        showMouse();
    };
    //敲打
    $('.gameBox .unit').click(function(){
        if(!hitObj.isGame){
            return false;
        }
        var num=$(this).attr('data-value');
        if(!hitObj.mouseArr[num] && hitObj.useHammer==hitObj.hammer){
            $(this).find('.yes').show();
            updateNum(true);
            (function(el){
                setTimeout(function(){
                    $(el).find('.yes').hide();
                    $(el).find('.yes').hide();
                    el=null;
                },500);
            })(this);
        }else{
            $(this).find('.no').show();
            updateNum(false);
            (function(el){
                setTimeout(function(){
                    $(el).find('.no').hide();
                    $(el).find('.no').hide();
                    el=null;
                },500);
            })(this);
        }
    });

    function showMouse(){
        if(hitObj.nowNum>=hitObj.sumNum){
            return false;
        }
        var num =Math.floor(Math.random()*9);
        var colorNum =Math.floor(Math.random()*3)+1;
        hitObj.useHammer=colorNum;
        if(!hitObj.mouseArr[num]){
            showMouse();
            return false;
        }
        hitObj.mouseArr[num]=0;
        $('.gameBox .m'+(num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+colorNum);
        (function(num,colorNum){
            setTimeout(function(){
                $('.gameBox .m'+(num+1)+' .mouse').hide().removeClass('mouse1 mouse2 mouse3');
                hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
                num=null;
                colorNum=null;
                showMouse();
            },1000);
        })(num,colorNum);
    }
    //更新砸中数字
    function updateNum(ck){
        hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
        $('.gameBox .mouse').hide().removeClass('mouse1 mouse2 mouse3');
        if(ck){
            hitObj.nowNum++;
            $('#num').text(hitObj.nowNum);
            if(hitObj.nowNum>=hitObj.sumNum){
                clearInterval(hitObj.setTime);
                setTimeout(hitObj.callFn,500);
            }
        }
    }

    function timeFn(){
        hitObj.setTime=setInterval(function(){
            hitObj.time+=10;
            $("#ss").text(parseInt(hitObj.time/1000));
            $("#ms").text(hitObj.time%1000);
        },10);
    }

    //切换锤子
    function changeHammer(){
        $('#gameBox').removeClass('hammer1 hammer2 hammer3').addClass('hammer'+hitObj.hammer);
    }
    //注册按键切换锤子
    function regKeyHammer(){
        document.onkeydown=function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode==49 || e.keyCode==97 ){
                hitObj.hammer=1;
                changeHammer();
            }else if(e && e.keyCode==50 || e.keyCode==98 ){
                hitObj.hammer=2;
                changeHammer();
            }else if(e && e.keyCode==51 || e.keyCode==99 ){
                hitObj.hammer=3;
                changeHammer();
            }
        }
    }
    //注册滚轮切换锤子
    function regScrollHammer(){
        if (document.attachEvent) {
            document.attachEvent('onmousewheel', scrollFunc);
        }
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome
        function scrollFunc(e) {
            e = e || window.event;
            if (e.wheelDelta) {
                //IE/Opera/Chrome，向下滚动小于0，向上滚动大于0
                if (e.wheelDelta < 0) {
                    hitObj.hammer++;
                    if(hitObj.hammer>hitObj.hammerSum){
                        hitObj.hammer=1;
                    }
                }else if (e.wheelDelta > 0) {
                    hitObj.hammer--;
                    if(hitObj.hammer<1){
                        hitObj.hammer=hitObj.hammerSum;
                    }
                }
            }else if (e.detail) {
                //Firefox,向下滚动大于0，向上滚动小于0
                if (e.detail > 0) {
                    hitObj.hammer++;
                    if(hitObj.hammer>hitObj.hammerSum){
                        hitObj.hammer=1;
                    }
                }else if (e.detail < 0) {
                    hitObj.hammer--;
                    if(hitObj.hammer<1){
                        hitObj.hammer=hitObj.hammerSum;
                    }
                }
            }
            changeHammer();
        }
    }
    return hitObj;
}
