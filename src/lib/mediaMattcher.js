    var mqls = [ // list of window.matchmedia() queries
      window.matchMedia("screen and (max-width: 860px)"),
      window.matchMedia("screen and (max-width: 600px)"),
      window.matchMedia("screen and (max-height: 500px)")
    ]

    function mediaqueryresponse(mql){
      console.log('width: 860px media match? ' + mqls[0].matches); 
      console.log('width: 600px media match? ' + mqls[1].matches); 
      console.log('heigh: 500px media match? ' + mqls[2].matches);

    }

    for (var i=0; i<mqls.length; i++){
      mediaqueryresponse(mqls[i]) // call action function explicitly at run time
      mqls[i].addListener(mediaqueryresponse) // call action function whenever each media query is triggered
    }