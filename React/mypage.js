import React from "react";
import UserInfo from "./userInfo";
import RecentAct from "./recentAct";
import RecentHistory from "./recentHistory";
import ImageGroup from "./imageGroup";
$.ajax({
    url: $(location).attr('href'),
    dataType: 'json',
    context: this,
    success: function(data) {
        var Mypage = React.createClass({

            getInitialState: function() {
                return {data : data};
            },
            componentDidMount : function(){
                //if(this.state.data.fans.indexOf(userId) >= 0) {
                //    clearInterval(heartIntervalId);
                //}
                //if(csAlarm.indexOf(this.state.data._id) >= 0){
                //    $('#alarmIcon').addClass("yellow-text");
                //}
                if(this.state.data.follower.indexOf(userId) >= 0){
                    $('#followIcon').removeClass('fa-user-plus');
                    $('#followIcon').addClass('fa-user-times');
                }
                //socket.emit('viewPlus',{csId : this.state.data._id});
                //socket.emit('getCommentsId',{csId : this.state.data._id});
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

            //heartPlus: function(e) {
            //    e.preventDefault();
            //    if (userId == 'null'){
            //        alert("로그인 해주세요.");
            //    }else if (this.state.data.fans.indexOf(userId) >= 0) {
            //        // cancel heartPlus
            //        var newData = data;
            //        var userIdIndex = this.state.data.fans.indexOf(userId);
            //        newData.fans.splice(userIdIndex, 1);
            //        this.setState({data: newData});
            //        socket.emit('cancelHeartPlus',{ csId : this.state.data._id, userId: userId });
            //
            //        heartIntervalId = setInterval(function(){
            //            $("#heartIcon").toggleClass("red-text");
            //        },1000);
            //    }else{
            //        var newData = data;
            //        newData.fans.push(userId);
            //        this.setState({data: newData});
            //        socket.emit('heartPlus',{ csId : this.state.data._id, userId: userId });
            //
            //        //stop animation
            //        clearInterval(heartIntervalId);
            //        $("#heartIcon").addClass("red-text");
            //    }
            //},

            //csAlarmPlus : function(e){
            //    e.preventDefault();
            //    if (userId == 'null'){
            //        alert("로그인 해주세요.");
            //    }else if (csAlarm.indexOf(this.state.data._id) >= 0) {
            //        // cancel Alarm
            //        socket.emit('cancelCsAlarmPlus',{ csId : this.state.data._id, userId: userId });
            //        $('#alarmIcon').removeClass("yellow-text");
            //        var csAlarmIndex = csAlarm.indexOf(this.state.data._id);
            //        csAlarm.splice(csAlarmIndex, 1);
            //    }else{
            //        socket.emit('csAlarmPlus',{ csId : this.state.data._id, userId: userId });
            //        $('#alarmIcon').addClass("yellow-text");
            //        csAlarm.push(this.state.data._id);
            //    }
            //},

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
                        socket.emit('followPlus',{ creatorId : this.state.data._id, userId: userId });
                        var newData = data;
                        newData.follower.push(userId);
                        this.setState({data: newData});
                    } else {
                        $('#followIcon').removeClass('fa-user-times');
                        $('#followIcon').addClass('fa-user-plus');

                        //remove creator from user's following
                        //remove user from creator' follower
                        socket.emit('followMinus',{ creatorId : this.state.data._id, userId: userId });
                        var newData = data;
                        var userIdIndex = this.state.data.follower.indexOf(userId);
                        newData.follower.splice(userIdIndex, 1);
                        this.setState({data: newData});
                    }
                }
            },
            render : function(){
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col s12">
                                    <div className="row upperDiv">
                                        <div className="col m4">
                                            <div className="profileDivDiv grey darken-4 center-align z-depth-2">
                                                <UserInfo data={this.state.data} followPlus={this.followPlus}/>
                                            </div>
                                        </div>
                                        <div className="col m8">
                                            <div className="profileNoticeDiv z-depth-1">
                                                <RecentAct data={this.state.data} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row downDiv">
                                        <div className="col s12">
                                            <RecentHistory data={this.state.data} />
                                            <div className="divider"></div>
                                            <ImageGroup data={this.state.data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="uploadImage" className="modal">
                            <div className="modal-content row">
                                <div className="input-field col s5">
                                    <select>
                                        <option value="" disabled="">그룹 선택</option>
                                        <option value="1">외주 작업</option>
                                        <option value="2">끄적끄적</option>
                                        <option value="3">낙서</option>
                                        <option value="4">미분류</option>
                                    </select>
                                    <label>그룹 선택</label>
                                </div>
                                <div className="file-field input-field col s7">
                                    <div className="btn grey darken-4">
                                        <span>파일 선택</span>
                                        <input type="file" multiple="multiple"/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input type="text" className="file-path"/>
                                    </div>
                                </div>
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea1">설명</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#!" className="modal-action modal-close waves-effect waves-green btn grey">업로드</a>
                            </div>
                        </div>
                        <div className="footer grey darken-4">
                            <div className="center-align">
                                <a href="#uploadImage" className="modal-trigger">
                                    <h5 className="white-text">그림 등록하기</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        });

        React.render(<Mypage />, document.getElementById('mypageContainer') );

        $('ul.tabs').tabs();
        $('.tabs').tabs('select_tab', 'test'+active);
        $('.commitHistory').slick({
            dots : false,
            infinite: true,
            slidesToShow: 35,
            slidesToScroll: 1,
            accessibility : true
        });
        $('.modal-trigger').leanModal();
        $('select').material_select();
    }
});
