/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

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
        
        //Search the match using lucene. The return is 2D String array:
        //{{"twitter_handle1", "word1, word2..."}, {"twitter_handle2", "word1, word2..."}, .... }
        //i.e. String[][0] -> twitter handle,   String[][1] -> list of matching words
        //String[][] matches = {{"NUalphachi", "patten, everyone"}, {"NU_Triathlon", "collegiate, strong"}};
        LuceneNew lucene = new LuceneNew();    
        String[][] matches = lucene.search(tHandle);

        String[] match = new String[matches.length];
        for(int i=0; i<matches.length; i++) {
            match[i] = matches[i][0];
        }
        
        //Search the information of a user information and other match information
        WordCount wc = new WordCount();
        
        String[] myInfo = wc.produceCount(tHandle);
        
        String[][] matchInfo = new String[matches.length][];
        for (int i=0; i<match.length; i++) {
            matchInfo[i] = wc.produceCount(match[i]);
        }
        
        //Convert the 2d String array to one JSON String.
        MatchesJson matchJson = new MatchesJson();
        String matchData = matchJson.getJsonData(matches);
        
        TweetInfoJson json = new TweetInfoJson();
        String first = json.getJsonData(myInfo);
        String second = json.getJasonData(matchInfo);
        
        String data = "[{ \"match\": " + matchData + "}," + first + ", { \"matchInfo\": " + second + "}]";
        
        System.out.println("JSON out (GetMatch.java): " + data);
        
        //Return the ajax call
        response.getWriter().write(data);
    }
}