import React from "react";
import Greeting from "./greeting";
import Gacha from "./gacha";
//React.render(<Greeting name="world"/>, document.getElementsByClassName("content"));

$.ajax({
    url: 'http://localhost:3000',
    dataType: 'json',
    context: this,
    success: function(data) {
        console.log(data);
        for (var i = 1; i< 10 ; i++){
            var id = 'commitInfo'+(i);
            React.render(<Greeting name="world" data={data[i-1]} />, document.getElementById(id))
        }
    }
});


React.render(<Gacha />, document.getElementById('gacha'));