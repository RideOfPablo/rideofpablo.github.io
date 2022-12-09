function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateColorPreview1() {
    preview = document.getElementById("colorpreview1")
    value = document.getElementById("StartC").value
    console.log(value)
    preview.style.backgroundColor = "rgb("+value+")"
}

function updateColorPreview2() {
    preview2 = document.getElementById("colorpreview2")
    value2 = document.getElementById("EndC").value
    console.log(value2)
    preview2.style.backgroundColor = "rgb("+value2+")"
}

function startCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("StartC").value = randomtext.toString()
    updateColorPreview1()
}

function endCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("EndC").value = randomtext.toString()
    updateColorPreview2()
}

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
    outputLines += "DEF GRADIENT"
    //"<br>\xa0\xa0\xa0\xa0SET ALL "+startR+" "+startG+" "+startB + "<br>\xa0\xa0\xa0\xa0DELAY "+delay
    // \t = tab
    for (var i=0; i < r_Interp.length; i++) {
    	outputLines += "<br> &nbsp &nbsp SET ALL "+r_Interp[i]+" "+g_Interp[i]+" "+b_Interp[i]+"<br> &nbsp &nbsp DELAY "+delay 
    }
    console.log("Pre-reverse R: "+r_Interp)
    r_Interp.reverse()
    console.log("Post rev R: "+r_Interp)
    g_Interp.reverse()
    b_Interp.reverse()
    for (var i=1; i < r_Interp.length-1; i++) {
        if ((i+2) == r_Interp.length) {
            console.log("only sent the shi")
            outputLines += "<br> &nbsp &nbsp </span>SET ALL "+r_Interp[i]+" "+g_Interp[i]+" "+b_Interp[i]
            outputLines += " <br> &nbsp &nbsp RETURN"
        }
        else {
        outputLines += "<br> &nbsp &nbsp SET ALL "+r_Interp[i]+" "+g_Interp[i]+" "+b_Interp[i]+"<br> &nbsp &nbsp DELAY "+delay
        }
    }
    outputLines += "<br><br>DEF MAIN <br> &nbsp &nbsp JUMP  GRADIENT"
    document.getElementById("output").innerHTML = outputLines
}

function exportTxt() {
    text = document.getElementById("output").innerText
    text.replace(/[^\u0000-\u007E]/g, "")
    var file = new Blob([text], {type: "txt"});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, "export.txt");
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = "export.txt";
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function copyTxt() {
    var text = document.getElementById("output").innerText
    text = text.replace(/[^\u0000-\u007E]/g, "")
    navigator.clipboard.writeText(text);
    alert("Copied the text!") 
}