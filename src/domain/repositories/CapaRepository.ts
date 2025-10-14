import { Capa } from '../entities/Capa';

export interface CapaRepository {
  findAll(): Promise<Capa[]>;
  findById(id: string): Promise<Capa | null>;
  findPopulares(): Promise<Capa[]>;
  findRecomendadas(): Promise<Capa[]>;
  findByCategoria(categoria: string): Promise<Capa[]>;
  search(termo: string): Promise<Capa[]>;
  save(capa: Capa): Promise<void>;
  update(capa: Capa): Promise<void>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByNome(nome: string): Promise<boolean>;
  count(): Promise<number>;
  countByCategoria(categoria: string): Promise<number>;
}