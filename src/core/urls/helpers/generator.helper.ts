import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneratorHelper {
  randString(length = 7) {
    const result = [];
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }

    return result.join('');
  }
}
