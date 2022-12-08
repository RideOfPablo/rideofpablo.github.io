function formSubmit() {
    var startColor = document.getElementById("StartC").value
    var endColor = document.getElementById("EndC").value
    var steps = document.getElementById("stepsRange").value
    var delay = document.getElementById("delayRange").value
    //document.getElementById("testspan").innerHTML = steps + " | "+ delay
    var startColorList = startColor.replace(/[^.\d /s]/g,'').split(" ")
    var endColorList = endColor.replace(/[^.\d /s]/g,'').split(" ")
    var startR = startColorList[0]
    var startG = startColorList[1]
    var startB = startColorList[2]
    var endR = endColorList[0]
    var endG = endColorList[1]
    var endB = endColorList[2]
    var r_Interp = []
    var g_Interp = []
    var b_Interp = []
    var fades = []
    var diffRed = parseInt(endR) - parseInt(startR)
    var diffGreen = parseInt(endG) - parseInt(startG)
    var diffBlue = parseInt(endB) - parseInt(startB)
    r_Interp.push(startR)
    g_Interp.push(startG)
    b_Interp.push(startB)
    for (var i = 0; i < parseInt(steps); i++) {
        var fadePercent = (i + 1) / steps
        fades.push(fadePercent)
        
        r_Interp.push(Math.round(diffRed*fadePercent) + Math.round(startR))
        g_Interp.push(Math.round(diffGreen*fadePercent) + Math.round(startG))
        b_Interp.push(Math.round(diffBlue*fadePercent) + Math.round(startB))
    }
    //document.getElementById("testspan").innerHTML = r_Interp    
    //document.getElementById("testspan2").innerHTML = g_Interp
    //document.getElementById("testspan3").innerHTML = b_Interp
    var outputLines = ""
    //"<br>&nbsp&nbsp&nbsp&nbspSET ALL "+startR+" "+startG+" "+startB + "<br>&nbsp&nbsp&nbsp&nbspDELAY "+delay
    // \t = tab
    for (var i=0; i < r_Interp.length; i++) {
    	outputLines += "<br>&nbsp&nbsp&nbsp&nbspSET ALL "+r_Interp[i]+" "+g_Interp[i]+" "+b_Interp[i]+"<br>&nbsp&nbsp&nbsp&nbspDELAY "+delay 
    }
    document.getElementById("output").innerHTML = outputLines
}