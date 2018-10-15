import {ImperativeComponent} from './components/imperative';
import {renderComponent, filterByTestID, getStore} from '../index';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');
jest.mock('TextInput', () => 'TextInput');

describe('Ref Mock', function () {
  it('should mock node focus()', function () {
    const focus = jest.fn();
    const component = renderComponent(
      ImperativeComponent,
      {},
      {createNodeMock: () => ({focus})}
    );
    filterByTestID('Button', component)[0].props.onPress();
    expect(focus).toBeCalled();
  });
});
