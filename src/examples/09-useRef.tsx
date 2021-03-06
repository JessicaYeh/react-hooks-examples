import React from 'react';
import { TextField, Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';
import { useDebounce } from './util/useDebounce';

/**
 * Example 09 - useRef
 *
 * A demo of how autoFocus can be implemented with useRef and useEffect, so the
 * TextField component will automatically be focused when the component mounts.
 */
const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  const debouncedUrl = useDebounce(url);

  /**
   * Bad; the ref is re-created every render. The useEffect with the .focus() will complain
   * that inputRef is missing from the dependency array, and if you add it in, the
   * TextField will now be focused on every re-render. In functional components, always use
   * useRef instead of createRef
   */
  // const inputRef = React.createRef<HTMLInputElement>();

  const inputRef = React.useRef<HTMLInputElement>(null);

  /**
   * Autofocus the text field when the component mounts. Note: the TextField component
   * has a built-in `autoFocus` prop and you should use that instead of doing this,
   * but this is an example of how something like that is implemented, to demonstrate useRef
   */
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className={classes.form}>
        <TextField
          inputRef={inputRef}
          label="Text"
          variant="outlined"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <FormControlLabel
          label="Monochrome"
          control={<Switch checked={monochrome} onChange={(event) => setMonochrome(event.target.checked)} />}
        />
      </div>
      <img src={debouncedUrl} alt="Cat" />
    </>
  );
};

export default Example;
