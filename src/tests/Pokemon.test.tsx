import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', async () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const weightPokemon = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weightPokemon).toBeInTheDocument();

    const pokemonImg = screen.getByAltText(/pikachu sprite/i);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemon/25');
  });
  it('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);
    const testText = screen.getByText(/summary/i);
    expect(testText).toBeInTheDocument();
  });
  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, em que <id> é o id do Pokémon cujos detalhes se deseja ver.', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);
    expect(window.location.pathname).toBe('/pokemon/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    await userEvent.click(linkDetails);

    const iconPokemon = screen.getByRole('checkbox', { name: /favoritado/i });
    await userEvent.click(iconPokemon);

    const favoritePokemon = screen.getByRole('link', { name: /favorite/i });
    await userEvent.click(favoritePokemon);

    const starPokemon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starPokemon).toBeInTheDocument();
    expect(starPokemon).toHaveAttribute('src', '/star-icon.png');
  });
});
