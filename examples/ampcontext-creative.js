const version = JSON.parse(decodeURI(window.name)).ampcontextVersion;
if (version != "LOCAL"){
  ampContextScript = document.createElement('script');
  ampContextScript.src = "foo.bar/"+version+"/ampcontext.js";
  document.head.appendChild(ampContextScript);
} else {
  ampContextScript = document.createElement('script');
  ampContextScript.src = "../dist.3p/current/ampcontext-lib.js";
  document.head.appendChild(ampContextScript);
}
function intersectionCallback(payload){
  changes = payload.changes;
  // Step 4: Do something with the intersection updates!
  // Code below is simply an example.
  var latestChange = changes[changes.length - 1];

  // Amp-ad width and height.
  var w = latestChange.boundingClientRect.width;
  var h = latestChange.boundingClientRect.height;

  // Visible width and height.
  var vw = latestChange.intersectionRect.width;
  var vh = latestChange.intersectionRect.height;

  // Position in the viewport.
  var vx = latestChange.boundingClientRect.x;
  var vy = latestChange.boundingClientRect.y;

  // Viewable percentage.
  var viewablePerc = (vw * vh) / (w * h) * 100;

  console.log(viewablePerc, w, h, vw, vh, vx, vy);

}

function dummyCallback(changes){
  console.log(changes);
}

var shouldStopVis = false;
var stopVisFunc;
var shouldStopInt = false;
var stopIntFunc;

if (!window.context || !window.context.isReady){
  console.log("window.context NOT READY");
  window.addEventListener('windowContextCreated', function(){
    console.log("window.context READY");
    window.context.onResizeSuccess(resizeSuccessCallback);
    window.context.onResizeDenied(resizeDeniedCallback);
  });
}

function resizeSuccessCallback(requestedHeight, requestedWidth){
  console.log("Success!");
  console.log(this);
  resizeTo(600,500);
  console.log(requestedHeight);
  console.log(requestedWidth);
}

function resizeDeniedCallback(requestedHeight, requestedWidth){
  console.log("DENIED");
  console.log(requestedHeight);
  console.log(requestedWidth);
}

function toggleObserveIntersection(){
  if (shouldStopInt){
    stopIntFunc();
  } else {
    stopIntFunc = window.context.observeIntersection(intersectionCallback);
  }
  shouldStopInt = !shouldStopInt;
}

function toggleObserveVisibility(){
  if (shouldStopVis){
    stopVisFunc();
  } else {
    stopVisFunc = window.context.observePageVisibility(dummyCallback);
  }
  shouldStopVis = !shouldStopVis;
}