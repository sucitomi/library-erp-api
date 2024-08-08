import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeModule } from './employe/employe.module';
import { BookModule } from './book/book.module';
import { RenterModule } from './renter/renter.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
   	ConfigModule.forRoot({
   		envFilePath: `${process.cwd()}/.env`,
   		isGlobal: true,
   	}),
  	TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT),
      username: process.env.SQL_USER,
      password: process.env.SQL_PASS,
      database: process.env.SQL_DB,
      entities: [__dirname + '/entities/*.entity.{js,ts}'],
      synchronize: true,
    }),
    EmployeModule,
    BookModule,
    RenterModule,
    BorrowModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
