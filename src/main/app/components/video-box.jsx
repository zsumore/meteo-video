import React from 'react';

import request from 'superagent/lib/client';


const VideoBox = React.createClass({

    propTypes: {
        videoConstList: React.PropTypes.array.isRequired,
        videoNumber: React.PropTypes.number.isRequired,
        videoBoxWidth: React.PropTypes.number.isRequired,
        videoBoxHeight: React.PropTypes.number.isRequired
    },

    getInitialState() {
        return {
            videoIndex: 0,
            videoList: [],
            videoCombinList: []
        };
    },



    render() {
        return (
            <video id='fsvideo' controls='controls' width={this.props.videoBoxWidth} height={this.props.videoBoxHeight} autoPlay='autoplay' >
        
         Your browser does not support the video tag.
        </video>);
    },


    componentDidMount() {
        const fsVideo = document.getElementById('fsvideo'); //获取video元素
        //fsVideo.addEventListener('canplay', this.handleVideoCanplay);
        fsVideo.addEventListener('ended', this.handleVideoEnded);
        fsVideo.addEventListener('error', this.handleVideoError);

        this.handleChangePlayList();
    },



    componentWillUnmount() {
        const fsVideo = document.getElementById('fsvideo');

        //fsVideo.removeEventListener('canplay', this.handleVideoCanplay);
        fsVideo.removeEventListener('ended', this.handleVideoEnded);
        fsVideo.removeEventListener('error', this.handleVideoError);
    },

    handleVideoEnded() {
        this.handleChangePlayList();
    },

    handleVideoError() {
        console.log('Player Error');
        this.playNext();

    },

    handleChangePlayList() {
        const _page = this;

        request.get('dailyVideoList')
            .end(function(err, res) {
                //console.log(res);
                let _data = JSON.parse(res.text);
                if (_page.state.videoList[0] == _data.data[0]) {
                    // console.log(_data.data[0]);
                    console.log('Play List No Change.');
                } else {
                    _page.state.videoList = _data.data;
                    _page.state.videoCombinList = _page.genVideoCombinList();
                    _page.state.videoIndex = 0;
                }

                _page.playNext();

            });


    },

    playNext() {

        if (this.state.videoCombinList.length > 0) {

            const fsVideo = document.getElementById('fsvideo');
            if (this.state.videoIndex >= this.state.videoCombinList.length) {
                this.state.videoIndex = 0; // 播放完了，重新播放
            }

            console.log(this.state.videoCombinList[this.state.videoIndex]);
            fsVideo.src = this.state.videoCombinList[this.state.videoIndex];
            //fsVideo.load(); // 如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
            //fsVideo.play();

            let curr = this.state.videoIndex + 1;
            if (curr >= this.state.videoCombinList.length) {
                curr = 0; // 播放完了，重新播放
            }
            this.state.videoIndex = curr;
        } else {
            console.log('videoCombinList is empty');
        }
    },

    genVideoCombinList() {
        let tempArray = [];

        if (this.props.videoConstList) {
            tempArray = tempArray.concat(this.props.videoConstList);
        }

        if (this.state.videoList) {
            // console.log(this.state.videoList.length);
            if (this.props.videoNumber > this.state.videoList.length) {
                tempArray = tempArray.concat(this.state.videoList);
            } else {
                // console.log(this.state.videoList.slice(0, this.props.videoNumber));
                tempArray = tempArray.concat(this.state.videoList.slice(0, this.props.videoNumber));
            }
        }

        // console.log(tempArray);

        return tempArray;


    }
});

export default VideoBox;
