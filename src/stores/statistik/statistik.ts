import {makeAutoObservable} from 'mobx';

class StatisticStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export const statisticStore = new StatisticStore();
