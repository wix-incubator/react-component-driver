import * as React from 'react';
import * as shallow from '../shallow';
import * as full from '../index';

type ExampleProps = {welcomeText: string, onUnmount?: () => {}};
type ExampleState = {hide: boolean};

export default class Example extends React.Component<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props);
    this.state = {hide: false};
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
  }

  hide() {
    this.setState({hide: true});
  }

  render() {
    return (
      <div>
        <button data-test-id="button" onClick={this.hide.bind(this)}></button>
        {this.state.hide ? <span/> : <span data-test-id="welcome_text">{this.props.welcomeText}</span>}
      </div>
    );
  }
}

describe('Driver', function () {
  function driverTests(name: string, ComponentDriver: typeof full.ComponentDriver) {
    class ExampleDriver extends ComponentDriver<ExampleProps> {
      constructor() {
        super(Example);
      }

      getButton() {
        return this.getByID('button');
      }

      getText() {
        const node = this.getByID('welcome_text');
        return node && node.children;
      }
    }

    describe('For Component From ' + name, function () {
      const example = () => new ExampleDriver();

      it('should render component', function () {
        const welcomeText = 'Hello, World!';
        const drv = example().setProps({welcomeText});
        expect(drv.filterBy(() => true)[0]).toEqual({
          type: 'div',
          props: {},
          children: [
            {
              type: 'button',
              props: {'data-test-id': 'button', onClick: expect.any(Function)},
              children: []
            },
            {
              type: 'span',
              props: {'data-test-id': 'welcome_text'},
              children: [welcomeText]
            },
          ]
        });
      });

      it('should allow to set props', function () {
        expect(example().setProps({welcomeText: 'Hello'}).getText())
          .toEqual(['Hello']);
      });

      it('should allow to quickly fetch by id', () => {
        expect(example().getByID('welcome_text')).toBeDefined();
        expect(example().filterByID('welcome_text').length).toBe(1);
      });

      it('should allow to fetch by id, using regular expression', () => {
        expect(example().getByID(/^welcome.+$/)).toBeDefined();
        expect(example().filterByID(/^welcome.+$/).length).toBe(1);
      });

      it('should allow to filter and get by custom predicate', () => {
        expect(
          example().setProps({welcomeText: 'hi'})
            .filterBy((node) => node === 'hi')
        ).toEqual(['hi']);
        expect(
          example().setProps({welcomeText: 'hey'})
            .getBy((node) => node === 'hey')
        ).toEqual('hey');
      });

      it('should re-render', () => {
        const drv = example().setProps({welcomeText: '123'});
        expect(drv.getText()).toEqual(['123']);
        drv.getByID('button')!.props.onClick();
        expect(drv.getText()).toBeUndefined();
      });

      it('should unmount', () => {
        const onUnmount = jest.fn();
        example().setProps({onUnmount}).unmount();
        expect(onUnmount).toBeCalled();
      });

      it('should allow to attach to undefined and null', async () => {
        expect(example().attachTo(undefined).getButton()).toBeUndefined();
        expect(example().attachTo(null).getButton()).toBeUndefined();
        expect(example().attachTo(undefined).getComponent()).toBeNull();
        expect(await example().attachTo(null).getComponentAsync()).toBeNull();
      });
    });
  }

  driverTests('Full', full.ComponentDriver);
  driverTests('Shallow', shallow.ComponentDriver);
});
