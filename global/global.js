/// <reference path="jquery-2.1.3.js" />
$(document).ready(function () {

    // MIT license - requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());
    //end polyfill

    //facebook feed
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    //navigation and scrolling
    var $navBt = $('.nav-bt');

    $navBt.on('click', function () {
        var $this = $(this),
            $thisId = $this.prop('id'),
            btAnchor = '#' + $thisId + '-anchor';

        $navBt.removeClass('selected');
        $this.addClass('selected');

        requestAnimationFrame(function () {
            $('html, body').animate({
                    scrollTop: $(btAnchor).offset().top
                },
                800);
        });

        $(btAnchor).find('h1').addClass('slide-in-left').end()
            .find('p').addClass('slide-in-right').end()
            .find('img').addClass('fade-in');

        return false;
    });

    //google analytics
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-64444210-2', 'auto');
    ga('send', 'pageview');
});