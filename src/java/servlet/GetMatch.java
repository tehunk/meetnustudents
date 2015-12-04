/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import servlet.json.MatchesJson;
import servlet.json.TweetInfoJson;
import servlet.json.MatchInfoJson;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author TaeHun
 */
public class GetMatch extends HttpServlet {

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //Response setup
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        //Get the parameter (user twitter handle)
        String tHandle = request.getParameter("tHandle");

        /**
         * *********************************************************************
         * Lucene: retrieves matching Twitters and their matching words. The
         * return is String[][] containing: [["twitter_handle1", "word1,
         * word2..."], ["twitter_handle2", "word1, word2..."], .... ] i.e.
         * String[][0] -> twitter handle, String[][1] -> list of matching words
         * String[][] matches = [["NUalphachi", "patten, everyone"],
         * ["NU_Triathlon", "collegiate, strong"]];
        **********************************************************************
         */
        Lucene lucene = new Lucene();
        String[][] matches = lucene.search(tHandle);

        int NUM_OF_MATCH = matches.length; // 6 (5 top + 1 bad)

        //It is conveient to have a separate array containing only twitter names.
        String[] match = new String[NUM_OF_MATCH];
        for (int i = 0; i < NUM_OF_MATCH; i++) {
            match[i] = matches[i][0];
        }

        /**
         * *********************************************************************
         * WordCount: retrieves top hasthags, mentions, words, and word counts.
         * The return is String[] containing: ["Top Hashtags", "Top mentions",
         * "Top 50 Words", "Counts of 50 words"]
        **********************************************************************
         */
        WordCount wc = new WordCount();//Search the information of user and match.
        //Regardless of user's availability in the database, the user always creates a separate temp_user_file in the database.
        String[] myInfo = wc.produceCount("temp_user_file");//myInfo: the user info.
        String[][] tweetInfo = new String[NUM_OF_MATCH][];  //tweetInfo: the matching info.
        for (int i = 0; i < NUM_OF_MATCH; i++) {
            tweetInfo[i] = wc.produceCount(match[i]);
        }

        /**
         * *********************************************************************
         * MostFavoritedTweets: retrieves Twitter profile picture URL,
         * description, and recent tweets. The return is String[] containing:
         * ["pictureURL", "description", "tweet_1", "tweet_2", ... ]
        **********************************************************************
         */
        MostFavoritedTweets mft = new MostFavoritedTweets();
        String[][] matchInfo = new String[NUM_OF_MATCH][];
        //List<List<String>> matchInfo = new ArrayList<List<String>>();
        for (int i = 0; i < NUM_OF_MATCH; i++) {
            matchInfo[i] = mft.getTwitterInfo(
                    ("temp_user_file".equals(match[i])) ? tHandle : match[i]);
        }

        /**
         * *********************************************************************
         * Convert the 2d String array to one JSON String. For the specific json
         * format, refer each JSON class.
        **********************************************************************
         */
        MatchesJson matchesJson = new MatchesJson();
        TweetInfoJson tweetJson = new TweetInfoJson();
        MatchInfoJson matchJson = new MatchInfoJson();

        String zeroth = matchesJson.getJsonData(matches).replace("temp_user_file", tHandle);
        //the user might match with the user himself under the name "temp_user".
        String first = tweetJson.getJsonData(myInfo);
        String second = tweetJson.getJsonData(tweetInfo);
        String third = matchJson.getJsonData(matchInfo);

        //The json format can be simpler than this.
        String data = "[{ \"match\":" + zeroth + "},"
                + first + ","
                + "{ \"tweetInfo\":" + second + "},"
                + "{ \"matchInfo\":" + third + "}]";

        System.out.println("JSON out (GetMatch.java): " + data);

        //Return the ajax call
        response.getWriter().write(data);
    }
}
