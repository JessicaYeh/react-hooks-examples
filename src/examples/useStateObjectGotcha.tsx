import React from 'react';
import { TextField, Switch, FormControlLabel, Badge } from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import useStyles from './util/useStyles';

interface State {
  text: string;
  monochrome: boolean;
}

interface Options {
  text: string;
  monochrome: boolean;
  width?: number;
  height?: number;
}

const getUrl = (options: Options) => {
  const { text, monochrome, width = 600, height = 400 } = options;
  return `https://cataas.com/cat${
    text ? `/says/${text}` : ''
  }?width=${width}&height=${height}${monochrome ? '&filter=mono' : ''}`;
};

interface Props {
  onOptionsChange?: (options: Options) => void;
}

const Example: React.FC<Props> = ({ onOptionsChange }) => {
  const classes = useStyles();

  const [state, setState] = React.useState<State>({
    text: '',
    monochrome: false,
  });
  const { text, monochrome } = state;

  // Bad; causes the useEffect with [options] dependency to be called on
  // every re-render because a new options object is created every render
  //   const options: Options = {
  //     // can also just spread ...state into here instead of adding
  //     // text and monochrome and then just use [state] for dependency array
  //     text,
  //     monochrome,
  //     width: 400,
  //     height: 300,
  //   };

  const options: Options = React.useMemo(
    () => ({
      // can also just spread ...state into here instead of adding
      // text and monochrome and then just use [state] for dependency array
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
          onChange={(event) => {
            // //  No warning about immutability!
            // state.text = event.target.value;
            // // Doesn't work, because it's the same object
            // setState(state);

            setState({ ...state, text: event.target.value });
          }}
        />
        <FormControlLabel
          label="Monochrome"
          control={
            <Switch
              checked={monochrome}
              onChange={(event) => {
                setState({ ...state, monochrome: event.target.checked });
              }}
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
