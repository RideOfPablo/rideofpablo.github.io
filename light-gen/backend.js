function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function updateColorPreview1() {
    preview = document.getElementById("colorpreview1")
    value = document.getElementById("StartC").value.replace(/[^.\d /s]/g,'')
    console.log(value)
    preview.style.backgroundColor = "rgb("+value+")"
}

function updateFade() {
    fadeDropdown = document.getElementById("fadeDropdown")
    dropdownDiv = document.getElementById("middleColor")
    if (fadeDropdown.value == "two") {
        dropdownDiv.style.display = "none"
    } else {
        dropdownDiv.style.display = "block"
    }
}

function updateColorPreviewMiddle() {
    previewMiddle = document.getElementById("colorpreviewMiddle")
    valueMiddle = document.getElementById("MiddleC").value.replace(/[^.\d /s]/g,'')
    console.log(valueMiddle)
    previewMiddle.style.backgroundColor = "rgb("+valueMiddle+")"
}

function updateColorPreview2() {
    preview2 = document.getElementById("colorpreview2")
    value2 = document.getElementById("EndC").value.replace(/[^.\d /s]/g,'')
    console.log(value2)
    preview2.style.backgroundColor = "rgb("+value2+")"
}

function startCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("StartC").value = randomtext.toString()
    updateColorPreview1()
}

function middleCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("MiddleC").value = randomtext.toString()
    updateColorPreviewMiddle()
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
    var extraColor = document.getElementById("MiddleC").value
    var steps = document.getElementById("stepsVal").value
    var delay = document.getElementById("delayVal").value
    console.log(delay)
    //document.getElementById("testspan").innerHTML = steps + " | "+ delay
    var startColorList = startColor.replace(/[^.\d /s]/g,'').split(" ")
    var endColorList = endColor.replace(/[^.\d /s]/g,'').split(" ")
    var extraColorList = endColor.replace(/[^.\d /s]/g,'').split(" ")
    var startR = startColorList[0]
    var startG = startColorList[1]
    var startB = startColorList[2]
    var endR = endColorList[0]
    var endG = endColorList[1]
    var endB = endColorList[2]
    var extraR = extraColorList[0]
    var extraG = extraColorList[1]
    var extraB = extraColorList[2]
    var r_Interp = [startR]
    var g_Interp = [startG]
    var b_Interp = [startB]
    var r_InterpExtra = []
    var g_InterpExtra = []
    var b_InterpExtra = []
    var diffRed = parseInt(endR) - parseInt(startR)
    var diffGreen = parseInt(endG) - parseInt(startG)
    var diffBlue = parseInt(endB) - parseInt(startB)
    var extraDiffRed = parseInt(extraR) - parseInt(endR)
    var extraDiffGreen = parseInt(extraG) - parseInt(endG)
    var extraDiffBlue = parseInt(extraB) - parseInt(endB)
    for (var i = 0; i < parseInt(steps); i++) {
        var fadePercent = (i + 1) / steps        
        r_Interp.push(Math.round(diffRed*fadePercent) + Math.round(startR))
        g_Interp.push(Math.round(diffGreen*fadePercent) + Math.round(startG))
        b_Interp.push(Math.round(diffBlue*fadePercent) + Math.round(startB))
    }
    for (var i = 0; i < parseInt(steps); i++) {
        var fadePercent = (i + 1) / steps        
        r_InterpExtra.push(Math.round(extraDiffRed*fadePercent) + Math.round(endR))
        g_InterpExtra.push(Math.round(extraDiffGreen*fadePercent) + Math.round(endG))
        b_InterpExtra.push(Math.round(extraDiffBlue*fadePercent) + Math.round(endB))
    }
    var outputLines = ""
    outputLines += "DEF GRADIENT"
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
    text = text.replace(/[^\u0000-\u007E]/g, "")
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

function updateMode() {
    var list = document.getElementById("dropdown")
    document.getElementById("devmodehidden").style.display = "none"
    if (list.value == "chaser") {
        document.getElementById("gradient").style.display = "none"
        document.getElementById("chaser").style.display = "block"
    }
    if (list.value == "gradient") {
        document.getElementById("gradient").style.display = "block"
        document.getElementById("chaser").style.display = "none"
    }
}

function CstartCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("CStartC").value = randomtext.toString()
    updateColorPreview3()
}

function CSecondCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("CSecondColor").value = randomtext.toString()
    updateColorPreview4()
}

function CThirdCRandom() {
    var randomtext = getRandomInt(255)+", "+getRandomInt(255)+", "+getRandomInt(255)
    console.log(randomtext)
    document.getElementById("CThirdColor").value = randomtext.toString()
    updateColorPreview5()
}

