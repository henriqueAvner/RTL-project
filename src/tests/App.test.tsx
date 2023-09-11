import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('Componente App', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const textHome = screen.getByRole('link', { name: 'Home' });
  const textAbout = screen.getByRole('link', { name: 'About' });
  const textFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });

  await userEvent.click(textHome);
  expect(textHome).toHaveAttribute('href', '/');
  await userEvent.click(textAbout);
  expect(textAbout).toHaveAttribute('href', '/about');
  await userEvent.click(textFavorite);
  expect(textFavorite).toHaveAttribute('href', '/favorites');

  expect(textHome).toBeInTheDocument();
  expect(textAbout).toBeInTheDocument();
  expect(textFavorite).toBeInTheDocument();
});
