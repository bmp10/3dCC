let text = document.createElement('p')
text.innerHTML = new URLSearchParams(location.search).get('name') + '!<br><br>' + 'Zoom in to find the bears and rescue them!'
text.style.font = (window.innerHeight / 10) + 'px mono'
text.style.position = 'relative'
text.style.width = '100%'
text.style.height = '100%'
text.style.color = '#ffffff'
text.style.textAlign = 'center'
text.style.background = '#000000'
document.body.appendChild(text)

let removed = false
function start() {
    if (removed) return
    document.body.removeChild(text)
    removed = true
}

document.body.addEventListener('mousedown', start)
document.body.addEventListener('touchstart', start)

/**
 * Generated by Verge3D Puzzles v.4.1.1
 * Sat Dec 17 2022 15:50:27 GMT-0800 (Pacific Standard Time)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

 'use strict';

 (function() {
 
 // global variables/constants used by puzzles' functions
 
 var LIST_NONE = '<none>';
 
 var _pGlob = {};
 
 _pGlob.objCache = {};
 _pGlob.fadeAnnotations = true;
 _pGlob.pickedObject = '';
 _pGlob.hoveredObject = '';
 _pGlob.mediaElements = {};
 _pGlob.loadedFile = '';
 _pGlob.states = [];
 _pGlob.percentage = 0;
 _pGlob.openedFile = '';
 _pGlob.xrSessionAcquired = false;
 _pGlob.xrSessionCallbacks = [];
 _pGlob.screenCoords = new v3d.Vector2();
 _pGlob.intervalTimers = {};
 
 _pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
 _pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
 _pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
 _pGlob.MIN_DRAG_SCALE = 10e-4;
 _pGlob.SET_OBJ_ROT_EPS = 1e-8;
 
 _pGlob.vec2Tmp = new v3d.Vector2();
 _pGlob.vec2Tmp2 = new v3d.Vector2();
 _pGlob.vec3Tmp = new v3d.Vector3();
 _pGlob.vec3Tmp2 = new v3d.Vector3();
 _pGlob.vec3Tmp3 = new v3d.Vector3();
 _pGlob.vec3Tmp4 = new v3d.Vector3();
 _pGlob.eulerTmp = new v3d.Euler();
 _pGlob.eulerTmp2 = new v3d.Euler();
 _pGlob.quatTmp = new v3d.Quaternion();
 _pGlob.quatTmp2 = new v3d.Quaternion();
 _pGlob.colorTmp = new v3d.Color();
 _pGlob.mat4Tmp = new v3d.Matrix4();
 _pGlob.planeTmp = new v3d.Plane();
 _pGlob.raycasterTmp = new v3d.Raycaster();
 
 var PL = v3d.PL = v3d.PL || {};
 
 // a more readable alias for PL (stands for "Puzzle Logic")
 v3d.puzzles = PL;
 
 PL.procedures = PL.procedures || {};
 
 
 
 
 PL.execInitPuzzles = function(options) {
     // always null, should not be available in "init" puzzles
     var appInstance = null;
     // app is more conventional than appInstance (used in exec script and app templates)
     var app = null;
 
     var _initGlob = {};
     _initGlob.percentage = 0;
     _initGlob.output = {
         initOptions: {
             fadeAnnotations: true,
             useBkgTransp: false,
             preserveDrawBuf: false,
             useCompAssets: false,
             useFullscreen: true,
             useCustomPreloader: false,
             preloaderStartCb: function() {},
             preloaderProgressCb: function() {},
             preloaderEndCb: function() {},
         }
     }
 
     // provide the container's id to puzzles that need access to the container
     _initGlob.container = options !== undefined && 'container' in options
             ? options.container : "";
 
     
 
     var PROC = {
     
 };
 
 
     return _initGlob.output;
 }
 
 PL.init = function(appInstance, initOptions) {
 
 // app is more conventional than appInstance (used in exec script and app templates)
 var app = appInstance;
 
 initOptions = initOptions || {};
 
 if ('fadeAnnotations' in initOptions) {
     _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
 }
 
 this.procedures["bothbearsunfrozen"] = bothbearsunfrozen;
 this.procedures["snow"] = snow;
 
 var PROC = {
     "bothbearsunfrozen": bothbearsunfrozen,
     "snow": snow,
 };
 
 var ashwee, achang;
 
 // utility function envoked by almost all V3D-specific puzzles
 // filter off some non-mesh types
 function notIgnoredObj(obj) {
     return obj.type !== 'AmbientLight' &&
            obj.name !== '' &&
            !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
            !obj.isAuxClippingMesh;
 }
 
 
 // utility function envoked by almost all V3D-specific puzzles
 // find first occurence of the object by its name
 function getObjectByName(objName) {
     var objFound;
     var runTime = _pGlob !== undefined;
     objFound = runTime ? _pGlob.objCache[objName] : null;
 
     if (objFound && objFound.name === objName)
         return objFound;
 
     if (appInstance.scene) {
         appInstance.scene.traverse(function(obj) {
             if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                 objFound = obj;
                 if (runTime) {
                     _pGlob.objCache[objName] = objFound;
                 }
             }
         });
     }
     return objFound;
 }
 
 
 // utility function envoked by almost all V3D-specific puzzles
 // retrieve all objects on the scene
 function getAllObjectNames() {
     var objNameList = [];
     appInstance.scene.traverse(function(obj) {
         if (notIgnoredObj(obj))
             objNameList.push(obj.name)
     });
     return objNameList;
 }
 
 
 // utility function envoked by almost all V3D-specific puzzles
 // retrieve all objects which belong to the group
 function getObjectNamesByGroupName(targetGroupName) {
     var objNameList = [];
     appInstance.scene.traverse(function(obj){
         if (notIgnoredObj(obj)) {
             var groupNames = obj.groupNames;
             if (!groupNames)
                 return;
             for (var i = 0; i < groupNames.length; i++) {
                 var groupName = groupNames[i];
                 if (groupName == targetGroupName) {
                     objNameList.push(obj.name);
                 }
             }
         }
     });
     return objNameList;
 }
 
 
 // utility function envoked by almost all V3D-specific puzzles
 // process object input, which can be either single obj or array of objects, or a group
 function retrieveObjectNames(objNames) {
     var acc = [];
     retrieveObjectNamesAcc(objNames, acc);
     return acc.filter(function(name) {
         return name;
     });
 }
 
 function retrieveObjectNamesAcc(currObjNames, acc) {
     if (typeof currObjNames == "string") {
         acc.push(currObjNames);
     } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
         var newObj = getObjectNamesByGroupName(currObjNames[1]);
         for (var i = 0; i < newObj.length; i++)
             acc.push(newObj[i]);
     } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
         var newObj = getAllObjectNames();
         for (var i = 0; i < newObj.length; i++)
             acc.push(newObj[i]);
     } else if (Array.isArray(currObjNames)) {
         for (var i = 0; i < currObjNames.length; i++)
             retrieveObjectNamesAcc(currObjNames[i], acc);
     }
 }
 
 // show and hide puzzles
 function changeVis(objSelector, bool) {
     var objNames = retrieveObjectNames(objSelector);
 
     for (var i = 0; i < objNames.length; i++) {
         var objName = objNames[i]
         if (!objName)
             continue;
         var obj = getObjectByName(objName);
         if (!obj)
             continue;
         obj.visible = bool;
         obj.resolveMultiMaterial().forEach(function(objR) {
             objR.visible = bool;
         });
     }
 }
 
 /**
  * Get a scene that contains the root of the given action.
  */
 function getSceneByAction(action) {
     var root = action.getRoot();
     var scene = root.type == "Scene" ? root : null;
     root.traverseAncestors(function(ancObj) {
         if (ancObj.type == "Scene") {
             scene = ancObj;
         }
     });
     return scene;
 }
 
 /**
  * Get the current scene's framerate.
  */
 function getSceneAnimFrameRate(scene) {
     if (scene && 'animFrameRate' in scene.userData) {
         return scene.userData.animFrameRate;
     }
     return 24;
 }
 
 _pGlob.animMixerCallbacks = [];
 
 var initAnimationMixer = function() {
 
     function onMixerFinished(e) {
         var cb = _pGlob.animMixerCallbacks;
         var found = [];
         for (var i = 0; i < cb.length; i++) {
             if (cb[i][0] == e.action) {
                 cb[i][0] = null; // desactivate
                 found.push(cb[i][1]);
             }
         }
         for (var i = 0; i < found.length; i++) {
             found[i]();
         }
     }
 
     return function initAnimationMixer() {
         if (appInstance.mixer && !appInstance.mixer.hasEventListener('finished', onMixerFinished))
             appInstance.mixer.addEventListener('finished', onMixerFinished);
     };
 
 }();
 
 // animation puzzles
 function operateAnimation(operation, animations, from, to, loop, speed, callback, rev) {
     if (!animations)
         return;
     // input can be either single obj or array of objects
     if (typeof animations == "string")
         animations = [animations];
 
     function processAnimation(animName) {
         var action = v3d.SceneUtils.getAnimationActionByName(appInstance, animName);
         if (!action)
             return;
         switch (operation) {
         case 'PLAY':
             if (!action.isRunning()) {
                 action.reset();
                 if (loop && (loop != "AUTO"))
                     action.loop = v3d[loop];
                 var scene = getSceneByAction(action);
                 var frameRate = getSceneAnimFrameRate(scene);
 
                 action.repetitions = Infinity;
 
                 var timeScale = Math.abs(parseFloat(speed));
                 if (rev)
                     timeScale *= -1;
 
                 action.timeScale = timeScale;
                 action.timeStart = from !== null ? from/frameRate : 0;
                 if (to !== null) {
                     action.getClip().duration = to/frameRate;
                 } else {
                     action.getClip().resetDuration();
                 }
                 action.time = timeScale >= 0 ? action.timeStart : action.getClip().duration;
 
                 action.paused = false;
                 action.play();
 
                 // push unique callbacks only
                 var callbacks = _pGlob.animMixerCallbacks;
                 var found = false;
 
                 for (var j = 0; j < callbacks.length; j++)
                     if (callbacks[j][0] == action && callbacks[j][1] == callback)
                         found = true;
 
                 if (!found)
                     _pGlob.animMixerCallbacks.push([action, callback]);
             }
             break;
         case 'STOP':
             action.stop();
 
             // remove callbacks
             var callbacks = _pGlob.animMixerCallbacks;
             for (var j = 0; j < callbacks.length; j++)
                 if (callbacks[j][0] == action) {
                     callbacks.splice(j, 1);
                     j--
                 }
 
             break;
         case 'PAUSE':
             action.paused = true;
             break;
         case 'RESUME':
             action.paused = false;
             break;
         case 'SET_FRAME':
             var scene = getSceneByAction(action);
             var frameRate = getSceneAnimFrameRate(scene);
             action.time = from ? from/frameRate : 0;
             action.play();
             action.paused = true;
             break;
         case 'SET_SPEED':
             var timeScale = parseFloat(speed);
             action.timeScale = rev ? -timeScale : timeScale;
             break;
         }
     }
 
     for (var i = 0; i < animations.length; i++) {
         var animName = animations[i];
         if (animName)
             processAnimation(animName);
     }
 
     initAnimationMixer();
 }
 
 // bloom puzzle
 function bloom(threshold, strength, radius) {
     appInstance.enablePostprocessing([{
         type: 'bloom',
         threshold: threshold,
         strength: strength,
         radius: radius
     }]);
 }
 
 // everyFrame puzzle
 function registerEveryFrame(callback) {
     if (typeof callback == 'function') {
         appInstance.renderCallbacks.push(callback);
         if (v3d.PL.editorRenderCallbacks)
             v3d.PL.editorRenderCallbacks.push([appInstance, callback]);
     }
 }
 
 // utility function used by the whenClicked, whenHovered and whenDraggedOver puzzles
 function initObjectPicking(callback, eventType, mouseDownUseTouchStart, mouseButtons) {
 
     var elem = appInstance.renderer.domElement;
     elem.addEventListener(eventType, pickListener);
     if (v3d.PL.editorEventListeners)
         v3d.PL.editorEventListeners.push([elem, eventType, pickListener]);
 
     if (eventType == 'mousedown') {
 
         var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
         elem.addEventListener(touchEventName, pickListener);
         if (v3d.PL.editorEventListeners)
             v3d.PL.editorEventListeners.push([elem, touchEventName, pickListener]);
 
     } else if (eventType == 'dblclick') {
 
         var prevTapTime = 0;
 
         function doubleTapCallback(event) {
 
             var now = new Date().getTime();
             var timesince = now - prevTapTime;
 
             if (timesince < 600 && timesince > 0) {
 
                 pickListener(event);
                 prevTapTime = 0;
                 return;
 
             }
 
             prevTapTime = new Date().getTime();
         }
 
         var touchEventName = mouseDownUseTouchStart ? 'touchstart' : 'touchend';
         elem.addEventListener(touchEventName, doubleTapCallback);
         if (v3d.PL.editorEventListeners)
             v3d.PL.editorEventListeners.push([elem, touchEventName, doubleTapCallback]);
     }
 
     var raycaster = new v3d.Raycaster();
 
     function pickListener(event) {
 
         // to handle unload in loadScene puzzle
         if (!appInstance.getCamera())
             return;
 
         event.preventDefault();
 
         var xNorm = 0, yNorm = 0;
         if (event instanceof MouseEvent) {
             if (mouseButtons && mouseButtons.indexOf(event.button) == -1)
                 return;
             xNorm = event.offsetX / elem.clientWidth;
             yNorm = event.offsetY / elem.clientHeight;
         } else if (event instanceof TouchEvent) {
             var rect = elem.getBoundingClientRect();
             xNorm = (event.changedTouches[0].clientX - rect.left) / rect.width;
             yNorm = (event.changedTouches[0].clientY - rect.top) / rect.height;
         }
 
         _pGlob.screenCoords.x = xNorm * 2 - 1;
         _pGlob.screenCoords.y = -yNorm * 2 + 1;
         raycaster.setFromCamera(_pGlob.screenCoords, appInstance.getCamera(true));
         var objList = [];
         appInstance.scene.traverse(function(obj){objList.push(obj);});
         var intersects = raycaster.intersectObjects(objList, false);
         callback(intersects, event);
     }
 }
 
 function objectsIncludeObj(objNames, testedObjName) {
     if (!testedObjName) return false;
 
     for (var i = 0; i < objNames.length; i++) {
         if (testedObjName == objNames[i]) {
             return true;
         } else {
             // also check children which are auto-generated for multi-material objects
             var obj = getObjectByName(objNames[i]);
             if (obj && obj.type == "Group") {
                 for (var j = 0; j < obj.children.length; j++) {
                     if (testedObjName == obj.children[j].name) {
                         return true;
                     }
                 }
             }
         }
     }
     return false;
 }
 
 // utility function used by the whenClicked, whenHovered, whenDraggedOver, and raycast puzzles
 function getPickedObjectName(obj) {
     // auto-generated from a multi-material object, use parent name instead
     if (obj.isMesh && obj.isMaterialGeneratedMesh && obj.parent) {
         return obj.parent.name;
     } else {
         return obj.name;
     }
 }
 
 // whenClicked puzzle
 function registerOnClick(objSelector, xRay, doubleClick, mouseButtons, cbDo, cbIfMissedDo) {
 
     // for AR/VR
     _pGlob.objClickInfo = _pGlob.objClickInfo || [];
 
     _pGlob.objClickInfo.push({
         objSelector: objSelector,
         callbacks: [cbDo, cbIfMissedDo]
     });
 
     initObjectPicking(function(intersects, event) {
 
         var isPicked = false;
 
         var maxIntersects = xRay ? intersects.length : Math.min(1, intersects.length);
 
         for (var i = 0; i < maxIntersects; i++) {
             var obj = intersects[i].object;
             var objName = getPickedObjectName(obj);
             var objNames = retrieveObjectNames(objSelector);
 
             if (objectsIncludeObj(objNames, objName)) {
                 // save the object for the pickedObject block
                 _pGlob.pickedObject = objName;
                 isPicked = true;
                 cbDo(event);
             }
         }
 
         if (!isPicked) {
             _pGlob.pickedObject = '';
             cbIfMissedDo(event);
         }
 
     }, doubleClick ? 'dblclick' : 'mousedown', false, mouseButtons);
 }
 
 function MediaHTML5(isVideo) {
     this.source = null;
 }
 
 Object.assign(MediaHTML5.prototype, {
 
     load: function(url, isVideo) {
         if (isVideo) {
             this.source = document.createElement('video');
             this.source.playsInline = true;
             this.source.preload = 'auto';
             this.source.autoload = true;
             this.source.crossOrigin = 'anonymous';
         } else {
             this.source = document.createElement('audio');
         }
 
         this.source.src = url;
         return this;
     },
 
     play: function() {
         this.source.play();
     },
 
     pause: function() {
         this.source.pause();
     },
 
     stop: function() {
         this.source.pause();
         this.source.currentTime = 0;
     },
 
     rewind: function() {
         this.source.currentTime = 0;
     },
 
     setPlaybackTime: function(time) {
         this.source.currentTime = time
     },
 
     getPlaybackTime: function() {
         return this.source.currentTime;
     },
 
     setPlaybackRate: function(rate) {
         this.source.playbackRate = rate;
     },
 
     isPlaying: function() {
         return this.source.duration > 0 && !this.source.paused;
     },
 
     setLoop: function(looped) {
         this.source.loop = looped;
     },
 
     setVolume: function(volume) {
         this.source.volume = volume;
     },
 
     setMuted: function(muted) {
         this.source.muted = muted;
     },
 
 });
 
 // loadMedia puzzle
 function loadMedia_HTML5(url) {
 
     var elems = _pGlob.mediaElements;
     if (!(url in elems)) {
         elems[url] = new MediaHTML5().load(url);
     }
     return elems[url];
 }
 
 // playSound puzzle
 function playSound(mediaElem, loop) {
     if (!mediaElem)
         return;
     mediaElem.setLoop(loop);
     mediaElem.play();
 }
 
 // Describe this function...
 function bothbearsunfrozen() {
   snow();
   ashwee = false;
   achang = false;
   playSound(loadMedia_HTML5('./sounds/jinglebells.mp3'), true);
 }
 
 // Describe this function...
 function snow() {
   var VARS = Object.defineProperties({}, {
     "ashwee": { get: function() { return ashwee; }, set: function(val) { ashwee = val; } },
     "achang": { get: function() { return achang; }, set: function(val) { achang = val; } },
 });
 
   Function('app', 'v3d', 'VARS', 'PROC', (('// Built-in variables: app, v3d, VARS, PROC' + '\n' +
   'const geometry = new v3d.SphereGeometry(0.1);' + '\n' +
   'const material = new v3d.MeshBasicMaterial({ color: 0xffffff });' + '\n' +
   '' + '\n' +
   'let spheres = []' + '\n' +
   '' + '\n' +
   'setInterval(function() {' + '\n' +
   '    let s = new v3d.Mesh(geometry, material);' + '\n' +
   '    app.scene.add(s);' + '\n' +
   '    spheres.push(s)' + '\n' +
   '    s.position.x = Math.random() * 40 - 20;' + '\n' +
   '    s.position.y = 35;' + '\n' +
   '    s.position.z = Math.random() * 40 - 20;' + '\n' +
   '    ' + '\n' +
   '    spheres.forEach(function(sphere, i) {' + '\n' +
   '        sphere.position.y = sphere.position.y - 0.1' + '\n' +
   '        if (sphere.position.y < 0) {' + '\n' +
   '            spheres.splice(i, 1)' + '\n' +
   '            setTimeout(() => app.scene.remove(sphere), 1000)' + '\n' +
   '        }' + '\n' +
   '    })' + '\n' +
   '}, 10)' + '\n' +
   '              ')))(appInstance, v3d, VARS, PROC);
 
 }
 
 
 /*                                                                                                             */
 /* On Run */
 changeVis('BezierCircle', false);
 changeVis('BezierCircle.001', false);
 /* Show Hearts */
 changeVis('BezierCircle', true);
 changeVis('BezierCircle.001', true);
 /* Text Popup */
 /* Firework Animations */
 
 let interval = setInterval(function() {
    if (removed) {
        clearInterval(interval)
        operateAnimation('PLAY', 'FireworkParticle', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.001', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.002', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.003', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.004', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.005', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.006', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.007', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.008', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.009', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.010', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.011', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.012', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.013', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.014', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.015', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.016', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.017', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.018', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.019', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.020', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.021', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.022', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.023', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.024', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.025', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.026', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.027', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.028', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.029', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.030', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.031', null, null, 'LoopOnce', 1,
                function() {}, false);
        
        
        operateAnimation('PLAY', 'FireworkParticle.032', null, null, 'LoopOnce', 1,
                function() {}, false);
        
            bloom(0, 0.5, 0);
    }})
 /*                                                                                                             */
 /* Snow Machine */
 registerEveryFrame(function() {});
 registerOnClick('Cube.001', false, false, [0,1,2], function() {
   ashwee = true;
   changeVis('Cube.001', false);
 
   operateAnimation('PLAY', 'Box.001', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.002', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.007', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.014', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.015', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
       if (ashwee == true && achang == true) {
     bothbearsunfrozen();
   }
 }, function() {});
 registerOnClick('Cube.002', false, false, [0,1,2], function() {
   achang = true;
   changeVis('Cube.002', false);
 
   operateAnimation('PLAY', 'Box.004', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.011', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.012', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.016', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
 
   operateAnimation('PLAY', 'Box.017', null, null, 'LoopRepeat', 1,
           function() {}, false);
 
       if (ashwee == true && achang == true) {
     bothbearsunfrozen();
   }
 }, function() {});
 /*                                                                                                             */
 
 
 
 } // end of PL.init function
 
 })(); // end of closure
 
 /* ================================ end of code ============================= */
 
