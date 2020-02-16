document.addEventListener("DOMContentLoaded", function() {

    // Custom JS

});


// инициация windows app
"use strict";
! function(e) {
    function c(v, t, sutm) {
        c.version = v, 
        c.token = t, 
        c.static_utm = sutm
    }

    function i(o, n, t, e) {
        t = t || function() {}, jQuery("html, body").animate({
            scrollTop: o + (e || 0)
        }, n, function() {
            t()
        })
    }
    c.isMobile = e(window).width() < 767, 
    c.isTablet = e(window).width() < 991 && !c.isMobile, 
    c.isDesktop = !c.isTablet && !c.isMobile, 
    c.scrollToElement = function(o, n, t, e) {
        i(o.offset().top, n, t, e)
    }, 
    c.scrollToPos = i, 
    c.load = function(o, n, t) {
        n = n || function() {}, t.request_token = c.token, e.ajax({
            url: o,
            dataType: "json",
            type: "POST",
            data: t
        }).then(function(o) {
            return n(o)
        }).fail(function(o) {
            console.warn("data", o)
        })
    }, 
    window.app = c
}(jQuery);

// включение функций
"use strict";
! function(i, n) {
    i(function() {
        n.initForm(), 
        n.initMain(), 
        n.initMap(), 
        n.initMask(), 
        // n.initFilter(), 
        // n.initSlider(), 
        // n.initAuto(), 
        // n.initCountdown(), 
        n.initMmenuDisclamer()
    })
}(jQuery, window.app);

"use strict";
! function(i, l) {
    l.initMmenuDisclamer = function() {
        i(".js-mmenu").click(function() {
            var e = i(window).width();
            i(this).toggleClass("active"), i(".header__mobile").slideToggle(), e <= 767 && (i(this).hasClass("active") ? l.disableScroll() : l.enableScroll())
        }), i(".js-open-rules").click(function() {
            i(this).toggleClass("active"), i(".js-rules-text").slideToggle()
        })
    }
}(jQuery, window.app);


"use strict";
! function(s, o) {
    function u(t, e) {
        var a, n = !0;
        if (null == t.val() && t.val("false"), r(t) && r(t.attr("name")) && "" !== t.attr("name")) {
            var o = (t.val() + "").trim();
            (!t.hasClass("valid_email") || (a = o, new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(a))) && ("checkbox" !== t.attr("type") || t.is(":checked")) && r(o) && "" !== o && o !== t.data("mask") || (n = !1)
        }
        return n ? t.removeClass(e) : t.addClass(e), n
    }

    function r(t) {
        return null != t
    }

    function t() {
        o.isDesktop || function() {
            var t = {
                phone: "tel",
                mail: "email",
                email: "email",
                date: "date",
                time: "time"
            };
            for (var e in t) 0 < s('input[name="' + e + '"], input.' + e).length && s('input[name="' + e + '"], input.' + e).each(function() {
                s(this).attr("type", t[e])
            })
        }(), s("select").styler(), s("body").on("focus", 'input[name="phone"]', function(t) {
            s(this).mask("+7 (999) 999-99-99").data("mask", "+7 (___) ___-__-__")
        })
    }

    function i(t, e) {
        window["yaCounter" + window.ym_counter_id].reachGoal(t, e)
    }
    s("body").on("click", ".js-goal", function() {
        var t = s(this),
            e = t.data("src"),
            a = t.data("goal-modal"),
            n = t.data("goal");
        e && s(e).find('input[name="goal"]').val(a), i(n, {})
    }), o.initForm = function() {
        t(), s("body").on("submit", "form", function(t) {
            var e, a, n = s(this);
            ! function(t, e) {
                var a, n = !0,
                    o = s(".required", t).length,
                    r = ['input[type="text"]', 'input[type="login"]', 'input[type="password"]', 'input[type="number"]', 'input[type="checkbox"]', 'input[type="tel"]', 'input[type="email"]', 'input[type="textarea"]', 'input[type="select"]', "textarea", 'select[name="salon"]', "select"];
                if (e = e || "has-error", s(".required, input, textarea, select").removeClass(e), o < 1) return n;
                for (var i = 0; i < o; i++) a = s(".required", t).eq(i), s(r.join(","), a).each(function() {
                    if (!u(s(this), e)) return n = !1
                });
                return n
            }(n) ? (t.preventDefault(), t.stopPropagation(), s(".has-error", n).first().focus()) : n.hasClass("js-ajax-form") && (t.preventDefault(), n.addClass("load"), s('input[name="request_token"]').val(o.token), a = function(t) {
                var e, a;
                e = n, "success" === (a = t).status && (e.after(a.content), e.remove(), function(t, e) {
                    (function(t) {
                        ga("importer.send", "event", t), ga("send", "event", t)
                    })(t), i(t, e)
                }(a.goal, a.data.auto || {})), n.removeClass("load")
            }, function(t, e, a) {
                a = a || function() {}, s.ajax({
                    url: t,
                    dataType: "json",
                    type: "POST",
                    data: e,
                    success: function(t) {
                        a(t)
                    },
                    error: function(t) {
                        a({
                            type: "error",
                            class: "danger",
                            text: t.responseText
                        })
                    }
                })
            }((e = n).attr("action") || "/", e.serialize(), a))
        }), s("body").on("change", ".has-error", function() {
            var t = s(this);
            u(t) && t.closest(".has-error").removeClass("has-error")
        }), s("body").on("keydown", 'input[name="phone"]', function(t) {
            var e = s(this);
            e.val() !== e.data("mask") && "" !== e.val() || "8" !== t.key || t.preventDefault()
        }), navigator.appVersion.match(/MSIE 9/) && (s("body").on("focus", "[placeholder]", function() {
            var t = s(this);
            t.val() === t.attr("placeholder") && t.val("")
        }), s("body").on("blur", "[placeholder]", function() {
            var t = s(this);
            "" === t.val() && t.val(t.attr("placeholder"))
        }))
    }, o.pageFormInit = t
}(jQuery, window.app);


