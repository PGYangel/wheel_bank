/**
 * Created by Mars on 2015/8/28.
 */

//全局参数
var doc = document,
    win = window,
    marsDateEl = null,//时间控件对象
    marsList = null,//输入框列表
    marsTitleEl = null,//年月标题对象
    marsDaysBoxEl = null,//日期填充对象
    marsLeftBtnEl = null,//上个月按钮对象
    marsRightBtnEl = null,//下个月按钮对象
//公用参数方法
    glb = {
        width: 125,//输入框宽度
        height: 25,//输入框高度
        state: 0,//控件显示状态。0为隐藏，1为显示
        closeState: 0,//是否确认关闭标识，0为不关闭，1为确认关闭
        nowfouce: 0,//当前选中输入框，默认为第一个
        nowNum: 0,//当前输入框总数
        //控件初始化字符串
        html: "<div class='marsDate-TitleBg'><div class='marsDate-Title-Left' id='marsDate-Title-Left'></div><div class='marsDate-Title' id='marsDate-Title'></div><div class='marsDate-Title-Right' id='marsDate-Title-Right'></div></div><div class='marsDate-MainBox'><ul class='marsDate-Week'><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul><ul class='marsDate-Days'></ul><div class='marsDate-check'><input type='button' value='今天' class='marsDate-Ok' onclick='marsDate.nowDay(this)'/><input type='button' value='清除' class='marsDate-Clear' onclick='marsDate.clearDate()'/></div><div class='marsDate-ChangeBox' style='display: none;'><div class='marsDate-Years'><div class='marsDate-YearTag'>年</div><div class='upYearbtn' onclick='marsDate.preYear()'><div></div></div><ul id='marsDate-Years-Ul'></ul><div class='downYearbtn' onclick='marsDate.nextYear()'><div></div></div></div><div class='marsDate-Months'><div class='marsDate-MonthTag'>月</div><ul><li onclick='marsDate.clickMonth(this)' data-value='1'>1月</li><li onclick='marsDate.clickMonth(this)' data-value='2'>2月</li><li onclick='marsDate.clickMonth(this)' data-value='3'>3月</li><li onclick='marsDate.clickMonth(this)' data-value='4'>4月</li><li onclick='marsDate.clickMonth(this)' data-value='5'>5月</li><li onclick='marsDate.clickMonth(this)' data-value='6'>6月</li><li onclick='marsDate.clickMonth(this)' data-value='7'>7月</li><li onclick='marsDate.clickMonth(this)' data-value='8'>8月</li><li onclick='marsDate.clickMonth(this)' data-value='9'>9月</li><li onclick='marsDate.clickMonth(this)' data-value='10'>10月</li><li onclick='marsDate.clickMonth(this)' data-value='11'>11月</li><li onclick='marsDate.clickMonth(this)' data-value='12'>12月</li></ul></div><div class='marsDate-check'><input type='text' class='marsDate-input' id='marsDateYear' onkeyup='glb.checkToNumber(this)'/><span>年</span><input type='text' class='marsDate-input' id='marsDateMonth' maxlength='2' onkeyup='glb.checkToNumber(this)'/><span>月</span><input type='button' class='marsDate-Ok' value='确定' onclick='marsDate.clickChange()'></div></div></div>",
        //获取元素的纵坐标
        getTop: function (e) {
            var offset = e.offsetTop;
            if (e.offsetParent != null) offset += glb.getTop(e.offsetParent);
            return offset;
        },
        //获取元素的横坐标
        getLeft: function (e) {
            var offset = e.offsetLeft;
            if (e.offsetParent != null) offset += glb.getLeft(e.offsetParent);
            return offset;
        },
        //类选择器
        getClass: function (tag, className) {
            var all;
            if (tag == "*") {
                all = document.all ? document.all : document.getElementsByTagName("*");
            }
            else {
                all = document.getElementsByTagName(tag);
            }
            var elements = new Array();

            for (var e = 0; e < all.length; e++) {
                if (all[e].className == className) {
                    elements[elements.length] = all[e];
                }
            }
            return elements;
        },
        //监听冒泡事件
        //dom对象，事件类型，调用方法
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            }
            else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            }
            else {
                element["on" + type] = handler;
            }
        },
        //删除监听冒泡事件
        //dom对象，事件类型，调用方法
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            }
            else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            }
            else {
                element["on" + type] = null;
            }
        },
        //验证输入框只能输入数字
        checkToNumber: function (el) {
            el.value = el.value.replace(/\D/g, '');
        }
    },
