import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente PokemonDetails', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const testText = screen.getAllByRole('heading', { level: 2 })[1];
    expect(testText).toHaveTextContent(/summary/i);

    const pokemonP = screen.getByText(/this intelligent pokémon/i);
    expect(pokemonP).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);

    const testText = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(testText).toHaveTextContent(/game locations of pikachu/i);

    const locationsPoke = screen.getAllByAltText(/Pikachu location/i);
    expect(locationsPoke).toHaveLength(2);
    expect(locationsPoke[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationsPoke[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationsPoke[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationsPoke[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);

    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(checkFavorite).toBeInTheDocument();

    await userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();
    await userEvent.click(checkFavorite);
    expect(checkFavorite).not.toBeChecked();

    const labelCheck = screen.getByLabelText(/pokémon favoritado/i);
    expect(labelCheck).toBeInTheDocument();
  });
});
