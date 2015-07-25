import React from "react";
import UserInfo from "./userInfo";
import RecentAct from "./recentAct";

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
                if(this.state.data._creator.follower.indexOf(userId) >= 0){
                    $('#followIcon').removeClass('fa-user-plus');
                    $('#followIcon').addClass('fa-user-times');
                }
                socket.emit('viewPlus',{csId : this.state.data._id});
                socket.emit('getCommentsId',{csId : this.state.data._id});
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
                e.preventDefault();
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

            followPlus : function(e) {
                e.preventDefault();
                if (userId == 'null') {
                    alert("로그인 해주세요.");
                } else {
                    if ($('#followIcon').is(".fa-user-plus")) {
                        $('#followIcon').removeClass('fa-user-plus');
                        $('#followIcon').addClass('fa-user-times');

                        //add creator to user's following
                        //add user to creator's follower
                        socket.emit('followPlus',{ creatorId : this.state.data._creator._id, userId: userId });
                        var newData = data;
                        newData._creator.follower.push(userId);
                        this.setState({data: newData});
                    } else {
                        $('#followIcon').removeClass('fa-user-times');
                        $('#followIcon').addClass('fa-user-plus');

                        //remove creator from user's following
                        //remove user from creator' follower
                        socket.emit('followMinus',{ creatorId : this.state.data._creator._id, userId: userId });
                        var newData = data;
                        var userIdIndex = this.state.data._creator.follower.indexOf(userId);
                        newData._creator.follower.splice(userIdIndex, 1);
                        this.setState({data: newData});
                    }
                }

            },
            render : function(){
                return (
                    <div>
                        <div className="col m4">
                            <div className="profileDivDiv grey darken-4 center-align z-depth-2">
                                <UserInfo data={this.state.data} followPlus={this.followPlus}/>
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

        var Commition = React.createClass({
            render : function(){
                var index = 0;
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col s12">
                                    <div className="row upperDiv">
                                        <Infos data={data}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {data.title.map(function(o,i) {
                            return <Item key={i} data={data} index={{index : i}} />
                        })}
                        <div id="commentButton" className="center-align">
                            <CommentBox data={data} />
                        </div>
                    </div>
                )
            }
        });

        React.render(<Commition />, document.getElementById('commitionPageContainer') );

        $('.modal-trigger').leanModal();
        $('.collapsible').collapsible({
            accordion : true
        });
    }
});
