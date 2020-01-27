import React, {PureComponent} from 'react';

export class Form extends PureComponent {
  static TEST_ID = {
    INPUT: 'input',
    BUTTON: 'button',
  };

  getTestID = (suffix) =>
    this.props.testID + '.' + suffix;

  onChangeText = (value) =>
    this.setState({value});

  onAdd = () =>
    this.props.onAdd(this.state.value);

  render () {
    const {testID, value} = this.props;
    const INPUT_ID = this.getTestID(Form.TEST_ID.INPUT);
    const BUTTON_ID = this.getTestID(Form.TEST_ID.BUTTON);
    return (
      <div data-test-id={testID}>
        <input value={value} data-test-id={INPUT_ID} onChange={this.onChangeText}/>
        <button data-test-id={BUTTON_ID} onClick={this.onAdd}>Add</button>
      </div>
    );
  }
}
