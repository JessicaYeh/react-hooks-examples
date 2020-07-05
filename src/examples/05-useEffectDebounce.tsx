import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';

/**
 * Example 05 - debounce the url changes with useEffect
 *
 * We want to reduce the number of calls to the cat image service, by
 * only updating the image after the user stops typing for 500ms, instead of
 * immediately after each letter. The `url` will be debounced with a setTimeout
 * inside of a useEffect, and the useEffect will have a cleanup function that
 * cancels the timeout if the `url` was updated again within the 500ms. The
 * debounced value will be stored in `debouncedUrl`.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = getUrl({ text, monochrome });

  const debounceDelay = 500;
  const [debouncedUrl, setDebouncedUrl] = React.useState(url);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedUrl(url);
    }, debounceDelay);

    /**
     * Cleanup function that is called whenever useEffect re-called when value changes.
     * Stop debounced value from changing if value changed within delay.
     */
    return () => {
      clearTimeout(handler);
    };
  }, [url]);

  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [debouncedUrl]);

  return (
    <>
      <div className={classes.form}>
        <TextField
          label="Text"
          variant="outlined"
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
        <Badge badgeContent={count} max={999} color="primary">
          <PetsIcon />
        </Badge>
      </div>
      <img src={debouncedUrl} alt="Cat" />
    </>
  );
};

export default Example;
