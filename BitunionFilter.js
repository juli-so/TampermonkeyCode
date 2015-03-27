// ==UserScript==
// @name         BitunionFilter
// @version      0.0.1
// @description  filter of bitunion
// @author       Me
// @match        http://bitunion.org/*
// @match        http://out.bitunion.org/*
// @match        http://kiss.bitunion.org/*
// @require      http://code.jquery.com/jquery-1.10.1.min.js  
// ==/UserScript==

var db;

var insertPeople = function(id, name) {
    db.transaction(function (tx) {  
        tx.executeSql('insert into people (id, name) VALUES ('+id+', "'+name+'")');
    });
}

var insertWord = function(word) {
    
    db.transaction(function (tx) {
        tx.executeSql('insert into word (word) VALUES ("'+word+'")');
        /*tx.executeSql('SELECT max(id) as maxid FROM word', [], function (tx, results) {
            var maxid = results.rows.item(0).maxid;
            alert(maxid);
            
        }, null);*/
    });
}

var newPost = function(postBody) {
    
}

$(function(){
    tds = $("td[height='80'][align='center']")
    for ( var i = 0; i < tds.length; i++ ) {
        if ( $(tds[i]).text().indexOf("有争议的联盟") >= 0 ) {
            $(tds[i]).css("color","red");
            $(tds[i]).bind("click", function(){insertWord("abcdefg");});
        }
    }
    tbodys = $("table");
    headers = $("td .header");
    for ( var i = 0; i < headers.length; i++ ) {
        if ( $(headers[i]).text().indexOf("论坛最新帖子") >= 0 ) {
            newPost($($(headers[i]).parent().parent().children("tr")[1]).find("tbody")[0]);
        }
    }
    db = openDatabase('mydb', '1.0', 'BuDB', 2 * 1024 * 1024);
    db.transaction(function (tx) {  
        tx.executeSql('Drop TABLE word');
        tx.executeSql('Drop TABLE people');
        tx.executeSql('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY, name)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS word (id INTEGER PRIMARY KEY, word)');
/*        tx.executeSql('SELECT count(*) as count FROM word', [], function (tx, results) {
            var len = results.rows.item(0).count;
            alert(len);
            if ( len-0 == 0 ) {
                alert("insert");
                tx.executeSql('insert into word (id, word) values (0, "")');
            }
        }, null);*/
    });
});

