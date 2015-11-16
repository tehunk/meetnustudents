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
public class GetIndividual extends HttpServlet {
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //Response setup
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        //Get the parameter (user twitter handle)
        String tHandle = request.getParameter("tHandle");
        
        WordCount wc = new WordCount();
        String results = wc.produceCount(tHandle);
        
        response.getWriter().write(results);
    }


}
