import { MongoObservable } from 'meteor-rxjs';
import {Predition} from '../../models';

export const Predictions = new MongoObservable.Collection<Predition>('predictions');