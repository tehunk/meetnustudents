$(document).ready(function () {

    $("#matchForm").submit(function(event) {
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
        $("#loading").show();
    });

    show_response = function (json) {
        $("#loading").hide();
        $.each(json, function (index, matchJson) {
            var tHandle = matchJson.twitterHandle;
            var link = document.createElement("a");
            link.href = "https://twitter.com/"+tHandle;
            link.innerHTML = "Info of: @" + tHandle;
            $("#outputList").append(link);
            $("#outputList").append("<p>Words: " + matchJson.word +  "</p>");
        });
    };
    error_message = function () {
        alert("Failed");
    };
    
    random_generator = function (max) {
        randNum = Math.floor(Math.random()*max+1);
        return randNum;
    };
});