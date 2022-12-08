var Clock = {
    totalSeconds: 0,
    start: function () {
      if (!this.interval) {
          var self = this;
          function pad(val) { return val > 9 ? val : "0" + val; }
          this.interval = setInterval(function () {
            self.totalSeconds += 1;
            document.getElementById("sec").innerHTML = pad(parseInt(self.totalSeconds));
          }, 1000);
      }
    },

    reset: function () {
      Clock.totalSeconds = null; 
      clearInterval(this.interval);
      document.getElementById("sec").innerHTML = "00";
      delete this.interval;
    },
    pause: function () {
      clearInterval(this.interval);
      delete this.interval;
    },
    
    resume: function () {
      this.start();
    },
  
    restart: function () {
       this.reset();
       Clock.start();
    }
  };
var intitialClick = "initial"
var dispatchState = "initial"
var currentsec = 0
var dispatchTimes = []
function DispatchClick() {
    if(dispatchState == "initial") {
        //on first click, don't log any data
        Clock.start()
        dispatchState = "started"
    } else {
        if(Clock.totalSeconds == null) {
          //do nothing if null seconds
        } else {
        var currentsec = Clock.totalSeconds  
        dispatchTimes.push(Clock.totalSeconds)
        }
        console.log(dispatchTimes)
        Clock.restart()
        var newAvg = eval(dispatchTimes.join('+'))/dispatchTimes.length;
        var CurrentAVG =document.getElementById("timeavg").innerText
        console.log("NewAVG: "+newAvg)
        console.log("CurrentAVG"+CurrentAVG)
        //change the color if time goes up or down
        if (CurrentAVG > newAvg) {
            console.log("attempting to change color")
            document.getElementById("timeavg").style.transitionDuration = "1s"
            document.getElementById("timeavg").style.color = "green"
        } else {
            document.getElementById("timeavg").style.transitionDuration = "1s"
            document.getElementById("timeavg").style.color = "red"
        }
        document.getElementById("timeavg").innerHTML = parseInt(eval(dispatchTimes.join('+'))/dispatchTimes.length);
    }
    //calc the hourly capacity
    var seats = document.getElementById("seats").innerText
    var hourlycapacity = eval((3600/CurrentAVG) * seats)
    document.getElementById("hourly").innerHTML = parseInt(hourlycapacity)

    //add Dispatch info to table

    var table = document.getElementById("tabledata");
    if (intitialClick == "initial") {
      intitialClick = "started"
      Clock.start()
    } else {
      if (currentsec == undefined) {
      } else {
        console.log(currentsec)
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = dispatchTimes.length
        cell2.innerHTML = dispatchTimes.slice(-1)[0]
    }
  }
}


function EstopClick () {
    Clock.reset()
    dispatchState = "initial"
}

function quickCalcClick () {
  var qcalcseats = document.getElementById("qseats").innerText
  var qcalcdispatch = document.getElementById("qdispatchtime").innerText
  var qhourly = document.getElementById("qhourly").innerText
  var hasNumber = /\d/; 
  console.log(qhourly)
  console.log(typeof(qhourly))
  if (hasNumber.test(qhourly)) {
    //if the hourly capacity is given, do the other calculations
    //t = (3600s) / c
    var dispatchtarget = (3600*qcalcseats) / qhourly
    document.getElementById("qdispatchtime").innerHTML = parseInt(dispatchtarget)
  } else {
  // if given seats and dispatchtime, output hourly
  var hourlycap = ((3600/qcalcdispatch) * qcalcseats)
  document.getElementById("qhourly").innerHTML = parseInt(hourlycap)
  }
}