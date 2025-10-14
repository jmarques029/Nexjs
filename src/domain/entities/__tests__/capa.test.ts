import { Capa } from '../Capa';
import { Rating } from '../../value-objects/Rating';
import { PrecoValue } from '../../value-objects/PrecoValue';
import { ImagemValue } from '../../value-objects/ImagemValue';

describe('Capa Entity', () => {
  const rating = Rating.create(4);
  const preco = PrecoValue.create(25.90);
  const imagem = ImagemValue.create('https://exemplo.com/capa.jpg');

  it('deve criar capa com dados válidos', () => {
    const capa = Capa.create(
      'capa-1',
      'Capa Personalizada',
      imagem,
      rating,
      preco,
      'romance',
      true,
      false
    );
    
    expect(capa.id).toBe('capa-1');
    expect(capa.nome).toBe('Capa Personalizada');
    expect(capa.categoria).toBe('romance');
    expect(capa.popular).toBe(true);
    expect(capa.recomendada).toBe(false);
  });

  it('deve gerar capas com IDs diferentes', () => {
    const capa1 = Capa.create('id-1', 'Capa 1', imagem, rating, preco, 'romance');
    const capa2 = Capa.create('id-2', 'Capa 2', imagem, rating, preco, 'ficção');
    
    expect(capa1.id).toBe('id-1');
    expect(capa2.id).toBe('id-2');
    expect(capa1.id).not.toBe(capa2.id);
  });

  it('deve rejeitar ID vazio', () => {
    expect(() => Capa.create(
      '',
      'Capa Teste',
      imagem,
      rating,
      preco,
      'romance'
    )).toThrow('ID da capa é obrigatório');
  });

  it('deve rejeitar nome vazio', () => {
    expect(() => Capa.create(
      'capa-1',
      '',
      imagem,
      rating,
      preco,
      'romance'
    )).toThrow('Nome da capa é obrigatório');
  });

  it('deve rejeitar categoria vazia', () => {
    expect(() => Capa.create(
      'capa-1',
      'Capa Teste',
      imagem,
      rating,
      preco,
      ''
    )).toThrow('Categoria da capa é obrigatória');
  });

  it('deve criar capa com valores padrão', () => {
    const capa = Capa.create(
      'capa-1',
      'Capa Teste',
      imagem,
      rating,
      preco,
      'romance'
    );
    
    expect(capa.popular).toBe(false);
    expect(capa.recomendada).toBe(false);
  });

  it('deve acessar propriedades da capa', () => {
    const capa = Capa.create(
      'capa-1',
      'Capa Teste',
      imagem,
      rating,
      preco,
      'romance',
      true,
      true
    );
    
    expect(capa.rating).toBe(rating);
    expect(capa.preco).toBe(preco);
    expect(capa.imagem).toBe(imagem);
    expect(capa.dataCreated).toBeInstanceOf(Date);
  });

  it('deve verificar se é uma capa premium (preço alto)', () => {
    const precoAlto = PrecoValue.create(75.00);
    const capa = Capa.create(
      'capa-1',
      'Capa Premium',
      imagem,
      rating,
      precoAlto,
      'técnico'
    );
    
    expect(capa.preco.isExpensive()).toBe(true);
  });

  it('deve verificar se tem rating alto', () => {
    const ratingAlto = Rating.create(5);
    const capa = Capa.create(
      'capa-1',
      'Capa Excelente',
      imagem,
      ratingAlto,
      preco,
      'romance'
    );
    
    expect(capa.rating.isHighRating()).toBe(true);
  });
});