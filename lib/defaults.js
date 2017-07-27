import lifecycleMethods from './constants';

const printLevel = 'log';
const shouldPrint = () => true;

export default {
  printLevel,
  shouldPrint,
  [lifecycleMethods.WILL_MOUNT]: true,
  [lifecycleMethods.DID_MOUNT]: true,
  [lifecycleMethods.WILL_RECEIVE_PROPS]: true,
  [lifecycleMethods.SHOULD_UPDATE]: true,
  [lifecycleMethods.WILL_UPDATE]: true,
  [lifecycleMethods.DID_UPDATE]: true,
  [lifecycleMethods.WILL_UNMOUNT]: true
}
