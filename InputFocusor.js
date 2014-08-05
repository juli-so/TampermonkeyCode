// ==UserScript==
// @name       Input Focusor
// @version    0.3.4
// @description  Focus on the first input of a web page
// @match      https://www.google.com.hk/search*
// @match      https://www.google.com/search*
// @match      http://www.google.com/search*
// @match      http://www.google.com.hk/search*
// @exclude	   https://translate.google.com/*
// @exclude	   https://translate.google.cn/*
// @match      http://*/*
// @match      https://*/*
// @require  http://code.jquery.com/jquery-1.10.1.min.js  
// @require  https://raw.githubusercontent.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js
// @copyright  2012+, richard-liang
// ==/UserScript==
//don't run on frames or iframes
if (window.top != window.self) {
    return;
}

var selectAll = function() {
    var inputs = $("input[type='text']");
    if ( typeof inputs === 'object' ) {
        inputs.focus();
        inputs.select();
    } else if ( inputs.length > 1 ) {
        var maxid = 0;
        var maxArea = $(inputs[0]).width()*$(inputs[0]).height();
        for ( i = 1; i < inputs.length; i++ ) {
            area = $(inputs[i]).width()*$(inputs[i]).height();
            if (area > maxArea) {
                maxid = i;
                maxArea = area;
                
            }
        }
        inputs[maxid].focus();
        inputs[maxid].select();
    }
}

$(window).load(function() {
    $(document).bind('keydown', 'Ctrl+a', function() {
        selectAll();
        return false;
    });
})


