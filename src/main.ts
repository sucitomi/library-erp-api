import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { EmployeModule } from './employe/employe.module';
import { RenterModule } from './renter/renter.module';

async function initApp() {
  	const app = await NestFactory.create(AppModule, { cors: true });
  	app.use(helmet());

  	const config = new DocumentBuilder()
	    .setTitle('Library ERP')
	    .setDescription('Library ERP REST API description')
	    .setVersion('1.0')
	    .build();
  	const document = SwaggerModule.createDocument(app, config, {
  		include: [ BookModule, EmployeModule, RenterModule, BorrowModule]
  	});
  	SwaggerModule.setup('doc', app, document);
  	
  	await app.listen(process.env.PORT);
}
initApp();
