jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  TextInput: 'TextInput',
}));

global.tick = function tick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
};
