/**
 * Created by mars on 2015/9/7.
 */

var doc = document,
    win = window,
    marsglb = {
        width: 100,
        height: 25,
        fouce: 0,
        getClass: function (tag, className) {
            var all;
            if (tag == "*") {
                all = document.all ? document.all : document.getElementsByTagName("*");
            } else {
                all = document.getElementsByTagName(tag);
            }
            var elements = new Array();
            for (var i = 0; i < all.length; i++) {
                if (all[i].className == className) {
                    elements[elements.length] = all[i];
                }
            }
            return elements;
        },
        getTop: function (e) {
            var offsetTop = e.offsetTop;
            if (e.offsetParent != null)offsetTop += marsglb.getTop(e.offsetParent);
            return offsetTop;
        },
        getLeft: function (e) {
            var offsetLeft = e.offsetLeft;
            if (e.offsetParent != null)offsetLeft += marsglb.getLeft(e.offsetParent);
            return offsetLeft;
        },
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    },
    marsList = {
        createList: function (el) {
            var top = marsglb.getTop(el);
            var left = marsglb.getLeft(el);
            var box = doc.getElementById("marslist-values");
            var select = el.parentNode.getElementsByTagName("select")[0];
            var values = select.options;
            var txt = "";
            for (var i = 0; i < values.length; i++) {
                txt += "<li data-value='" + i + "' onclick='marsList.clickValue(this)'>" + values[i].innerHTML + "</li>";
            }
            box.getElementsByTagName("ul")[0].innerHTML = txt;
            marsglb.fouce=el.parentNode.getAttribute("date-value");
            box.style.top = (top + marsglb.height) + "px";
            box.style.left = left + "px";
            box.style.display = "inline";
        },
        clickValue: function (el) {
            var box = doc.getElementById("marslist-values");
            box.style.display = "none";
        }
    };

//初始化控件
(function () {
    var arr = marsglb.getClass("div", "marslist");
    for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute("data-value", i);
    }
})();





