import React from 'react';

import Example01 from '../examples/01-useState';
import Example02 from '../examples/02-useStateAndUseEffect';
import Example03 from '../examples/03-useStateObjectGotcha';
import Example04 from '../examples/04-useEffectDebounce';
import Example05 from '../examples/05-hooksLifecycle';
import Example06 from '../examples/06-useDebounceCustomHook';
import Example07 from '../examples/07-useEffectDependenciesGotcha';
import Example08 from '../examples/08-useMemo';
import Example09 from '../examples/09-useRef';
import Example10 from '../examples/10-forwardRef';
import Example11 from '../examples/11-useImperativeHandle';
import Example12, { ThemeProvider, Theme } from '../examples/12-useContext';

export default {
  title: 'Examples',
};

export const Ex01UseState = () => <Example01 />;

export const Ex02UseStateAndUseEffect = () => <Example02 />;

export const Ex03UseStateObjectGotcha = () => <Example03 />;

export const Ex04UseEffectDebounce = () => <Example04 />;

export const Ex05HooksLifecycle = () => <Example05 />;

export const Ex06UseDebounceCustomHook = () => <Example06 />;

export const Ex07UseEffectsDependenciesGotcha = () => {
  const [url, setUrl] = React.useState<string>();

  const handleUrlChange = (url: string) => {
    console.log(url);
    setUrl(url);
  };

  // const handleUrlChange = React.useCallback((url: string) => {
  //   console.log(url);
  //   setUrl(url);
  // }, []);

  return (
    <>
      {/* Note: React guarantees the setUrl function doesn't change on re-renders, 
          which is why when using this function directly, we don't need to wrap it in useCallback */}
      {/* <Example07 onUrlChange={setUrl} /> */}
      <Example07 onUrlChange={handleUrlChange} />
      <p>{url}</p>
    </>
  );
};

export const Ex08UseMemo = () => <Example08 />;

export const Ex09UseRef = () => <Example09 />;

export const Ex10ForwardRef = () => <Example10 />;

export const Ex11UseImperativeHandle = () => <Example11 />;

const customTheme: Theme = {
  primary: '#ff9800',
  spacing: {
    small: 12,
  },
};
export const Ex12UseContext = () => (
  <ThemeProvider value={customTheme}>
    <Example12 />
  </ThemeProvider>
);
