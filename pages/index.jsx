import React from 'react';

export default class extends React.Component {
  static async getInitialProps({ serverSide }) {
    if (serverSide) {
      const { db } = serverSide;
      // TODO server-side database calls
      return {};
    }
    // TODO client-side API calls
    return {};
  }

  render() {
    return (
      <div>Hello, World!</div>
    );
  }
}
