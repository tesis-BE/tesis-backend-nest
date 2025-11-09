import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactDetails } from '../../../modules/users/entities/contact-details.entity';
import { User } from '../../../modules/users/entities/user.entity';
import { CONTACT_DETAILS_SEED_DATA } from '../data/contact-details.seed-data';

@Injectable()
export class ContactDetailsSeeder {
  constructor(
    @InjectRepository(ContactDetails)
    private readonly contactDetailsRepository: Repository<ContactDetails>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async run(): Promise<void> {
    console.log('🌱 Seeding contact details...');

    for (const contactData of CONTACT_DETAILS_SEED_DATA) {
      const existing = await this.contactDetailsRepository.findOne({
        where: { value: contactData.value as string },
      });

      if (!existing) {
        // Buscar el usuario por identification
        const user = await this.userRepository.findOne({
          where: { identification: contactData.userIdentification },
        });

        if (!user) {
          console.log(
            `❌ User not found for identification: ${contactData.userIdentification}`,
          );
          continue;
        }

        const contactDetails = this.contactDetailsRepository.create({
          type: contactData.type,
          value: contactData.value,
          isActive: contactData.isActive,
          user,
        });

        await this.contactDetailsRepository.save(contactDetails);
        console.log(`✅ Created contact: ${contactData.value}`);
      } else {
        console.log(`⏭️  Contact already exists: ${contactData.value}`);
      }
    }

    console.log('✨ Contact details seeding completed!\n');
  }

  async clear(): Promise<void> {
    console.log('🗑️  Clearing contact details...');
    await this.contactDetailsRepository.createQueryBuilder().delete().execute();
    console.log('✅ Contact details cleared!\n');
  }
}
