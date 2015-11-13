/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
import java.util.Arrays;

/**
 *
 * @author TaeHun
 */
public class MatchesJson {

    public String getJsonData(String[][] userTHandle) throws JSONException, IOException {

        JSONObject jMatch;
        JSONArray TopMatches = new JSONArray();
        String jsonData;
        
        //the argument userTHandle is 2D String array:
        //{{"twitter_handle1", "word1, word2..."}, {"twitter_handle2", "word1, word2..."}, .... }
        //Loop through each String[] and assign to JSONObject and collect all in JSONArray
        for (String[] match : userTHandle) {
            System.out.println("JSON each (MatchesJson.java): " + Arrays.toString(match));
            jMatch = new JSONObject();
            jMatch.put("twitterHandle", match[0]);
            jMatch.put("word", match[1]);
            TopMatches.put(jMatch);
        }
        //convert to String
        jsonData = TopMatches.toString();
        System.out.println("JSON whole (MatchesJson.java): "+ jsonData);
        
        return jsonData;
    }
}
