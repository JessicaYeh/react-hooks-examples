import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';
import { useDebounce } from './util/useDebounce';

const CatTextField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <label>
      Text:
      <input ref={ref} placeholder="Meow" {...props} />
    </label>
  );
});

/**
 * Example 10 - forwardRef
 *
 * We make a custom CatTextField component and use forwardRef to pass the ref
 * prop through to the input element inside of CatTextField, so that we can still
 * grab the ref from the parent. Regular components won't automatically have ref
 * available in the props, so we have to explicitly add forwardRef to get access to it.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = getUrl({ text, monochrome });

  const debouncedUrl = useDebounce(url);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className={classes.form}>
        <CatTextField
          ref={inputRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
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
