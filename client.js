import React from "react";
import Greeting from "./greeting";
import Gacha from "./gacha";
$.ajax({
    url: 'http://localhost:3000',
    dataType: 'json',
    context: this,
    success: function(data) {

        // duedate string sorting function
        function mostEarlyDuedate(string){
            // only in case that year is 2015.
            var stringArray = string.split("2015,");
            // month sort
            var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            stringArray.sort(function(a,b){
                var aMonth = a.split(' ')[1];
                var bMonth = b.split(' ')[1];
                if (aMonth == bMonth){
                    return b.split(' ')[0] - a.split(' ')[0];
                }else {
                    return mL.indexOf(bMonth) - mL.indexOf(aMonth);
                }
            });
            return stringArray[0];
        }

        // newest time sorting
        function timeSort(data){
            data.sort(function(a,b){
                return b.fileTime - a.fileTime;
            });
            return data;
        }

        // heart sorting
        function heartSort(data){
            data.sort(function(a,b){
                return b.heart - a.heart;
            });
            return data;
        }

        // duedate sorting
        function duedateSort(data){
            data.sort(function(a,b){
                var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                var aMonth = mostEarlyDuedate(a.duedate).split(' ')[1];
                var bMonth = mostEarlyDuedate(b.duedate).split(' ')[1];
                if (aMonth == bMonth){
                    return mostEarlyDuedate(b.duedate).split(' ')[0] - mostEarlyDuedate(a.duedate).split(' ')[0];
                }else {
                    return mL.indexOf(bMonth) - mL.indexOf(aMonth);
                }
            });
            return data;
        }

        var heartData = heartSort(data);
        var timeData = timeSort(data);
        var duedateData = duedateSort(data);

        for (var i = 1; i< 10 ; i++){
            var heartCommit = 'heartCommit'+(i);
            var newCommit = 'newCommit'+(i);
            var dueCommit = 'dueCommit'+(i);
            React.render(<Gacha data={heartData[i-1]} />, document.getElementById(heartCommit))
            React.render(<Gacha data={timeData[i-1]} />, document.getElementById(newCommit))
            React.render(<Gacha data={duedateData[i-1]} />, document.getElementById(dueCommit))
        }

        $('.autoplay').slick({
            dots: false,
            infinite : true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
        });

        // carousel hover effect
        $('.autoplay').mouseenter(function(){
            //$('.autoplay').slick('slickPause');
            $(this).slick('slickPause');
        }).mouseleave(function(){
            $('.autoplay').slick('slickPlay');
        });
    }
});
