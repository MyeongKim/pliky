import React from "react";
import CsInfo from "./csInfo";
import UserInfo from "./userInfo";
import Item from "./csItem";
$.ajax({
    url: $(location).attr('href'),
    dataType: 'json',
    context: this,
    success: function(data) {
        var Infos = React.createClass({
            getInitialState: function() {
                return {data : data};
            },

            loadData : function(index){
                //$.ajax({
                //    url: $(location).attr('href'),
                //    dataType: 'json',
                //    context: this,
                //    success: function(data) {
                //        this.setState({data: data});
                //    }.bind(this),
                //    error: function(xhr, status, err) {
                //        console.error(this.props.url, status, err.toString());
                //    }.bind(this)
                //});
            },
            heartPlus: function(e) {
                e.preventDefault();
                alert("sssss");
                var newData = data;
                newData.heart++;
                this.setState({data: newData});
            },
            render : function(){
                return (
                    <div>
                        <div className="col m4">
                            <div className="profileDivDiv grey darken-4 center-align z-depth-2">
                                <UserInfo data={this.state.data}/>
                            </div>
                        </div>
                        <div className="col m8">
                            <div className="profileNoticeDiv z-depth-1">
                                <CsInfo data={this.state.data} heartPlus={this.heartPlus}/>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        var index = 0;
        for( var i in data.title){
            React.render(<Item data={data} index={{index : index}} />, document.getElementsByClassName('Items')[index]);
            index++;
        }

        React.render(<Infos data={data}/>,document.getElementsByClassName('upperDiv')[0] )
    }
});
