/* global $ */

$(function(){
    $.get('/pizza', appendToList);
    
    function appendToList(blocks){
        var list = [];
        
        for(var i in blocks){
            list.push($('<li>', {text:blocks[i] }));
        }
        $('.pizza').append(list);
    }
});