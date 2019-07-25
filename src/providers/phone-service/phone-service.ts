///<reference path="../../../node_modules/@types/meteor-accounts-phone/index.d.ts"/>
import { Injectable } from '@angular/core';

@Injectable()
export class PhoneService {

  verify(phoneNumber: string): Promise<void> {
    console.log(phoneNumber);
    return new Promise<void>((resolve, reject) => {
      Accounts.requestPhoneVerification(phoneNumber, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  loginWithUsername(username :string, password : string) {
    console.log(username, password);
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword(username, password, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  signup(objectblock) {
    console.log(objectblock.username, objectblock.fname);
	return new Promise<void>((resolve, reject) => {
		Meteor.call('signup', objectblock.username, objectblock.password, objectblock.email, objectblock.fname, objectblock.lname, objectblock.imsi, 
		(error, result) => {
			if(error) reject(error);
			if(result) resolve(result);
		});
	});
  }

  login(phoneNumber: string, code: string): Promise<void> {
    console.log(phoneNumber);
    return new Promise<void>((resolve, reject) => {
      Accounts.verifyPhone(phoneNumber, code, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }
}
