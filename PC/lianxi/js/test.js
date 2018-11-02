/**
 * Created by Administrator on 2015/9/2.
 */
/**
 * Created by Mars on 2015/8/28.
 */

//全局参数
var doc = document, win = window, marsDateEl = null, marsList = null, marsTitleEl = null, marsDaysBoxEl = null, marsLeftBtnEl = null, marsRightBtnEl = null, glb = {width: 125, height: 25, state: 0, closeState: 0, nowfouce: 0, nowNum: 0, html: "\x3cdiv class\x3d'marsDate-TitleBg'\x3e\x3cdiv class\x3d'marsDate-Title-Left' id\x3d'marsDate-Title-Left'\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-Title' id\x3d'marsDate-Title'\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-Title-Right' id\x3d'marsDate-Title-Right'\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-MainBox'\x3e\x3cul class\x3d'marsDate-Week'\x3e\x3cli\x3e\u65e5\x3c/li\x3e\x3cli\x3e\u4e00\x3c/li\x3e\x3cli\x3e\u4e8c\x3c/li\x3e\x3cli\x3e\u4e09\x3c/li\x3e\x3cli\x3e\u56db\x3c/li\x3e\x3cli\x3e\u4e94\x3c/li\x3e\x3cli\x3e\u516d\x3c/li\x3e\x3c/ul\x3e\x3cul class\x3d'marsDate-Days'\x3e\x3c/ul\x3e\x3cdiv class\x3d'marsDate-check'\x3e\x3cinput type\x3d'button' value\x3d'\u4eca\u5929' class\x3d'marsDate-Ok' onclick\x3d'marsDate.nowDay(this)'/\x3e\x3cinput type\x3d'button' value\x3d'\u6e05\u9664' class\x3d'marsDate-Clear' onclick\x3d'marsDate.clearDate()'/\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-ChangeBox' style\x3d'display: none;'\x3e\x3cdiv class\x3d'marsDate-Years'\x3e\x3cdiv class\x3d'marsDate-YearTag'\x3e\u5e74\x3c/div\x3e\x3cdiv class\x3d'upYearbtn' onclick\x3d'marsDate.preYear()'\x3e\x3cdiv\x3e\x3c/div\x3e\x3c/div\x3e\x3cul id\x3d'marsDate-Years-Ul'\x3e\x3c/ul\x3e\x3cdiv class\x3d'downYearbtn' onclick\x3d'marsDate.nextYear()'\x3e\x3cdiv\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-Months'\x3e\x3cdiv class\x3d'marsDate-MonthTag'\x3e\u6708\x3c/div\x3e\x3cul\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'1'\x3e1\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'2'\x3e2\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'3'\x3e3\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'4'\x3e4\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'5'\x3e5\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'6'\x3e6\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'7'\x3e7\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'8'\x3e8\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'9'\x3e9\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'10'\x3e10\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'11'\x3e11\u6708\x3c/li\x3e\x3cli onclick\x3d'marsDate.clickMonth(this)' data-value\x3d'12'\x3e12\u6708\x3c/li\x3e\x3c/ul\x3e\x3c/div\x3e\x3cdiv class\x3d'marsDate-check'\x3e\x3cinput type\x3d'text' class\x3d'marsDate-input' id\x3d'marsDateYear' onkeyup\x3d'glb.checkToNumber(this)'/\x3e\x3cspan\x3e\u5e74\x3c/span\x3e\x3cinput type\x3d'text' class\x3d'marsDate-input' id\x3d'marsDateMonth' maxlength\x3d'2' onkeyup\x3d'glb.checkToNumber(this)'/\x3e\x3cspan\x3e\u6708\x3c/span\x3e\x3cinput type\x3d'button' class\x3d'marsDate-Ok' value\x3d'\u786e\u5b9a' onclick\x3d'marsDate.clickChange()'\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e", getTop: function (a) {
    var c = a.offsetTop;
    null != a.offsetParent && (c += glb.getTop(a.offsetParent));
    return c
}, getLeft: function (a) {
    var c = a.offsetLeft;
    null != a.offsetParent && (c += glb.getLeft(a.offsetParent));
    return c
}, getClass: function (a, c) {
    var b;
    b = "*" == a ? document.all ? document.all : document.getElementsByTagName("*") : document.getElementsByTagName(a);
    for (var e = [], f = 0; f < b.length; f++)b[f].className == c && (e[e.length] = b[f]);
    return e
}, addHandler: function (a, c, b) {
    a.addEventListener ? a.addEventListener(c, b, !1) : a.attachEvent ? a.attachEvent("on" + c, b) : a["on" + c] = b
}, removeHandler: function (a, c, b) {
    a.removeEventListener ? a.removeEventListener(c, b, !1) : a.detachEvent ? a.detachEvent("on" + c, b) : a["on" + c] = null
}, checkToNumber: function (a) {
    a.value = a.value.replace(/\D/g, "")
}}, marsDate = {createDays: function (a) {
    var c = "", b = new Date, e = new Date;
    "" != a && (b = a.split("-"), b = new Date(b[0], b[1] - 1));
    a = b;
    a.setDate(1);
    a = a.getDay();
    var f = 32 - (new Date(b.getFullYear(), b.getMonth(), 32)).getDate();
    marsTitleEl.setAttribute("data-value", b.getFullYear() + "-" + (b.getMonth() + 1));
    marsTitleEl.innerHTML = b.getFullYear() + "\u5e74" + (b.getMonth() + 1) + "\u6708";
    for (var d = 0; d < a; d++)c += "\x3cli\x3e\x3c/li\x3e";
    for (d = 0; d < f; d++)c = e.getFullYear() == b.getFullYear() && e.getMonth() == b.getMonth() && e.getDate() == d + 1 ? c + ("\x3cli class\x3d'marsDate-NowDay' onclick\x3d'marsDate.clickDay(this)' data-value\x3d'" + b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + (d + 1) + "'\x3e" + (d + 1) + "\x3c/li\x3e") : c + ("\x3cli onclick\x3d'marsDate.clickDay(this)' data-value\x3d'" + b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + (d + 1) + "'\x3e" + (d + 1) + "\x3c/li\x3e");
    for (d = 0; d < 42 - (a + f); d++)c += "\x3cli\x3e\x3c/li\x3e";
    marsDaysBoxEl[0].innerHTML = c
    a[1]--;
}, preMonth: function () {
    var a = marsTitleEl.getAttribute("data-value").split("-");
    marsDate.createDays(a[0] + "-" + a[1])
}, nextMonth: function () {
    var a = marsTitleEl.getAttribute("data-value").split("-");
    a[1]++;
    marsDate.createDays(a[0] + "-" + a[1])
}, preYear: function () {
    for (var a = "", c = doc.getElementById("marsDate-Years-Ul").getElementsByTagName("li")[0].innerHTML, b = 0; 4 > b; b++)a += "\x3cli onclick\x3d'marsDate.clickYear(this)'\x3e" + (parseInt(c) - 4 + b) + "\x3c/li\x3e";
    doc.getElementById("marsDate-Years-Ul").innerHTML = a
}, nextYear: function () {
    for (var a = "", c = doc.getElementById("marsDate-Years-Ul").getElementsByTagName("li")[3].innerHTML, b = 0; 4 > b; b++)a += "\x3cli onclick\x3d'marsDate.clickYear(this)'\x3e" + (parseInt(c) + 1 + b) + "\x3c/li\x3e";
    doc.getElementById("marsDate-Years-Ul").innerHTML = a
}, clickDay: function (a) {
    marsList[glb.nowfouce].value = a.getAttribute("data-value");
    marsDateEl[0].style.display = "none";
    glb.state = 0;
    closeState = 1
}, clickChange: function () {
    var a = glb.getClass("div", "marsDate-ChangeBox"), c = doc.getElementById("marsDateYear").value, b = doc.getElementById("marsDateMonth").value;
    marsTitleEl.setAttribute("data-value", c + "-" + b);
    marsTitleEl.innerHTML = c + "\u5e74" + b + "\u6708";
    marsDate.createDays(c + "-" + b);
    a[0].style.display = "none"
}, clickYear: function (a) {
    doc.getElementById("marsDateYear").value = a.innerHTML
}, clickMonth: function (a) {
    doc.getElementById("marsDateMonth").value = a.getAttribute("data-value")
}, clearDate: function () {
    marsList[glb.nowfouce].value = ""
}, nowDay: function (a) {
    var c = new Date;
    a.setAttribute("data-value", c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate());
    marsDate.clickDay(a)
}};
(function () {
    var a = document.createElement("div"), c = document.getElementsByTagName("body");
    a.className = "marsDate-Box";
    a.style.display = "none";
    c[0].appendChild(a);
    marsDateEl = glb.getClass("div", "marsDate-Box");
    marsDateEl[0].innerHTML = glb.html;
    marsTitleEl = doc.getElementById("marsDate-Title");
    marsDaysBoxEl = glb.getClass("ul", "marsDate-Days");
    marsLeftBtnEl = doc.getElementById("marsDate-Title-Left");
    marsRightBtnEl = doc.getElementById("marsDate-Title-Right");
    marsList = glb.getClass("input", "marsDate");
    glb.nowNum = marsList.length;
    for (a = 0; a < marsList.length; a++)marsList[a].setAttribute("data-num", a)
})();
function showMarsFnDate(a) {
    glb.nowfouce = a.getAttribute("data-num");
    var c = glb.getTop(a), b = glb.getLeft(a);
    marsDate.createDays(a.value);
    marsDateEl[0].style.top = c + glb.height + "px";
    marsDateEl[0].style.left = b + "px";
    marsDateEl[0].style.display = "inline";
    glb.state = 1;
    closeState = 0
}
glb.addHandler(marsLeftBtnEl, "click", function () {
    marsDate.preMonth()
});
glb.addHandler(marsRightBtnEl, "click", function () {
    marsDate.nextMonth()
});
glb.addHandler(marsTitleEl, "click", function () {
    var a = glb.getClass("div", "marsDate-ChangeBox"), c = marsTitleEl.getAttribute("data-value").split("-");
    doc.getElementById("marsDateYear").value = c[0];
    doc.getElementById("marsDateMonth").value = c[1];
    for (var b = "", e = 0; 4 > e; e++)b += "\x3cli onclick\x3d'marsDate.clickYear(this)'\x3e" + (parseInt(c[0]) + e) + "\x3c/li\x3e";
    doc.getElementById("marsDate-Years-Ul").innerHTML = b;
    a[0].style.display = "inline"
});
glb.addHandler(marsDateEl[0], "click", function () {
    closeState || (glb.state = 1)
});
glb.addHandler(doc, "click", function () {
    marsList = glb.getClass("input", "marsDate");
    if (marsList.length != glb.nowNum) {
        glb.nowNum = marsList.length;
        for (var a = 0; a < marsList.length; a++)marsList[a].setAttribute("data-num", a)
    }
    glb.state ? (marsDateEl[0].style.display = "inline", glb.state = 0) : marsDateEl[0].style.display = "none"
});