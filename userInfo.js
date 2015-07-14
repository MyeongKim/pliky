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
            <div>
                <h5 style={{"marginTop" : 0, "paddingTop": 10}} className="white-text">{this.props.data._creator.nickname}</h5>
                <img src="/images/profile_siro.jpg" style={{"width":100, "height":100}} className="circle"/>
                <p className="white-text text-darken-4"> {this.props.data._creator.selfDesc == "" ? "자기소개가 없습니다." : this.props.data._creator.selfDesc}
                    <div className="row profileLinks">
                        <div className="col s4 center-align">
                            <a href="" className="white-text">팔로잉
                                <p>{this.props.data._creator.following.length}</p>
                            </a>
                        </div>
                        <div className="col s4 center-align">
                            <a href="" className="white-text">팔로워
                                <p>{this.props.data._creator.follower.length}</p>
                            </a>
                        </div>
                        <div className="col s4 center-align">
                            <a href="#">
                                <i className="small fa fa-user-plus green-text"></i>
                            </a>
                        </div>
                    </div>
                </p>
            </div>
        );
    }
})