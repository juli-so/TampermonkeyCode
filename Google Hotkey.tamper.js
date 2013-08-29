// ==UserScript==
// @name       Google Hotkey
// @version    0.1
// @description  enter something useful
// @match      https://www.google.com.hk/search*
// @match      https://www.google.com/search*
// @match      http://www.google.com/search*
// @match      http://www.google.com.hk/search*
// @require  http://code.jquery.com/jquery-1.10.1.min.js  
// @require  http://www.michaelckennedy.net/samples/blog/HotKeys/js/jquery.hotkeys-0.8.js  
// @copyright  2012+, You
// ==/UserScript==

 var selectAll = function() {
     $("#lst-ib").select();
 }
 $(document).ready(function(){
     $(document).add("#lst-ib").bind('keydown', 'Ctrl+a', function(){selectAll();return false;});
 }); 