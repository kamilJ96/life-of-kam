import React, { PureComponent } from 'react';

export default class Navbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        justifySelf: 'right',
        width: '100%',
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ style: { ...this.state.style, width: 0 } });
      setInterval(() => {
        let newStyle = { ...this.state.style };
        if (newStyle.justifySelf === 'right' && newStyle.width === 0) {
          newStyle.justifySelf = 'left';
          newStyle.width = '100%';
        }
        else if (newStyle.justifySelf === 'left' && newStyle.width === '100%') {
          newStyle.justifySelf = 'right';
          newStyle.width = 0;
        }
        this.setState({ style: newStyle });
      }, 20000)
    }, 100)
  }
  
  render() {
    return (
      <div className="kam-navbar">
        <span>Kamil Jakrzewski</span>
        <div className="kam-navbar-line" style={{ ...this.state.style }}></div>
      </div>
    )
  }
}