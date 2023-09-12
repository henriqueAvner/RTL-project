import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Testando o componente FavoritePokemon, ao favoritar a página:', () => {
  it('Teste se é exibida a mensagem No favorite pokemon found caso a pessoa não tenha pokémon favorito', () => {
    render(<FavoritePokemon />);
    const noList = screen.getByText(/No favorite pokémon found/i);
    expect(noList).toBeInTheDocument();
  });
  it('Teste se são exibidos apenas os pokémons favoritados', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,

    );
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    await userEvent.click(buttonDetails);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    const checkFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    await userEvent.click(checkFavorite);
    const favPokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    await userEvent.click(favPokemon);
    expect(screen.getAllByTestId(/pokemon-name/i)).toHaveLength(1);
    const favStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favStar).toBeInTheDocument();
  });
});
