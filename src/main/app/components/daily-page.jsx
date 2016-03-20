import React from 'react';
import request from 'superagent/lib/client';
import VideoBox from './video-box';

const DailyPage = React.createClass({

    getInitialState() {
        return {
            videoNumber: 1,
            videoConstList: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
    },


    componentWillMount() {
        let _page = this;
        if (this.props.params.number) {
            //console.log(this.props.params.number);
            this.state.videoNumber = parseInt(this.props.params.number);
        }

        request.get('constVideoList')
            .end(function(err, res) {
                //console.log(res);
                let _data = JSON.parse(res.text);
                if (_data.data) {
                    // console.log(_data.data[0]);

                    _page.setState({
                        videoConstList: _data.data
                    });
                }
            });


    },

    render() {
        return (
            <VideoBox videoBoxWidth={this.state.width} videoBoxHeight={this.state.height} videoConstList={this.state.videoConstList}  videoNumber={this.state.videoNumber} />
            );
    },

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },


    handleResize(e) {
        this.setState({
            width: window.innerWidth
        });
        this.setState({
            height: window.innerHeight
        });
    }

});

export default DailyPage;
