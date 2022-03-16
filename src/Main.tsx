import React, { FC, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { AntOverrideStyles } from 'styles/antOverride';
import { GlobalStyle } from 'styles/global';
import { theme } from 'theme';

interface Props {
  children: ReactNode;
}

const Main: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
      <AntOverrideStyles />
    </ThemeProvider>
  );
};

export default Main;
