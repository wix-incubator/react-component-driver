import * as React from 'react';

export interface Props {
  'data-test-id': string;
  index: string;
  text: string;
}

export const TEST_ID = {
  TEXT: 'text',
  INDEX: 'index',
};

export class Item extends React.PureComponent<Props> {
  render() {
    const testID = this.props['data-test-id'];

    return (
      <div data-test-id={testID}>
        <span data-test-id={testID + '.' + TEST_ID.INDEX}>
          {this.props.index}
        </span>
        <span>. </span>
        <span data-test-id={testID + '.' + TEST_ID.TEXT}>
          {this.props.text}
        </span>
      </div>
    );
  }
}
