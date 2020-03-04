import React, { PureComponent } from 'react';

import { script } from './Scripts/IntroScript';

class Intro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: { styles: [], text: [], },
      extraContent: { styles: [], text: [] },
      showButton: false,
      index: 1,
      buttonText: "No",
      renderButton: true,
    }
    this.showInterval = null;
  }

  componentDidMount() {
    let styles = [], text = [];

    for (let item of script[0]) {
      styles.push({ visibility: 'hidden', opacity: 0 });
      text.push(item);
    }

    this.setState({ content: { styles, text } });

    setTimeout(() => {
      this.showText('content', 0, true);

      this.showInterval = setInterval(() => {
        if (this.state.index === script[0].length) {
          this.setState({ showButton: true });
          clearInterval(this.showInterval);
        }
        else {
          this.showText('content', this.state.index, true);
          this.setState({ index: this.state.index + 1 });
        }
      }, 3500);
    }, 1000);
  }

  start = () => {
    let styles = [];
    let text = script[1].map((item, i) => {
      styles.push({ visibility: 'hidden', opacity: 0 });
      return item;
    });
    this.setState({ showButton: false, extraContent: { styles, text } });
    setTimeout(() => this.setState({ renderButton: false, index: 0 }), 800);
    setTimeout(() => this.showText('extraContent', 0, true), 1000);
    setTimeout(() => {
      this.showText('extraContent', 1, true);
      this.showInterval = setInterval(() => {
        let index = this.state.index;
        if (index === this.state.content.text.length + this.state.extraContent.text.length) {
          clearInterval(this.showInterval);
          return;
        }
        else if (index < this.state.content.text.length)
          this.showText('content', index, false)
        else
          this.showText('extraContent', index - this.state.content.text.length, false);

        index++;
        this.setState({ index });
      }, 500);
    }, 3500);
  }

  changeButton = (enter) => {
    this.setState({ buttonText: enter ? "YES" : "No" });
  }

  showText = (key, index, show) => {
    let newStyles = this.state[key].styles.slice();
    newStyles[index] = { visibility: 'visible', opacity: show ? 1 : 0 };
    this.setState({ [key]: { ...this.state[key], styles: newStyles } });
  }

  render() {
    return (
      <div className="kam-intro">
        <div className="kam-intro-text">
          {this.state.content.text.map((item, i) => <span key={i} className="kam-intro-text-content" style={this.state.content.styles[i]}>{item}</span>)}
        </div>
        {this.state.renderButton ? <div className="kam-intro-button" style={this.state.showButton ? { visibility: 'visible', opacity: 1 } : { visibility: 'hidden', opacity: 0 }}>
          <button className={`kam-intro-button-btn ${this.state.buttonText.toLowerCase()}`} onClick={this.start} onMouseEnter={() => this.changeButton(true)} onMouseLeave={() => this.changeButton(false)}>{this.state.buttonText}</button>
          <button className="kam-intro-button-btn yes" onClick={this.start}>YES</button>
        </div> : null}
        {!this.state.renderButton ?
          <div className="kam-intro-text extra">
            {this.state.extraContent.text.map((item, i) => <span key={`e${i}`} className="kam-intro-text-content extra" style={this.state.extraContent.styles[i]}>{item}</span>)}
          </div> : null}
      </div>
    )
  }
}

export default Intro