import React, { PureComponent } from 'react';

export default class Navbar extends PureComponent {
  render() {
    return (
      <div className="kam-navbar">
        <div className="kam-navbar-logo">Kam</div>
        <div className="kam-navbar-links">
          <span>Link 1</span>
          <span>Link 2</span>
          <span>Link 3</span>
        </div>
      </div>
    )
  }
}