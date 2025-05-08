import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E6F5FF',
    100: '#CCE8FF',
    200: '#99D1FF',
    300: '#66BAFF',
    400: '#33A3FF',
    500: '#008CFF', // cor principal
    600: '#0070CC',
    700: '#005499',
    800: '#003866',
    900: '#001C33',
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
        bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
        color: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
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