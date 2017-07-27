import React from 'react';

import lifecycleMethods from './constants';
import { lifecycleMethodMessageForComponent } from './utils';
import defaultConfig from './defaults';

const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

/**
 * HOC which prints info to console for easier debugging.
 *
 * @param Component the component which gets wrapped.
 * @param config a configuration object which specifies what and how should be printed.
 * @returns {WithComponentLog} the wrapped component with debugging info based on the configuration object.
 */
const withComponentLog = (Component, config = {}) => {

  const componentName = `${Component.displayName || Component.name || 'Component'}`;

  const adjustedConfig = Object.assign({}, defaultConfig, config);
  const {
    printLevel,
    shouldPrint,
    ...lifecycleMethodsConfig
  } = adjustedConfig;

  // fallback to default print level when config object has invalid console output function
  const print = console[printLevel] || console[defaultConfig.printLevel];

  const createComponentLifecycleMethodMessage = lifecycleMethodMessageForComponent(componentName);

  class WithComponentLog extends React.Component {
    constructor() {
      super();
      this.printToConsole = this.printToConsole.bind(this);
    }

    printToConsole(lifecycleMethod, prevProps, nextProps) {
      if (
        devMode
        && lifecycleMethodsConfig[lifecycleMethod]
        && shouldPrint(prevProps, nextProps)) {

        const message = createComponentLifecycleMethodMessage(lifecycleMethod);

        if (prevProps && nextProps) {
          const props = {
            prevProps,
            nextProps
          };
          print(message, props);
        } else {
          print(message);
        }
      }
    }

    componentWillMount() {
      this.printToConsole(lifecycleMethods.WILL_MOUNT);
    }

    componentDidMount() {
      this.printToConsole(lifecycleMethods.DID_MOUNT);
    }

    componentWillReceiveProps(nextProps) {
      this.printToConsole(lifecycleMethods.WILL_RECEIVE_PROPS, this.props, nextProps);
    }

    shouldComponentUpdate(nextProps) {
      this.printToConsole(lifecycleMethods.SHOULD_UPDATE, this.props, nextProps);
      return true;
    }

    componentWillUpdate(nextProps) {
      this.printToConsole(lifecycleMethods.WILL_UPDATE, this.props, nextProps);
    }

    componentDidUpdate(prevProps) {
      this.printToConsole(lifecycleMethods.DID_UPDATE, prevProps, this.props);
    }

    componentWillUnmount() {
      this.printToConsole(lifecycleMethods.WILL_UNMOUNT);
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return WithComponentLog;
};

/**
 * Creates a closure for the config object.
 * Common usage is to avoid modifying arguments when composing multiple HOCs.
 *
 * @param config the config object for printing to console.
 * @returns a function with the Component as input parameter
 *          which gets passed down to the #withComponentLog HOC by preserving the config object.
 */
const withComponentLogConfig = config => Component => withComponentLog(Component, config);

// TODO 2017-07-26: README: examples of how to use both approaches
export {
  withComponentLog,
  withComponentLogConfig
};