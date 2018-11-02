/**
 * Created by Administrator on 2017/2/14.
 */
(function () {
    function t(a) {
        this.url = [];
        this.init(a)
    }

    var g, l, n, f, x, w, p, B, k, q, u, y, z = 0, A = 0;
    _ver = "tcss.3.1.5";
    window.Tcss = {};
    var v = "function" == typeof tracert && "function" == typeof pgvGetColumn && "function" == typeof pgvGetTopic && "function" == typeof pgvGetDomainInfo && "function" == typeof pgvGetRefInfo;
    if ("undefined" == typeof r)var r = 1;
    t.prototype = {
        init: function (a) {
            a ? f = a : f = {};
            g = document;
            if (!f.statIframe && window != top)try {
                g = top.document
            } catch (c) {
            }
            "undefined" == typeof g && (g = document);
            l = g.location;
            n = g.body;
            v && (Tcss.d =
                g, Tcss.l = l);
            q = [];
            u = [];
            y = []
        }, run: function () {
            var a, c, b;
            a = (new Date).getTime();
            h.init();
            this.url.push(this.getDomainInfo());
            this.coverCookie();
            h.setCookie("ssid");
            h.save();
            this.url.unshift("https://pingfore." + this.getCookieSetDomain(x) + "/pingd?");
            this.url.push(this.getRefInfo(f));
            try {
                navigator.cookieEnabled ? this.url.push("&pvid=" + h.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
            } catch (d) {
                this.url.push("&pvid=NoCookie")
            }
            this.url.push(this.getMainEnvInfo());
            this.url.push(this.getExtendEnvInfo());
            Tcss.pgUserType = "";
            if (f.pgUserType || f.reserved2)c = f.pgUserType || f.reserved2, c = escape(c.substring(0, 256)), Tcss.pgUserType = c, y.push("pu=" + Tcss.pgUserType);
            v && (pgvGetColumn(), pgvGetTopic(), this.url.push("&column=" + Tcss.column + "&subject=" + Tcss.subject), tracert());
            this.url.push("&vs=" + _ver);
            h.setCookie("ts_uid", !0);
            c = (new Date).getTime();
            q.push("tm=" + (c - a));
            z && q.push("ch=" + z);
            f.extParam ? b = f.extParam + "|" : b = "";
            this.url.push("&ext=" + escape(b + q.join(";")));
            this.url.push("&hurlcn=" + escape(u.join(";")));
            this.url.push("&rand=" +
            Math.round(1E5 * Math.random()));
            "undefined" == typeof _speedMark ? this.url.push("&reserved1=-1") : this.url.push("&reserved1=" + (new Date - _speedMark));
            (a = this.getSud()) && y.push("su=" + escape(a.substring(0, 256)));
            this.url.push("&tt=" + escape(y.join(";")));
            this.sendInfo(this.url.join(""));
            1 == A && (a = this.getParameter("tcss_rp_dm", g.URL), a != Tcss.dm && (a = this.url.join("").replace(/\?dm=(.*?)\&/, "?dm=" + a + "&"), this.sendInfo(a)));
            f.hot && (document.attachEvent ? document.attachEvent("onclick", function (a) {
                pgvWatchClick(a)
            }) :
                document.addEventListener("click", function (a) {
                    pgvWatchClick(a)
                }, !1));
            f.repeatApplay && "true" == f.repeatApplay && "undefined" != typeof r && (r = 1)
        }, getSud: function () {
            return f.sessionUserType ? f.sessionUserType : this.getParameter(f.sudParamName || "sessionUserType", g.URL)
        }, coverCookie: function () {
            if (f.crossDomain && "on" == f.crossDomain) {
                var a = this.getParameter("tcss_uid", g.URL), c = this.getParameter("tcss_sid", g.URL), b = this.getParameter("tcss_refer", g.URL), d = this.getParameter("tcss_last", g.URL);
                c && a && (A = 1, h.setCookie("ssid",
                    !1, c), h.save(), h.setCookie("ts_refer", !0, b), h.setCookie("ts_last", !0, d), h.setCookie("pgv_pvid", !0, a))
            }
        }, getDomainInfo: function (a) {
            var c;
            c = l.hostname.toLowerCase();
            f.virtualDomain && (u.push("ad=" + c), c = f.virtualDomain);
            this.getCurrentUrl();
            Tcss.dm = c;
            v && pgvGetDomainInfo();
            x = Tcss.dm;
            w || (w = this.getCookieSetDomain(l.hostname.toLowerCase()), v && (Tcss.domainToSet = w));
            a && (Tcss.dm += ".hot");
            return "dm=" + Tcss.dm + "&url=" + Tcss.url
        }, getCurrentUrl: function () {
            var a = "", c = "-", a = escape(l.pathname);
            "" != l.search && (c = escape(l.search.substr(1)));
            if (f.senseParam) {
                var b = this.getParameter(f.senseParam, g.URL);
                b && (a += "_" + b)
            }
            f.virtualURL && (u.push("au=" + a), a = f.virtualURL);
            Tcss.url = a;
            Tcss.arg = c
        }, getRefInfo: function (a) {
            var c = "-", b = "-", d = "-", e = g.referrer, m;
            a = this.getParameter(a.tagParamName || "ADTAG", g.URL);
            m = e.indexOf("://");
            -1 < m && (m = e.match(/(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i)) && (c = m[2], b = m[4] + (m[5] ? m[5] : ""));
            -1 != e.indexOf("?") && (m = e.indexOf("?") + 1, d = e.substr(m));
            e = c;
            f.virtualRefDomain && ("-" != c && u.push("ard=" + c), c = f.virtualRefDomain);
            f.virtualRefURL && ("-" != b && u.push("aru=" + escape(b)), b = f.virtualRefURL);
            var k;
            a && (k = c + b, c = "ADTAG", b = a);
            p = c;
            B = escape(b);
            if ("-" == p || "ADTAG" == p && "-" == e)c = h.get("ts_last=", !0), "-" != c && q.push("ls=" + c);
            h.setCookie("ts_last", !0, escape((l.hostname + l.pathname).substring(0, 128)));
            c = h.get("ts_refer=", !0);
            "-" != c && q.push("rf=" + c);
            e = l.hostname;
            f.inner && (e = "," + e + "," + f.inner + ",");
            "-" == p || -1 < ("," + e + ",").indexOf(p) || 1 == A || (b = escape((p + b).substring(0, 128)), b != c && (z = 2), h.setCookie("ts_refer", !0, b));
            Tcss.rdm = p;
            Tcss.rurl =
                B;
            Tcss.rarg = escape(d);
            v && pgvGetRefInfo();
            return k ? "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&or=" + k : "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg
        }, getMainEnvInfo: function () {
            var a = "";
            try {
                var c = "-", b = "-", d = "-", e = "-", f = "-", h = 0, g = navigator;
                self.screen && (c = screen.width + "x" + screen.height, b = screen.colorDepth + "-bit");
                g.language ? d = g.language.toLowerCase() : g.browserLanguage && (d = g.browserLanguage.toLowerCase());
                h = g.javaEnabled() ? 1 : 0;
                e = g.platform;
                f = (new Date).getTimezoneOffset() / 60;
                a = "&scr=" +
                c + "&scl=" + b + "&lang=" + d + "&java=" + h + "&pf=" + e + "&tz=" + f
            } catch (k) {
            } finally {
                return a
            }
        }, getExtendEnvInfo: function () {
            var a = "";
            try {
                var c = l.href, b = "-", a = a + ("&flash=" + this.getFlashInfo());
                n.addBehavior && (n.addBehavior("#default#homePage"), n.isHomePage(c) && (a += "&hp=Y"));
                n.addBehavior && (n.addBehavior("#default#clientCaps"), b = n.connectionType);
                a += "&ct=" + b
            } catch (d) {
            } finally {
                return a
            }
        }, getFlashInfo: function () {
            var a = "-", c = navigator;
            try {
                if (c.plugins && c.plugins.length)for (var b = 0; b < c.plugins.length; b++) {
                    if (-1 < c.plugins[b].name.indexOf("Shockwave Flash")) {
                        a =
                            c.plugins[b].description.split("Shockwave Flash ")[1];
                        break
                    }
                } else if (window.ActiveXObject)for (b = 12; 5 <= b; b--)try {
                    if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + b + "');")) {
                        a = b + ".0";
                        break
                    }
                } catch (d) {
                }
            } catch (e) {
            }
            return a
        }, getParameter: function (a, c) {
            if (a && c) {
                var b = c.match(new RegExp("(\\?|#|&)" + a + "=([^&^#]*)(#|&|$)"));
                return b ? b[2] : ""
            }
            return ""
        }, getCookieSetDomain: function (a) {
            var c, b, d = [];
            for (b = c = 0; b < a.length; b++)"." == a.charAt(b) && (d[c] = b, c++);
            c = d.length;
            -1 < a.indexOf(".cn") && c--;
            b = "qq.com";
            1 ==
            c ? b = a : 1 < c && (b = a.substring(d[c - 2] + 1));
            return b
        }, watchClick: function (a) {
            try {
                var c = !0, b = "", d;
                d = window.event ? window.event.srcElement : a.target;
                switch (d.tagName) {
                    case "A":
                        b = "<A href=" + d.href + ">" + d.innerHTML + "</a>";
                        break;
                    case "IMG":
                        b = "<IMG src=" + d.src + ">";
                        break;
                    case "INPUT":
                        b = "<INPUT type=" + d.type + " value=" + d.value + ">";
                        break;
                    case "BUTTON":
                        b = "<BUTTON>" + d.innerText + "</BUTTON>";
                        break;
                    case "SELECT":
                        b = "SELECT";
                        break;
                    default:
                        c = !1
                }
                if (c) {
                    var e = new t(f), g = e.getElementPos(d);
                    if (f.coordinateId) {
                        var h = e.getElementPos(document.getElementById(f.coordinateId));
                        g.x -= h.x
                    }
                    e.url.push(e.getDomainInfo(!0));
                    e.url.push("&hottag=" + escape(b));
                    e.url.push("&hotx=" + g.x);
                    e.url.push("&hoty=" + g.y);
                    e.url.push("&rand=" + Math.round(1E5 * Math.random()));
                    e.url.unshift("https://pingfore." + this.getCookieSetDomain(x) + "/pingd?");
                    e.sendInfo(e.url.join(""))
                }
            } catch (k) {
            }
        }, getElementPos: function (a) {
            if (null === a.parentNode || "none" == a.style.display)return !1;
            var c = navigator.userAgent.toLowerCase(), b = null, d = [];
            if (a.getBoundingClientRect)return c = a.getBoundingClientRect(), a = Math.max(document.documentElement.scrollTop,
                document.body.scrollTop), b = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), {
                x: c.left + b - document.body.clientLeft,
                y: c.top + a - document.body.clientTop
            };
            if (document.getBoxObjectFor)c = document.getBoxObjectFor(a), d = [c.x - (a.style.borderLeftWidth ? Math.floor(a.style.borderLeftWidth) : 0), c.y - (a.style.borderTopWidth ? Math.floor(a.style.borderTopWidth) : 0)]; else {
                d = [a.offsetLeft, a.offsetTop];
                b = a.offsetParent;
                if (b != a)for (; b;)d[0] += b.offsetLeft, d[1] += b.offsetTop, b = b.offsetParent;
                if (-1 < c.indexOf("opera") ||
                    -1 < c.indexOf("safari") && "absolute" == a.style.position)d[0] -= document.body.offsetLeft, d[1] -= document.body.offsetTop
            }
            for (b = a.parentNode ? a.parentNode : null; b && "BODY" != b.tagName && "HTML" != b.tagName;)d[0] -= b.scrollLeft, d[1] -= b.scrollTop, b = b.parentNode ? b.parentNode : null;
            return {x: d[0], y: d[1]}
        }, sendClick: function () {
            f.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + escape(f.hottag)), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(1E5 * Math.random())), this.url.unshift("https://pingfore." +
            this.getCookieSetDomain(x) + "/pingd?"), this.sendInfo(this.url.join("")))
        }, pgvGetArgs: function () {
            this.getDomainInfo();
            var a = [];
            a.push("tcss_rp_dm=" + Tcss.dm);
            a.push("tcss_uid=" + h.get("pgv_pvid=", !0));
            a.push("tcss_sid=" + h.get("ssid=", !0));
            a.push("tcss_refer=" + h.get("ts_refer=", !0));
            a.push("tcss_last=" + h.get("ts_last=", !0));
            return a.join("&")
        }, sendInfo: function (a) {
            k = new Image(1, 1);
            Tcss.img = k;
            k.onload = k.onerror = k.onabort = function () {
                k.onload = k.onerror = k.onabort = null;
                Tcss.img = null
            };
            k.src = a
        }
    };
    var h = {
        sck: [],
        sco: {}, init: function () {
            var a = this.get("pgv_info=", !0);
            if ("-" != a)for (var a = a.split("&"), c = 0; c < a.length; c++) {
                var b = a[c].split("=");
                this.set(b[0], unescape(b[1]))
            }
        }, get: function (a, c) {
            var b = c ? g.cookie : this.get("pgv_info=", !0), d = "-", e;
            e = b.indexOf(a);
            if (-1 < e) {
                e += a.length;
                d = b.indexOf(";", e);
                -1 == d && (d = b.length);
                if (!c) {
                    var f = b.indexOf("&", e);
                    -1 < f && (d = Math.min(d, f))
                }
                d = b.substring(e, d)
            }
            return d
        }, set: function (a, c) {
            this.sco[a] = c;
            for (var b = !1, d = this.sck.length, e = 0; e < d; e++)if (a == this.sck[e]) {
                b = !0;
                break
            }
            b || this.sck.push(a)
        },
        setCookie: function (a, c, b) {
            var d = l.hostname, e = h.get(a + "=", c);
            if ("-" != e || b)e = b ? b : e; else {
                switch (a) {
                    case "ts_uid":
                        q.push("nw=1");
                        break;
                    case "ssid":
                        z = 1
                }
                c ? e = "" : e = "s";
                b = (new Date).getUTCMilliseconds();
                e += Math.round(2147483647 * Math.abs(Math.random() - 1)) * b % 1E10
            }
            if (c)switch (a) {
                case "ts_uid":
                    this.saveCookie(a + "=" + e, d, this.getExpires(1051200));
                    break;
                case "ts_refer":
                    this.saveCookie(a + "=" + e, d, this.getExpires(259200));
                    break;
                case "ts_last":
                    this.saveCookie(a + "=" + e, d, this.getExpires(30));
                    break;
                default:
                    this.saveCookie(a +
                    "=" + e, w, "expires=Sun, 18 Jan 2038 00:00:00 GMT;")
            } else this.set(a, e);
            return e
        }, getExpires: function (a) {
            var c = new Date;
            c.setTime(c.getTime() + 6E4 * a);
            return "expires=" + c.toGMTString()
        }, save: function () {
            if (f.sessionSpan) {
                var a = new Date;
                a.setTime(a.getTime() + 6E4 * f.sessionSpan)
            }
            for (var c = "", b = this.sck.length, d = 0; d < b; d++)c += this.sck[d] + "=" + this.sco[this.sck[d]] + "&";
            c = "pgv_info=" + c.substr(0, c.length - 1);
            b = "";
            a && (b = "expires=" + a.toGMTString());
            this.saveCookie(c, w, b)
        }, saveCookie: function (a, c, b) {
            g.cookie = a + ";path=/;domain=" +
            c + ";" + b
        }
    };
    window.pgvMain = function (a, c) {
        var b = "";
        c ? (b = c, _ver = "tcsso.3.1.5") : (b = a, _ver = "tcss.3.1.5");
        try {
            v && ("undefined" != typeof pvRepeatCount && 1 == pvRepeatCount ? (r = 1, pvRepeatCount = 2) : r = 2), 1 == r && (r = 2, (new t(b)).run())
        } catch (d) {
        }
    };
    window.pgvSendClick = function (a) {
        (new t(a)).sendClick()
    };
    window.pgvWatchClick = function (a) {
        (new t(a)).watchClick(a)
    };
    window.pgvGetArgs = function (a) {
        return (new t(a)).pgvGetArgs()
    }
})();