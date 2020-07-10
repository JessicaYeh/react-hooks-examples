import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';
import { expensiveHashFunc } from './util/expensiveHashFunc';
import { useDebounce } from './util/useDebounce';

/**
 * Example 08 - useMemo
 *
 * A demo of an extreme case of a super expensive function that we use to encode the text.
 * It's easy to see that the UI is blocked while that function runs, and it happens on
 * every re-render. We can optimize with React.useMemo to only recompute the encoded text
 * whenever the underlying text value changes.
 *
 * From React docs: "You may rely on useMemo as a performance optimization, not as a semantic guarantee."
 * https://reactjs.org/docs/hooks-reference.html#usememo
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const debouncedText = useDebounce(text);

  /**
   * Bad; the expensive function gets run on every re-render regardless of whether `text` changes
   */
  // const encodedText = expensiveHashFunc(debouncedText);

  /**
   * Note: the UI will still be occasionally blocked with this approach, but significantly less noticeable!
   * To keep the UI unblocked all the time, you would need to delegate this expensive function to a web worker
   * (simply putting this function in an async function doesn't work, because JS is single threaded)
   */
  const encodedText = React.useMemo(() => expensiveHashFunc(debouncedText), [debouncedText]);

  const url = `https://cataas.com/cat${encodedText ? `/says/${encodedText}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  const debouncedUrl = useDebounce(url);

  const [count, setCount] = React.useState(0);
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
