<%-- 
    Document   : index
    Created on : Nov 2, 2015, 3:04:31 PM
    Author     : TaeHun
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <meta charset="UTF-8"> 
    <head>
        <title> Find an NU Student</title>
        <link rel="stylesheet" type="text/css" href="main.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="main.js"></script>
        <script src="http://d3js.org/d3.v3.min.js"></script>
        <script src="d3.layout.cloud.js"></script>
    </head>

    <body>
        <header class="title">
            <h1>Find an NU Student <img src="twitter-xxl.png" style="height:60px;"></h1></header>
        <section id="input">
            <form id="matchForm">
                <p class = "formMargin">
                    <span class="formSize">Your Twitter Handle: @</span>
                    <input name="tHandle" class="formSize" type="text">
                </p>
                <p class = "formMargin">
                    <input class="formSize" type="submit" value="Find Your Matches!">
                </p>
            </form>
        </section>
        <section id="output">
            <div id="myInfo">
                <h2>My Twitter</h2>
                <p class="loading">Loading......</p>
                <div class="left_padding" style="display: block">
                    <p id="myTopMentions"></p>
                    <p id="myTopHashtags"></p>
                    <p id="myTopWords"></p>
                    <div id="myWordCloud" class="wordCloud"></div>
                </div>
            </div>
            <div id="top_match">
                <hr>
                <h2>Top Matches</h2>
                <p class="loading">Loading......</p>
                <div id="outputList">
                    <h3 class="expandable"></h3>
                    <div id="match_0" class="left_padding">
                        <p></p><p></p><p></p>
                    </div>
                    <h3 class="expandable"></h3>
                    <div id="match_1" class="left_padding">
                        <p></p><p></p><p></p>
                    </div>
                    <h3 class="expandable"></h3>
                    <div id="match_2" class="left_padding">
                        <p></p><p></p><p></p>
                    </div>
                    <h3 class="expandable"></h3>
                    <div id="match_3" class="left_padding">
                        <p></p><p></p><p></p>
                    </div>
                    <h3 class="expandable"></h3>
                    <div id="match_4" class="left_padding">
                        <p></p><p></p><p></p>
                    </div>
                </div>
            </div>
            <button id="back" class="formSize">Back</button>
        </section>

    </body>
</html>
