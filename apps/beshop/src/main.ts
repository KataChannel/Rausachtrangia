import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import bodyParser = require("body-parser");
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3200;
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); 
  app.use(compression());
  const config = new DocumentBuilder()
    .setTitle('APIS example')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('ui', app, document);
  await app.listen(port);
}
bootstrap();








