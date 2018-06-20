import ContextExample from '../components/context-example';
import {renderComponent, withContext, filterByType} from '../lib/redux-full-render';

describe('Context', function () {
  it('should allow to set context when rendering', function () {
    const id = Math.random();
    const [view] = filterByType('View', renderComponent(withContext(ContextExample, {id})));
    expect(view.props.id).toBe(id);
  });
});
