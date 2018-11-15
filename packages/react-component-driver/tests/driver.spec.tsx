import * as React from 'react';
import * as shallow from '../shallow';
import * as full from '../index';
import {ComponentDriverI} from '../dist/lib/driver';

type ExampleProps = {welcomeText: string};
type ExampleState = {hide: boolean};

export default class Example extends React.Component<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props);
    this.state = {hide: false};
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
  function driverTests<Props>(name: string, ComponentDriver: typeof full.ComponentDriver) {
    class ExampleDriver extends ComponentDriver<ExampleProps> {
      constructor() {
        super(Example);
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
        const drv = example().withProps({welcomeText});
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
        expect(example().withProps({welcomeText: 'Hello'}).getText())
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
          example().withProps({welcomeText: 'hi'})
            .filterBy((node) => node === 'hi')
        ).toEqual(['hi']);
        expect(
          example().withProps({welcomeText: 'hey'})
            .getBy((node) => node === 'hey')
        ).toEqual('hey');
      });
    });
  }

  driverTests('Full', full.ComponentDriver);
  driverTests('Shallow', shallow.ComponentDriver);
});
