import { PrecoValue } from '@/domain/value-objects/PrecoValue';

describe('PrecoValue Value Object', () => {
  it('deve criar preço válido', () => {
    const preco = PrecoValue.create(29.90);
    expect(preco.value).toBe(29.90);
  });

  it('deve aceitar preço zero', () => {
    const preco = PrecoValue.create(0);
    expect(preco.value).toBe(0);
  });

  it('deve rejeitar preço negativo', () => {
    expect(() => PrecoValue.create(-10)).toThrow('Preço não pode ser negativo');
  });

  it('deve rejeitar preço inválido', () => {
    expect(() => PrecoValue.create(Infinity)).toThrow('Preço deve ser um número válido');
    expect(() => PrecoValue.create(NaN)).toThrow('Preço deve ser um número válido');
  });

  it('deve formatar preço brasileiro corretamente', () => {
    const preco = PrecoValue.create(29.90);
    expect(preco.toString()).toBe('R$ 29,90');
  });

  it('deve formatar preço zero corretamente', () => {
    const preco = PrecoValue.create(0);
    expect(preco.toString()).toBe('R$ 0,00');
  });

  it('deve arredondar para 2 casas decimais', () => {
    const preco = PrecoValue.create(29.999);
    expect(preco.value).toBe(30.00);
  });

  it('deve comparar preços corretamente', () => {
    const preco1 = PrecoValue.create(25.50);
    const preco2 = PrecoValue.create(25.50);
    const preco3 = PrecoValue.create(30.00);

    expect(preco1.equals(preco2)).toBe(true);
    expect(preco1.equals(preco3)).toBe(false);
  });

  it('deve identificar se é preço caro', () => {
    const precoCaro = PrecoValue.create(75.00);
    const precoBarato = PrecoValue.create(25.00);

    expect(precoCaro.isExpensive()).toBe(true);
    expect(precoBarato.isExpensive()).toBe(false);
  });

  it('deve identificar se é preço acessível', () => {
    const precoAcessivel = PrecoValue.create(25.00);
    const precoMedio = PrecoValue.create(45.00);

    expect(precoAcessivel.isAffordable()).toBe(true);
    expect(precoMedio.isAffordable()).toBe(false);
  });

  it('deve calcular desconto corretamente', () => {
    const precoOriginal = PrecoValue.create(100.00);
    const precoComDesconto = precoOriginal.applyDiscount(20);

    expect(precoComDesconto.value).toBe(80.00);
  });

  it('deve aplicar desconto de 100%', () => {
    const preco = PrecoValue.create(50.00);
    const precoGratis = preco.applyDiscount(100);

    expect(precoGratis.value).toBe(0);
  });

  it('deve rejeitar desconto inválido', () => {
    const preco = PrecoValue.create(100.00);
    
    expect(() => preco.applyDiscount(-5)).toThrow('Percentual de desconto deve estar entre 0 e 100');
    expect(() => preco.applyDiscount(150)).toThrow('Percentual de desconto deve estar entre 0 e 100');
  });
});