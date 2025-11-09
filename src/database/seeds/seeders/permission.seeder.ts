import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../../modules/permission/entities/permission.entity';
import { PERMISSIONS_SEED_DATA } from '../data/permissions.seed-data';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding permissions...');

    for (const permissionData of PERMISSIONS_SEED_DATA) {
      const existing = await this.permissionRepository.findOne({
        where: { name: permissionData.name as string },
      });

      if (!existing) {
        const permission = this.permissionRepository.create(permissionData);
        await this.permissionRepository.save(permission);
        console.log(`✅ Created permission: ${permissionData.name}`);
      } else {
        console.log(`⏭️  Permission already exists: ${permissionData.name}`);
      }
    }

    console.log('✨ Permissions seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing permissions...');
    await this.permissionRepository.createQueryBuilder().delete().execute();
    console.log('✅ Permissions cleared!\n');
  }
}
