import { Rating } from '../Rating';

describe('Rating Value Object', () => {
  it('deve criar rating válido entre 1 e 5', () => {
    const rating = Rating.create(4);
    expect(rating.value).toBe(4);
  });

  it('deve aceitar rating mínimo de 1', () => {
    const rating = Rating.create(1);
    expect(rating.value).toBe(1);
  });

  it('deve aceitar rating máximo de 5', () => {
    const rating = Rating.create(5);
    expect(rating.value).toBe(5);
  });

  it('deve rejeitar rating menor que 1', () => {
    expect(() => Rating.create(0)).toThrow('Rating deve estar entre 1 e 5');
  });

  it('deve rejeitar rating maior que 5', () => {
    expect(() => Rating.create(6)).toThrow('Rating deve estar entre 1 e 5');
  });

  it('deve rejeitar rating com valor decimal', () => {
    expect(() => Rating.create(3.5)).toThrow('Rating deve ser um número inteiro');
  });

  it('deve formatar corretamente para exibição', () => {
    const rating = Rating.create(4);
    expect(rating.toString()).toBe('4/5');
  });

  it('deve identificar rating alto corretamente', () => {
    const highRating = Rating.create(4);
    const lowRating = Rating.create(3);
    
    expect(highRating.isHighRating()).toBe(true);
    expect(lowRating.isHighRating()).toBe(false);
  });

  it('deve comparar ratings corretamente', () => {
    const rating1 = Rating.create(3);
    const rating2 = Rating.create(3);
    const rating3 = Rating.create(4);

    expect(rating1.equals(rating2)).toBe(true);
    expect(rating1.equals(rating3)).toBe(false);
  });
});