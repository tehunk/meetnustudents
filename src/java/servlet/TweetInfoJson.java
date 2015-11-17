/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet;

import org.json.JSONException;
import org.json.JSONObject;
import java.io.IOException;
/**
 *
 * @author TaeHun
 */
public class TweetInfoJson {
    
    public String getJsonData(String[] info) throws JSONException, IOException {

        JSONObject twInfo = new JSONObject();
        String jsonData;
        
        twInfo.put("hashtags", info[0]);
        twInfo.put("mentions", info[1]);
        twInfo.put("topWords", info[2]);
        twInfo.put("wordsCount", info[3]);

        //convert to String
        jsonData = twInfo.toString();
        System.out.println("JSON whole (MatchesJson.java): "+ jsonData);
        
        return jsonData;
    }
}
