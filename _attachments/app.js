var results_dataset, errors_dataset, buildtimes_dataset;

jQuery(function($) {
  window.dataExplorer = null;
  window.explorerDiv = $('.data-explorer-here');

  var queryParameters = recline.View.parseQueryString(decodeURIComponent(window.location.search));

  results_dataset = new recline.Model.Dataset({
    db_url: queryParameters['url'] || '/medic_results/',
    view_url: queryParameters['view_url'] || '/medic_results/_design/results/_view/all',
    backend: 'couchdb',
    query_options: {
      'key':'id',
      'descending' : true
    }
  });

  errors_dataset = new recline.Model.Dataset({
    db_url: queryParameters['url'] || '/build_errors/',
    view_url: queryParameters['view_url'] || '/build_errors/_design/errors/_view/all',
    backend: 'couchdb',
    query_options: {
      'key': '_id'
    }
  });

  buildtimes_dataset = new recline.Model.Dataset({
    db_url: queryParameters['url'] || '/build_times/',
    view_url: queryParameters['view_url'] || '/build_times/_design/times/_view/all',
    backend: 'couchdb',
    query_options: {
      'key': '_id',
      'descending': true,
      'limit': 1000
    }
  });

  results_dataset.fetch().done(function(dataset) {
    console.log('records: ', dataset.records);
  });
  
  errors_dataset.fetch().done(function(dataset) {
    console.log('records: ', dataset.records);
  });

  buildtimes_dataset.fetch().done(function(dataset) {
    console.log('records: ', dataset.records);
  });

  createExplorer();
});

// make Explorer creation / initialization in a function so we can call it
// again and again
var createExplorer = function(state) {
  // remove existing data explorer view
  var reload = false;
  if (window.dataExplorer) {
    window.dataExplorer.remove();
    reload = true;
  }
  window.dataExplorer = null;
  var $el = $('<div />');
  $el.appendTo(window.explorerDiv);

  var mainGrid = new recline.View.SlickGrid({
        model: results_dataset,
        state: {
          gridOptions: {
            rowClasses: function() {
              console.log('here');
            },
            onClick: function() {
              console.log('hi');
            }
          },
          fitColumns: true
        }
      });


  var views = [
    {
      id: 'results',
      label: 'Spec Results',
      view: mainGrid,
    },
    {
      id: 'errors',
      label: 'Build Errors',
      view: new recline.View.SlickGrid({
        model: errors_dataset,
        state: {
          fitColumns: true
        }
      }),
    },
    {
      id: 'times',
      label: 'Build Times',
      view: new recline.View.Graph({
        model: buildtimes_dataset,
        state: {
          "group": "time",
          "series": ["ios_duration", "android_duration"],
          "graphType": "columns",
          "graphOptions": {
            xaxis: {
              transform: function(n) {
                console.log(n);
                console.log(new Date(n));
                return n;
              }
            }
          }
        }
      }),
    }/*
    ,
    {
      id: 'times1',
      label: 'Build Times deets',
      view: new recline.View.SlickGrid({
        model: buildtimes_dataset
      }),
    }
    
    ,
    {
      id: 'map',
      label: 'Map',
      view: new recline.View.Map({
        model: dataset
      }),
    },
    {
      id: 'transform',
      label: 'Transform',
      view: new recline.View.Transform({
        model: dataset
      })
    }
    */
  ];

  window.dataExplorer = new recline.View.MultiView({
    model: results_dataset,
    el: $el,
    state: state,
    views: views
  });
}
