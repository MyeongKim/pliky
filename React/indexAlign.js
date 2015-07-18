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
        var nickname = this.state.data._creator.nickname;

        return (
            <div>
            <div className="autoplay">
                <div>
                    <a href={"file/"+this.state.data.imageId[0]} data-lightbox="image-1">
                        <img src={"file/"+this.state.data.imageId[0]} width="650"/>
                    </a>
                </div>
                <div>
                    <a href={"file/"+this.state.data.imageId[1]} data-lightbox="image-1">
                        <img src={"file/"+this.state.data.imageId[1]} width="650"/>
                    </a>
                </div>
            </div>
            <div className="profileInfo black-text grey lighten-3">
                <img src="images/profile_siro.jpg" alt="" height="30px" className="circle"/>
                <div className="infoText grey-text text-darken-1">
                    <a href={"/mypage/"+nickname} className="blue-text text-darken-1">{nickname}</a>
                </div>
                <a href={"/cs/"+this.state.data._id} className="right blue-text text-darken-1">more</a>
                <div className="infoText right grey-text text-darken-1">
                    <i className="fa fa-eye"></i>
                    <div style={{display: 'inline'}}>
                        <span>{this.state.data.viewNum}</span>
                    </div>
                    <i className="fa fa-heartbeat"></i>
                    <span>{this.state.data.fans.length}</span>
                </div>
            </div>
            </div>
        );
    }
})