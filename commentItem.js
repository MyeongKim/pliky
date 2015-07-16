import React from "react";
export default React.createClass({

    getInitialState: function(){
        return {
        };
    },

    componentWillMount: function() {
        this.setState({data: this.props.data})
    },

    componentDidMount : function(){

    },

    render : function(){
        return (
            <li>
                <div className="collapsible-header">
                    <div className="row commentProfile">
                        <div className="col s1">
                            <div className="profileImg">
                                <img src="/images/meme.jpg" alt="" height="42px" className="left circle"/>
                            </div>
                            <div className="profileName grey-text">
                                <span>냥냥이</span>
                            </div>
                        </div>
                        <div className="col s8 commemtBody">
                            <span>질문이 있어요.</span>
                        </div>
                        <div className="col s1 commentTime">
                            <span>15/07/04 13:23:14</span>
                        </div>
                        <div className="col s2">
                            <i className="material-icons green-text right">done</i>
                        </div>
                    </div>
                </div>
                <div className="collapsible-body grey lighten-3">
                    <div className="row commentProfile">
                        <div className="col s1">
                            <div className="profileImg">
                                <img src="/images/profile_siro.jpg" alt="" height="42px" className="left circle"/>
                            </div>
                            <div className="profileName grey-text">
                                <span>냥냥이</span>
                            </div>
                        </div>
                        <div className="col s9">
                            <span className="red-text text-darken-3">답변입니다.</span>
                        </div>
                        <div className="col s2"></div>
                    </div>
                </div>
            </li>
        );
    }
})