function updateColorPreview3() {
    preview3 = document.getElementById("colorpreview3")
    value3 = document.getElementById("CStartC").value.replace(/[^.\d /s]/g,'')
    console.log(value3)
    preview3.style.backgroundColor = "rgb("+value3+")"
}

function updateColorPreview4() {
    preview4 = document.getElementById("colorpreview4")
    value4 = document.getElementById("CSecondColor").value.replace(/[^.\d /s]/g,'')
    console.log("value4: "+value4) 
    preview4.style.backgroundColor = "rgb("+value4+")"
}

function updateColorPreview5() {
    preview5 = document.getElementById("colorpreview5")
    value5 = document.getElementById("CThirdColor").value.replace(/[^.\d /s]/g,'')
    console.log("value5: "+value5) 
    preview5.style.backgroundColor = "rgb("+value5+")"
}

function devModeToggle() {
    devModeDiv = document.getElementById("devmodehidden")
    if (devModeDiv.style.display == "none") {
        devModeDiv.style.display = "block"
    } else {
        devModeDiv.style.display = "none"
    }
}


function CFormSubmit() {
    var BPM = document.getElementById("BPMCalc").value
    var lightsVal = document.getElementById("lightsVal")
    var timeVal = document.getElementById("timeVal")
    lightsNumVal = parseInt(lightsVal.value)
    var ColorNum = document.getElementById("blinkMode").value
    var CColor1 = document.getElementById("CStartC")
    if (ColorNum == "two") {
        var CColor2 = document.getElementById("CSecondColor")
    } if (ColorNum == "three") {
        var CColor2 = document.getElementById("CSecondColor")
        var CColor3 = document.getElementById("CThirdColor")
    }
    var lengthVal = document.getElementById("lengthVal")
    var time = timeVal.value
    var CoutputLines = ""
    //document.getElementById("BPMSpan").innerHTML = BPM
    if (BPM !== "DEFAULT") {
        time = Math.round(60000 / BPM)
        document.getElementById("BPMSpan").innerHTML = BPM
    }
    //document.getElementById("BPMSpan").innerHTML = time
    CoutputLines += "DEF CHASER <br> &nbsp &nbsp CLEAR ALL"
    for (var i = 0; i < parseInt(lightsVal.value); i++) {
        CoutputLines += "<br> &nbsp &nbsp SET "+i+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor1.value.replace(/[^.\d /s]/g,'')
    }
    if (ColorNum == "one") {
        CoutputLines += "<br> &nbsp &nbsp DELAY "+ time
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i = 0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+(i+lightsNumVal)+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor1.value.replace(/[^.\d /s]/g,'')
        }
    }
    CoutputLines += "<br> &nbsp &nbsp DELAY "+ time  
    if (document.getElementById("CSecondColorHide").style.display == "block") {
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i = 0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+(i+lightsNumVal)+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor2.value.replace(/[^.\d /s]/g,'')
        }
        CoutputLines += "<br> &nbsp &nbsp DELAY "+time
    }
    if (document.getElementById("CThirdColorHide").style.display == "block") {
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i=0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+i+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor3.value.replace(/[^.\d /s]/g,'')
        }
        CoutputLines += "<br> &nbsp &nbsp DELAY "+ time
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i = 0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+(i+lightsNumVal)+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor1.value.replace(/[^.\d /s]/g,'')
        }
        CoutputLines += "<br> &nbsp &nbsp DELAY "+ time
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i = 0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+i+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor2.value.replace(/[^.\d /s]/g,'')
        }
        CoutputLines += "<br> &nbsp &nbsp DELAY "+time
        CoutputLines += "<br> <br> &nbsp &nbsp CLEAR ALL"
        for (var i=0; i < parseInt(lightsVal.value); i++) {
            CoutputLines += "<br> &nbsp &nbsp SET "+(i+lightsNumVal)+"-"+lengthVal.value+"-"+(lightsVal.value * 2)+" "+CColor3.value.replace(/[^.\d /s]/g,'')
        }
        CoutputLines += "<br> &nbsp &nbsp DELAY "+ time
    }
    CoutputLines += " <br> &nbsp &nbsp RETURN"
    CoutputLines += "<br><br>DEF MAIN <br> &nbsp &nbsp JUMP  CHASER"
    document.getElementById("COutput").innerHTML = CoutputLines
}

function CExportTxt() {
    text = document.getElementById("COutput").innerText
    text = text.replace(/[^\u0000-\u007E]/g, "")
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

function CCopyTxt() {
    var text = document.getElementById("COutput").innerText
    text = text.replace(/[^\u0000-\u007E]/g, "")
    navigator.clipboard.writeText(text);
    alert("Copied the text!") 
}