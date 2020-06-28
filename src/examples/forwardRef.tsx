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

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = getUrl({ text, monochrome });

  const debouncedUrl = useDebounce(url);

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={classes.form}>
        <CatTextField
          ref={inputRef}
          // This is now an uncontrolled component
          onKeyUp={() => setText(inputRef.current?.value ?? '')}
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
