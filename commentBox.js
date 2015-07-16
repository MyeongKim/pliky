/**
 * Created by nuko on 2015. 7. 16..
 */
import React from "react";
import CommentItem from './commentItem';
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
                <a href="#showComment" className="waves-effect waves-light btn modal-trigger grey darken-4">댓글 보기</a>
                <a href="#newComment" className="waves-effect waves-light btn modal-trigger grey darken-4">댓글 작성</a>
                <div id="showComment" className="modal bottom-sheet">
                    <div className="modal-content">
                        <ul data-collapsible="accordion" className="collapsible"></ul>
                            <CommentItem />
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
                        <a href="#!" className="modal-action waves-effect black waves-light btn">작성</a>
                        <a href="#!" className="modal-action modal-close waves-effect black waves-light btn">취소</a>
                    </div>
                </div>
            </div>
        );
    }
})