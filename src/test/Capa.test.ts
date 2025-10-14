// Testes para a entidade Capa
// Para executar: npm test

import { Capa } from '../domain/entities/Capa';
import { Rating } from '../domain/value-objects/Rating';
import { PrecoValue } from '../domain/value-objects/PrecoValue';
import { ImagemValue } from '../domain/value-objects/ImagemValue';

describe('Capa Entity', () => {
  describe('Criação de Capa', () => {
    it('deve criar uma capa válida', () => {
      const capa = Capa.create(
        'test-id',
        'Capa Teste',
        ImagemValue.create('./image/teste.png'),
        Rating.create(4),
        PrecoValue.create(25.90),
        'Teste'
      );

      expect(capa.id).toBe('test-id');
      expect(capa.nome).toBe('Capa Teste');
      expect(capa.categoria).toBe('Teste');
      expect(capa.popular).toBe(false);
      expect(capa.recomendada).toBe(false);
    });

    it('deve falhar com ID vazio', () => {
      expect(() => {
        Capa.create(
          '',
          'Nome',
          ImagemValue.create('./test.png'),
          Rating.create(4),
          PrecoValue.create(25.90),
          'Categoria'
        );
      }).toThrow('ID da capa é obrigatório');
    });

    it('deve falhar com nome vazio', () => {
      expect(() => {
        Capa.create(
          'id',
          '',
          ImagemValue.create('./test.png'),
          Rating.create(4),
          PrecoValue.create(25.90),
          'Categoria'
        );
      }).toThrow('Nome da capa é obrigatório');
    });

    it('deve falhar com categoria vazia', () => {
      expect(() => {
        Capa.create(
          'id',
          'Nome',
          ImagemValue.create('./test.png'),
          Rating.create(4),
          PrecoValue.create(25.90),
          ''
        );
      }).toThrow('Categoria da capa é obrigatória');
    });
  });

  describe('Atualização de propriedades', () => {
    let capa: Capa;

    beforeEach(() => {
      capa = Capa.create(
        'test-id',
        'Capa Teste',
        ImagemValue.create('./image/teste.png'),
        Rating.create(4),
        PrecoValue.create(25.90),
        'Teste'
      );
    });

    it('deve atualizar o nome', () => {
      capa.updateNome('Novo Nome');
      expect(capa.nome).toBe('Novo Nome');
    });

    it('deve falhar ao atualizar com nome vazio', () => {
      expect(() => capa.updateNome('')).toThrow('Nome da capa é obrigatório');
    });

    it('deve atualizar a imagem', () => {
      const novaImagem = ImagemValue.create('./nova-imagem.jpg');
      capa.updateImagem(novaImagem);
      expect(capa.imagem.value).toBe('./nova-imagem.jpg');
    });

    it('deve atualizar o rating', () => {
      const novoRating = Rating.create(5);
      capa.updateRating(novoRating);
      expect(capa.rating.value).toBe(5);
    });

    it('deve atualizar o preço', () => {
      const novoPreco = PrecoValue.create(35.99);
      capa.updatePreco(novoPreco);
      expect(capa.preco.value).toBe(35.99);
    });
  });

  describe('Marcação como popular', () => {
    let capa: Capa;

    beforeEach(() => {
      capa = Capa.create(
        'test-id',
        'Capa Teste',
        ImagemValue.create('./image/teste.png'),
        Rating.create(4),
        PrecoValue.create(25.90),
        'Teste'
      );
    });

    it('deve marcar como popular', () => {
      expect(capa.popular).toBe(false);
      capa.marcarComoPopular();
      expect(capa.popular).toBe(true);
    });

    it('deve desmarcar como popular', () => {
      capa.marcarComoPopular();
      expect(capa.popular).toBe(true);
      capa.desmarcarComoPopular();
      expect(capa.popular).toBe(false);
    });
  });

  describe('Marcação como recomendada', () => {
    let capa: Capa;

    beforeEach(() => {
      capa = Capa.create(
        'test-id',
        'Capa Teste',
        ImagemValue.create('./image/teste.png'),
        Rating.create(4),
        PrecoValue.create(25.90),
        'Teste'
      );
    });

    it('deve marcar como recomendada', () => {
      expect(capa.recomendada).toBe(false);
      capa.marcarComoRecomendada();
      expect(capa.recomendada).toBe(true);
    });

    it('deve desmarcar como recomendada', () => {
      capa.marcarComoRecomendada();
      expect(capa.recomendada).toBe(true);
      capa.desmarcarComoRecomendada();
      expect(capa.recomendada).toBe(false);
    });
  });

  describe('Serialização', () => {
    it('deve converter para primitivos', () => {
      const capa = Capa.create(
        'test-id',
        'Capa Teste',
        ImagemValue.create('./image/teste.png'),
        Rating.create(4),
        PrecoValue.create(25.90),
        'Teste',
        true,
        true
      );

      const primitivos = capa.toPrimitives();

      expect(primitivos).toEqual({
        id: 'test-id',
        nome: 'Capa Teste',
        imagemUrl: './image/teste.png',
        rating: 4,
        preco: 25.90,
        categoria: 'Teste',
        popular: true,
        recomendada: true,
        dataCreated: expect.any(Date)
      });
    });

    it('deve criar a partir de primitivos', () => {
      const data = {
        id: 'test-id',
        nome: 'Capa Teste',
        imagemUrl: './image/teste.png',
        rating: 4,
        preco: 25.90,
        categoria: 'Teste',
        popular: true,
        recomendada: true
      };

      const capa = Capa.fromPrimitives(data);

      expect(capa.id).toBe('test-id');
      expect(capa.nome).toBe('Capa Teste');
      expect(capa.popular).toBe(true);
      expect(capa.recomendada).toBe(true);
    });
  });
});