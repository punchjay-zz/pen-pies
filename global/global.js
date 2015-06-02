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
    });

    /*    $(window).scroll(function () {
            var hT = $('#bt-two-anchor').offset().top,
                hH = $('#bt-two-anchor').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            console.log((hT - wH), wS);
            if (wS > (hT + hH - wH)) {
                $('#bt-two-anchor').find('h1').addClass('slide-in-left');
            }
        });*/
});