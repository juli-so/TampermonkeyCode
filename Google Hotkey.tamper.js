// ==UserScript==
// @name       Google Hotkey
// @version    0.3.1
// @description  enter something useful
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
     	ele.select();
     }
 }
 window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{
    $(document).bind('keydown', 'Ctrl+a', function(){selectAll();return false;});
}
