const excel = require('xlsx-populate')
const data = require('./dummydata').forecasts

console.log(data)

// add constants to create a rnge for the dcf within excel
const columns = 5

const forecasts = {
  revenues: [1000, 1200, 1300, 1400,1500],
  cogs: [400, 500, 600, 700, 800],
  opex: [200, 250, 300, 400, 450],
  wc: [20, 25, 30, 35, 40],
  capex: [30, 40, 45, 60, 70]
}


// class to construct object for the forecasts
class Forecasts {
  constructor(forecasts){
    this.revenues = forecasts.revenues, 
    this.cogs = forecasts.cogs,
    this.gp = [],
    this.opex = forecasts.opex, 
    this.wc = forecasts.wc, 
    this.capex = forecasts.capex,
    this.ebitda = []
  }
  calcMargins(index){
    for (let i = 0; i < this.revenues.length; i++){
      this.gp.push(this.revenues[i] - this.cogs[i])
    }
    for (let i = 0; i < this.revenues.length; i++){
      this.ebitda.push(this.gp[i] - this.opex[i])
    }
  }
}

let testForecasts = new Forecasts(forecasts)
testForecasts.calcMargins()
console.log(testForecasts)

// excel.fromBlankAsync()
//   .then(workbook => {
//     // Modify the workbook.
//     workbook.addSheet("DCF")
//     workbook.addSheet("Hello")
//     const DCF = workbook.sheet('DCF')
//     const revenueRange = DCF.range('A2:E2')
//     const cogsRange = DCF.range('A3:E3')
//     const cogsRange = DCF.range('A3:E3')
//     for (let i = 0; i < data.length; i++){
//         revenueRange.cells()[0][i]._value = data.revenues[i] 
//         cogsRange.cells()[0][i]._value = data.cogs[i] 
//         cogsRange.cells()[0][i]._value = data.cogs[i] 
//       }


//     console.log(revenueRange.cells())

//     // Write to file.
//     return workbook.toFileAsync("./out.xlsx");
//   });
