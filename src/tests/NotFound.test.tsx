import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente notFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heandingNotFound = screen.getByRole('heading', { name: /Page requested not found/i });
    const imgNotFound = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
    expect(heandingNotFound).toBeInTheDocument();
    expect(imgNotFound).toBeInTheDocument();
  });
});
