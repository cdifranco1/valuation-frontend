const excel = require('./node_modules/xlsx-populate')
const forecasts = require('../api/forecasts')

console.log(forecasts)

/*
need to create a rnge for the dcf within excel and find a more efficient way to set values/formats
*/



excel.fromBlankAsync()
  .then(workbook => {
    // Modify the workbook.
    workbook.addSheet("DCF")
    workbook.addSheet("Hello")
    const DCF = workbook.sheet('DCF')
    const revenueRange = DCF.range('A2:E2')
    const cogsRange = DCF.range('A3:E3')
    const gpRange = DCF.range('A4:E4')
    const opexRange = DCF.range('A5:E5')
    const ebitdaRange = DCF.range('A6:E6')
    // console.log(revenueRange.cells()[0])
    for (let i = 0; i < forecasts.revenues.length; i++){
        revenueRange.cells()[0][i]._value = forecasts.revenues[i]
        cogsRange.cells()[0][i]._value = forecasts.cogs[i] 
        gpRange.cells()[0][i]._value = forecasts.gp[i] 
        opexRange.cells()[0][i]._value = forecasts.opex[i] 
        ebitdaRange.cells()[0][i]._value = forecasts.ebitda[i] 
      }

    // Write to file.
    return workbook.toFileAsync("./out.xlsx");
  });