//时间方法集
    marsDate = {
        //生成日历
        createDays: function (elValue) {
            var html = "";
            var createDate = new Date();
            var nowDate = new Date();
            if (elValue != "") {
                var arr = elValue.split('-');
                createDate = new Date(arr[0], arr[1] - 1);
            }

            var minDt = createDate;
            minDt.setDate(1);
            var minDayForWeek = minDt.getDay();//月份最小日属于星期几
            var maxDay = 32 - new Date(createDate.getFullYear(), createDate.getMonth(), 32).getDate();//月最大天数

            //填写年月标题
            marsTitleEl.setAttribute("data-value", createDate.getFullYear() + "-" + (createDate.getMonth() + 1));
            marsTitleEl.innerHTML = createDate.getFullYear() + "年" + (createDate.getMonth() + 1) + "月";

            //填充1号前的空白
            for (var i = 0; i < minDayForWeek; i++) {
                html += "<li></li>";
            }
            //填充日历
            for (var i = 0; i < maxDay; i++) {
                if (nowDate.getFullYear() == createDate.getFullYear() && nowDate.getMonth() == createDate.getMonth() && nowDate.getDate() == (i + 1)) {
                    html += "<li class='marsDate-NowDay' onclick='marsDate.clickDay(this)' data-value='" + createDate.getFullYear() + "-" + (createDate.getMonth() + 1) + "-" + (i + 1) + "'>" + (i + 1) + "</li>";
                }
                else {
                    html += "<li onclick='marsDate.clickDay(this)' data-value='" + createDate.getFullYear() + "-" + (createDate.getMonth() + 1) + "-" + (i + 1) + "'>" + (i + 1) + "</li>";
                }
            }
            //填充最大日后空白
            for (var i = 0; i < 42 - (minDayForWeek + maxDay); i++) {
                html += "<li></li>";
            }
            marsDaysBoxEl[0].innerHTML = html;
        },
        //上一月
        preMonth: function () {
            var arrTitle = marsTitleEl.getAttribute("data-value").split('-');
            arrTitle[1]--;
            var dtValue = arrTitle[0] + "-" + arrTitle[1];
            marsDate.createDays(dtValue);
        },
        //下一月
        nextMonth: function () {
            var arrTitle = marsTitleEl.getAttribute("data-value").split('-');
            arrTitle[1]++;
            var dtValue = arrTitle[0] + "-" + arrTitle[1];
            marsDate.createDays(dtValue);
        },
        //上一页年份
        preYear: function () {
            var html = "";
            var minYear = doc.getElementById("marsDate-Years-Ul").getElementsByTagName("li")[0].innerHTML;
            for (var i = 0; i < 4; i++) {
                html += "<li onclick='marsDate.clickYear(this)'>" + (parseInt(minYear) - 4 + i) + "</li>"
            }
            doc.getElementById("marsDate-Years-Ul").innerHTML = html;
        },
        //下一页年份
        nextYear: function () {
            var html = "";
            var minYear = doc.getElementById("marsDate-Years-Ul").getElementsByTagName("li")[3].innerHTML;
            for (var i = 0; i < 4; i++) {
                html += "<li onclick='marsDate.clickYear(this)'>" + (parseInt(minYear) + 1 + i) + "</li>"
            }
            doc.getElementById("marsDate-Years-Ul").innerHTML = html;
        },
        //选择日
        clickDay: function (el) {
            marsList[glb.nowfouce].value = el.getAttribute("data-value");
            marsDateEl[0].style.display = "none";
            glb.state = 0;
            closeState = 1;
        },
        //年月确定事件
        clickChange: function () {
            var changeBox = glb.getClass("div", "marsDate-ChangeBox");
            var year = doc.getElementById("marsDateYear").value;
            var month = doc.getElementById("marsDateMonth").value;
            marsTitleEl.setAttribute("data-value", year + "-" + month);
            marsTitleEl.innerHTML = year + "年" + month + "月";
            marsDate.createDays(year + "-" + month);
            changeBox[0].style.display = "none";
        },
        //选择年
        clickYear: function (el) {
            doc.getElementById("marsDateYear").value = el.innerHTML;
        },
        //选择月
        clickMonth: function (el) {
            doc.getElementById("marsDateMonth").value = el.getAttribute("data-value");
        },
        clearDate: function () {
            marsList[glb.nowfouce].value = "";
        },
        nowDay: function (el) {
            var now = new Date();
            el.setAttribute("data-value", now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate());
            marsDate.clickDay(el);
        }

    };

