/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.json;

import java.io.IOException;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author TaeHun
 */
public class MatchInfoJson {
    /*
        Unlike the TweetInfoJson class, the single array method isn't called externally.
        Thus, it's set to private.
    */
    private String getJsonData(String[] info) throws JSONException, IOException {

        JSONObject mInfo = new JSONObject();
        String jsonData;

        mInfo.put("picURL", info[0]);
        mInfo.put("description", info[1]);
        mInfo.put("tweet_1", info[2]); //the number of tweets can vary.
        //mInfo.put("tweet_2", info[3]);
        //mInfo.put("tweet_3", info[4]);

        //convert to String
        jsonData = mInfo.toString();
        
        System.out.println("JSON each Info(MatchInfoJson.java): " + jsonData);
        return jsonData;
    }

    public String getJsonData(String[][] infos) throws JSONException, IOException {
        
        // construct a json array manually.
        String jsonData = "[";
        for (String[] i : infos) {
            String each = getJsonData(i);
            jsonData = jsonData + each + ",";
        }
        jsonData = jsonData.substring(0, jsonData.length() - 1) + "]";
        
        System.out.println("JSON array Info(MatchInfoJson.java): " + jsonData);
        return jsonData;
    }
}
