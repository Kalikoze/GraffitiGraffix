import React, {Component} from 'react';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  render() {
    const { search } = this.state;

    return (
      <div>
        <input
        value={search}
        placeholder="Search for artist..."
        onChange={e => this.setState({search: e.target.value})}/>

      </div>
    )
  }
}
