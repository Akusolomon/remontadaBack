import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {connect} from 'mongoose'
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
async function bootstrap() {
    const DB = process.env.DATABASE_LOCAL;
    connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }).then(() => console.log('DB Connected'));
  
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const port = process.env.PORT;
    await app.listen(port);
}
bootstrap();
