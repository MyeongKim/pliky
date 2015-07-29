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
        var obj = this.props.data._creator;
        if (obj == undefined){
            obj = this.props.data;
        }
        return (
            <div>
                <h5 style={{"marginTop" : 0, "paddingTop": 10}} className="white-text">{obj.nickname }</h5>
                <img src="/images/profile_siro.jpg" style={{"width":100, "height":100}} className="circle"/>
                <p className="white-text text-darken-4"> {obj.selfDesc == "" ? "자기소개가 없습니다." : obj.selfDesc}
                    <div className="row profileLinks">
                        <div className="col s4 center-align">
                            <a href="" className="white-text">팔로잉
                                <p>{obj.following.length}</p>
                            </a>
                        </div>
                        <div className="col s4 center-align">
                            <a href="" className="white-text">팔로워
                                <p>{obj.follower.length}</p>
                            </a>
                        </div>
                        <div className="col s4 center-align">
                            <a href="#" onClick={this.props.followPlus}>
                                <i id="followIcon" className="small fa fa-user-plus blue-text"></i>
                            </a>
                        </div>
                    </div>
                </p>
            </div>
        );
    }
})