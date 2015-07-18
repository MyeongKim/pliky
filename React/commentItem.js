import React from "react";
export default React.createClass({
    componentWillMount: function() {
        this.setState({data: this.props.data})

    },
    componentDidMount : function(){
        if(this.props.comment.finished){
            $('#commentFinishCheck'+this.props.comment._id).removeClass('grey-text');
            $('#commentFinishCheck'+this.props.comment._id).addClass('green-text');
            $('#creatorReplyBtn'+this.props.comment._id).text('수정하기').removeClass('black');

        } else{
            $('#collapsible-body'+this.props.comment._id).remove();
        }
    },
    setCommentId : function(){
        commentId = this.props.comment._id;
    },

    render : function(){
        return (
            <li key={this.props.comment._id}>
                <div className="collapsible-header">
                    <div className="row commentProfile">
                        <div className="col s1">
                            <div className="profileImg">
                                <img src="/images/meme.jpg" alt="" height="42px" className="left circle"/>
                            </div>
                            <div className="profileName grey-text">
                                <span>{this.props.comment.postedBy.nickname}</span>
                            </div>
                        </div>
                        <div className="col s8 commemtBody">
                            <span>{this.props.comment.comment}</span>
                        </div>
                        <div className="col s1 commentTime">
                            <span>{this.props.comment.createdDate}</span>
                        </div>
                        <div className="col s2">
                            <i id={'commentFinishCheck'+this.props.comment._id} className="material-icons grey-text right">done</i>
                            <button id={'creatorReplyBtn'+this.props.comment._id} data-target="reply" className="btn modal-trigger waves-effect waves-light black" style={{display : 'none'}} onClick={this.setCommentId}>답변달기</button>
                        </div>
                    </div>
                </div>
                <div id={'collapsible-body'+this.props.comment._id} className="collapsible-body grey lighten-3">
                    <div className="row commentProfile">
                        <div className="col s1">
                            <div className="profileImg">
                                <img src="/images/profile_siro.jpg" alt="" height="42px" className="left circle"/>
                            </div>
                            <div className="profileName grey-text">
                                <span>{this.props.creator}</span>
                            </div>
                        </div>
                        <div className="col s9">
                            <span className="red-text text-darken-3">{this.props.comment.reply}</span>
                        </div>
                        <div className="col s2"></div>
                    </div>
                </div>
            </li>

        );
    }
})