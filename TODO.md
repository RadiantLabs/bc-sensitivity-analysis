### TODO

- [ ] Create initial prediction input set
- [ ] Should getInitialSliderValues() be calculated at top of store?
- [ ] Validate that the input array always has the correct number of elements
- [ ] Get rid of vite.svg in the prod build
- [ ] Move label definitions to spreadsheet instead of JS file
- [ ] Add rounding precision to spreadsheet and use for step sizes
- [ ] Remove HPXML.Building from xmlPath since it's redundant

- [ ] Define slider steps as eventSteps or percentileSteps
- [ ] Toggle between actionable and mixed actionable
- [ ] Have a toggle to switch the weather

### Maybe

- [ ] Create grouped array of categorical inputs (if it's in the top 20)
- [ ] Build function that takes categorical inputs and the value to turn on and return the whole set with the rest as zeros. (only if categorical is included in the top 20)
- [ ] Build assets along with production `npm run build`. You can't run in dev mode without these assets and they are checked in, so not sure this is needed.
- [ ] Write test for percentile transformation
- [ ] Remove window.useStore = useStore for production deploy (can this be part of the build process?)

### Done

- [x] store: Set initial slider positions as initial state in store
- [-] Consider using lodash-es for smaller builds (used lodash/map style imports for treeshaking)
- [x] Switch to Zustand for state management, hook up to Redux devtools
- [x] Rename inputsConfig to modelInputsMetadata
- [x] Manually create top 20 to remove redundant variations of inputs such as conditioned floor area
- [x] Create chartData data structure to loop over charts
- [x] Add percentile input data for top ranked (domain.csv)
- [x] Process percentile data to make it useful
- [x] Put on github
- [x] Create weather data to import (hudson_ny.csv and santa_rosa_ca.csv)
- [x] Create JSON structure that has all inputs: id, code, xmlPath, categoryValue, type, topRanked, topRankedActionable, shortName of top ranked
- [x] Get top 20 values from JPs spreadsheet
- [x] Create sorted xmlPath array of all inputs
- [x] Test multiple input rows through tf.tensor2d
- [x] Remove y axis
- [x] Align Slider with graph
- [x] Highlight current bar and show value
