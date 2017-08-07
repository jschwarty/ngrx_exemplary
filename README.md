# NgRx Exemplary App

The app has one module (talks-and-filters). 

The +state folder contains all the primitives related to state management and ngrx.

* `talks-and-filters.interfaces.ts` contains state interfaces. Note the difference between `TalksAndFilters` and `TalksAndFiltersState`. The second one needed when we read from the store.
* `talks-and-filters.init.ts` contains the init state.
* `talks-and-filters.actions.ts` contains the actions.
* `talks-and-filters.reducer.ts` contains the reducer. Note the corresponding test file.
* `talks-and-filters.effects.ts` contains the effect management. Note the StoreNavigation service used there to handle navigations. There are two ways to handle loading data in the Ngrx/Router setup: using resolvers and listening to `ROUTER_NAVIGATION`. We use the latter.

Note how `TalksAndFiltersModule` uses `EffectsModule.forFeature` and `RouterModule.forFeature` to wire everything up.
