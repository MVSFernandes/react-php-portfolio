import { render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => {
  const React = require('react');

  return {
    BrowserRouter: ({ children }) => React.createElement('div', null, children),
    Routes: ({ children }) => React.createElement('div', null, children),
    Route: () => null,
    Link: ({ children, to, ...props }) => React.createElement('a', { href: to, ...props }, children),
    useNavigate: () => jest.fn(),
    useParams: () => ({}),
  };
}, { virtual: true });

const App = require('./App').default;

test('renders the portfolio loading state', () => {
  render(<App />);
  expect(screen.getByText(/carregando portfólio/i)).toBeInTheDocument();
});
