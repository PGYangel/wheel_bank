/**
 * Created by yerong on 2018/10/31.
 */
//模拟滚动条
function g( id ){return document.getElementById( id )}
function bind( o, e, f ) { o.addEventListener ? o.addEventListener(e, f, false) : o.attachEvent('on' + e, f) }
var slider = g("scrollSlider"),
    bar= g("scrollBar"),
    box = g("scrollBox"),
    cont= g("scrollCont"),
    iMax = box.clientHeight - cont.offsetHeight,
    iStep = box.clientHeight / cont.offsetHeight,
    ih = 0, wh = 0;
function initscroll(){
    slider = g("scrollSlider"),
        bar= g("scrollBar"),
        box = g("scrollBox"),
        cont= g("scrollCont"),
        iMax = box.clientHeight - cont.offsetHeight,
        iStep = box.clientHeight / cont.offsetHeight,
        ih = 0, wh = 0;
    box.clientHeight < cont.offsetHeight && (slider.style.display='block');
    if( iStep<1 ) {
        ih = box.offsetHeight * iStep;
        if( ih<30 ) ih = 30;
        bar.style.height = parseInt( ih ) + 'px';
        wh = box.offsetHeight - bar.offsetHeight;
    }
}
function scrollWheel() {
    box.clientHeight < cont.offsetHeight && (slider.style.display='block');
    if( iStep<1 ) {
        ih = box.offsetHeight * iStep;
        if( ih<30 ) ih = 30;
        bar.style.height = parseInt( ih ) + 'px';
        wh = box.offsetHeight - bar.offsetHeight;
    }

    bar.onmousedown = function(e) {
        var ev = e || window.event,
            y = ev.clientY - this.offsetTop;
        document.onmousemove = function(e) {
            var ev = e || window.event,
                t = ev.clientY - y;
            mouseMove(t);
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        ev.preventDefault && ev.preventDefault();
        return false;
    };
    function mouseMove(n) {
        if( n<0 ) {
            n = 0;
        }else if( n > wh) {
            n = wh;
        }

        var scale = n / wh;
        cont.style.top = iMax * scale + 'px';
        bar.style.top = n + 'px';
    }
    function mouseWheel(e) {
        var ev = e || window.event,
            onOff = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
        onOff ? mouseMove( bar.offsetTop + 10) : mouseMove( bar.offsetTop - 10);
        if(ev.preventDefault)ev.preventDefault();
        return false;
    }
    var wheel = ( /Firefox/i.test( navigator.userAgent) ) ? 'DOMMouseScroll' : 'mousewheel';
    bind(box, wheel, mouseWheel);
}

initscroll();
scrollWheel();