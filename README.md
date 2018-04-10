## Clubs testkit
Jest test helpers for testing components

### Installation

```
npm install clubs-testkit
```


### Usage

#### Importing
Full render. Recommended.
```
import {
  filterByTestID, filterByTestID, containerDriver, renderComponent, renderContainer
} from 'clubs-testkit/full-render'
```

Designed for redux screens
```
import {
  filterByTestID, filterByTestID, containerDriver, renderComponent, renderContainer
} from 'clubs-testkit/redux'
```

Designed for simple components
```
import {
  filterByTestID, filterByTestID, renderComponent
} from 'clubs-testkit'
```

#### API

##### `containerDriver(screen, storeFactory, [helperMethods])`
(Note: Used with `redux` or `full-render`: `import {containerDriver} from 'clubs-testkit/redux'`)  
`screen` - Required. Screen component, not rendered.  
`storeFactory` - Required. Function which returns redux store. Can be prefilled.  
`helperMethods` - Optional. Object of helper methods, used to wrap filterByTestID
and other methods for more readable test code.

Returns object with methods:  
`getComponent()` - returns rendered component.  
`withState(state)` - takes a redux state.  
`withProps(props)` - takes props.  
`getNavigator()` - returns navigator of React Native Navigation


##### `renderContainer(screen, store, props)`
(Note: Used with `redux` or `full-render`: `import {containerDriver} from 'clubs-testkit/redux'`)  
`screen` - Required. Screen component, not rendered.  
`store` - Required. Built redux store.  
`props` - Optional. Props for screen component.  


##### `renderComponent(component, props)`
(Note: Used with `redux` or `full-render`: `import {containerDriver} from 'clubs-testkit/redux'`)  
`component` - Required. Component, not rendered.  
`props` - Optional. Props for component.


##### `navigatorMock()`
Returns mocked navigator of React Native Navigation.


##### `filterByTestID(testID, component)`
`testID` - Required. It's the testID used on components  
`component` - Required. Rendered component


##### `filterByType(type, component)`
`type` - Required. Type of the component (i.e. ScrollView, CustomComponent, etc.)  
`component` - Required. Rendered component.


### Examples

#### renderComponent
```
import {renderComponent, filterByTestID} from 'clubs-testkit';
import MembersSection from './members-section';

describe('Members section', () => {
  let props;

  beforeEach(() => {
    props = {
      members: [],
      onInvitePress: jest.fn(),
      onPress: jest.fn(),
      sectionTitle: 'someTitle'
    };
  });

  it('should render the members avatars a line separator and invite section if members are present', () => {
    const component = renderComponent(MembersSection, {...props, members: [{id: 1, name: 'someName1'}]});
    expect(filterByTestID('clubs.manager.MembersHeader-members', component)).toBeDefined();
    expect(filterByTestID('clubs.manager.MembersHeader-separator', component)).toBeDefined();
    expect(filterByTestID('clubs.manager.MembersHeader-invite', component)).toBeDefined();
  });

  it('should render member if there is one member', () => {
    const component = renderComponent(MembersSection, {...props, members: [{id: 1}]});
    expect(filterByTestID('clubs.manager.MembersHeader-CTA', component)[0].children[0]).toEqual('1 Member');
  });
});
```

#### containerDriver
```
import {containerDriver, filterByTestID, filterByType} from 'clubs-testkit/redux';
import {createClubsManagerStore} from '../../../module/clubs-manager-store';
import EditableInviteShare from './share';

describe('editable invite share', () => {
  it('render loader when screen has no details', () => {
    const driver = driverFactory();
    expect(driver.getLoader()).not.toBeUndefined();
  });

  it('render share screen when has invite details', () => {
    const state = aStateWithInviteDetails();
    const driver = driverFactory().withState(state);
    expect(driver.getContainer()).not.toBeUndefined();
  });
});

function aStateWithInviteDetails() {
  return {
    editableInvites: {
      currentlyEditedInvite: {},
    }
  }
}

const driverFactory = containerDriver(EditableInviteShare, createClubsManagerStore, {
  getContainer() {
    return filterByTestID('clubs.manager.EditableInviteShareScreen-container', this.getComponent())[0];
  },
  getLoader() {
    return filterByType('ProgressOverlay', this.getComponent())[0];
  },
});
```

