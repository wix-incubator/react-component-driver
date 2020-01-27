import {ContextExample} from './components/context-example';
import {renderComponent, withContext, filterByType} from '../index';

describe('Context', function () {
  it('should allow to set context when rendering', function () {
    const id = Math.random();
    const [view] = filterByType('View', renderComponent(withContext({id}, ContextExample)));
    expect(view.props.id).toBe(id);
  });
});
