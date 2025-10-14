export class Rating {
  private constructor(private readonly _value: number) {}

  static create(value: number): Rating {
    if (value < 1 || value > 5) {
      throw new Error('Rating deve estar entre 1 e 5');
    }
    
    if (!Number.isInteger(value)) {
      throw new Error('Rating deve ser um número inteiro');
    }

    return new Rating(value);
  }

  get value(): number {
    return this._value;
  }

  equals(other: Rating): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return `${this._value}/5`;
  }

  isHighRating(): boolean {
    return this._value >= 4;
  }

  isLowRating(): boolean {
    return this._value <= 2;
  }
}