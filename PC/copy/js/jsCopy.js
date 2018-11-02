/**
 * Created by yerong on 2018/10/31.
 */
(function(){
    var loadScript = function(url, callback) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback) {
                        callback()
                    }
                }
            }
        } else {
            script.onload = function() {
                if (callback) {
                    callback()
                }
            }
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script)
    };

    function MyCopyJS(id) {
        var userAgent = navigator.userAgent.toLowerCase();
        if(/msie/.test( userAgent )) {
            var trigger = document.getElementById(id.substr(1));
            var id = trigger.getAttribute('data-clipboard-target').substr(1);
            var target = document.getElementById(id);
            trigger.onclick = function() {
                if (window.clipboardData) {
                    window.clipboardData.setData("Text", target.innerHTML);
                    alert("内容已复制到剪贴板");
                }
            }
        } else {
            loadScript('js/clipboard.js?v=1', function() {
                new ClipboardJS(id);
            })
        }
    }
    window.MyCopyJS = MyCopyJS;
})();