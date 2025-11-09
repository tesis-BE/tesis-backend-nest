import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';
import { Role } from '../../../modules/role/entities/role.entity';
import { USERS_SEED_DATA } from '../data/users.seed-data';
import { PasswordUtil } from '../../../core/utils/security/password.utils';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding users...');

    for (const userData of USERS_SEED_DATA) {
      const existing = await this.userRepository.findOne({
        where: { identification: userData.identification as string },
      });

      if (!existing) {
        // Buscar los roles por nombre
        const roles = await this.roleRepository
          .createQueryBuilder('role')
          .where('role.name IN (:...names)', { names: userData.roleNames })
          .getMany();

        if (roles.length === 0) {
          console.log(
            `❌ No roles found for user: ${userData.identification}`,
          );
          continue;
        }

        // Hash de la contraseña con bcrypt
        const hashedPassword = await PasswordUtil.hash(userData.plainPassword);

        const user = this.userRepository.create({
          firstname: userData.firstname,
          lastname: userData.lastname,
          identification: userData.identification,
          password: hashedPassword,
          roles,
        });

        await this.userRepository.save(user);
        console.log(
          `✅ Created user: ${userData.firstname} ${userData.lastname}`,
        );
      } else {
        console.log(
          `⏭️  User already exists: ${userData.firstname} ${userData.lastname}`,
        );
      }
    }

    console.log('✨ Users seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing users...');
    await this.userRepository.createQueryBuilder().delete().execute();
    console.log('✅ Users cleared!\n');
  }
}
