import { Controller } from '@nestjs/common';
import { BaseController } from '../../base/api/base.controller';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController extends BaseController<
  Role,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
