var domAttr = (function () {
    var fixAttr = {
            tabindex: 'tabIndex',
            readonly: 'readOnly',
            'for': 'htmlFor',
            'class': 'className',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            cellpadding: 'cellPadding',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            usemap: 'useMap',
            frameborder: 'frameBorder',
            contenteditable: 'contentEditable'
        },
        div = document.createElement('div');
    div.setAttribute('class', 't');
    var supportSetAttr = div.className === 't';
    return {
        setAttr: function (el, name, val) {
            el.setAttribute(supportSetAttr ? name : (fixAttr[name] || name), val);
        },
        getAttr: function (el, name) {
            return el.getAttribute(supportSetAttr ? name : (fixAttr[name] || name));
        }
    }
})();
var copySwf=[];
var copyObject = {
    isCopy: false,
    isFlash: 0,
    swfUrl: "copy.swf",
    cStyle: '.copySwf{cursor:pointer;position:absolute;top:0;left:0;z-index: 10;width: 100%;height: 100%;opacity: 0;-moz-opacity: 0;filter:alpha(opacity=0);overflow:hidden;}',
    cStyle2: '.copySwf{cursor:pointer;position:absolute;top:0;left:0;z-index: 10;width: 100%;height: 100%;opacity: 0;-moz-opacity: 0;filter:alpha(opacity=0);overflow:hidden;background: #000;display:block;}',
    copyTxt: "",
    copyNum:0,
    initCopy: function (id) {
        var e = document.getElementById(id);
        if (copyObject.isCopy) {
            var html = document.createElement('a');
            domAttr.setAttr(html, 'class', 'copySwf');
            domAttr.setAttr(html, 'href', 'javascript:copyObject.copyCip(copyObject.copyTxt);');
            e.appendChild(html);
        } else {
            if (copyObject.isFlash) {
                var html = document.createElement('div');
                var swfId = "copySwf" + id;
                domAttr.setAttr(html, 'class', 'copySwf');
                html.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1920" height="1080" id="'+swfId+'">' +
                '<param name="movie" value="'+copyObject.swfUrl+'"/>' +
                '<param name="wmode" value="transparent" />' +
                '<param name="allowScriptAccess" value="always" />' +
                '<embed src="'+copyObject.swfUrl+'" width="1920" height="1080" name="'+swfId+'" wmode="transparent" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>';
                e.appendChild(html);
                //copySwf[copySwf.length] = window[swfId] || document[swfId];
                copySwf[copySwf.length]= thisMovie(swfId);
            } else {
                var html = document.createElement('a');
                domAttr.setAttr(html, 'class', 'copySwf');
                domAttr.setAttr(html, 'href', 'javascript:copyObject.copyCip(copyObject.copyTxt);');
                e.appendChild(html);
            }
        }
    },
    setTxt: function (txt,num) {
        copyObject.copyTxt = txt;
        copyObject.copyNum = num;
    },
    initStyle: function () {
        copyObject.isCopy = copyObject.isCopyFn();
        copyObject.isFlash = copyObject.isFlashFn().f;
        var nod = document.createElement('style');
        //判断是否允许js进行复制
        if (copyObject.isCopy) {
            var str = copyObject.cStyle2;
            nod.type = 'text/css';
            if (nod.styleSheet) {
                //ie下
                nod.styleSheet.cssText = str;
            } else {
                nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
            }
        } else {
            if (copyObject.isFlash) {
                var str = copyObject.cStyle;
                nod.type = 'text/css';
                if (nod.styleSheet) {
                    //ie下
                    nod.styleSheet.cssText = str;
                } else {
                    nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
                }
            } else {
                var str = copyObject.cStyle2;
                nod.type = 'text/css';
                if (nod.styleSheet) {
                    //ie下
                    nod.styleSheet.cssText = str;
                } else {
                    nod.innerHTML = str; //或者写成 nod.appendChild(document.createTextNode(str))
                }
            }
        }
        document.getElementsByTagName('head')[0].appendChild(nod);
    },
    isCopyFn: function () {
        if (window.clipboardData) {
            return true;
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            return true;
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                return false;
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return false;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return false;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = "";
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip) {
                return false;
            }
            clip.setData(trans, null, clipid.kGlobalClipboard);
            return true;
        }
        else {
            return false;
        }
    },
    copyCip: function (txt) {
        if (window.clipboardData) {
            //window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("内容已复制到剪切板！");
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("复制功能被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'\n或者手动复制相应内容");
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
            alert("内容已复制到剪切板！");
        }
        else {
            alert("您的浏览器不支持复制功能，请您手动复制！");
        }
    },
    isFlashFn: function () {
        var hasFlash = 0; //是否安装了flash
        var flashVer = 0; //flash版本
        if (document.all) {
            try {
                var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (swf) {
                    hasFlash = 1;
                    VSwf = swf.GetVariable("$version");
                    flashVer = parseInt(VSwf.split(" ")[1].split(",")[0]);
                }
            } catch (e) {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    var swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = 1;
                        var words = swf.description.split(" ");
                        for (var i = 0; i < words.length; ++i) {
                            if (isNaN(parseInt(words[i]))) continue;
                            flashVer = parseInt(words[i]);
                        }
                    }
                }
            }
        } else {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var swf = navigator.plugins["Shockwave Flash"];
                if (swf) {
                    hasFlash = 1;
                    var words = swf.description.split(" ");
                    for (var i = 0; i < words.length; ++i) {
                        if (isNaN(parseInt(words[i]))) continue;
                        flashVer = parseInt(words[i]);
                    }
                }
            }
        }
        return {f: hasFlash, v: flashVer};
    }
};
copyObject.initStyle();
function copyBegin() {
    copySwf[copyObject.copyNum]["copySwfFn"](copyObject.copyTxt);
}
function copySuccess(text) {
    alert("内容已复制到剪切板！");
}
function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}