import sha256 from 'fast-sha256';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  getHashedPassword(password: string): string {
    const enc = new TextEncoder(); // always utf-8
    const utf8arrayFromPassw = (enc.encode(password));
    const utf8arrayHashedPassw = sha256(utf8arrayFromPassw);
    const dec = new TextDecoder('utf-8');
    const hashedPassword = dec.decode(utf8arrayHashedPassw);

    return hashedPassword;
  }
}
