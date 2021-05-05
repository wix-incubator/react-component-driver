declare module 'remx' {
  function state<T>(o: T): T;
  function getters<T>(o: T): T;
  function setters<T>(o: T): T;
  function connect(mapStateToProps: any): any;
}
