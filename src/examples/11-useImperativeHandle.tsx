import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';
import { useDebounce } from './util/useDebounce';

interface CatTextField {
  meow: () => string;
}

const CatTextField = React.forwardRef<
  CatTextField,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    meow: () => {
      const value = inputRef.current?.value;
      if (!value) {
        return '';
      }
      return `MEOW! ${value}`;
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
 * We want a custom ref function meow() on the CatTextField that returns the
 * current value on the input element with a "MEOW!" prepended. This can be
 * achieved with useImperativeHandle in the CatTextField component.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = getUrl({ text, monochrome });

  const debouncedUrl = useDebounce(url);

  const inputRef = React.useRef<CatTextField>(null);

  return (
    <>
      <div className={classes.form}>
        <CatTextField
          ref={inputRef}
          onKeyUp={() => setText(inputRef.current?.meow() ?? '')}
        />
        <FormControlLabel
          label="Monochrome"
          control={
            <Switch
              checked={monochrome}
              onChange={(event) => setMonochrome(event.target.checked)}
            />
          }
        />
      </div>
      <img src={debouncedUrl} alt="Cat" />
    </>
  );
};

export default Example;
