 // ==UserScript==  
 // @name    Translate Hotkey
 // @namespace http://twitter.com/rock_cloud  
 // @version  0.4.1  
 // @description A hotkey script for google translate web  
 // @match   http://translate.google.com/*  
 // @match   http://translate.google.cn/*  
 // @match   https://translate.google.com/*  
 // @match   https://translate.google.cn/*  
 // @require  http://code.jquery.com/jquery-1.10.1.min.js  
 // @require  https://raw.githubusercontent.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js  
 // @copyright 2013, Richard.Liang
 // ==/UserScript==
 // The simulateClick function came from Chrome Extension "Vimium"
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);

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
 var selectAll = function() {
     alert("select");
     $("#source").select();
     
 }
 var listen = function() {
     alert("select");
     simulateClick($("#gt-src-listen").get(0));
     $("#source").focus();
 }
 var listen2 = function() {
     alert("listen2");
     simulateClick($("#gt-res-listen").get(0));
     $("#source").focus();
 }
 var star = function() {
     alert("star");
     simulateClick($(".goog-toolbar-button.goog-inline-block.trans-pb-button").get(0));
     $("#source").select();
 }
 var swap = function() {
     alert("swap");
     simulateClick($("#gt-swap").get(0));
     $("#source").focus();
 }
 var correct = function() {
     alert("correct");
     simulateClick($("#spelling-correction a").get(0));
     $("#source").focus();
 }
 $(document).ready(function(){
     $(document).add("#source").bind('keydown', 'Ctrl+a', function(){selectAll();return false;});
     $(document).add("#source").bind('keydown', 'Ctrl+f', function(){simulateClick($("#result_box span").get(0));return false;});
     $(document).add("#source").bind('keydown', 'Ctrl+s', function(){star();return false;});
     $("#source").bind('keydown', 'return', function(){listen();return false;});
     $(document).add("#source").bind('keydown', 'Shift+return', function(){listen2();return false;});
     $(document).add("#source").bind('keydown', 'Ctrl+e', function(){swap();return false;});
     $(document).add("#source").bind('keydown', 'Ctrl+r', function(){correct();return false;});
     $(document).add("#source").bind('keydown', 'Ctrl+j', function(){
         var position = $("#source").getCursorPosition();
         if ( position <= 0 ) {
         	position = 0;
         }
         setCaretToPos(document.getElementById("source"), position-1);
         return false;
     });
     $(document).add("#source").bind('keydown', 'Ctrl+k', function(){
         var position = $("#source").getCursorPosition();
         if ( position <= 0 ) {
         	position = 0;
         }
         setCaretToPos(document.getElementById("source"), position+1);
         return false;
     });
     $(document).add("#source").bind('keydown', 'Ctrl+return', function(){
         $("#result_box").html($("#result_box").html() + "的");
     });
 }); 
