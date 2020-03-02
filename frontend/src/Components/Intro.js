import React, { PureComponent } from 'react';

import { script } from './Scripts/IntroScript';

class Intro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        styles: [],
        text: [],
      },
      showButton: false,
      index: 0,
    }
    this.buttonText = "No";
    this.showInterval = null;
  }

  componentDidMount() {
    let styles = [], text = [];

    for (let item of script[0]) {
      styles.push({ visibility: 'hidden', opacity: 0 });
      text.push(item);
    }

    this.setState({ content: { styles, text } });

    this.showInterval = setInterval(() => {
      console.log(this.state.index, script[0].length)
      if (this.state.index === script[0].length) {
        this.setState({ showButton: true });
        clearInterval(this.showInterval);
      }
      else {
        let newStyles = this.state.content.styles.slice();
        newStyles[this.state.index] = { visibility: 'visible', opacity: 1 };
        this.setState({ content: { ...this.state.content, styles: newStyles }, index: this.state.index + 1 });
      }
    }, 3500);
  }

  start = () => {
    this.setState({ showButton: false });
  }

  changeButton = (enter) => {
    console.log(enter)
    this.buttonText = enter ? "YES" : "No";
    this.forceUpdate();
  }

  render() {
    return (
      <div className="kam-intro">
        <div className="kam-intro-text">
          {this.state.content.text.map((item, i) => <span key={i} className="kam-intro-text-content" style={this.state.content.styles[i]}>{item}</span>)}
        </div>
        <div className="kam-intro-button" style={this.state.showButton ? { visibility: 'visible', opacity: 1 } : { visibility: 'hidden', opacity: 0 }}>
          <button className={`kam-intro-button-btn ${this.buttonText.toLowerCase()}`} onClick={this.start} onMouseEnter={() => this.changeButton(true)} onMouseLeave={() => this.changeButton(false)}>{this.buttonText}</button>
          <button className="kam-intro-button-btn yes" onClick={this.start}>YES</button>
        </div>
      </div>
    )
  }
}

export default Intro