 // ==UserScript==  
 // @name    Translate Hotkey
 // @namespace http://twitter.com/rock_cloud  
 // @version  0.3  
 // @description A hotkey script for google translate web  
 // @match   http://translate.google.com/*  
 // @match   http://translate.google.cn/*  
 // @require  http://code.jquery.com/jquery-1.10.1.min.js  
 // @require  http://www.michaelckennedy.net/samples/blog/HotKeys/js/jquery.hotkeys-0.8.js  
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
     $("#source").select();
 }
 var listen = function() {
     simulateClick($("#gt-src-listen").get(0));
     $("#source").focus();
 }
 var listen2 = function() {
     simulateClick($("#gt-res-listen").get(0));
     $("#source").focus();
 }
 var star = function() {
     simulateClick($(".goog-toolbar-button.goog-inline-block.trans-pb-button").get(0));
     $("#source").select();
 }
 var swap = function() {
     simulateClick($("#gt-swap").get(0));
     $("#source").focus();
 }
 var correct = function() {
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
     /*$(document).bind('keydown', 'j', function(){
         var menu = $(".goog-menu .goog-menu-vertical .alt-menu");
         alert(menu.attr("display"));
         if ( == "none") {
             
         }
     });*/
 }); 