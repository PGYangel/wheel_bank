/**
 * Created by yerong on 2018/10/31.
 */
function ptClass(h,l,img,id,fn){
    var obj=new Object();
    obj.h=h;//行
    obj.l=l;//列
    obj.img=img;//图片路径
    obj.id=id;//渲染id
    obj.callFn=fn;//成功后回调函数
    obj.isDowm=false;
    var arr1=[];
    var arr2=[];
    var arr3=[];
    var pplace=[];//每个单元格的坐标数组
    var nx,ny;
    var isDis;//判断是否相互替换的距离参数
    obj.init=function(){
        createPt();
    };
    function createPt(){
        var pTop=$("#"+obj.id).offset().top;
        var pLeft=$("#"+obj.id).offset().left;
        var parentW=parseFloat($("#"+obj.id).width());
        var pW=parentW/obj.l;
        var pNum=obj.h*obj.l;
        //isDis=Math.sqrt(Math.pow(pW/2,2)*2);
        isDis=pW/2;
        var hh=0;
        var hl=0;
        $("style[data-value='ptStyle']").remove();
        var sHtml="<style data-value='ptStyle'>" + "#"+obj.id+" div{position:absolute;width: "+pW+"px;height: "+pW+"px;background-image: url("+obj.img+");background-size: "+parentW+"px;z-index: 1;}";
        for(var i=0;i<pNum;i++){
            if(i%obj.l==0&&i!=0){
                hh++;
            }
            if(i%obj.h==0){
                hl=0;
            }
            sHtml+="#"+obj.id+" div.pt"+(i+1)+"{background-position:-"+(hl*pW)+"px -"+(hh*pW)+"px;} #"+obj.id+" div.wt"+(i+1)+"{top:"+(hh*pW)+"px;left:"+(hl*pW)+"px;}";
            pplace[i]={x:((hl*pW)+pLeft+(pW/2)),y:((hh*pW)+pTop+(pW/2))};
            hl++;
        }
        sHtml+="</style>";
        $("head").append(sHtml);

        var pHmtl="";
        for(var i=1;i<=pNum;i++){
            pHmtl+="<div class='pt"+i+"' data-value='"+i+"'></div>";
            arr1[i-1]=i;
            arr3[i-1]=i;
        }
        $("#"+obj.id).html(pHmtl);
        randomImg();

        if(hasTouch()){
            pTouch(obj);
        }else{
            pMouse(obj);
        }
    }
    function randomImg(){
        var pNum=obj.h*obj.l;
        var result=false;
        for(var i=0;i<pNum;i++){
            var num=Math.floor(Math.random()*arr1.length);
            arr2.push(arr1[num]);
            arr1.splice(num,1);
        }
        for(var i=0;i<pNum;i++){
            if(arr3[i]!=arr2[i]){
                result=true;
                break;
            }
        }

        //�ж����������Ƿ����һ�£�һ����Ҫ��������һ��
        if(result){
            $("#"+obj.id+" div").each(function(){
                var dt=arr2[$(this).index()];
                $(this).addClass("wt"+dt).attr("data-type",dt);
            });
        }else{
            arr1=arr3;
            arr2=[];
            randomImg();
        }


    }

    function pTouch(obj){
        var pTop=$("#"+obj.id).offset().top;
        var pLeft=$("#"+obj.id).offset().left;
        var pWidth=$("#"+obj.id+" div").width();
        $("#"+obj.id+" div").on("touchstart",function(){
            $(this).css({"z-index":"10"});
        });
        $("#"+obj.id+" div").on("touchmove",function(){
            event.preventDefault();
            var touch= event.touches[0];
            nx = touch.pageX;
            ny = touch.pageY;
            $(this).css({"top":(ny-pTop-pWidth/2)+"px","left":(nx-pLeft-pWidth/2)+"px"});
        });
        $("#"+obj.id+" div").on("touchend",function(){
            var dt=$(this).attr("data-type");
            var isCorrect=false;
            var resuleNum=0;
            for(var i=0;i<obj.h*obj.l;i++){
                var dx=pplace[i].x;
                var dy=pplace[i].y;
                var dz=Math.sqrt(Math.pow(Math.abs(dx-nx),2)+Math.pow(Math.abs(dy-ny),2));
                if(dz<isDis){
                    isCorrect=true;
                    resuleNum=i+1;
                }
            }
            if(isCorrect){
                $("#"+obj.id+" div[data-type="+resuleNum+"]").removeClass("wt"+resuleNum).addClass("wt"+dt).attr("data-type",dt);
                $(this).removeClass("wt"+dt).addClass("wt"+resuleNum).attr("style","");
                $(this).attr("data-type",resuleNum);
            }else{
                $(this).attr("style","");
            }
            if(isWin()){
                obj.callFn();
            }
        });
    }

    function pMouse(obj){
        var pTop=$("#"+obj.id).offset().top;
        var pLeft=$("#"+obj.id).offset().left;
        var pWidth=$("#"+obj.id+" div").width();

        $("#"+obj.id+" div").on("mousedown",function(){
            $(this).css({"z-index":"10"});
            obj.isDowm=true;
        });

        $("#"+obj.id+" div").on("mousemove",function(ev){
            if(obj.isDowm){
                var oevent = ev || event;
                nx=oevent.clientX;
                ny=oevent.clientY;
                $(this).css({"top":(ny-pTop-pWidth/2)+"px","left":(nx-pLeft-pWidth/2)+"px"});
            }
        });
        $("#"+obj.id+" div").on("mouseup",function(){
            if(obj.isDowm){
                var dt=$(this).attr("data-type");
                var isCorrect=false;
                var resuleNum=0;
                for(var i=0;i<obj.h*obj.l;i++){
                    var dx=pplace[i].x;
                    var dy=pplace[i].y;
                    var dz=Math.sqrt(Math.pow(Math.abs(dx-nx),2)+Math.pow(Math.abs(dy-ny),2));
                    if(dz<isDis){
                        isCorrect=true;
                        resuleNum=i+1;
                    }
                }
                if(isCorrect){
                    $("#"+obj.id+" div[data-type="+resuleNum+"]").removeClass("wt"+resuleNum).addClass("wt"+dt).attr("data-type",dt);
                    $(this).removeClass("wt"+dt).addClass("wt"+resuleNum).attr("style","");
                    $(this).attr("data-type",resuleNum);
                }else{
                    $(this).attr("style","");
                }
                if(isWin()){
                    obj.callFn();
                }
                obj.isDowm=false;
            }
        });

    }

    function isWin(){
        var result=0;
        $("#"+obj.id+" div").each(function(){
            if($(this).attr("data-value")==$(this).attr("data-type")){
                result++;
            }
        });
        if(result==(obj.h*obj.l)){return true}
    }
    return obj;
}

var hasTouch=function(){
    var touchObj={};
    touchObj.isSupportTouch = "ontouchend" in document ? true : false;
    touchObj.isEvent=touchObj.isSupportTouch?true:false;
    return touchObj.isEvent;
}

