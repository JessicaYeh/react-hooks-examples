import React from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';
import useStyles from './util/useStyles';
import { getUrl } from './util/getUrl';
import { useDebounce } from './util/useDebounce';

export interface Theme {
  primary: string;
  spacing: {
    small: number;
  };
}
const ThemeContext = React.createContext<Theme>({
  primary: '#000',
  spacing: { small: 4 },
});
const useTheme = () => React.useContext<Theme>(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;

interface CatTextField {
  meow: () => string;
}

const CatTextField = React.forwardRef<
  CatTextField,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const theme = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => ({
    meow: () => {
      const value = inputRef.current?.value;
      if (!value) {
        return '';
      }
      return `MEOW! ${value}`;
    },
  }));

  return (
    <label>
      Text:
      <input
        style={{ padding: theme.spacing.small, borderColor: theme.primary }}
        ref={inputRef}
        placeholder="Meow"
        {...props}
      />
    </label>
  );
});

const Example: React.FC = () => {
  const classes = useStyles();

  const [text, setText] = React.useState('');
  const [monochrome, setMonochrome] = React.useState(false);

  const url = getUrl({ text, monochrome });

  const debouncedUrl = useDebounce(url);

  const inputRef = React.useRef<CatTextField>(null);

  return (
    <>
      <div className={classes.form}>
        <CatTextField
          ref={inputRef}
          onKeyUp={() => setText(inputRef.current?.meow() ?? '')}
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
      <img src={debouncedUrl} alt="Cat" />
    </>
  );
};

export default Example;