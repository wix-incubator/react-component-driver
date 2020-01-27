import {listDriver} from './list.driver';

describe('List', () => {
  it('uses `testID` for container', () => {
    const testID = Math.random().toString();
    expect(listDriver().setProps({testID}).getByID(testID)).to.be.truthy();
  });

  describe('when empty', () => {
    const emptyList = listDriver().setProps({items: []});

    it('does not render any items', () => {
      expect(emptyList.getItems()).to.deep.equal([]);
    });

    it('shows empty state text', () => {
      expect(emptyList.getEmptyStateText()).to.equal('No items yet.');
    });
  });

  it('renders items in order', () => {
    const items = ['hi', 'how', 'are', 'you'];
    expect(listDriver().setProps({items}).getItems()).to.deep.equal([
      ['1', 'hi'], ['2', 'how'], ['3', 'are'], ['4', 'you']
    ]);
  });
});
