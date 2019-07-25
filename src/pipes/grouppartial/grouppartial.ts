import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GrouppartialPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'grouppartial',
})
export class GrouppartialPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(scores: any) {
     const map = scores.reduce((map, drugScore) => {
      drugScore.partialScores.reduce((map, mutScore) => {
        const rule = mutScore.mutations.map(mut => mut.text).join(' + ');
        if (!map.has(rule)) {
          // set default values
          map.set(rule, scores.reduce((row, drugScore2) => {
            row[drugScore2.drug.name] = 0;
            return row;
          }, {rule}));
        }
        const row = map.get(rule);
        row[drugScore.drug.name] = mutScore.score;
        return map;
      }, map);
      return map;
    }, new Map());
    const totalRow = {rule: 'Total'};
    for (const {drug: {name}, score} of scores) {
      totalRow[name] = score;
    }
    let dataTable = Array.from(map.values()).concat([totalRow]);
    const header = ['NRTI'];
    for (const {drug: {name}, score} of scores) {
      header.push(name);
    }
    /*return {
      dataTable : dataTable,
      header : header
    };
    */
    console.log(dataTable);
    return dataTable;
  }
}