//初始化控件
(function init() {

    var newObj = document.createElement("div");
    var bodyTags = document.getElementsByTagName("body");
    newObj.className = "marsDate-Box";
    newObj.style.display = "none";
    bodyTags[0].appendChild(newObj);
    marsDateEl = glb.getClass("div", "marsDate-Box");
    marsDateEl[0].innerHTML = glb.html;
    marsTitleEl = doc.getElementById("marsDate-Title");
    marsDaysBoxEl = glb.getClass("ul", "marsDate-Days");
    marsLeftBtnEl = doc.getElementById("marsDate-Title-Left");
    marsRightBtnEl = doc.getElementById("marsDate-Title-Right");
    marsList = glb.getClass("input", "marsDate");
    glb.nowNum = marsList.length;
    for (var i = 0; i < marsList.length; i++) {
        marsList[i].setAttribute("data-num", i);
    }
})();

//点击控件
function showMarsFnDate(el) {
    glb.nowfouce = el.getAttribute("data-num");
    //获取控件元素坐标，并设置日历显示位置
    var elTop = glb.getTop(el);
    var elLeft = glb.getLeft(el);
    marsDate.createDays(el.value);
    marsDateEl[0].style.top = (elTop + glb.height) + "px";
    marsDateEl[0].style.left = elLeft + "px";
    marsDateEl[0].style.display = "inline";
    glb.state = 1;
    closeState = 0;
}

//监听上一月按钮
glb.addHandler(marsLeftBtnEl, "click", function () {
    marsDate.preMonth();
});

//监听下一月按钮
glb.addHandler(marsRightBtnEl, "click", function () {
    marsDate.nextMonth();
});

//年月选项卡
glb.addHandler(marsTitleEl, "click", function () {
    var changeBox = glb.getClass("div", "marsDate-ChangeBox");
    var arr = marsTitleEl.getAttribute("data-value").split('-');
    doc.getElementById("marsDateYear").value = arr[0];
    doc.getElementById("marsDateMonth").value = arr[1];
    var html = "";
    for (var i = 0; i < 4; i++) {
        html += "<li onclick='marsDate.clickYear(this)'>" + (parseInt(arr[0]) + i) + "</li>";
    }
    doc.getElementById("marsDate-Years-Ul").innerHTML = html;
    changeBox[0].style.display = "inline";
});
//监听日历控件所有点击事件
glb.addHandler(marsDateEl[0], "click", function () {
    if (!closeState) {
        glb.state = 1;
    }
});

//监听docment冒泡
glb.addHandler(doc, "click", function () {
    //检测有没动态新增或删除日历输入框，有则重新给输入框进行编号
    marsList = glb.getClass("input", "marsDate");
    if (marsList.length != glb.nowNum) {
        glb.nowNum = marsList.length;
        for (var i = 0; i < marsList.length; i++) {
            marsList[i].setAttribute("data-num", i);
        }
    }
    //当点击控件以外的对象隐藏控件
    if (glb.state) {
        marsDateEl[0].style.display = "inline";
        glb.state = 0;
    } else {
        marsDateEl[0].style.display = "none";
    }
});



