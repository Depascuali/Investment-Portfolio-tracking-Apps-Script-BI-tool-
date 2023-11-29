function recordPortfolioValue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var portfolioSheet = ss.getSheetByName('DATA');  // Cambia 'Portfolio' por el nombre de tu hoja de cálculo
  var historySheet = ss.getSheetByName('History');  // Cambia 'Historial' por el nombre de tu hoja de historial
  
  var date = new Date();
   // Asume que los nombres de tu cartera se encuentran en la columna A y los valores en la D, de la fila 2 a la fila 10, en la hoja 'Portfolio'
  var portfolioNamesRange = portfolioSheet.getRange('A2:A11');
  var portfolioValuesRange = portfolioSheet.getRange('D2:D11');
  
  var portfolioNames = portfolioNamesRange.getValues();
  var portfolioValues = portfolioValuesRange.getValues();
  
  // Para cada fila de datos en la cartera, insertar una nueva fila con la fecha, el nombre del stock y el valor en 'Historial'
  for (var i = 0; i < portfolioNames.length; i++) {
    historySheet.appendRow([date, portfolioNames[i][0], portfolioValues[i][0]]);
  }
}