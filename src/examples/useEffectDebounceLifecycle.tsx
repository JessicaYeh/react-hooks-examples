import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = getUrl({ text, monochrome });

  const debounceDelay = 5000;
  const [debouncedUrl, setDebouncedUrl] = React.useState(url);

  React.useEffect(() => {
    console.log(`useEffect with [url]`);
    const handler = setTimeout(() => {
      console.log(`setDebouncedUrl ${url}`);
      setDebouncedUrl(url);
    }, debounceDelay);

    /**
     * Cleanup function that is called whenever useEffect re-called when value changes.
     * Stop debounced value from changing if value changed within delay.
     */
    return () => {
      console.log(`cleanup useEffect with [url]`);
      clearTimeout(handler);
    };
  }, [url]);

  React.useEffect(() => {
    console.log(`useEffect with [debouncedUrl]`);
    setCount((prevCount) => prevCount + 1);
  }, [debouncedUrl]);

  console.log(
    `render
    ${text} = text | ${monochrome} = monochrome | ${count} = count
    ${url} = url
    ${debouncedUrl} = debouncedUrl`
  );

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
