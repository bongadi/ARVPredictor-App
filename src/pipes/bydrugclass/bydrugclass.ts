import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BydrugclassPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'bydrugclass',
})
export class BydrugclassPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, drugClass : string) {
    console.log(drugClass);
    return value.filter((drugScore : any )=> {
      return drugScore.drugClass.name == drugClass;
    });
  }
}
