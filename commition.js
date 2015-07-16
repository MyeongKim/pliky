import React from "react";
import CsInfo from "./csInfo";
import UserInfo from "./userInfo";
import Item from "./csItem";
$.ajax({
    url: $(location).attr('href'),
    dataType: 'json',
    context: this,
    success: function(data) {
        var Infos = React.createClass({
            getInitialState: function() {
                return {data : data};
            },

            componentDidMount : function(){
                if(this.state.data.fans.indexOf(userId) >= 0) {
                    clearInterval(heartIntervalId);
                }
                if(csAlarm.indexOf(this.state.data._id) >= 0){
                    $('#alarmIcon').addClass("yellow-text");
                }
                socket.emit('viewPlus',{csId : this.state.data._id});
            },

            loadData : function(){
                $.ajax({
                    url: $(location).attr('href'),
                    dataType: 'json',
                    context: this,
                    success: function(data) {
                        this.setState({data: data});
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            },

            heartPlus: function(e) {
                e.preventDefault();
                if (userId == 'null'){
                    alert("로그인 해주세요.");
                }else if (this.state.data.fans.indexOf(userId) >= 0) {
                    // cancel heartPlus
                    var newData = data;
                    var userIdIndex = this.state.data.fans.indexOf(userId);
                    newData.fans.splice(userIdIndex, 1);
                    this.setState({data: newData});
                    socket.emit('cancelHeartPlus',{ csId : this.state.data._id, userId: userId });

                    heartIntervalId = setInterval(function(){
                        $("#heartIcon").toggleClass("red-text");
                    },1000);
                }else{
                    var newData = data;
                    newData.fans.push(userId);
                    this.setState({data: newData});
                    socket.emit('heartPlus',{ csId : this.state.data._id, userId: userId });

                    //stop animation
                    clearInterval(heartIntervalId);
                    $("#heartIcon").addClass("red-text");
                }
            },

            csAlarmPlus : function(e){

                if (userId == 'null'){
                    alert("로그인 해주세요.");
                }else if (csAlarm.indexOf(this.state.data._id) >= 0) {
                    // cancel Alarm
                    socket.emit('cancelCsAlarmPlus',{ csId : this.state.data._id, userId: userId });
                    $('#alarmIcon').removeClass("yellow-text");
                    var csAlarmIndex = csAlarm.indexOf(this.state.data._id);
                    csAlarm.splice(csAlarmIndex, 1);
                }else{
                    socket.emit('csAlarmPlus',{ csId : this.state.data._id, userId: userId });
                    $('#alarmIcon').addClass("yellow-text");
                    csAlarm.push(this.state.data._id);
                }
            },
            render : function(){
                return (
                    <div>
                        <div className="col m4">
                            <div className="profileDivDiv grey darken-4 center-align z-depth-2">
                                <UserInfo data={this.state.data}/>
                            </div>
                        </div>
                        <div className="col m8">
                            <div className="profileNoticeDiv z-depth-1">
                                <CsInfo data={this.state.data} heartPlus={this.heartPlus} csAlarmPlus={this.csAlarmPlus}/>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        var index = 0;
        for( var i in data.title){
            React.render(<Item data={data} index={{index : index}} />, document.getElementsByClassName('Items')[index]);
            index++;
        }

        React.render(<Infos data={data}/>,document.getElementsByClassName('upperDiv')[0] )
    }
});
