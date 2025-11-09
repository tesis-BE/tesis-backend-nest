import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../../../modules/file/entities/file.entity';
import { FILES_SEED_DATA } from '../data/files.seed-data';

@Injectable()
export class FileSeeder {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding files...');

    for (const fileData of FILES_SEED_DATA) {
      const existing = await this.fileRepository.findOne({
        where: { filename: fileData.filename as string },
      });

      if (!existing) {
        const file = this.fileRepository.create(fileData);
        await this.fileRepository.save(file);
        console.log(`✅ Created file: ${fileData.filename}`);
      } else {
        console.log(`⏭️  File already exists: ${fileData.filename}`);
      }
    }

    console.log('✨ Files seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing files...');
    await this.fileRepository.createQueryBuilder().delete().execute();
    console.log('✅ Files cleared!\n');
  }
}
