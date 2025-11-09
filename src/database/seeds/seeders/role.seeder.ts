import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../modules/role/entities/role.entity';
import { Permission } from '../../../modules/permission/entities/permission.entity';
import { ROLES_SEED_DATA } from '../data/roles.seed-data';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding roles...');

    for (const roleData of ROLES_SEED_DATA) {
      const existing = await this.roleRepository.findOne({
        where: { name: roleData.name as string },
      });

      if (!existing) {
        const role = this.roleRepository.create(roleData);

        // Si es Super Admin, asignar todos los permisos
        if (roleData.name === 'Super Admin') {
          const allPermissions = await this.permissionRepository.find();
          role.permissions = allPermissions;
        }

        await this.roleRepository.save(role);
        console.log(`✅ Created role: ${roleData.name}`);
      } else {
        console.log(`⏭️  Role already exists: ${roleData.name}`);
      }
    }

    console.log('✨ Roles seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing roles...');
    await this.roleRepository.createQueryBuilder().delete().execute();
    console.log('✅ Roles cleared!\n');
  }
}
