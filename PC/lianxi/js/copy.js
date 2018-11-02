/**
 * 复制方法
 */

var copySwf;
var copyObj = {
    chtml: '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1920" height="1080" id="copySwf"><param name="movie" value="http://img.res.szgla.com/ws/js/copy.swf" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><embed src="http://img.res.szgla.com/ws/js/copy.swf" width="1920" height="1080" name="copySwf" wmode="transparent" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>',
    cStyle: '.copySwf{position:absolute;top:0;left:0;z-index: 10;width: 100%;height: 100%;opacity: 0;-moz-opacity: 0;filter:alpha(opacity=0);overflow:hidden;}',
    cStyle2: '.copySwf{position:absolute;top:0;left:0;z-index: 10;width: 100%;height: 100%;opacity: 0;-moz-opacity: 0;filter:alpha(opacity=0);overflow:hidden;background: #000;display:block;}',
    copyTxt: "",
    cSwf: function () {
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
    },
    initCopy: function (id) {
        if(copyObj.cSwf().f){
            copyObj.initStyle();
            var html='<div class="copySwf">'+
                '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1920" height="1080" id="copySwf'+id+'">' +
                '<param name="movie" value="http://img.res.szgla.com/ws/js/copy.swf" />' +
                '<param name="wmode" value="transparent" />' +
                '<param name="allowScriptAccess" value="always" />' +
                '<embed src="http://img.res.szgla.com/ws/js/copy.swf" width="1920" height="1080" name="copySwf'+id+'" wmode="transparent" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></object>'
                +'</div>';
            $("#"+id).append(html);
            copySwf= thisMovie("copySwf"+id);
        }else{
            copyObj.initStyle2();
            var e = document.getElementById(id);
            var html = document.createElement('a');
            html.setAttribute('class', 'copySwf');
            html.setAttribute('href', 'javascript:copyObj.copyCip(copyObj.copyTxt);');
            e.appendChild(html);
        }
    },
    initStyle: function () {
        var css='<style type="text/css">'+copyObj.cStyle+'</style>';
        $("head").append(css);
    },
    initStyle2: function () {
        var css='<style type="text/css">'+copyObj.cStyle2+'</style>';
        $("head").append(css);
    },
    copyCip: function (txt) {
        if (window.clipboardData) {
            //window.clipboardData.clearData();
            window.clipboardData.setData("Text", txt);
            alert("以下信息已复制到剪贴板，你可以在需要的窗口中按Ctrl+V粘贴使用:\n\n" + txt);
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
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
            alert("以下信息已复制到剪贴板，你可以在需要的窗口中按Ctrl+V粘贴使用:\n\n" + txt);
        }
        else {
            alert("您的浏览器不支持复制功能，请您手动复制");
        }
    },
    setTxt:function(txt){
        copyObj.copyTxt=txt;
    }
};

function copyBegin() {
    copySwf["copySwfFn"](copyObj.copyTxt);
    /*for(var i=0;i<copySwf.length;i++){
        copySwf[i]["copySwfFn"](copyObj.copyTxt);
    }*/
}
function copySuccess() {
    alert("内容已复制到剪切板！");
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}