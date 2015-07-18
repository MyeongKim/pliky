import React from "react";
export default React.createClass({
    componentWillMount: function() {
        this.setState({data: this.props.data})
    },
    render : function(){
        var index = this.props.index.index;
        return (
            <div>
                <div className="csBlockquotes">
                    <p className="white-text center-align">{index+1+'번'}</p>
                    <p className="white-text center-align">사이즈 : {this.state.data.width[index]+' X '+this.state.data.height[index]}</p>
                    <p className="white-text center-align">가격 : {this.state.data.price[index]}</p>
                    <p className="white-text center-align">마감일 : {this.state.data.duedate[index]}</p>
                    <p className="white-text center-align">slot : {this.state.data.Slot[index] == undefined ? "empty" :this.state.data.Slot[index] }</p>
                    <p className="white-text center-align">설명 : {this.state.data.description[index]}</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="center-align">
                            <a href={"/file/"+this.state.data.imageId[index]} data-lightbox="image-1">
                                <img src={"/file/"+this.state.data.imageId[index]} width="300"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})