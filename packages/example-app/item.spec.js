import {itemDriver} from './item.driver';

describe('Item', () => {
  it('uses `testID` property to mark container', () => {
    const testID = Math.random().toString();
    expect(itemDriver().withProps({testID}).getByID(testID)).not.to.be.undefined();
  });

  it('renders index', () => {
    const index = ((100 * Math.random()) | 0).toString();
    expect(itemDriver().withProps({index}).getIndex()).to.equal(index);
  });

  it('renders text', () => {
    const text = Math.random().toString();
    expect(itemDriver().withProps({text}).getText()).to.equal(text);
  });
});
