// ==UserScript==
// @name       Google Hotkey
// @version    0.1
// @description  enter something useful
// @match      https://www.google.com.hk/search*
// @match      https://www.google.com/search*
// @match      http://www.google.com/search*
// @match      http://www.google.com.hk/search*
// @match      http://*/*
// @match      https://*/*
// @require  http://code.jquery.com/jquery-1.10.1.min.js  
// @require  http://www.michaelckennedy.net/samples/blog/HotKeys/js/jquery.hotkeys-0.8.js  
// @copyright  2012+, You
// ==/UserScript==

    function getAllElementsWithAttribute()
    {
      var matchingElements = [];
      var allElements = document.getElementsByTagName('input');
      for (var i = 0; i < allElements.length; i++)
      {
        if (allElements[i].getAttribute("type") == "text" )
        {
            return allElements[i];
        }
      }
        return 0;
    }
 var selectAll = function() {
     var ele = getAllElementsWithAttribute();
     if ( ele != 0 ) {
     	getAllElementsWithAttribute().select();
     }
 }
 $(document).ready(function(){
     $(document).add("#gbqfq").bind('keydown', 'Ctrl+a', function(){selectAll();return false;});
 }); 
