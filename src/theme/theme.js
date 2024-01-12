import { createTheme } from "@material-ui/core";
import { alpha } from '@mui/material/styles';


const FONT_PRIMARY = 'Public Sans, sans-serif'; // Google Font
function pxToRem(value) {
  return `${value / 16}rem`;
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

// custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    background: {
      default: "#ffffff",
    },
    green: {
      main: "rgb(0, 82, 73)",
      light: "rgb(200, 250, 205)",
      lighter: "rgba(0, 171, 85, 0.08)",
      dark: "rgb(0, 123, 85)",
      darker: "rgb(0, 171, 85)",
    },
    blue: {
      main: "rgb(4, 41, 122)",
      dark: "rgb(12, 83, 183)",
      light: "rgb(208, 242, 255)",
    },
    yellow: {
      main: "rgb(122, 79, 1)",
      dark: "rgb(183, 129, 3)",
      light: "rgb(255, 247, 205)",
    },
    maroon: {
      main: "rgb(122, 12, 46)",
      dark: "rgb(183, 33, 54)",
      light: "rgb(255, 231, 217)",
    },
    gray: {
      main: "rgb(99, 115, 129)",
      light: "rgb(223, 223, 223)",
      lighter: "rgb(244, 246, 248)",
    },
    red: {
      main: "rgb(255, 72, 66)",
    },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
    grey: GREY,
    text: {
      disabled: GREY[500]
    }
  },
  customShadows: {
    z20: {
      default: '5px 5px 12px -1px rgba(0,0,0,0.4)'
    }
  },
  shape: {
    borderRadius: 8,
    borderRadiusSm: 12,
    borderRadiusMd: 16
  },
  typography: {
    fontFamily: FONT_PRIMARY,
    body1: {
      lineHeight: 1.5,
      fontSize: pxToRem(16)
    },
    body2: {
      lineHeight: 22 / 14,
      fontSize: pxToRem(14)
    },
  }

});

export default theme;
