import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedConfig } from './config/database.config';
import { SeedService } from './database/seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Ejecutar seeds automáticamente si está configurado
  if (seedConfig.autoRunSeeds) {
    try {
      const seedService = app.get(SeedService);

      if (seedConfig.autoRefreshSeeds) {
        console.log('\n🔄 Auto-refresh seeds enabled...');
        await seedService.refresh();
      } else {
        console.log('\n🌱 Auto-run seeds enabled...');
        await seedService.runAll();
      }
    } catch (error) {
      console.error('❌ Error running seeds:', error);
      // No detener la aplicación si las seeds fallan
    }
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}
void bootstrap();
