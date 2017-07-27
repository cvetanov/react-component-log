# react-component-log
HOC for easier debugging/learning of lifecycle methods of React components

Install with `npm i -D react-component-log` or `yarn add -D react-component-log`

Note: The HOC acts as a shell around your actual component, it is NOT the component itself.
Therefore, logging of internal component state is not implemented.

The HOC accepts an optional config object for specifying what should be logged.
The config object contains multiple parameters:

`printLevel: string`, which console function to be used for printing info to the console, defaults to `log`

`shouldPrint: function(prevProps, nextProps)`, predicate for determining if info should be printed based on previous and next props,
defaults to printing all the time, i.e. `() => true`.
Note: only lifecycle methods which are related to component updates take `prevProps` and `nextProps` as input parameters,
the signature for other lifecycle methods is `function()`


Boolean flags for configuring which lifecycle methods should be printed
(defaults to `true` for every lifecycle method):
```
componentWillMount: boolean,
componentDidMount: boolean,
componentWillReceiveProps: boolean,
shouldComponentUpdate: boolean,
componentWillUpdate: boolean,
componentDidUpdate: boolean,
componentWillUnmount: boolean
```

Exposed functions are `withComponentLog` and `withComponentLogConfig`.
Internally, both functions delegate the functionality to the same internal HOC.
The difference being the following:

`withComponentLog(Component, config): HOC`, whereas 

`withComponentLogConfig(config): function(Component): HOC`

The second exported function is to avoid modifying the order of execution when composing multiple HOCs.

Example usages of both exports:
```js
import { withComponentLog } from 'react-component-log'
import Counter from './Counter';

const config = {
  printLevel: 'warn',                         // use console.warn
  shouldPrint: (prevProps, nextProps) => {    // print info only when prop value is NOT 3
    if (prevProps && nextProps) {
      return nextProps.value !== 3;
    }
    return true;
  },
  shouldComponentUpdate: false                // skip printing for shouldComponentUpdate
};
const CounterWithComponentLog = withComponentLog(Counter, config);

...
<CounterWithComponentLog value={0} />
```

```js
import { withComponentLogConfig } from 'react-component-log'
import Counter from './Counter';

const config = {
  printLevel: 'error',                        // use console.error
  componentWillMount: false                   // skip printing for componentWillMount
};

const withCustomConfig = withComponentLogConfig(config);
const CounterWithComponentLog = withCustomConfig(Counter);

...
<CounterWithComponentLog value={0} />
```
