import React from 'react';
import { TextField, Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';

/**
 * Example 01 - useState
 *
 * Loads a cat image from the Cat as a Service (Cataas) API, given an
 * optional text value to show on the image and a monochrome toggle.
 *
 * Has a controlled TextField and Switch that update a `text` and `monochrome`
 * state values, which are used in building a URL pointing to a cat image.
 */

const Example: React.FC = () => {
  // A hook provided by MaterialUI library for using styles
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = `https://cataas.com/cat${
    text ? `/says/${text}` : ''
  }?width=600&height=400${monochrome ? '&filter=mono' : ''}`;

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
      </div>
      <img src={url} alt="Cat" />
    </>
  );
};

export default Example;
