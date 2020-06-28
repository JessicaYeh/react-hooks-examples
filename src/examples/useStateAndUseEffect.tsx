import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const url = `https://cataas.com/cat${
    text ? `/says/${text}` : ''
  }?width=600&height=400${monochrome ? '&filter=mono' : ''}`;

  // // Bad, infinite loop
  // React.useEffect(() => {
  //   setCount(count + 1);
  // }, [url, count]);

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
