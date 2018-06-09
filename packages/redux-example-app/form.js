import React, {PureComponent} from 'react';

export class Form extends PureComponent {
  static TEST_ID = {
    INPUT: 'input',
    BUTTON: 'button',
  };

  static defaultProps = {
    onInputChange: () => {},
  };

  getTestID = (suffix) =>
    this.props.testID + '.' + suffix;

  onChangeText = (value) =>
    this.props.onInputChange(value);

  onAdd = () => {
    this.props.onAdd(this.props.input);
  }

  render () {
    const {testID, input} = this.props;
    const INPUT_ID = this.getTestID(Form.TEST_ID.INPUT);
    const BUTTON_ID = this.getTestID(Form.TEST_ID.BUTTON);
    return (
      <div data-test-id={testID}>
        <input value={input} data-test-id={INPUT_ID} onChange={this.onChangeText}/>
        <button data-test-id={BUTTON_ID} onClick={this.onAdd}>Add</button>
      </div>
    );
  }
}
