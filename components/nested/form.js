import React, {PureComponent} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

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
      <View testID={testID}>
        <TextInput value={value} testID={INPUT_ID} onChangeText={this.onChangeText}/>
        <TouchableOpacity testID={BUTTON_ID} onPress={this.onAdd}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
