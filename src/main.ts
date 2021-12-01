import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/auth-jwt.guard';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 1337

  const config = new DocumentBuilder()
    .setTitle('Home Unit Company')
    .setDescription('HUC API description')
    .setVersion('0.1.0')
    .addTag('HUC')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // app.useGlobalGuards(JwtAuthGuard);

  await app.listen(PORT, () => { console.log(`Server started at port ${PORT}`) });

}

startApp();
