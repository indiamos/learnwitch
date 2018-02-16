import { createMuiTheme } from 'material-ui/styles';
// import indigo from 'material-ui/colors/indigo';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

// const getTheme = () => {
//   const overwrites = {
//     palette: {
//       primary1Color: '#ab47bc',
//       accent1Color: '#7cb342',
//       primary2Color: '#7b1fa2',
//       pickerHeaderColor: '#8bc34a',
//     },
//     textField: {
//       errorColor: '#e91e63',
//     },
//   };
//   return getMuiTheme(baseTheme, overwrites);
// };

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export default theme;
