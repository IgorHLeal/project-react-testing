import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Verifica se as informações detalhadas são mostradas na tela', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();

    const headingDetails = screen.getByRole('heading',
      { name: /details/i, level: 2 });
    expect(headingDetails).toBeDefined();

    const headingSummary = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    expect(headingSummary).toBeDefined();

    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeDefined();
  });

  it('Verifica se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const headingLocation = screen.getByRole('heading',
      { name: /Game Locations/i, level: 2 });
    expect(headingLocation).toBeDefined();

    const img = screen.getAllByRole('img',
      { name: /Pikachu Location/i });
    expect(img).toHaveLength(2);
    const urlOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const urlTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(img[0].src).toBe(urlOne);
    expect(img[1].src).toBe(urlTwo);
  });

  it('Verifica se o usuário pode favoritar um pokémon ', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favoritePokemon = screen.getByRole('checkbox');
    expect(favoritePokemon).toBeDefined();
    userEvent.click(favoritePokemon);

    const imgChecked = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    const url = 'http://localhost/star-icon.svg';
    expect(imgChecked.src).toBe(url);
    expect(imgChecked).toBeDefined();

    const labelFavorite = screen.getByLabelText(/Pokémon Favoritado?/i);
    expect(labelFavorite).toBeDefined();

    /* const ckecked = screen.getAllByText(/is marked as favorite/i);
    expect(ckecked).toBeDefined(); */
  });
});
