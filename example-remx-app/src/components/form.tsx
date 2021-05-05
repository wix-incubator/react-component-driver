import * as React from 'react';

interface FormProps {
  testID: string;
  input: string;
  onInputChange(input: string): void;
  onAdd(input: string): void;
}

export class Form extends React.PureComponent<FormProps> {
  static TEST_ID = {
    INPUT: 'input',
    BUTTON: 'button',
  };

  static defaultProps = {
    onInputChange: () => {},
  };

  getTestID = (suffix: string) =>
    this.props.testID + '.' + suffix;

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onInputChange(event.target.value);

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
