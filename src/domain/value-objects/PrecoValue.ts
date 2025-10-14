export class PrecoValue {
  private constructor(private readonly _value: number) {}

  static create(value: number): PrecoValue {
    if (value < 0) {
      throw new Error('Preço não pode ser negativo');
    }
    
    if (!Number.isFinite(value)) {
      throw new Error('Preço deve ser um número válido');
    }

    // Arredonda para 2 casas decimais
    const roundedValue = Math.round(value * 100) / 100;
    return new PrecoValue(roundedValue);
  }

  get value(): number {
    return this._value;
  }

  equals(other: PrecoValue): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return `R$ ${this._value.toFixed(2).replace('.', ',')}`;
  }

  isExpensive(): boolean {
    return this._value > 50;
  }

  isAffordable(): boolean {
    return this._value <= 30;
  }

  applyDiscount(percentage: number): PrecoValue {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Percentual de desconto deve estar entre 0 e 100');
    }
    
    const discountedValue = this._value * (1 - percentage / 100);
    return PrecoValue.create(discountedValue);
  }
}