import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(`ConfigMap: ${process.env.APP}`)
    console.log(`Secret: ${process.env.API_KEY}`)
    return 'Hello World!';
  }
  getExample(): string {
    return 'Running in k8s!';
  }
}
