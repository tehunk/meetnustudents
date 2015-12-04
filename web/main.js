$(document).ready(function () {

    $("#tHandle").val("");
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
        $(".wordCloud").empty();
        $("#myTopMentions").empty();
        $("#myTopHashtags").empty();
        $("#myTopWords").empty();
        $(".expandable").children("img").removeAttr("alt src height width");
        $(".expandable").children().empty();
        $(".loading").show();
    });
    $(".expandable").click(function () {
        $(this).next().toggle('slow');
    });
    show_response = function (json) {
        $(".loading").hide();
        var match = json[0].match;
        var myInfo = json[1];
        var tweetInfo = json[2].tweetInfo;
        var matchInfo = json[3].matchInfo;

        $("#myTopMentions").html("<b>Top Mentions: </b>" + myInfo.mentions);
        $("#myTopHashtags").html("<b>Top Hashtags: </b>" + myInfo.hashtags);
        $("#myTopWords").html("<b>Word Cloud</b>");
        word_cloud_generator(document.getElementById("myWordCloud"), myInfo);

        $.each(match, function (index, matchJson) {
            var tHandle = matchJson.twitterHandle;
            var matchDiv = $("#match_" + index);
            $(matchDiv).prev().children("h3").html(tHandle); //put twitter name in the <h3> tag, previous of <div>
            $(matchDiv).prev().children("img").attr({
                alt: tHandle,
                src: matchInfo[index].picURL,
                height: "100",
                width: "100"
            });
            $(matchDiv).prev().children("p").html(matchInfo[index].description);

            $(matchDiv).children("a").first()
                    .html("Go to Twitter")
                    .attr("href", "http://twitter.com/" + tHandle);
            $(matchDiv).children("p").first()
                    .html("<b>Top Mentions: </b>" + tweetInfo[index].mentions)
                    .next().html("<b>Top HashTags: </b>" + tweetInfo[index].hashtags)
                    .next().html("<b>Recent Tweets: </b>" + matchInfo[index].tweet_1);
            $(matchDiv).children("p").last().html("<b>Word Cloud</b>");
            var wordCloud = document.getElementById("wordCloud_" + index);
            wordCloud.setAttribute("class", "wordCloud");
            word_cloud_generator(wordCloud, tweetInfo[index]);
        });
    };
    word_cloud_generator = function (element, info) {

        var wordList = info.topWords.split(",");
        var counts = info.wordsCount.split(",").map(Number);
        var stdv = standardDeviation(counts);
        var color = d3.scale.linear()
                .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
                .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
        d3.layout.cloud().size([800, 300])
                .words(wordList.map(function (t, index) {
                    return {
                        text: t,
                        size: parseInt( 10*counts[index]/stdv + 5)
                    };
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
        var randNum = Math.floor(Math.random() * max + 1);
        return randNum;
    };
    
    // Standard Deviation by Derick Bailey.
    // http://derickbailey.com/2014/09/21/calculating-standard-deviation-with-array-map-and-array-reduce-in-javascript/
    standardDeviation = function (values) {
        var avg = average(values);

        var squareDiffs = values.map(function (value) {
            var diff = value - avg;
            var sqrDiff = diff * diff;
            return sqrDiff;
        });

        var avgSquareDiff = average(squareDiffs);

        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    };

    average = function (data) {
        var sum = data.reduce(function (sum, value) {
            return sum + value;
        }, 0);

        var avg = sum / data.length;
        return avg;
    };
});