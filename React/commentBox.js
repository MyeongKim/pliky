/**
 * Created by nuko on 2015. 7. 16..
 */
import React from "react";
import CommentItem from './commentItem';
export default React.createClass({
    componentWillMount: function() {
        this.setState({data: this.props.data})
    },

    componentDidMount : function(){
        //comment reply button display setting
        if(userId == this.props.data._creator._id){
            $('[id^=commentFinishCheck]').css('display','none');
            $('[id^=creatorReplyBtn]').css('display','inline');
        }
    },
    postComment : function(e){
        e.preventDefault();
        if (userId == 'null') {
            alert("로그인 해주세요.");
        } else {
            var comment = $('#textarea1').val();
            socket.emit('newComment',{ csId : this.state.data._id, userId: userId , comment : comment});
            alert('댓글이 등록되었습니다.');
            $('#newComment').closeModal();
            $('#textarea1').val('');
            window.location.reload();
        }
    },
    postReply : function(e){
        e.preventDefault();
        if (userId == 'null') {
            alert("로그인 해주세요.");
        } else {
            var reply = $('#textarea2').val();
            socket.emit('newReply',{ csId : this.state.data._id, commentId: commentId , reply : reply});
            alert('답변이 등록되었습니다.');
            $('#reply').closeModal();
            $('#textarea2').val('');
            window.location.reload();
        }
    },

    render : function(){
        var comments = this.props.data.comments;
        var creator = this.props.data._creator.nickname;
        return (
            <div>
                <a href="#showComment" className="waves-effect waves-light btn modal-trigger grey darken-4">댓글 보기</a>
                <a href="#newComment" className="waves-effect waves-light btn modal-trigger grey darken-4">댓글 작성</a>
                <div id="showComment" className="modal bottom-sheet">
                    <div className="modal-content">
                        <ul data-collapsible="accordion" className="collapsible">
                            {comments.map(function(comment) {
                                return <CommentItem key={comment._id} comment={comment} creator={creator}/>
                            })}
                        </ul>
                    </div>
                </div>
                <div id="newComment" className="modal">
                    <div className="modal-content">
                        <div className="container">
                            <i className="large material-icons center-align">comment</i>
                            <form className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea1">Textarea</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action waves-effect black waves-light btn" onClick={this.postComment}>작성</a>
                        <a href="#!" className="modal-action modal-close waves-effect black waves-light btn">취소</a>
                    </div>
                </div>
                <div id="reply" className="modal">
                    <div className="modal-content">
                        <div className="container">
                            <i className="large material-icons center-align">comment</i>
                            <form className="row">
                                <div className="input-field col s12">
                                    <textarea id="textarea2" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea2">Textarea</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-action waves-effect black waves-light btn" onClick={this.postReply}>작성</a>
                        <a href="#!" className="modal-action modal-close waves-effect black waves-light btn">취소</a>
                    </div>
                </div>
            </div>
        );
    }
})