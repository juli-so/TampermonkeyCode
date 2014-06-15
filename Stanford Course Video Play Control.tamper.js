// ==UserScript==
// @name       Stanford Course Video Play Control
// @version    0.11.1
// @description  enter something useful
// @match      https://class.stanford.edu/*
// @require  http://code.jquery.com/jquery-1.10.1.min.js  
// @require  https://raw.githubusercontent.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js  
// @copyright  2012+, You
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

var simulateClick = function(element, modifiers) {  
     var event, eventSequence, mouseEvent, _i, _len, _results;  
     modifiers || (modifiers = {});  
     eventSequence = ["mouseover", "mousedown", "mouseup", "click"];  
     _results = [];  
     for (_i = 0, _len = eventSequence.length; _i < _len; _i++) {  
         event = eventSequence[_i];  
         mouseEvent = document.createEvent("MouseEvents");  
         mouseEvent.initMouseEvent(event, true, true, window, 1, 0, 0, 0, 0, modifiers.ctrlKey, false, false, modifiers.metaKey, 0, null);  
         _results.push(element.dispatchEvent(mouseEvent));  
     }  
     return _results;  
 }

function LocalMain ()
{
    $(document).bind('keydown', 'space', function(){
        var btns1 = $("a[title='Play']");
        var btns2 = $("a[title='Pause']");
        if ( btns1.length > 0 ) {
        	simulateClick(btns1.get(0));
        }
        if ( btns2.length > 0 ) {
        	simulateClick(btns2.get(0));
        }
    });
    $("#transcript-captions").css("right","");
    $("#transcript-captions").css("left","0");
    $("#transcript-captions").css("max-width","15%");
}
