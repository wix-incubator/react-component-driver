import {listDriver} from '../../components/nested/list-driver';

describe('List', () => {
  it('should set `testID` for container', () => {
    const testID = Math.random().toString();
    expect(listDriver().withProps({testID}).getByID(testID)).toBeDefined();
  });

  it('should render empty state text when item list is empty', () => {
    const list = listDriver().withProps({items: []});
    expect(list.getItems()).toEqual([]);
    expect(list.getEmptyStateText()).toBe('No items yet.');
  });

  it('should render single item', () => {
    const list = listDriver().withProps({items: ['hi']});
    expect(list.getItems()).toEqual([['1', 'hi']]);
  });

  it('should render items in order', () => {
    const list = listDriver().withProps({items: ['hi', 'how', 'are', 'you']});
    expect(list.getItem(0)).toEqual(['1', 'hi']);
    expect(list.getItem(1)).toEqual(['2', 'how']);
    expect(list.getItem(2)).toEqual(['3', 'are']);
    expect(list.getItem(3)).toEqual(['4', 'you']);
  });
});
