### TODO

- [ ] Round predicted values to be integer to useEffect() doesn't change as often
- [ ] Test rounding of inputs and specify Float16 array
- [ ] Adjust y axis scale dynamically
- [ ] Add rounding precision to spreadsheet and use for step sizes
  - getChartDataSet.js: const percentileSteps = \_.map(percentiles[xmlPath], Math.round)
  - getChartDataSet.js: \_.map(stepRange, Math.round)
- [ ] Get rid of vite.svg in the prod build
- [ ] Make sure I'm creating the input tensor for prediction correctly. Harder than it seems

- [ ] Define slider steps as eventSteps or percentileSteps
- [ ] Toggle between actionable and mixed actionable
- [ ] Have a toggle to switch the weather
- [ ] Create chart to show stdev of the shown xmlPaths

### Maybe

- [ ] Create grouped array of categorical inputs (if it's in the top 20)
- [ ] Build function that takes categorical inputs and the value to turn on and return the whole set with the rest as zeros. (only if categorical is included in the top 20)
- [ ] Build assets along with production `npm run build`. You can't run in dev mode without these assets and they are checked in, so not sure this is needed.
- [ ] Write test for percentile transformation
- [ ] Remove window.useStore = useStore for production deploy (can this be part of the build process?)

### Done

- [x] Move label definitions to spreadsheet instead of JS file
- [x] Make sure inputVectorSortOrder isn't redundant with inputVectorIndexLookup.
- [x] Remove inputVectorIndex from chartData if not needed
- [x] Write formatter to convert ft2 to superscript
- [-] Validate that the input array always has the correct number of elements
- [x] Figure out how to make a prediction 29 times (one for every bar). But also every current slider (active bar) will have the same prediction value
- [x] Run current slider positions through the prediction.
- [x] Build lookup object betweeen xmlpath and inputVectorIndex
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
