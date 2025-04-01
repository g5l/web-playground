import { render as testingLibraryRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store';

export function render(ui: React.ReactNode, { route = '/' } = {}) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>
        <MantineProvider>
          <MemoryRouter initialEntries={[route]}>
            {children}
          </MemoryRouter>
        </MantineProvider>
      </Provider>
    ),
  });
}