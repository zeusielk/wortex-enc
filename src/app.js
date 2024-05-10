let nonEncry = "sad";
let keys = "sjakdfhhjgdf38947";
let ivsector = "dumidu";
let firstLayerOut = "";
let secondLayerOut = "";

// FIRST LAYER
function firstLayer(nonenc) {
  // encode to base 64
  function baseEnc(basevalue) {
    return btoa(basevalue);
  }
  //encode to hmac
  function hmac(hmacvalue) {
    var hmac = forge.hmac.create();
    hmac.start("sha1", "Jefe");
    hmac.update(hmacvalue);
    return hmac.digest().toHex();
  }
  let outputText = "";
  for (let i = 0; i <= nonenc.length; i++) {
    if (i % 2 == 0) {
      outputText += baseEnc(i);
    } else {
      outputText += hmac(i);
    }
  }
  firstLayerOut = outputText;
  secondLayer(outputText);
}
// MD5 LAYER SECOND
function secondLayer(secondValue) {
  let output = document.getElementById("outputText");
  var md = forge.md.md5.create();
  md.update(secondValue);
  secondLayerOut = md.digest().toHex();
  console.log(secondLayerOut);
  output.textContent = secondLayerOut;
}

let btn = document.getElementById("btn");
btn.addEventListener("click", function () {
  let inputText = document.getElementById("inputText").value;
  firstLayer(inputText);
});

let copybtn = document.getElementById("copybtn");
copybtn.addEventListener("click", function () {
  navigator.clipboard.writeText(secondLayerOut);
  alert("successfully copied!!!");
});
