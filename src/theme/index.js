import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795', // cor principal (teal.500)
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044',
  },
  expense: {
    500: '#E53E3E', // vermelho para despesas
  },
  income: {
    500: '#38A169', // verde para receitas
  },
};

const fonts = {
  heading: '"Inter", sans-serif',
  body: '"Inter", sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'dark' ? 'teal.500' : 'teal.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'teal.600' : 'teal.600',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'teal.500' : 'teal.500',
        color: props.colorMode === 'dark' ? 'teal.500' : 'teal.500',
        _hover: {
          bg: props.colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50',
        },
      }),
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  config,
});

export default theme; 