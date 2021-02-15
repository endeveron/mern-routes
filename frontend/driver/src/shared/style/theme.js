// import { createMuiTheme } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ukUA } from '@material-ui/core/locale';

import colors from '../style/sass/color-vars.scss';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryFillColor,
      dark: colors.primaryFillDarkColor,
    },
    secondary: {
      main: colors.secondaryTextColor,
      dark: colors.secondaryTextDArkenColor,
    }
  },
  overrides: {

    MuiFab: {
      root: {
        position: 'fixed',
        right: '1.125rem',
        bottom: '1.125rem',
        color: colors.inverseTextColor,
        backgroundColor: colors.primaryFillColor,
        boxShadow: `0 0.25rem 0.625rem 0 ${ colors.fabShadowColor }`,

        '&:hover': {
          backgroundColor: colors.primaryFillDarkColor,
          boxShadow: `0 0.25rem 0.5rem 0 ${ colors.fabShadowColor }`
        },
      }
    },

    MuiButton: {

      root: {
        padding: '0.5rem 2rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
      },

      contained: {
        color: colors.primaryFillColor,
        fontWeight: 700,
        backgroundColor: '#ffffff',
        boxShadow: '0 0.5rem 1.25rem 0 rgba(46, 55, 59, 0.1)',

        '&$disabled': {
          fontWeight: 400,
          color: colors.buttonDisabledTextColor,
          backgroundColor: colors.buttonDisabledFillColor
        },
      },
      containedPrimary: {
        color: '#ffffff',
        fontWeight: 500,
        boxShadow: '0 0.5rem 1.25rem 0 rgba(17, 122, 91, 0.3)',
      },
    },

    MuiOutlinedInput: {
      input: {
        fontSize: '1.125rem',
        lineHeight: '1.375rem',
        fontWeight: 500,
        padding: '1rem'
      }
    },

    MuiDialog: {
      paper: {
        borderRadius: '1rem'
      },

      paperWidthSm: {
        minWidth: '18rem',
        maxWidth: '25rem'
      }
    },

    MuiDialogTitle: {
      root: {
        padding: '1.5rem'
      }
    },

    MuiDialogContent: {
      root: {
        padding: '0 1.5rem'
      }
    },

    MuiDialogContentText: {
      root: {
        marginBottom: '0'
      }
    },

    MuiDialogActions: {
      root: {
        padding: '0'
      }
    },

    MuiPickersBasePicker: {
      pickerView: {
        minWidth: 'unset'
      }
    }
  },
}, ukUA);
