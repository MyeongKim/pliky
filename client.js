import React from "react";
import Greeting from "./greeting";
import Gacha from "./gacha";
//React.render(<Greeting name="world"/>, document.getElementsByClassName("content"));
//
$.ajax({
    url: 'http://localhost:3000',
    dataType: 'json',
    context: this,
    success: function(data) {
        for (var i = 1; i< 10 ; i++){
            var id = 'commitInfo'+(i);
            React.render(<Gacha data={data[i-1]} />, document.getElementById(id))
        }
    }
});

$('.autoplay').slick({
    dots: false,
    infinite : true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
});
