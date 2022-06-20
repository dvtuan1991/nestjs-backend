import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static/';
import { UserModule } from './users/user.module';
@Module({
  imports: [
    CategoryModule,
    ProductModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/food-and-drink'),
    MulterModule.register({
      dest: 'public/upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/upload'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
