import React, { Component } from 'react';
import PropTypes from 'prop-types';


class AffixWrapper extends Component{


    static propTypes = {
        offset: PropTypes.number,
    };
    static defaultProps = {
        offset: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            affix: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        var affix = this.state.affix;
        var offset = this.props.offset;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (!affix && scrollTop >= offset) {
            this.setState({
                affix: true
            });
        }

        if (affix && scrollTop < offset) {
            this.setState({
                affix: false
            });
        }
    };

    render() {
        var affix = this.state.affix ? 'fixed-top' : '';
        var {className, offset, ...props} = this.props;
    
        return (
          <div {...props} className={className + ' ' + affix}>
            {this.props.children}
          </div>
        );
      }
}

export default AffixWrapper;

