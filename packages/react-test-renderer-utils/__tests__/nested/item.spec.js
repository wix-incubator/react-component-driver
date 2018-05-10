import {itemDriver} from '../../components/nested/item-driver';

describe('Item', () => {
  it('should use `testID` prop for container', () => {
    const testID = Math.random().toString();
    expect(itemDriver().withProps({testID}).getByID(testID)).toBeDefined();
  });

  it('should render given index', () => {
    const index = (100 * Math.random()) | 0;
    expect(itemDriver().withProps({index}).getIndex()).toBe(index.toString());
  });

  it('should render given text', () => {
    const text = Math.random().toString();
    expect(itemDriver().withProps({text}).getText()).toBe(text);
  });
});
