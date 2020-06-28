import React from 'react';

import Example01 from '../examples/useState';
import Example02 from '../examples/useStateAndUseEffect';
import Example03 from '../examples/useStateObjectGotcha';
import Example04 from '../examples/useEffectDebounce';
import Example05 from '../examples/useDebounceCustomHook';
import Example06 from '../examples/useEffectDependenciesGotcha';
import Example07 from '../examples/useRef';
import Example08 from '../examples/forwardRef';
import Example09 from '../examples/useImperativeHandle';

export default {
  title: 'Examples',
};

export const Ex01 = () => <Example01 />;

export const Ex02 = () => <Example02 />;

export const Ex03 = () => (
  <Example03 onOptionsChange={(options) => console.log(options)} />
);

export const Ex04 = () => <Example04 />;

export const Ex05 = () => <Example05 />;

export const Ex06 = () => {
  const [url, setUrl] = React.useState<string>();

  const handleUrlChange = (url: string) => {
    setUrl(url);
  };

  // const handleUrlChange = React.useCallback((url: string) => {
  //   setUrl(url);
  // }, []);

  return (
    <>
      {/* <Example06 onUrlChange={setUrl} /> */}
      <Example06 onUrlChange={handleUrlChange} />
      <p>{url}</p>
    </>
  );
};

export const Ex07 = () => <Example07 />;
export const Ex08 = () => <Example08 />;
export const Ex09 = () => <Example09 />;
