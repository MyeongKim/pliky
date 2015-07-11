import React from "react";
import Greeting from "./greeting";
import Gacha from "./gacha";

$.ajax({
    url: 'http://localhost:3000',
    dataType: 'json',
    context: this,
    success: function(data) {

        // duedate string sorting function
        function mostEarlyDuedate(array){
            // only in case that year is 2015.
            // month sort
            var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var result = array.sort(function(a,b){
                var aMonth = a.match(/([A-Z]\w+)/g)[0];
                var bMonth = b.match(/([A-Z]\w+)/g)[0];
                if (aMonth == bMonth){
                    return a.match(/(\d+)\s/g) - b.match(/(\d+)\s/g);
                }else {
                    return mL.indexOf(aMonth) - mL.indexOf(bMonth);
                }
            });
            return result[0];
        }

        // newest time sorting
        function timeSort(data){
            var data = data.sort(function(a,b){
                return b.fileTime - a.fileTime;
            });
            return data;
        }

        // heart sorting
        function heartSort(data){
            var data = data.sort(function(a,b){
                return b.heart - a.heart;
            });
            return data;
        }

        // duedate sorting
        function duedateSort(data){
            var result = data.sort(function(a,b){
                var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var aMonth = mostEarlyDuedate(a.duedate).match(/([A-Z]\w+)/g)[0];
                var bMonth = mostEarlyDuedate(b.duedate).match(/([A-Z]\w+)/g)[0];
                if (aMonth == bMonth){
                    return mostEarlyDuedate(a.duedate).match(/(\d+)\s/g) - mostEarlyDuedate(b.duedate).match(/(\d+)\s/g)
                }else {
                    return mL.indexOf(aMonth) - mL.indexOf(bMonth);
                }
            });
            return result;
        }

        var heartData = heartSort(data);
        var timeData = timeSort(data);
        var duedateData = duedateSort(data);
        console.log(duedateData);
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
