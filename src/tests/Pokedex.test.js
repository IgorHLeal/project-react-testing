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
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ pokeFavorites() }
      pokemons={ pokemons }
    />);
    // O new Set() serve para tirar valores repetidos de uma array
    const pokemonsTypes = new Set(pokemons.map(({ type }) => type));

    // O botão All precisa estar sempre visível
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeDefined();

    // Aqui o length não funcionou ao final da linha 81
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(pokemonsTypes.size);

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    const pokemonTypeTestId = screen.getByTestId('pokemon-type');

    pokemonsTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeDefined();
    });
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    // O texto do botão deve ser All;

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;

    // Ao carregar a página, o filtro selecionado deverá ser All;
  });
});

// ---------- REFERÊNCIAS ----------
// new Set: https://vidafullstack.com.br/javascript/new-set-com-javascript/
// toHaveLength: https://jest-bot.github.io/jest/docs/expect.html#tohavelengthnumber
