import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';
import { useDebounce } from './util/useDebounce';

interface CatTextField {
  meow: () => void;
}

const CatTextField = React.forwardRef<CatTextField, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    meow: () => {
      inputRef.current?.focus();
    },
  }));

  return (
    <label>
      Text:
      <input ref={inputRef} placeholder="Meow" {...props} />
    </label>
  );
});

/**
 * Example 11 - useImperativeHandle
 *
 * We want a custom ref function meow() on the CatTextField that does a focus() on
 * the input. This can be achieved with useImperativeHandle in the CatTextField component.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  const debouncedUrl = useDebounce(url);

  const inputRef = React.useRef<CatTextField>(null);

  React.useEffect(() => {
    inputRef.current?.meow();
  }, []);

  return (
    <>
      <div className={classes.form}>
        <CatTextField ref={inputRef} value={text} onChange={(event) => setText(event.target.value)} />
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
