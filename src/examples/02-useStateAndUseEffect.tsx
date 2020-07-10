import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';

/**
 * Example 02 - useState and useEffect
 *
 * Building off of the previous example, we add a Badge with a counter to indicate
 * how many times the `url` value updates (to count how many times we hit the cat image API).
 *
 * We add `count` to the state with a useState hook, then add a useEffect hook that
 * has `url` in the dependency array so the function in useEffect runs whenever `url`
 * changes. Inside the useEffect function, we call setCount. Since the new count value
 * is based off of the previous value, we pass a function to setCount, rather than just
 * the new value. This function receives the previous value as a parameter and returns
 * the updated value.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  /**
   * Bad; `setCount` will change `count` and since `count` is a useEffect dependency, when
   * `count` changes the useEffect will re-run and update `count` again, resulting in an
   * infinite loop, and `count` will quickly increase infinitely. You could "fix" it
   * by removing count as a dependency and disabling the eslint warning. However, if you
   * wanted to change this so that `setCount` occurs after a delay:
   *
   *   setTimeout(() => setCount(count + 1), 1000);
   *
   * You can see that the counter fails to count all the url changes when you type quickly.
   * This is because the function inside setTimeout is a closure that captures the `count`
   * variable, and the variable becomes stale. To fix this, use the argument provided in the
   * setCount function, which is always up to date:
   *
   *   setTimeout(() => setCount((prevCount) => prevCount + 1), 1000);
   */
  // React.useEffect(() => {
  //   setCount(count + 1);
  // }, [url, count]);

  React.useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [url]);

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
      <img src={url} alt="Cat" />
    </>
  );
};

export default Example;
