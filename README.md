# Investment-Portfolio-tracking
Simple portfolio tracking dashboard using Google Sheets and Looker Studio

# Introduction
As an investor, I consider essential to have a dashboard to monitor our investments, not only to assess portfolio performance but also to analyze its evolution over time. Investing in different markets (US and Argentina) and other assets outside the traditional markets such as Crypto, posed a challenge in finding a platform that allows me to analyze all my investments and their holistic evolution. While the US broker's application provides visibility into performance, it rarely includes assets from the Argentine stock exchange (and vice versa). Additionally, it does not provide quotes for crypto assets. My motivation was to create a tool that could provide analysis of returns and evolution of my entire portfolio.

# Using Google Sheets as First Instance
It was straightforward to work with stocks and Crypto. It's worth mentioning that for crypto only Bitcoin was considered, as it was the only one of interest. Using the formula =GOOGLEFINANCE(""), we could automatically retrieve all quotes in real time. Web scraping could be considered if necessary to obtain prices for other cryptocurrencies.

# Having budget in USD and ARS (Argentinian Peso)
To obtain prices in Argentine pesos, the Blue Dollar (freely traded) would be considered. For this purpose, using the following script: https://pastebin.com/ER3PWuTi, you could utilize the formula =IMPORTJSON("https://api.bluelytics.com.ar/v2/latest", "/blue/value_sell", "noHeaders") to fetch the real-time Blue Dollar exchange rate.

# Okay, but what about Portfolio Evolution...
Once we had the value of our portfolio in both dollars and pesos in real-time, the following question arose: How do we measure the evolution of the portfolio over time? After some trial and error, I arrived at a small solution. Since we had the real-time quotes for all assets, we could take a "snapshot" of those assets and save them daily ihttps://github.com/Depascuali/Investment-Portfolio-tracking/issuesn a sheet. This way, a new table would be generated on that sheet with the historical data of all quotes. This was done with the following code in Apps Script:

 ```javascript
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
```
Once we had this table, the only remaining step was to analyze it using a Business Intelligence (BI) tool.

# Results
In this case, we chose Looker Studio for its compatibility with Google Sheets, coupled with the fact that the data to be analyzed is not extensive and does not require additional data processing. While the base license of Looker Studio is sufficient for this use case, Power BI could also be used.

![Investment_Overview (1)_page-0001](https://github.com/Depascuali/Investment-Portfolio-tracking/assets/97790973/78d4b5fe-5b5e-4c57-8e7a-0b8e04035229)

![Investment_Overview (1)_page-0002](https://github.com/Depascuali/Investment-Portfolio-tracking/assets/97790973/7d916aef-4e3e-4cd8-b5b4-fa3bd1a902aa)

<img width="579" alt="image" src="https://github.com/Depascuali/Investment-Portfolio-tracking/assets/97790973/2c2d8034-eaf6-4821-9979-250bd71a2e16">

<img width="579" alt="image" src="https://github.com/Depascuali/Investment-Portfolio-tracking/assets/97790973/0e0d5a61-eac6-4179-b347-e069f1312019">
