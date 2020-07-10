import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { useDebounce } from './util/useDebounce';

interface Props {
  onUrlChange?: (url: string) => void;
}

/**
 * Example 07 - gotchas of useEffect dependencies
 *
 * An `onUrlChange(url)` callback function is added to the props.
 * We want this function to be called whenever the debouncedUrl changes.
 *
 * We first attempt to add the onUrlChange call to the useEffect function where
 * we call setCount, and follow the eslint rule to add onUrlChange to the dependency array,
 * but notice it causes a problem where the counter is incremented twice for
 * each url change.
 *
 * There are multiple ways to fix the problem, some cleaner than others. In
 * increasing order of cleaniness:
 *
 * 1. Remove onUrlChange from the dependency array and then ignore the eslint warning
 * 2. In the parent where onUrlChange function defined, wrap it in useCallback so it doesn't
 *      change on every re-render of the parent
 * 3. Refactor the useEffect into two separate useEffect
 */
const Example: React.FC<Props> = ({ onUrlChange }) => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  const debouncedUrl = useDebounce(url);

  /**
   * Bad; If these are grouped together, if the onUrlChange function changes
   * (could happen on every re-render of the parent if it's not memoized in the parent)
   * then setCount will be called more times than expected
   */
  // React.useEffect(() => {
  //   setCount((prevCount) => prevCount + 1);
  //   onUrlChange?.(debouncedUrl);
  // }, [debouncedUrl, onUrlChange]);

  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [debouncedUrl]);

  React.useEffect(() => {
    onUrlChange?.(debouncedUrl);
  }, [debouncedUrl, onUrlChange]);

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
