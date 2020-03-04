import React, { PureComponent } from 'react';
import Navbar from './Components/Navbar';
import Intro from './Components/Intro';

import './Styles/kam.less';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  render() {
    return (
      <div className="kam-app">
        <Navbar />
        <div className="kam-body">
          <Intro />
        </div>
      </div>
    );
  }
}

export default App;