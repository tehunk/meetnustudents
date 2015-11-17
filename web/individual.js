/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
    var words = ["embarrased", "crayon", "cumbersome", "sordid", "awesome",
        "unnatural", "roof", "cuddly", "produce", "visit", "fancy",
        "pot", "mine", "simplistic", "form", "private", "gratis",
        "tray", "cub", "gaping"];

    var counts = [1, 4, 10, 2, 15, 3, 7, 3, 5, 30, 5, 6, 3, 1, 9, 11, 10, 3, 5, 8];
    
    var i=0;
    for (i=0; i<20; i++) {
        var word = document.createElement("div");
        word.innerHTML = words[i];
        word.style.opacity = counts[i]/30;
        word.style.fontSize = counts[i]*30+50+"%";
        word.style.float = "left";
        $("#wordCloud").append(word);
    }

});
