import { Rating } from '../domain/value-objects/Rating';

describe('Rating Value Object', () => {
  describe('Criação', () => {
    it('deve criar rating válido', () => {
      const rating = Rating.create(4);
      expect(rating.value).toBe(4);
    });

    it('deve aceitar valores de 1 a 5', () => {
      for (let i = 1; i <= 5; i++) {
        const rating = Rating.create(i);
        expect(rating.value).toBe(i);
      }
    });

    it('deve falhar com valor menor que 1', () => {
      expect(() => Rating.create(0)).toThrow('Rating deve estar entre 1 e 5');
      expect(() => Rating.create(-1)).toThrow('Rating deve estar entre 1 e 5');
    });

    it('deve falhar com valor maior que 5', () => {
      expect(() => Rating.create(6)).toThrow('Rating deve estar entre 1 e 5');
      expect(() => Rating.create(10)).toThrow('Rating deve estar entre 1 e 5');
    });

    it('deve falhar com valor não inteiro', () => {
      expect(() => Rating.create(3.5)).toThrow('Rating deve ser um número inteiro');
      expect(() => Rating.create(4.1)).toThrow('Rating deve ser um número inteiro');
    });
  });

  describe('Métodos', () => {
    it('deve verificar igualdade', () => {
      const rating1 = Rating.create(4);
      const rating2 = Rating.create(4);
      const rating3 = Rating.create(3);

      expect(rating1.equals(rating2)).toBe(true);
      expect(rating1.equals(rating3)).toBe(false);
    });

    it('deve converter para string', () => {
      const rating = Rating.create(4);
      expect(rating.toString()).toBe('4/5');
    });

    it('deve identificar rating alto', () => {
      expect(Rating.create(4).isHighRating()).toBe(true);
      expect(Rating.create(5).isHighRating()).toBe(true);
      expect(Rating.create(3).isHighRating()).toBe(false);
    });

    it('deve identificar rating baixo', () => {
      expect(Rating.create(1).isLowRating()).toBe(true);
      expect(Rating.create(2).isLowRating()).toBe(true);
      expect(Rating.create(3).isLowRating()).toBe(false);
    });
  });
});