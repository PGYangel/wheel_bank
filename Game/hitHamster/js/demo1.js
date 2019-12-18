function HitHamster(cb){
    var hitObj=new Object();
    hitObj.sumNum=60;//需要砸中个数*
    hitObj.downTime=3;//开始倒计时
    hitObj.downTimeSet=null;
    hitObj.type=1;//游戏模式：1疯狂模式，2普通模式，3记忆模式
    hitObj.hammerSum=3;//锤子总共种类*
    hitObj.hammer=1;//当前锤子种类*
    hitObj.useHammer=1;//当前需要使用的锤子*
    hitObj.nowNum=0;//当前砸中数*
    hitObj.time=0;//时间记录*
    hitObj.setTime=null;//定时器记录*
    hitObj.isGame=false;//是否正在进行游戏*
    hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];//地鼠可出现位置数组*
    hitObj.callFn=cb;//成功后的回调函数*
    hitObj.process=[];//记录过程
    hitObj.randomObj={};//随机生成的随机对象
    hitObj.randomArr=[];//疯狂模式的随机数组
    hitObj.nowTurn=null;//当前轮次对象
    hitObj.allowHit=false;//是否允许砸地鼠
    var answer_Time=0;//记忆倒计时
    var turns_Time=null;
    var mouse_Arr=[];

    regScrollHammer();//注册滚轮切换锤子
    regKeyHammer();//注册键盘切换锤子
    //初始化
    hitObj.init=function(){
        answer_Time=0;
        turns_Time=null;
        mouse_Arr=[];
        hitObj.downTime=3;
        hitObj.downTimeSet=null;
        hitObj.str='';
        hitObj.process=[];
        hitObj.hammer=1;
        hitObj.time=0;
        hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
        hitObj.nowNum=0;
        hitObj.setTime=null;
        $('#sumNum').text(hitObj.sumNum);
        $('#num').text(hitObj.nowNum);
        $('.gameBox .tipsBg').hide();
        $('.gameBox .turnsTime').hide();
        $('.gameBox .mouse').hide();
        $('.gameBox .yes').hide();
        $('.gameBox .no').hide();
        $('.gameBox .endBg').hide();
        changeHammer();
    };
    hitObj.init();
    //开始游戏
    hitObj.beginGame=function(){
        if(hitObj.isGame){
            return false;
        }
        hitObj.init();
        hitObj.isGame=true;
        if(hitObj.type!=3){
            $('#gameBox #downTime').show().text(hitObj.downTime);
            hitObj.downTimeSet=setInterval(function(){
                hitObj.downTime--;
                $('#gameBox #downTime').show().text(hitObj.downTime);
                if(hitObj.downTime<=0){
                    $('#gameBox #downTime').hide();
                    clearInterval(hitObj.downTimeSet);
                    timeFn();
                    switch (hitObj.type) {
                        case 1:
                            showMouse();
                            break;
                        case 2:
                            showMouse2();
                            break;
                    }
                }
            },1000);
        }else{
            apiFn(1);
        }
    };

    //记忆模式准备函数（供数据使用）
    hitObj.ready=function(){
        $('#gameBox #tips').show();
        $('.nowTurns').text(turns+1);
        $('.gameBox .mouse').hide();
        $('.gameBox .yes').hide();
        $('.gameBox .no').hide();
        $('.gameBox .endBg').hide();
    };
    //开始一轮游戏
    hitObj.go=function(obj){
        hitObj.nowTurn=JSON.parse(JSON.stringify(obj));
        hitObj.downTime=3;

        $('.gameBox .turnsTime').show();
        $('.gameBox .turnsTime span').text(hitObj.nowTurn.rotNum+5);
        $('#gameBox #tips').hide();
        $('#gameBox #downTime').show().text(hitObj.downTime);
        hitObj.downTimeSet=setInterval(function(){
            hitObj.downTime--;
            $('#gameBox #downTime').text(hitObj.downTime);
            if(hitObj.downTime<=0){
                $('#gameBox #downTime').hide();
                clearInterval(hitObj.downTimeSet);
                showMouse3();
            }
        },1000);
    };
    //敲打
    $('.gameBox .unit').click(function(){
        if(!hitObj.isGame){
            return false;
        }
        switch (hitObj.type) {
            case 1:
                hitMouse1(this);
                break;
            case 2:
                hitMouse2(this);
                break;
            case 3:
                hitMouse3(this);
                break;
        }
    });

    function hitMouse1(that){
        var num=$(that).attr('data-value');
        if(!hitObj.mouseArr[num] && hitObj.useHammer==hitObj.hammer){
            $(that).find('.yes').show();
            hitObj.process.push({clickNum:num,clickColor:hitObj.hammer,result:true});
            updateNum1(true);
            (function(el){
                setTimeout(function(){
                    $(el).find('.yes').hide();
                    el=null;
                },500);
            })(that);
        }else{
            $(that).find('.no').show();
            hitObj.process.push({clickNum:num,clickColor:hitObj.hammer,result:false});
            updateNum1(false);
            (function(el){
                setTimeout(function(){
                    $(el).find('.no').hide();
                    el=null;
                },500);
            })(that);
        }
    }

    function hitMouse2(that){
        var num=$(that).attr('data-value');
        var color=$(that).attr('data-color');
        $(that).find('.mouse').hide().removeClass('mouse1 mouse2 mouse3');
        if(!hitObj.mouseArr[num] && hitObj.hammer==color){
            $(that).find('.yes').show();
            hitObj.mouseArr[num]=1;
            hitObj.process.push({clickNum:num,clickColor:hitObj.hammer,result:true});
            updateNum2(true);
            (function(el){
                setTimeout(function(){
                    $(el).find('.yes').hide();
                    el=null;
                },500);
            })(that);
        }else{
            $(that).find('.no').show();
            hitObj.mouseArr[num]=1;
            hitObj.process.push({clickNum:num,clickColor:hitObj.hammer,result:false});
            updateNum2(false);
            (function(el){
                setTimeout(function(){
                    $(el).find('.no').hide();
                    el=null;
                },500);
            })(that);
        }
    }

    function hitMouse3(that){
        if(!hitObj.allowHit){
            return false;
        }
        $('.gameBox .mouse').hide();
        $('.gameBox .yes').hide();
        $('.gameBox .no').hide();
        var num=$(that).attr('data-value');
        hitObj.allowHit=false;
        (function(num){
            setTimeout(function(){
                hitObj.allowHit=true;
                if(mouse_Arr[0].num==num && mouse_Arr[0].color==hitObj.hammer){
                    $(that).find('.yes').show();
                    $('.gameBox .m'+(mouse_Arr[0].num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+mouse_Arr[0].color);
                    mouse_Arr.splice(0,1);
                    if(mouse_Arr.length==0){
                        hitObj.allowHit=false;
                        clearInterval(turns_Time);
                        $('#overTurns').text(turns);
                        setTimeout(function(){
                            apiFn(1);
                        },1000);
                    }
                    num=null;
                }else{
                    clearInterval(turns_Time);
                    hitObj.isGame=false;
                    hitObj.allowHit=false;
                    $(that).find('.no').show();
                    $('.gameBox .endBg').show();
                    $('.gameBox .m'+(mouse_Arr[0].num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+mouse_Arr[0].color);
                    num=null;
                    loseFn();
                }
            },100);
        })(num)
    }

    function showMouse(){
        if(hitObj.nowNum>=hitObj.sumNum){
            return false;
        }
        randomMouse();
        var num=hitObj.randomObj.num;
        var colorNum=hitObj.randomObj.colorNum;
        $('.gameBox .mouse').hide();
        $('.gameBox .m'+(num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+colorNum);
        var ranTime=Math.floor((Math.random()+1)*600);
        hitObj.process.push({num:num,color:colorNum,time:ranTime});
        setTimeout(function(){
            $('.gameBox .unit .mouse').hide().removeClass('mouse1 mouse2 mouse3');
            hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
            showMouse();
        },ranTime);
    }

    function showMouse2(){
        if(hitObj.nowNum>=hitObj.sumNum){
            return false;
        }
        hitObj.randomArr=[];
        $('.gameBox .mouse').hide();
        var rLenght=Math.floor(Math.random()*3)+3;
        for(var i=0;i<rLenght;i++){
            randomMouse();
            hitObj.randomArr.push(hitObj.randomObj);
            $('.gameBox .m'+(hitObj.randomObj.num+1)).attr('data-color',hitObj.randomObj.colorNum);
            $('.gameBox .m'+(hitObj.randomObj.num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+hitObj.randomObj.colorNum);
        }
        var ranTime=Math.floor((Math.random()+1)*800)+200;
        hitObj.process.push({mouseArr:hitObj.randomArr,time:ranTime});
        setTimeout(function(){
            $('.gameBox .unit').attr('data-color','0');
            $('.gameBox .unit .mouse').hide().removeClass('mouse1 mouse2 mouse3');
            hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
            showMouse2();
        },ranTime);
    }

    function showMouse3(){
        mouse_Arr=hitObj.nowTurn.mouseArr;
        for(var i=0;i<mouse_Arr.length;i++){
            (function(i){
                setTimeout(function(){
                    $('.gameBox .mouse').hide();
                },i*1100-(i*100));
                setTimeout(function(){
                    $('.gameBox .m'+(mouse_Arr[i].num+1)+' .mouse').show().removeClass('mouse1 mouse2 mouse3').addClass('mouse'+mouse_Arr[i].color);
                    i=null;
                },i*1000+100);
            })(i);
        }
        setTimeout(function(){
            $('.gameBox .mouse').hide();
            hitObj.allowHit=true;
            answer_Time=hitObj.nowTurn.rotNum+5;
            trunsTimeFn();
        },mouse_Arr.length*1000);
    }

    function randomMouse(){
        var num =Math.floor(Math.random()*9);
        var colorNum =Math.floor(Math.random()*3)+1;
        if(!hitObj.mouseArr[num]){
            randomMouse();
        }else{
            hitObj.useHammer=colorNum;
            hitObj.mouseArr[num]=0;
            hitObj.randomObj={num:num,colorNum:colorNum};
        }
    }

    //更新砸中数字
    function updateNum1(ck){
        hitObj.mouseArr=[1,1,1,1,1,1,1,1,1];
        $('.gameBox .mouse').hide().removeClass('mouse1 mouse2 mouse3');
        if(ck){
            hitObj.nowNum++;
            $('#num').text(hitObj.nowNum);
            if(hitObj.nowNum>=hitObj.sumNum){
                clearInterval(hitObj.setTime);
                hitObj.isGame=false;
                hitObj.callFn();
            }
        }
    }
    function updateNum2(ck){
        if(ck){
            hitObj.nowNum++;
            $('#num').text(hitObj.nowNum);
            if(hitObj.nowNum>=hitObj.sumNum){
                clearInterval(hitObj.setTime);
                hitObj.isGame=false;
                hitObj.callFn();
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

    function trunsTimeFn(){
        turns_Time=setInterval(function(){
            answer_Time--;
            if(answer_Time<0){
                clearInterval(turns_Time);
                hitObj.isGame=false;
                hitObj.allowHit=false;
                $('.gameBox .endBg').show();
                num=null;
                loseFn();
            }else{
                $('.gameBox .turnsTime span').text(answer_Time);
            }
        },1000);

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
