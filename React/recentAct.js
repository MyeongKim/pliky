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
                <div className="profieNoticeTitle right-align">
                    <span>최근 활동</span>
                </div>
                <table className="hoverable">
                    <tbody>
                        <tr>
                            <td>
                                <i className="Small material-icons">new_releases</i>
                            </td>
                            <td>
                                <strong className="text-darken-4">커미션이 진행중입니다.</strong>
                            </td>
                            <td> 지금</td>
                        </tr>
                        <tr>
                            <td>
                                <i className="Small material-icons">power_settings_new</i>
                            </td>
                            <td>
                                <span className="text-darken-4">"트위터"를 통해 가입한 회원입니다.</span>
                            </td>
                            <td> 10시간 전</td>
                        </tr>
                        <tr>
                            <td><i className="Small material-icons">perm_identity</i></td>
                            <td><span className="text-darken-4">프로필을 업데이트 했습니다.</span></td>
                            <td> 10시간 전</td>
                        </tr>
                        <tr>
                            <td>
                                <i className="Small material-icons">perm_media</i>
                            </td>
                            <td>
                                <span className="text-darken-4">일러스트를 새로 업데이트했습니다.</span>
                            </td>
                            <td> 7시간 전</td>
                        </tr>
                        <tr>
                            <td>
                                <i className="Small material-icons">perm_media</i>
                            </td>
                            <td>
                                <span className="text-darken-4">일러스트를 새로 업데이트했습니다.</span>
                            </td>
                            <td> 7시간 전</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
})