"use strict";
! function(v, t) {
    function s() {
        v("html, body").removeAttr("style")
    }
    v(window).resize(function() {
        var t = v(window).width();
        if (1300 <= t) {
            var e = t / 118.75;
            v("html, body").css({
                "font-size": +e + "px"
            })
        }
    }), 
    t.disableScroll = function() {
        v("html, body").css({
            position: "fixed",
            height: "100vh",
            width: "100%",
            overflow: "hidden"
        })
    }, 
    t.enableScroll = s, 
    t.initMain = function() {
        var i = v(window).width();
        /* * /
        if (v(".js-animate-brakepoint").scrollSpy(), v(".js-animate-brakepoint").on("scrollSpy:enter", function() {
                v(this).closest(".auto-list__item").addClass("active")
            }), v(".inform .button").on("mouseenter", function() {
                v(".inform").addClass("inform_hovered")
            }).on("mouseleave", function() {
                v(".inform").removeClass("inform_hovered")
            }), v(".js-change-car").click(function() {
                var t = v(this).index();
                v(".js-testdrive-car").val(v(this).text()), v(".js-change-car").removeClass("active"), v(this).addClass("active"), v(".js-testdrive-text .testdrive__model-text").removeClass("active"), v(".js-testdrive-text .testdrive__model-text").eq(t).addClass("active")
            }), 1300 <= i) {
            var t = i / 118.75;
            v("body, html").css({
                "font-size": +t + "px"
            })
        }
        /**/
        v("[data-fancybox]").fancybox({
            autoFocus: !0,
            touch: !1
        }), 
        v(".js-type").change(function() {
            var t = v(this).is(":checked"),
                e = v(this).closest(".auto-list__block"),
                a = e.find(".js-vigoda").attr("data-text1"),
                i = e.find(".js-vigoda").attr("data-text2"),
                s = e.find(".js-vigoda-val").attr("data-val1"),
                o = e.find(".js-vigoda-val").attr("data-val2"),
                n = e.find(".js-time").attr("data-text1"),
                d = e.find(".js-time").attr("data-text2"),
                l = e.find(".js-time-val").attr("data-val1"),
                r = e.find(".js-time-val").attr("data-val2");
            1 == t ? (e.find(".js-vigoda").text(i), e.find(".js-vigoda-val").text(o), e.find(".js-time").text(d), e.find(".js-time-val").text(r)) : (e.find(".js-vigoda").text(a), e.find(".js-vigoda-val").text(s), e.find(".js-time").text(n), e.find(".js-time-val").text(l))
        }), 
        v("[data-scroll-to]").click(function(t) {
            t.preventDefault(), 
            v(".js-mmenu").removeClass("active"), 
            v(".header__mobile").hide(), 
            i <= 767 && s();
            var e = v(this).attr("data-scroll-to"),
                a = v(e).offset().top - 48;
            v("body,html").animate({
                scrollTop: a
            }, 1500)
        })
    }
}(jQuery, window.app);



