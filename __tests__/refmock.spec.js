import {ImperativeComponent, ImperativeContainer} from '../components/imperative';
import {renderComponent, renderContainer, filterByTestID, getStore} from '../lib/redux-full-render';

jest.mock('TouchableOpacity', () => 'TouchableOpacity');
jest.mock('TextInput', () => 'TextInput');

describe('Ref Mock', function () {
  it('should mock node focus() method in for dumb component', function () {
    const focus = jest.fn();
    const component = renderComponent(ImperativeComponent, {}, {createNodeMock: () => ({focus})});
    filterByTestID('Button', component)[0].props.onPress();
    expect(focus).toBeCalled();
  });

  it('should mock node focus() method in for container', function () {
    const focus = jest.fn();
    const component = renderContainer(
      ImperativeContainer,
      getStore(state => state, {}),
      {},
      {createNodeMock: () => ({focus})}
    );
    filterByTestID('Button', component)[0].props.onPress();
    expect(focus).toBeCalled();
  });
});
