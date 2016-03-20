import React from 'react';

import VideoBox from './video-box';

const VideoPage = React.createClass({

    getInitialState() {
        return {
            videoNumber: 3,
            videoConstList: [],
            width: window.innerWidth,
            height: window.innerHeight
        };
    },


    componentWillMount() {
        if (this.props.params.number) {
            //console.log(this.props.params.number);
            this.state.videoNumber = parseInt(this.props.params.number);
        }

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

export default VideoPage;
