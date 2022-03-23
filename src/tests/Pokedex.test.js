import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

/* const pokeFavorite = () => {
  const isPokemonFavoriteById = pokemons.map(({ id }) => id);

  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
}; */

/* const pokemonTypeTestId = 'pokemon-type'; */

describe('Testes do componente Pokedex', () => {
  // Ideia do reduce levantada na monitoria com o Gabriel;
  const pokemonNameTestId = 'pokemon-name';

  const pokeFavorites = () => pokemons.reduce((acc, curr) => {
    acc[curr.id] = false;
    return acc;
  }, {});

  console.log(pokeFavorites());

  it('Verifica se página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });

    expect(headingPokedex).toBeDefined();
  });

  it('Verifica se ao clicar no botão o próximo pokemon é exibido', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ pokeFavorites() }
      pokemons={ pokemons }
    />);

    // O botão deve conter o texto Próximo pokémon
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btn).toBeDefined();

    const name = screen.getByTestId(pokemonNameTestId);

    pokemons.forEach((poke) => {
      expect(name.innerText).toBe(poke);
      userEvent.click(btn);
    });
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {

  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;

    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;

    // O botão All precisa estar sempre visível
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    // O texto do botão deve ser All;

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

    // Ao carregar a página, o filtro selecionado deverá ser All;
  });
});
