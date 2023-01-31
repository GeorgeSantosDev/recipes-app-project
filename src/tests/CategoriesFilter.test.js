import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const beefCategory = () => screen.getByTestId(/beef-category-filter/i);
const allCategories = () => screen.queryAllByTestId(/category-filter/, '');

describe('verifica se os filtros renderiza corretamente', () => {
  test('Verifica a renderização da categoria beef', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    await waitFor(
      () => {
        expect(beefCategory()).toBeInTheDocument();
      },
    );
  });
  test('Verifica a renderização do componente de categorias contendo 6 categorias', async () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <App />
      </MemoryRouter>,
    );
    await waitFor(
      () => {
        expect(allCategories()).toHaveLength(6);
      },
    );
  });
});
