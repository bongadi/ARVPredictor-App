import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import {GlobalVarsProvider} from "../global-vars/global-vars";

/*
 Generated class for the RemoteServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class RemoteServiceProvider {

  globalVars : any = GlobalVarsProvider;

  constructor(public http: Http) {
  }

  addCourse(courseName, courseDescription) {
    return new Promise<any>((resolve, reject) => {
      Meteor.call('addCourse', courseName, courseDescription, function (error, response) {
        if (error) { reject(error); } else { resolve(response); }
      });
    });
  }

  postRequest(objectblock, url, isSequence?) {
    //for backward compatibility
    return new Promise<any>((resolve, reject) => {
      resolve(true);
    })
  }
  
  predict(body, isSequence) {
    console.log(body);
    return new Promise<any>((resolve, reject) => {
      Meteor.call('predict', body, isSequence, function (error, response) {
        console.log(response);
        if (error) { reject(error); } else { resolve(response); }
      });
    });
  }
  

  public static fakeLogin(username, password) {

	  let theUsername = ['0728324324', '0702818290'];
	  let thePassword = '1234';

	  let user = {
		  fname : 'Beatrice',
		  lname : ''
	  };

	  let status = (theUsername[0] === username || theUsername[1] === username) && thePassword === password;
	  let response = {
		  user : user,
		  status : status
	  }

	  console.log(response);
	  return response;
  }
}

