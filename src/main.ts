import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT_MCP_NOTION  || "error env var PORT not set";
  console.log(`😁Server running on port: ${port}`);

  const config = new DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('API documentation for the CRM application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  
  await app.listen(port);
}
bootstrap();
