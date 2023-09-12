import { render, screen } from '@testing-library/react';
import { About } from '../pages';

it('Teste se a página contém um heading h2 com o texto About Pokedéx', async () => {
  render(<About />);
  const headingTitle = screen.getByRole('heading', { level: 2 });
  expect(headingTitle).toHaveTextContent('About Pokédex');

  expect(headingTitle).toBeInTheDocument();
});
it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', async () => {
  render(<About />);
  const firstP = await screen.findByText(/This application/i);
  const secondP = await screen.findByText(/One can filter/i);
  expect(firstP).toBeInTheDocument();
  expect(secondP).toBeInTheDocument();
});
it('teste se a página contém uma imagem', () => {
  render(<About />);
  const imgTxt = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const testImage = screen.getByRole('img');
  expect(testImage).toBeInTheDocument();
  expect(testImage).toHaveAttribute('src', imgTxt);
});
