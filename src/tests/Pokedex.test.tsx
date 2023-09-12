import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokédex', () => {
  it('Teste se a página contém um heading h2 com  text Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const headingText = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(headingText).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    await userEvent.click(buttonNext);
    expect(buttonNext).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Charmander');
  });
  it('Teste se é exibido apenas um Pokémon por vez', async () => {
    renderWithRouter(<App />);
    const singlePokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    await userEvent.click(singlePokemon);
    expect(screen.getAllByTestId(/pokemon-name/i)).toHaveLength(1);
  });
  it('Teste se a pokédex tem os botões de filtro', async () => {
    renderWithRouter(<App />);
    const allPokemon = screen.getAllByTestId('pokemon-type-button');
    expect(allPokemon).toHaveLength(7);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const FireButton = screen.getByRole('button', { name: /fire/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    const singlePokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    await userEvent.click(FireButton);
    expect(pokemonName).toHaveTextContent(/charmander/i);
    await userEvent.click(singlePokemon);
    expect(pokemonName).toHaveTextContent(/rapidash/i);
    await userEvent.click(singlePokemon);
    expect(pokemonName).toHaveTextContent(/charmander/i);
    expect(FireButton).toHaveTextContent(/fire/i);
    expect(FireButton).toBeInTheDocument();
  });
  it('Teste se a pokedéx contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const bugButton = screen.getAllByTestId('pokemon-type-button')[2];
    const pokemonName = screen.getByTestId('pokemon-name');
    await userEvent.click(bugButton);
    expect(pokemonName).toHaveTextContent('Caterpie');
    await userEvent.click(buttonAll);
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toBeEnabled();
  });
});
