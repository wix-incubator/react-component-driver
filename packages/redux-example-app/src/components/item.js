import React, {PureComponent} from 'react';

export class Item extends PureComponent {
  static TEST_ID = {
    TEXT: 'text',
    INDEX: 'index',
  };

  render() {
    return (
      <div data-test-id={this.props.testID}>
        <span data-test-id={this.props.testID + '.' + Item.TEST_ID.INDEX}>
          {this.props.index}
        </span>
        <span>. </span>
        <span data-test-id={this.props.testID + '.' + Item.TEST_ID.TEXT}>
          {this.props.text}
        </span>
      </div>
    );
  }
}
