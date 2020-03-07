import React, { PureComponent } from 'react';

import { SentimentScripts } from './Scripts/SentimentScripts';

export default class Sentiment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputOne: { text: "", valid: null },
      inputTwo: { text: "", valid: null },
      errors: [],
      response: [],
      scores: [-1, -1],
      loading: false,
    }
    this.loadingSvg = <svg width="64px" height="64px" viewBox="0 0 128 128" space="preserve"><g><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#000000" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(45 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(90 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(135 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(180 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(225 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(270 64 64)" /><path d="M38.52 33.37L21.36 16.2A63.6 63.6 0 0 1 59.5.16v24.3a39.5 39.5 0 0 0-20.98 8.92z" fill="#c0c0c0" transform="rotate(315 64 64)" /><animateTransform attributeName="transform" type="rotate" values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite"></animateTransform></g></svg>;
  }

  handleInputChange = (val, key) => {
    this.setState({ [key]: { text: val, valid: val.length >= 5 } });
  }

  handleContinue = () => {
    if (!this.validateInput()) return;

    this.setState({ loading: true })
    fetch('http://kamikami.pythonanywhere.com/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sentence: [this.state.inputOne.text.trim(), this.state.inputTwo.text.trim()] }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) this.setState({ errors: ["Hmm, couldn't quite process that. Want to try again?"] });
        else this.handleSentiment(data.scores);
      })
      .catch(err => console.error(err))
      .finally(() => this.setState({ loading: false }));
  }

  validateInput = () => {
    let errors = [];

    if (!this.state.inputOne.text.length) errors.push("Please enter something in the first box.");
    else if (this.state.inputOne.text.length < 5) errors.push("Please enter at least five characters in the first box.");

    if (!this.state.inputTwo.text.length) errors.push(`${errors.length ? "Also, please" : "Please"} enter something in the second box.`);
    else if (this.state.inputTwo.text.length < 5) errors.push(`${errors.length ? "Also, please" : "Please"} enter at least five characters in the first box.`);

    if (!errors.length && this.state.inputOne.text === this.state.inputTwo.text)
      errors.push("The two sentences cannot be the same.");

    this.setState({ errors });
    return errors.length === 0;
  }

  handleSentiment = (scores) => {
    let response = [];
    let sentiment = SentimentScripts(scores[0], scores[1]);
    response.push(sentiment);
    response.push(<div className="kam-sentiment-body-result-score">
      <span>First Sentence:</span>
      <span className={scores[0] > 0.5 ? "sentiment positive" : scores[0] < 0.5 ? "sentiment negative" : "sentiment neutral"}>{(scores[0] * 100).toFixed(0)}% Positive.</span>
    </div>);
    response.push(<div className="kam-sentiment-body-result-score">
      <span>Second Sentence:</span>
      <span className={scores[1] > 0.5 ? "sentiment positive" : scores[1] < 0.5 ? "sentiment negative" : "sentiment neutral"}>{(scores[1] * 100).toFixed(0)}% Positive.</span>
    </div>);
    this.setState({ response });
  }

  handleEnter = (e) => {
    if (e.charCode === 13) this.handleContinue();
  }

  render() {
    return <div className="kam-sentiment">
      <header className="kam-sentiment-title">
        <span>Experience with Machine Learning.</span>
      </header>
      <main className="kam-sentiment-body">
        <article className="kam-sentiment-body-inputs">
          <section className="kam-sentiment-body-inputs-text">
            <span>I want you to write two sentences in the fields below.</span>
            <span>One sentence can be nice, and one sentence can be not so nice (don't worry, you won't hurt my feelings).</span>
            <span>Don't tell me which is which though, just select them at random!</span>
          </section>
          <section className="kam-sentiment-body-inputs-input one">
            <span>First Sentence:</span>
            <input
              type="text"
              value={this.state.inputOne.text}
              className={"kam-sentiment-body-inputs-input-input" + (this.state.inputOne.valid ? " valid" : this.state.inputOne.valid === false ? " invalid" : "")}
              onChange={(e) => this.handleInputChange(e.target.value, "inputOne")}
              onKeyPress={this.handleEnter}
            />
            <button className="kam-sentiment-body-clear" onClick={() => this.setState({ inputOne: { text: "", valid: null } })}>Clear</button>
          </section>
          <section className="kam-sentiment-body-inputs-input two">
            <span>Second Sentence:</span>
            <input
              type="text"
              value={this.state.inputTwo.text}
              className={"kam-sentiment-body-inputs-input-input" + (this.state.inputTwo.valid ? " valid" : this.state.inputTwo.valid === false ? " invalid" : "")}
              onChange={(e) => this.handleInputChange(e.target.value, "inputTwo")}
              onKeyPress={this.handleEnter}
            />
            <button className="kam-sentiment-body-clear" onClick={() => this.setState({ inputTwo: { text: "", valid: null } })}>Clear</button>
          </section>
          <div className="kam-sentiment-body-cont">
            {this.state.loading ? this.loadingSvg
              : <button className="kam-sentiment-body-inputs-input-cont" onClick={this.handleContinue}>Continue</button>}
          </div>
        </article>
        {this.state.errors.length ? <div className="kam-sentiment-body-errors">
          {this.state.errors.map((item, i) => <div key={i} className="kam-sentiment-body-errors-err">{item}</div>)}
        </div>
          : null}
        {this.state.response.length ? <article className="kam-sentiment-body-result">
          {this.state.response.map((item, i) => <div key={`resp${i}`} className="kam-sentiment-body-result-resp">{item}</div>)}
        </article>
          : null}
      </main>
    </div >
  }
}