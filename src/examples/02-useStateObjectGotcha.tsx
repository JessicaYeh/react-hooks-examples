import React from 'react';
import { TextField, Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';

interface State {
  text: string;
  monochrome: boolean;
}

/**
 * Example 02 - gotchas of useState with object value
 *
 * The `text` and `monochrome` are combined into a single object in the state,
 * to illustrate some things that can go wrong. If you need to manage state objects,
 * look into using useReducer, which is better suited than useState for objects.
 */

const Example: React.FC = () => {
  const classes = useStyles();

  const [state, setState] = React.useState<State>({
    text: '',
    monochrome: false,
  });
  const { text, monochrome } = state;

  const url = `https://cataas.com/cat${text ? `/says/${text}` : ''}?width=600&height=400${
    monochrome ? '&filter=mono' : ''
  }`;

  return (
    <>
      <div className={classes.form}>
        <TextField
          label="Text"
          variant="outlined"
          value={text}
          onChange={(event) => {
            /**
             * Bad; Doesn't work, because to React the state is still the same object (uses Object.is),
             * so there will not be a re-render with the new state
             */
            // state.text = event.target.value;
            // setState(state);

            /**
             * Bad; This won't work because setState needs an entire state object passed to it,
             * it won't be able to automatically merge properties into the state value, like
             * what the this.setState function does in a React class component.
             * TypeScript will show an error here, but plain JS won't.
             */
            // setState({ text: event.target.value });

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
      </div>
      <img src={url} alt="Cat" />
    </>
  );
};

export default Example;
