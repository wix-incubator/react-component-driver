export function navigatorMock() {
  return {
    setStyle: jest.fn(),
    toggleNavBar: jest.fn(),
    setOnNavigatorEvent: jest.fn(),
    setButtons: jest.fn(),
    setTitle: jest.fn(),
    setSubTitle: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    resetTo: jest.fn(),
    popToRoot: jest.fn(),
    showModal: jest.fn(),
    switchToTab: jest.fn(),
    dismissModal: jest.fn(),
    dismissAllModals: jest.fn(),
    emitEvent: function (event) {
      this.setOnNavigatorEvent.mock.calls.forEach(args => {
        args[0](event);
      });
    },
    createEvent: function (id, type = 'NavBarButtonPress') {
      return {type, id};
    }
  };
}
