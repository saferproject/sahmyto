import { createTheme } from "@mui/material";

export const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: "#ffd3b3",
      main: "#ff8500",
      dark: "#e66203",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ced4da",
      main: "#b5cbdb",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: "var(--font-yekan-bakh), sans-serif",
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "large",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true
      },
      styleOverrides: {
        root: {
          color: "oklch(30.262% 0.10854 266.981)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          // Default border
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ced4da",
          },

          // Hover border
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "#1976d2",
          // },

          // Focused border
          // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "#d32f2f",
          // },

          // Error state
          // "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "#f44336",
          // },

          // Disabled state
          // "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "#e0e0e0",
          // },
        },
      },
    },
  },
});
