/**
 * Created by yerong on 2018/10/31.
 */
function ptClass(h,l,img,id,fn){
    var arr1=[];//初始化时随机数组
    var obj=new Object();
    obj.h=3;//行
    obj.l=3;//列
    obj.img=img;//图片路径
    obj.id=id;//渲染id
    obj.callFn=fn;//成功后回调函数
    obj.rArr=[];//答案数组
    obj.vac;//空缺位
    //每个格子可移动数组
    obj.moveArr=new Array(
        [0],//为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
        [2,4],//大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
    );
    obj.init=function(){
        createPt();
    };
    //创建拼图
    function createPt(){
        var parentW=parseFloat($("#"+obj.id).width());//容器宽度
        var pW=parentW/obj.l;//单个拼图宽度
        var pNum=obj.h*obj.l-1;//拼图个数
        for(var i=0;i<pNum;i++){
            obj.rArr.push(i+1);
            arr1.push(i+1);
        }
        createStyle(parentW,pW,pNum);
        createImgFn(pNum);
    }

    //构建CSS
    function createStyle(parentW,pW,pNum){
        var hh=0;
        var hl=0;
        $("style[data-value='ptStyle']").remove();
        var sHtml="<style data-value='ptStyle'>"
            + "#"+obj.id+" div{position:absolute;transition:all .5s;-moz-transition:all .5s;-webkit-transition:all .5s;-o-transition:all .5s;"
            + "width: "+pW
            +"px;height: "+pW
            +"px;background-image: url("+obj.img
            +");background-size: "+parentW+"px;z-index: 1;}";
        for(var i=0;i<=pNum;i++){
            if(i%obj.l==0&&i!=0){hh++;}
            if(i%obj.h==0){hl=0;}
            sHtml+="#"+obj.id+" div.pt"+(i+1)+"{background-position:-"+(hl*pW)+"px -"+(hh*pW)+"px;}";
            sHtml+="#"+obj.id+" div.wt"+(i+1)+"{top:"+(hh*pW)+"px;left:"+(hl*pW)+"px;}";
            hl++;
        }
        sHtml+="</style>";
        $("head").append(sHtml);
    }
    //构建拼图DIV
    function createImgFn(pNum){
        var html="";
        obj.vac=pNum+1;
        for(var i=0;i<pNum;i++){
            html+="<div class='pt"+(i+1)+"' data-value='"+(i+1)+"'></div>";
        }
        $("#"+obj.id).html(html);
        randomImg();
        //注册点击事件
        ptClick();
    }
    //随机图片
    function randomImg(){
        //拼图会有无解情况，任意两个位置调换为奇数次时为无解，偶数次时为有解
        //例如[1,2,3,4,5,6,7,8]调换成[1,2,3,4,5,6,8,7]为无解，调换为[2,1,3,4,5,6,8,7]为有解
        randomArr();
        for(var i=0;i<arr1.length;i++){
            var dt=arr1[i];
            $("#"+obj.id+" div.pt"+dt).addClass("wt"+(i+1)).attr("data-type",(i+1));
        }
        arr1.push(0);
    }
    //生成最终乱序数组
    function randomArr(){
        var exNum=(Math.floor(Math.random()*10)+10)*2;
        for(var i=0;i<exNum;i++){
            exchangeArr();
        }
        //如果两个数组相等则重新执行打乱顺序
        if(arr1.toString()==obj.rArr.toString()){
            randomArr();
        }
    }

    //数组两个位置互换
    function exchangeArr(){
        var num1=Math.floor(Math.random()*arr1.length);
        var num2=Math.floor(Math.random()*arr1.length);
        while(num1==num2){
            num1=Math.floor(Math.random()*arr1.length);
            num2=Math.floor(Math.random()*arr1.length);
        }
        arr1[num1]=[arr1[num2],arr1[num2]=arr1[num1]][0];
    }
    //拼图点击事件
    function ptClick(){
        $("#"+obj.id+" div").on("click",function(){
            var isDis=false;
            var reVac=$(this).attr("data-type");
            for(var i=0;i<obj.moveArr[reVac].length;i++){
                if(obj.moveArr[reVac][i]==parseInt(obj.vac)){
                    isDis=true;
                }
            }
            if(isDis){
                var num1=parseInt(reVac)-1;
                var num2=parseInt(obj.vac)-1;
                arr1[num1]=[arr1[num2],arr1[num2]=arr1[num1]][0];
                var arr2=[].concat(arr1);
                arr2.splice(arr2.length-1,1);
                $(this).removeClass("wt"+reVac).addClass("wt"+obj.vac);
                $(this).attr("data-type",obj.vac);
                obj.vac=reVac;
                if(arr2.toString()==obj.rArr.toString()){
                    obj.callFn();
                }
            }

        });
    }

    return obj;
}

