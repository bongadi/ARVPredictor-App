import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the GroupByPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'group-by',
})
export class GroupByPipe implements PipeTransform {
  /**
   * Takes a username and makes it a 10 digit phone number.
   */
  transform(value: Array<any>, field: string): Array<any> {

    console.log(value, field);
    const grouped = [];

    for (let details in value) {
      if (!grouped[field]) {
        grouped[field] = [details];
      } else {
        grouped[field].push(details);
      }
    }
    return grouped;
  }

}
