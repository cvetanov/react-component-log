const lifecycleMethodMessageForComponent = component => {
  const createdMessages = {};

  return lifecycleMethod => {

    if (!createdMessages[lifecycleMethod]) {

      createdMessages[lifecycleMethod] = `${component}: ${lifecycleMethod}`;
    }

    return createdMessages[lifecycleMethod];
  }
};

export {
  lifecycleMethodMessageForComponent
}
