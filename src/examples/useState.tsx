import React from 'react';
import { TextField, Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './useStyles';

const Example: React.FC = () => {
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
