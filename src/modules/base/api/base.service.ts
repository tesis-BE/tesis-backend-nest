import { NotFoundException } from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  DeepPartial,
  ObjectLiteral,
  FindOptionsWhere,
} from 'typeorm';

type IDType = string | number;

export abstract class BaseService<
  T extends ObjectLiteral,
  C extends DeepPartial<T>,
  U extends DeepPartial<T>,
> {
  constructor(private readonly repository: Repository<T>) {}

  async create(createDto: C): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity as DeepPartial<T>);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: IDType): Promise<T> {
    const criteria = { id } as unknown as FindOptionsWhere<T>;
    const entity = await this.repository.findOneBy(criteria);

    if (!entity) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }
    return entity;
  }

  async update(id: IDType, updateDto: U): Promise<T> {
    const entityPayload = { ...updateDto, id } as unknown as DeepPartial<T>;
    const entity = await this.repository.preload(entityPayload);

    if (!entity) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }

    return this.repository.save(entity as DeepPartial<T>);
  }

  async remove(id: IDType): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Recurso con ID ${id} no encontrado`);
    }
  }
}
