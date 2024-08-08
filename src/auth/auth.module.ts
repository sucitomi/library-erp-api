import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { EmployeService } from '../employe/employe.service';
import { Employe } from '../entities/employe.entity';
import { jwtConstants } from './constants';

@Module({
	imports: [
		TypeOrmModule.forFeature([Employe]),
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '600s' },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		EmployeService,
		{
    		provide: 'APP_GUARD',
    		useClass: AuthGuard,
  		},
  	],
	exports: [AuthService],
})
export class AuthModule {}
