import {TalksAndFiltersEffects} from './talks-and-filters.effects';
import {FakeStoreNavigation, readAll} from '../../../utils/test-ngrx';
import {of} from 'rxjs/observable/of';
import {TalksAndFiltersComponent} from '../talks-and-filters/talks-and-filters.component';
import {TalkDetailsComponent} from '../talk-details/talk-details.component';

describe('TalksAndFilters effects', () => {
  // There are two ways to test this guy:
  // * Using Angular style tests (integration tests) + NgRx helpers
  // * Using isolated tests
  // In simple scenarios there is nothing to test at all

  describe('navigateToTalk', () => {
    it('should do nothing when state is already available', async () => {
      const n = new FakeStoreNavigation();
      const effects = new TalksAndFiltersEffects(n, null);

      n.triggerNavigation({
        component: TalkDetailsComponent,
        params: {id: '1'},
        state: {talks: {talks: {1: 'someTalk'}}}
      });

      expect(await readAll(effects.navigateToTalk)).toEqual([]);
    });

    it('should fetch the talk by id', async () => {
      const b = { findTalk: () => of({id: 1, title: 'mytalk'})};
      const n = new FakeStoreNavigation();
      const effects = new TalksAndFiltersEffects(n, <any>b);

      n.triggerNavigation({
        component: TalkDetailsComponent,
        params: {id: '1'},
        state: {talks: {talks: {}}}
      });

      expect(await readAll(effects.navigateToTalk)).toEqual([
        { type: 'TALK_UPDATED', payload: {id: 1, title: 'mytalk'} }
      ]);
    });
  });
});
