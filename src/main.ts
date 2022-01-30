import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { JwtAuthGuard } from './auth/auth-jwt.guard';

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const HOST = process.env.HOST || 'localhost'
  const PORT = process.env.PORT || 1337

  const config = new DocumentBuilder()
    .setTitle('Home Unit Company')
    .setDescription('HUC API description')
    .setVersion('0.1.0')
    .addTag('HUC')
    .build();

  const logger = new Logger('HUC Application')

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // app.useGlobalGuards(JwtAuthGuard);

  await app.listen(PORT, HOST, () => {
    logger.log(`Server is started at http://${HOST}:${PORT}`)
    logger.log(`GraphQL is started at http://${HOST}:${PORT}/graphql`)
  });

}

startApp();
