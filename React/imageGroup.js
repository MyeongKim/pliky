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
                <ul className="tabs">
                    <li className="tab col s3">
                        <a href="#test1">외주작업</a>
                    </li>
                    <li className="tab col s3">
                        <a href="#test2">끄적끄적</a>
                    </li>
                    <li className="tab col s3">
                        <a href="#test3">낙서</a>
                    </li>
                </ul>
                <div id="test1" className="col s12">
                    <div className="row">
                        <div className="col s12 m12 l12 portfolio-holder">
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                        </div>
                        <div className="col s12 right-align portfolio-more"></div>
                    </div>
                </div>
                <div id="test2" className="col s12">
                    <div className="row">
                        <div className="col s12 m12 l12 portfolio-holder">
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                        </div>
                        <div className="col s12 right-align portfolio-more">
                            <a href="#">
                                <span>더보기</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div id="test3" className="col s12">
                    <div className="row">
                        <div className="col s12 m12 l12 portfolio-holder">
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                            <img src="http://labs.qnimate.com/portfolio-materialize/images/project.png" className="materialboxed"/>
                        </div>
                        <div className="col s12 right-align portfolio-more">
                            <a href="#">
                                <span>더보기</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
})