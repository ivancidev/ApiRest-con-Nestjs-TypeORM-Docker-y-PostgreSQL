import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLogModule } from './access-log/access-log.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRE_HOST,
      port: parseInt(process.env.POSTGRE_PORT) || 5432,
      password: process.env.POSTGRE_PASSWORD,
      username: process.env.POSTGRE_USER,
      database: process.env.POSTGRE_DB_NAME,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: ['./dist/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    AccessLogModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
