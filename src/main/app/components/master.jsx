import React from 'react';

const Master = React.createClass({

    propTypes: {
        children: React.PropTypes.node
    // history: React.PropTypes.object,
    //location: React.PropTypes.object
    },

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    childContextTypes: {
        router: React.PropTypes.object
    },

    getChildContext() {
        return {
            router: this.context.router
        };
    },


    render() {
        return (
            <div>{this.props.children}</div>
            );
    }



});

export default Master;
