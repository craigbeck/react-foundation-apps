var React = require('react');
var cx = require('react/lib/cx');
var PubSub = require('pubsub-js');
var Animation = require('./utils/animation');

var Panel = React.createClass({
  getInitialState: function () {
    return {open: false};
  },
  getDefaultProps: function () {
    return {
      position: 'left'
    };
  },
  componentDidMount: function () {
    PubSub.subscribe(this.props.id, function (msg, data) {
      if (data === 'open') {
        this.setState({open: true});
      } else if (data === 'close') {
        this.setState({open: false});
      } else if (data === 'toggle') {
        this.setState({open: !this.state.open});
      }
    }.bind(this));
  },
  render: function() {
    var classes = 'panel panel-' + this.props.position;
    if (this.props.className) {
      classes += ' ' + this.props.className;
    } 
    if(this.props.position === 'left') {
      animationIn  = this.props.animationIn || 'slideInRight';
      animationOut = this.props.animationOut || 'slideOutLeft';
    } else if (this.props.position === 'right') {
      animationIn  = this.props.animationIn || 'slideInLeft';
      animationOut = this.props.animationOut || 'slideOutRight';
    } else if (this.props.position === 'top') {
      animationIn  = this.props.animationIn || 'slideInDown';
      animationOut = this.props.animationOut || 'slideOutUp';
    } else if (this.props.position === 'bottom') {
      animationIn  = this.props.animationIn || 'slideInUp';
      animationOut = this.props.animationOut || 'slideOutBottom';
    }
    return (
      <Animation active={this.state.open} animationIn={animationIn} animationOut={animationOut}>
        <div className={classes}>
            {this.props.children}
        </div>
      </Animation>
    );
  },
});

module.exports = Panel;