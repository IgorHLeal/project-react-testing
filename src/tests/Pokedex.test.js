import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

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

    const pokemonNameTestId = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonNameTestId).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ pokeFavorites() }
      pokemons={ pokemons }
    />);

    // Acessar todos os botões
    const btnNextPokeTest = screen.getByRole('button', { name: /Próximo pokémonTeste/i });
    expect(btnNextPokeTest).toBeDefined();

    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeDefined();

    const btnEletric = screen.getByRole('button', { name: /Electric/i });
    expect(btnEletric).toBeDefined();

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    const btnFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(btnFire);
    const fireNext = screen.getByTestId(/pokemon-name/i);
    const charm = screen.getByText(/charmander/i);
    expect(fireNext).toBe(charm);
    expect(btnFire).toBeDefined();

    userEvent.click(btnNextPokeTest);

    const rapidash = screen.getByRole('img', { name: 'Rapidash sprite' });
    const urlRapidash = 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png';
    expect(rapidash.src).toBe(urlRapidash);
    expect(rapidash).toBeDefined();
    // Final da verificação de pokemons do mesmo tipo

    const btnBug = screen.getByRole('button', { name: /Bug/i });
    expect(btnBug).toBeDefined();

    const btnPoison = screen.getByRole('button', { name: /Poison/i });
    expect(btnPoison).toBeDefined();

    const btnPsychic = screen.getByRole('button', { name: /Psychic/i });
    expect(btnPsychic).toBeDefined();

    const btnNormal = screen.getByRole('button', { name: /Normal/i });
    expect(btnNormal).toBeDefined();

    const btnDragon = screen.getByRole('button', { name: /Dragon/i });
    expect(btnDragon).toBeDefined();

    // Verifica se todos os typeButtons estão na tela
    const buttonTestId = screen.getAllByTestId(/pokemon-type-button/i);
    const totalButtons = 7;
    expect(buttonTestId).toHaveLength(totalButtons);
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      isPokemonFavoriteById={ pokeFavorites() }
      pokemons={ pokemons }
    />);
    // O texto do botão deve ser All;
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);
    expect(btnAll).toBeDefined();

    // Ao carregar a página, o filtro selecionado deverá ser All;
    const btnNextPokeTest = screen.getByRole('button', { name: /Próximo pokémonTeste/i });
    userEvent.click(btnNextPokeTest);

    const fireNext = screen.getByTestId(/pokemon-name/i);
    const charm = screen.getByText(/charmander/i);
    expect(fireNext).toBe(charm);
  });
});

// ---------- REFERÊNCIAS ----------
// new Set: https://vidafullstack.com.br/javascript/new-set-com-javascript/
// toHaveLength: https://jest-bot.github.io/jest/docs/expect.html#tohavelengthnumber

/*  // O new Set() serve para tirar valores repetidos de uma array
    const pokemonsTypes = new Set(pokemons.map(({ type }) => type));

// Aqui o length não funcionou ao final da linha 81
  const typeButtons = screen.getAllByTestId('pokemon-type-button');
  expect(typeButtons).toHaveLength(pokemonsTypes.size);

  const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });

  const pokemonTypeTestId = screen.getByTestId('pokemon-type');

  pokemonsTypes.forEach((type) => {
    const buttonType = screen.getByRole('button', { name: type });
    expect(buttonType).toBeDefined();
  });
*/
