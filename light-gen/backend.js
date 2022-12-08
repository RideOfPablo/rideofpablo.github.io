function formSubmit() {
    var startColor = document.getElementById("StartC").innerText
    var endColor = document.getElementById("EndC").innerText
    document.getElementById("testspan").innerHTML = (startColor + endColor)
}