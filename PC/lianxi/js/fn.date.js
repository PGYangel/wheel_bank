/**
 * Created by Administrator on 2015/7/2.
 */

/*******************************************初始化日历控件******************************************************/
function initDateFn(el) {
    //获取位置
    var t=getTop(el)+54;
    var l=getLeft(el)-270;
    $('.date-box').css({"top":t+"px","left":l+"px"});
    //填充
    var str="<div class='date-left' onclick='leftDateFn()'></div>"+
    "<div class='date-main'>"+
        "<div class='date-main-yearbox'></div>"+
        "<div class='date-main-weekbox'>"+
        "<ul><li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li></ul></div>"+
        "<div class='date-main-daybox'><ul></ul></div></div>"+
    "<div class='date-right' onclick='rightDateFn()'></div>"+
    "<div class='date-bottom' onclick='closeDateFn()'><div class='close-img'></div><span>收起特价日历</span></div>"
    $('.date-box').html("");
    $('.date-box').append(str);
    //生成日历
    var dt = new Date();
    createDay(dt);

    $('.date-box').toggle();

    //获取元素的纵坐标
    function getTop(e){
        var offset=e.offsetTop;
        if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标
    function getLeft(e){
        var offset=e.offsetLeft;
        if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
        return offset;
    }
}

/*******************************************根据传入日期创建日历******************************************************/
function createDay(dt) {
    //获取当前时间
    var dateY = dt.getFullYear();//当前年份
    var dateM = dt.getMonth() + 1;//当前月份
    var dateD = dt.getDate();//当前日期
    var minDt = dt;
    minDt.setDate(1);
    var dateMin = minDt.getDay();//当前月份最小天属于星期几
    var dateMax = 32 - new Date(dateY, dateM - 1, 32).getDate();//当前月最大天数
    var dateLast = dateMin + dateMax;
    var nowD = new Date();

    $('.date-main-yearbox').attr("data-value", dateY + "-" + dateM + "-" + dateD);
    $('.date-main-yearbox').text(dateY + "年" + dateM + "月");

    $('.date-main-daybox ul').html("");
    var html = "";
    //填补前空白
    for (var i = 0; i < dateMin; i++) {
        html += "<li></li>";
    }
    //填充日历
    for (var i = 1; i <= dateMax; i++) {
        //当天日历
        if (i == dateD && (dateY + "-" + dateM) == (nowD.getFullYear() + "-" + (nowD.getMonth() + 1))) {
            html += "<li class='nowday' onclick='clickDate()'><span class='daytxt'>" + i + "</span><span class='money'>¥" + 263 + "</span>" + "</li>";
        } else {
            html += "<li onclick='clickDate()'><span class='daytxt'>" + i + "</span><span class='money'>¥" + 263 + "</span>" + "</li>";
        }
    }
    //填补后空白
    if (dateLast < 42) {
        for (var i = 0; i < 42 - dateLast; i++) {
            html += "<li></li>";
        }
    }
    $('.date-main-daybox ul').html(html);
}

/*******************************************向左按钮******************************************************/
function leftDateFn() {
    //获取控件当前日期
    var titleDate = $('.date-main-yearbox').attr("data-value");
    var arr=titleDate.split('-');
    var dt=new Date(arr[0],arr[1]-2,arr[2]);
    var nowDt=new Date();
    var titleStr = arr[0] + "/" + (arr[1]-1);//控件年月
    var nowStr = nowDt.getFullYear() + "/" + nowDt.getMonth();//当前年月
    if (titleStr == nowStr) {
        alert("不能选择小于当月数据！");
        return;
    }
    createDay(dt);

}


/*******************************************向右按钮******************************************************/
function rightDateFn() {
    //获取控件当前日期
    var titleDate = $('.date-main-yearbox').attr("data-value");
    var arr=titleDate.split('-');
    var dt=new Date(arr[0],arr[1],arr[2]);
    var nowDt=new Date();
    nowDt.setMonth(nowDt.getMonth()+3);
    var maxStr=nowDt.getFullYear()+"/"+nowDt.getMonth();
    var titleStr=arr[0]+"/"+(arr[1]-1);
    if(maxStr==titleStr)
    {
        alert("不能选择大于当月3个月数据");
        return;
    }
    createDay(dt);
}

/*******************************************收起特性日历******************************************************/
function closeDateFn(){
    $('.date-box').hide();
}

/*******************************************点击日历事件******************************************************/
function clickDate(){
    $('.date-box').hide();
}




