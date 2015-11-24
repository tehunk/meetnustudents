$(document).ready(function () {

    $("#matchForm").submit(function (event) {
        $("#output").show();
        $("#input").hide();

        event.preventDefault();
        var handle = $(this).find("input[name='tHandle']").val();
        $.ajax({
            url: "GetMatch",
            type: "GET",
            dataType: "json",
            data: "tHandle=" + handle,
            timeout: 200000,
            success: show_response,
            error: error_message
        });
    });

    $("#back").click(function () {
        $("#output").hide();
        $("#input").show();
        $("#tHandle").val("");
        $("#outputList").empty();
        $(".loading").show();
    });

    $(".expandable").click(function () {
        var id = $(this).html();
        $("#" + id).toggle('slow');
    });

    show_response = function (json) {
        $(".loading").hide();

        var match = json[0].match;
        var myInfo = json[1];
        var matchInfo = json[2].matchInfo;

        $("#myTopMentions").html("Top Mentions: " + myInfo.mentions);
        $("#myTopHashtags").html("Top Hashtags: " + myInfo.hashtags);
        word_cloud_generator (document.getElementById("myWordCloud"), myInfo);

        $.each(match, function (index, matchJson) {
            var tHandle = matchJson.twitterHandle;
            var h3 = document.createElement("h3");
            h3.setAttribute("class", "expandable");
            h3.innerHTML = tHandle;
            $("#outputList").append(h3);

            var div = document.createElement("div");
            div.setAttribute("id", tHandle);
            div.setAttribute("class", "left_padding");
            //div.setAttribute("style", "display: none;");
            $("#outputList").append(div);
            var p = document.createElement("p");
            p.innerHTML = "Top Mentions: " + matchInfo[index].mentions;
            div.appendChild(p);
            p = document.createElement("p");
            p.innerHTML = "Top HashTags: " + matchInfo[index].hashtags;
            div.appendChild(p);
            p = document.createElement("p");
            p.innerHTML = "Word Cloud";
            div.appendChild(p);
            
            var wordCloud = document.createElement("div");
            wordCloud.setAttribute("id", tHandle+"WordCloud");
            wordCloud.setAttribute("class", "wordCloud");
            div.appendChild(wordCloud);
            word_cloud_generator(wordCloud, matchInfo[index]);
        });
    };
    
    word_cloud_generator = function (element, info) {
        
        var words = info.topWords.split(",");
        var counts = info.wordsCount.split(",");

        var i = 0;
        for (i = 0; i < words.length; i++) {
            var word = document.createElement("div");
            word.innerHTML = words[i];
            word.style.opacity = parseInt(counts[i]) / words.length + 0.5;
            word.style.fontSize = parseInt(counts[i]) * 20 + 50 + "%";
            word.style.float = "left";
            element.appendChild(word);
        }
        
    };
    error_message = function () {
        alert("Failed");
    };

    random_generator = function (max) {
        randNum = Math.floor(Math.random() * max + 1);
        return randNum;
    };
});