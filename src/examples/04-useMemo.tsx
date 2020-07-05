import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';

interface Options {
  text: string;
  monochrome: boolean;
  width?: number;
  height?: number;
}

interface Props {
  onOptionsChange?: (options: Options) => void;
}

/**
 * Example 04 - useMemo
 *
 * This adds an `onOptionsChange(options)` callback function to the props,
 * that the parent can use to get updates to the currently used cat API options.
 *
 * This shows a pitfall of using an object in useEffect dependency array, and
 * how to address it using useMemo.
 */

const Example: React.FC<Props> = ({ onOptionsChange }) => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  /**
   * Bad; causes the useEffect with [options] dependency to be called on
   * every re-render because a new options object is created every render
   */
  // const options: Options = {
  //   text,
  //   monochrome,
  //   width: 400,
  //   height: 300,
  // };

  const options: Options = React.useMemo(
    () => ({
      /**
       * can also just spread ...state into here instead of adding
       * text and monochrome and then just use [state] for useMemo dependency array
       */
      text,
      monochrome,
      width: 400,
      height: 300,
    }),
    [text, monochrome]
  );

  React.useEffect(() => {
    onOptionsChange?.(options);
  }, [options, onOptionsChange]);

  const url = getUrl(options);

  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [url]);

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
      <img src={url} alt="Cat" />
    </>
  );
};

export default Example;
