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
        $(this).next().toggle('slow');
    });

    show_response = function (json) {
        $(".loading").hide();

        var match = json[0].match;
        var myInfo = json[1];
        var matchInfo = json[2].matchInfo;

        $("#myTopMentions").html("<b>Top Mentions: </b>" + myInfo.mentions);
        $("#myTopHashtags").html("<b>Top Hashtags: </b>" + myInfo.hashtags);
        $("#myTopWords").html("<b>Word Cloud</b>");
        var temp = document.getElementById("myWordCloud");
        word_cloud_generator(document.getElementById("myWordCloud"), myInfo);

        $.each(match, function (index, matchJson) {
            var tHandle = matchJson.twitterHandle;
            var matchDiv = $("#match_" + index);

            $(matchDiv).prev().html(tHandle);

            $(matchDiv).children("p").first().html("<b>Top Mentions: </b>" + matchInfo[index].mentions);
            $(matchDiv).children("p").first().next().html("<b>Top HashTags: </b>" + matchInfo[index].hashtags);
            $(matchDiv).children("p").last().html("<b>Word Cloud</b>");

            var wordCloud = document.createElement("div");
            wordCloud.setAttribute("id", tHandle + "WordCloud");
            wordCloud.setAttribute("class", "wordCloud");
            $(matchDiv).append(wordCloud);
            word_cloud_generator(wordCloud, matchInfo[index]);
        });
    };

    word_cloud_generator = function (element, info) {

        var wordList = info.topWords.split(",");
        var counts = info.wordsCount.split(",");
        var color = d3.scale.linear()
                .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
                .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
        d3.layout.cloud().size([800, 300])
                .words(wordList.map(function (t, index) {
                    return {text: t, size: parseInt(counts[index])*3};
                }))
                .rotate(0)
                .fontSize(function (d) {
                    return d.size;
                })
                .on("end", draw)
                .start();
        function draw(words) {
            d3.select(element).append("svg")
                    .attr("width", 850)
                    .attr("height", 350)
                    .attr("class", "wordcloud")
                    .append("g")
                    // without the transform, words words would get cutoff to the left and top, they would
                    // appear outside of the SVG area
                    .attr("transform", "translate(320,200)")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function (d) {
                        return d.size + "px";
                    })
                    .style("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function (d) {
                        return d.text;
                    });
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