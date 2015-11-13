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
        LuceneNew lucene = new LuceneNew();    
        String[][] matches = lucene.search(tHandle);
        
        //Convert the 2d String array to one JSON String.
        MatchesJson json = new MatchesJson();
        String data = json.getJsonData(matches);
        
        //Return the ajax call
        response.getWriter().write(data);
    }
}