"use strict";
! function(a) {
    window.app.initMap = function() {
        ymaps.ready(function() {
            var e = new ymaps.Map("map", {
                center: a(".js-mapcontrol.active").data("coord"),
                zoom: 16
            });
            a(".js-mapcontrol").each(function() {
                var o = a(this).data("coord"),
                    t = a(this).data("adress"),
                    n = new ymaps.Placemark(o, {
                        hintContent: "",
                        balloonContent: t
                    }, { 
                        preset: 'islands#darkGreenAutoIcon' 
                    });
                e.geoObjects.add(n)
            }), 
            e.behaviors.disable("scrollZoom"), 
            e.controls.remove("geolocationControl"), 
            e.controls.remove("searchControl"), 
            e.controls.remove("trafficControl"), 
            e.controls.remove("typeSelector"), 
            e.controls.remove("fullscreenControl"), 
            e.controls.remove("rulerControl"), 
            a(".js-mapcontrol").on("click", function() {
                var o = a(this);
                a(".js-mapcontrol").removeClass("active"), 
                o.addClass("active"), 
                e.panTo(o.data("coord"), {
                    flying: 0,
                    timingFunction: "ease-in-out",
                    duration: 1e3
                })
            })
        })
    }
}(jQuery);



"use strict";
! function(s, e) {
    var n, r;
    e.initMask = function() {
        function c(e, t) {
            var a = s(e).val();
            r = a.length - a.replace(/(\(\d{3}\) \d{3}\-\d{2}\-\d{0,})|(\(\d{3}\) \d{3}\-\d{1})|(\(\d{3}\) \d{3}\-)|(\(\d{3}\) \d{1,2})|(\(\d{3}\) )|(\(\d{1,2})|\(/gm, "").length, n = r + 4 - 1;
            var c = t.target.selectionStart;
            n < c ? t.target.setSelectionRange(n, n) : c < 4 && (18 == n && 0 == c ? t.target.setSelectionRange(n, n) : t.target.setSelectionRange(4, 4))
        }
        s("body").on("focus", 'input[name="phone"]', function(e) {
            s(this).mask("+7 (999) 999-99-99").data("mask", "+7 (___) ___-__-__"), c(this, e)
        }), s("body").on("click", 'input[name="phone"]', function(e) {
            c(this, e)
        }), s("body").on("keyup", 'input[name="phone"]', function(e) {
            switch (e.key) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                case "Backspace":
                case "Delete":
                    c(this, e)
            }
        }), s("body").on("keydown", 'input[name="phone"]', function(e) {
            switch (e.key) {
                case "ArrowRight":
                    if (e.target.selectionStart >= n) return !1;
                    break;
                case "ArrowLeft":
                    if (e.target.selectionStart <= 4) return !1;
                    break;
                case "End":
                case "ArrowDown":
                    return e.target.setSelectionRange(n, n), !1;
                case "Home":
                case "ArrowUp":
                    return e.target.setSelectionRange(4, 4), !1
            }
            switch (e.key) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                    if (c(this, e), 15 == r && 18 == e.target.selectionStart) {
                        var t = s(this),
                            a = t.val().replace(/\+7 \(|\-|\) /gm, "");
                        "8" === a.charAt(0) && t.mask("+7 (999) 999-99-99").val(a.substr(1) + e.key).focus()
                    }
            }
        })
    }
}(jQuery, window.app);