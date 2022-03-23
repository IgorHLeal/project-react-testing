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

/*  const pokemonNameTestId = 'pokemon-name'; */
/* const pokemonTypeTestId = 'pokemon-type'; */

describe('Testes do componente Pokedex', () => {
  // Ideia do reduce levantada na monitoria com o Gabriel;
  const pokeFavorites = () => pokemons.reduce((acc, curr) => {
    acc[curr.id] = false;
    return acc;
  }, {});

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

    pokemons.forEach((poke) => {
      screen.getByText(poke.name);
      userEvent.click(btn);
    });
    // Resolução encontrada durante a monitoria do Gabriel;
    // Recebi ajuda do Leandro Bonfim - Turma 19A para entender porque daria certo;
    // Retorna para o primeiro pokemon após clicar no último
    screen.getAllByText('Pikachu');
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ pokeFavorites() }
      pokemons={ pokemons }
    />);

    const pokemonNameTestId = screen.getAllByTestId('pokemon-name');
    expect(pokemonNameTestId).toHaveLength(1);
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
