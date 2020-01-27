import * as React from 'react';

export interface Props {
  'data-test-id': string;
  input: string;
  onInputChange(value: string): void;
  onAdd(input: string): void;
}

export const TEST_ID = {
  INPUT: 'input',
  BUTTON: 'button',
};

export class Form extends React.PureComponent<Props> {
  static defaultProps = {
    onInputChange: () => {},
  };

  getTestID = (suffix: string) =>
    this.props['data-test-id'] + '.' + suffix;

  onChangeText = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onInputChange(event.target.value);

  onAdd = () => {
    this.props.onAdd(this.props.input);
  }

  render () {
    const {input} = this.props;
    const INPUT_ID = this.getTestID(TEST_ID.INPUT);
    const BUTTON_ID = this.getTestID(TEST_ID.BUTTON);
    return (
      <div data-test-id={this.props['data-test-id']}>
        <input value={input} data-test-id={INPUT_ID} onChange={this.onChangeText}/>
        <button data-test-id={BUTTON_ID} onClick={this.onAdd}>Add</button>
      </div>
    );
  }
}
