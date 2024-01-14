### TODO Data

- [ ] Create weather data to import (hudson_ny.csv and santa_rosa_ca.csv)
- [ ] Add percentile input data for top ranked
- [ ] Create chartData data structure to loop over charts
- [ ] Validate that the inputs have the correct number of elements
- [ ] Create grouped array of categorical inputs
- [ ] Build function that takes categorical inputs and the value to turn on and return the whole set with the rest as zeros. (only if categorical is included in the top 20)
- [ ] Put on github

### TODO UI

### Maybe

- [ ] Have a toggle to switch the weather

### Done

- [x] Create JSON structure that has all inputs: id, code, xmlPath, categoryValue, type, topRanked, topRankedActionable, shortName of top ranked
- [x] Get top 20 values from JPs spreadsheet
- [x] Create sorted xmlPath array of all inputs
- [x] Test multiple input rows through tf.tensor2d
- [x] Remove y axis
- [x] Align Slider with graph
- [x] Highlight current bar and show value
