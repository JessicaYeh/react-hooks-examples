import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';

function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /**
     * Cleanup function that is called whenever useEffect re-called when value changes.
     * Stop debounced value from changing if value changed within delay.
     */
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Example 06 - useDebounce custom hook
 *
 * We extract the debounce logic into a custom hook that can be
 * used with any state value.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  const debouncedUrl = useDebounce(url);

  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [debouncedUrl]);

  return (
    <>
      <div className={classes.form}>
        <TextField label="Text" variant="outlined" value={text} onChange={(event) => setText(event.target.value)} />
        <FormControlLabel
          label="Monochrome"
          control={<Switch checked={monochrome} onChange={(event) => setMonochrome(event.target.checked)} />}
        />
        <Badge badgeContent={count} max={999} color="primary">
          <PetsIcon />
        </Badge>
      </div>
      <img src={debouncedUrl} alt="Cat" />
    </>
  );
};

export default Example;
