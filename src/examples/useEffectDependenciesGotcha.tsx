import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';
import { useDebounce } from './util/useDebounce';

interface Props {
  onUrlChange?: (url: string) => void;
}

const Example: React.FC<Props> = ({ onUrlChange }) => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = getUrl({ text, monochrome });

  const debouncedUrl = useDebounce(url);

  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [debouncedUrl]);

  React.useEffect(() => {
    onUrlChange?.(debouncedUrl);
  }, [debouncedUrl, onUrlChange]);

  // // If these are grouped together, if the onUrlChange function changes
  // // (could happen on every re-render of the parent if it's not memoized in the parent)
  // // then setCount will be called more times than expected
  // React.useEffect(() => {
  //   setCount((prevCount) => prevCount + 1);
  //   onUrlChange?.(debouncedUrl);
  // }, [debouncedUrl, onUrlChange]);

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
