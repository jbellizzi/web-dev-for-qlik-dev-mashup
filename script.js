// Define baseUrl where qlik.js file will be loaded from
require.config({
  baseUrl: 'http://localhost:4848/resources'
});

var app;

/* Load in qlik.js file using RequireJS so that we can use the
    qlik object within our callback function */
require(['js/qlik'], function(qlik) {
  // Open up an app using the openApp() method
  app = qlik.openApp('WBY Sales');

  
  // Use getObject() to add Qlik Sense Chart to web page
  app.getObject('chart-0', 'KMFupDp');


  // Use getObject() to add Selections bar
  app.getObject('current-selections', 'CurrentSelections');


  // Use the Visualization API to create a kpi object
  app.visualization.create('kpi', ['=Count(Distinct CompanyName)']).then(function(vis){
    vis.show('chart-1');
  })
  
  app.visualization.create('kpi', ['=vWhatIf']).then(function(vis){
    vis.show('chart-2');
  })

  app.visualization.create('linechart', ['WeekYear', '=Sum(OrderLineAmount)']).then(function(vis){
    vis.show('chart-3');
  })
})


// What If Slider
function whatIf(event) {
  var sliderValue = event.target.valueAsNumber;
  app.variable.setNumValue('vWhatIf', sliderValue);
}