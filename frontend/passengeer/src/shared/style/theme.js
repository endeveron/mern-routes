// import { createMuiTheme } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

import colors from '../style/sass/color-vars.scss';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primaryFillColor,
      dark: colors.primaryFillDarkColor,
    }
  },
  overrides: {

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
        width: '11rem',
        fontSize: '1.25rem',
        fontWeight: 500,
        padding: '1rem'
      }
    },

    MuiDialog: {
      paper: {
        borderRadius: '1rem'
      },

      paperWidthSm: {
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
    }
  },
});
