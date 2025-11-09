import { Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import type { DeepPartial, ObjectLiteral, FindManyOptions } from 'typeorm';
import type { BaseService } from './base.service';
import {
  ResponseUtil,
  ApiResponse,
} from '../../../core/utils/api/response.utils';
import { HandleErrors } from '../../../core/utils/api/error-handler.utils';

type IDType = string | number;

export abstract class BaseController<
  T extends ObjectLiteral,
  C extends DeepPartial<T>,
  U extends DeepPartial<T>,
> {
  constructor(protected readonly service: BaseService<T, C, U>) {}

  @Post('base/create')
  @HandleErrors('Error al crear el recurso')
  async create(@Body() createDto: C): Promise<ApiResponse<T>> {
    const data = await this.service.create(createDto);
    return ResponseUtil.created(data, 'Recurso creado exitosamente');
  }

  @Get('base/find-all')
  @HandleErrors('Error al obtener la lista de recursos')
  async findAll(
    @Query() query?: FindManyOptions<T>,
  ): Promise<ApiResponse<T[]>> {
    const data = await this.service.findAll(query);
    return ResponseUtil.list(data, 'Lista obtenida exitosamente');
  }

  @Get('base/get-one/:id')
  @HandleErrors('Error al obtener el recurso')
  async findOne(@Param('id') id: IDType): Promise<ApiResponse<T>> {
    const data = await this.service.findOne(id);
    return ResponseUtil.ok(data, 'Recurso obtenido exitosamente');
  }

  @Put('base/update/:id')
  @HandleErrors('Error al actualizar el recurso')
  async update(
    @Param('id') id: IDType,
    @Body() updateDto: U,
  ): Promise<ApiResponse<T>> {
    const data = await this.service.update(id, updateDto);
    return ResponseUtil.updated(data, 'Recurso actualizado exitosamente');
  }

  @Delete('base/delete/:id')
  @HandleErrors('Error al eliminar el recurso')
  async remove(@Param('id') id: IDType): Promise<ApiResponse<null>> {
    await this.service.remove(id);
    return ResponseUtil.deleted('Recurso eliminado exitosamente');
  }
}
