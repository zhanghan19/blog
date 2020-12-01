# 其它API

## 标准化组织

- khronos
	- WebGL
- ECMA
	- ECMAScript
- WHATWG
	- html
- W3C
	- webaudio
	- CG/WG

- 获取API
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<script>
		    let names = Object.getOwnPropertyNames(window);
		
		    function filterOut(names, props) {
		        let set = new Set();
		        props.forEach(o => set.add(o));
		        return names.filter(e => !set.has(e));
		    }
		
		    //ECMA 262
		    {
		        let js = new Set();
		        let objects = ["globalThis", "console", "BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
		        objects.forEach(o => js.add(o));
		        names = names.filter(e => !js.has(e));
		    }
		
		    names = names.filter(e => {
		        try {
		            return !(window[e].prototype instanceof Node)
		        } catch (err) {
		            return true;
		        }
		    }).filter(e => e != "Node");
		
		    names = names.filter(e => !e.match(/^on/))
		
		    names = names.filter(e => !e.match(/^webkit/))
		
		    //https://html.spec.whatwg.org/#window
		
		    {
		        let names = Object.getOwnPropertyNames(window)
		        let js = new Set();
		        let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
		        objects.forEach(o => js.add(o));
		        names = names.filter(e => !js.has(e));
		
		        names = names.filter(e => {
		            try {
		                return !(window[e].prototype instanceof Node)
		            } catch (err) {
		                return true;
		            }
		        }).filter(e => e != "Node")
		
		        let windowprops = new Set();
		        objects = ["window", "self", "document", "name", "location", "history", "customElements", "locationbar", "menubar", " personalbar", "scrollbars", "statusbar", "toolbar", "status", "close", "closed", "stop", "focus", " blur", "frames", "length", "top", "opener", "parent", "frameElement", "open", "navigator", "applicationCache", "alert", "confirm", "prompt", "print", "postMessage", "console"];
		        objects.forEach(o => windowprops.add(o));
		        names = names.filter(e => !windowprops.has(e));
		    }
		
		    //https://html.spec.whatwg.org/
		
		    {
		        let interfaces = new Set();
		        objects = ["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"];
		        objects.forEach(o => interfaces.add(o));
		
		        names = names.filter(e => !interfaces.has(e));
		    }
		
		    //http://www.ecma-international.org/ecma-402/5.0/index.html#Title
		
		    names = names.filter(e => e != "Intl")
		
		    //https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15
		
		    names = filterOut(names, ["WebGLVertexArrayObject", "WebGLTransformFeedback", "WebGLSync", "WebGLSampler", "WebGLQuery", "WebGL2RenderingContext", "WebGLContextEvent", "WebGLObject", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLTexture", "WebGLUniformLocation", "WebGLActiveInfo", "WebGLShaderPrecisionFormat", "WebGLRenderingContext"]);
		
		    //https://www.w3.org/TR/webaudio/
		
		    names = filterOut(names, ["AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"]);
		
		    //https://encoding.spec.whatwg.org/#dom-textencoder
		
		    names = filterOut(names, ["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"]);
		
		    //https://streams.spec.whatwg.org/#blqs-class
		
		    names = filterOut(names, ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"]);
		
		    //https://wicg.github.io/BackgroundSync/spec/#sync-manager-interface
		
		    names = filterOut(names, ["SyncManager"]);
			
			// URL
		    names = filterOut(names, ["URL","URLSearchParams"]);
			// fetch
		    names = filterOut(names, ["Headers","Body","Request"]);
			// storage
			names = filterOut(names, ["Storage","StorageManager","WindowSessionStorage","WindowLocalStorage","StorageEvent","StorageEventInit"]);
			// svg
			names = filterOut(names, ["SVGElement","SVGAnimatedBoolean","SVGAnimatedString","SVGStringList","SVGAnimatedEnumeration","SVGAnimatedInteger","SVGNumber","SVGAnimatedNumber","SVGNumberList","SVGAnimatedNumberList","SVGLength","SVGAnimatedLength","SVGLengthList","SVGAnimatedLengthList","SVGAngle","SVGAnimatedAngle","SVGColor","SVGICCColor","SVGRect","SVGAnimatedRect","SVGUnitTypes","SVGStylable","SVGLocatable","SVGTransformable","SVGTests","SVGLangSpace","SVGExternalResourcesRequired","SVGFitToViewBox","SVGZoomAndPan","SVGViewSpec","SVGURIReference","SVGCSSRule","SVGRenderingIntent","SVGTransformList","SVGTransform","SVGPreserveAspectRatio","SVGPointList","SVGPoint","SVGMatrix","SVGAnimatedTransformList","SVGAnimatedPreserveAspectRatio",]);
			// html
			names = filterOut(names, ["HTMLAllCollection","HTMLOptionsCollection","HTMLFormControlsCollection","DOMStringMap","DOMStringList","DOMRectReadOnly","DOMRectList","DOMRect","DOMQuad","DOMPointReadOnly","DOMPoint","DOMParser","DOMMatrixReadOnly","DOMMatrix","DOMException","TrackEvent","SubmitEvent","FormDataEvent","ImageBitmapRenderingContext","OffscreenCanvas","CustomElementRegistry","ElementInternals","DataTransfer","DataTransferItemList","DataTransferItem","DragEvent","History","Location","PopStateEvent","HashChangeEvent","PageTransitionEvent","BeforeUnloadEvent","ErrorEvent","PromiseRejectionEvent","MessageEvent","EventSource","WebSocket","CloseEvent","Worker","WorkerNavigator","WorkerLocation","Storage","sessionStorage","localStorage","ApplicationCache","AudioTrack","AudioTrackList","BarProp","BeforeUnloadEvent","BroadcastChannel","CanvasGradient","CanvasPattern","CanvasRenderingContext2D","CloseEvent","CustomElementRegistry","DOMParser","DOMStringList","DOMStringMap","DataTransfer","DataTransferItem","DataTransferItemList","DedicatedWorkerGlobalScope","Document","DragEvent","ElementInternals","ErrorEvent","EventSource","External","FormDataEvent","HTMLAllCollection","HTMLAnchorElement","HTMLAreaElement","HTMLAudioElement","HTMLBRElement","HTMLBaseElement","HTMLBodyElement","HTMLButtonElement","HTMLCanvasElement","HTMLDListElement","HTMLDataElement","HTMLDataListElement","HTMLDetailsElement","HTMLDialogElement","HTMLDirectoryElement","HTMLDivElement","HTMLElement","HTMLEmbedElement","HTMLFieldSetElement","HTMLFontElement","HTMLFormControlsCollection","HTMLFormElement","HTMLFrameElement","HTMLFrameSetElement","HTMLHRElement","HTMLHeadElement","HTMLHeadingElement","HTMLHtmlElement","HTMLIFrameElement","HTMLImageElement","HTMLInputElement","HTMLLIElement","HTMLLabelElement","HTMLLegendElement","HTMLLinkElement","HTMLMapElement","HTMLMarqueeElement","HTMLMediaElement","HTMLMenuElement","HTMLMetaElement","HTMLMeterElement","HTMLModElement","HTMLOListElement","HTMLObjectElement","HTMLOptGroupElement","HTMLOptionElement","HTMLOptionsCollection","HTMLOutputElement","HTMLParagraphElement","HTMLParamElement","HTMLPictureElement","HTMLPreElement","HTMLProgressElement","HTMLQuoteElement","HTMLScriptElement","HTMLSelectElement","HTMLSlotElement","HTMLSourceElement","HTMLSpanElement","HTMLStyleElement","HTMLTableCaptionElement","HTMLTableCellElement","HTMLTableColElement","HTMLTableElement","HTMLTableRowElement","HTMLTableSectionElement","HTMLTemplateElement","HTMLTextAreaElement","HTMLTimeElement","HTMLTitleElement","HTMLTrackElement","HTMLUListElement","HTMLUnknownElement","HTMLVideoElement","HashChangeEvent","History","ImageBitmap","ImageBitmapRenderingContext","ImageData","Location","MediaError","MessageChannel","MessageEvent","MessagePort","MimeType","MimeTypeArray","Navigator","OffscreenCanvas","OffscreenCanvasRenderingContext2D","PageTransitionEvent","Path2D","Plugin","PluginArray","PopStateEvent","PromiseRejectionEvent","RadioNodeList","SharedWorker","SharedWorkerGlobalScope","Storage","StorageEvent","SubmitEvent","TextMetrics","TextTrack","TextTrackCue","TextTrackCueList","TextTrackList","TimeRanges","TrackEvent","ValidityState","VideoTrack","VideoTrackList","WebSocket","Window","Worker","WorkerGlobalScope","WorkerLocation","WorkerNavigator","parent","frameElement"]);
			// dom
			names = filterOut(names, ["Event","Window","CustomEvent","EventTarget","AbortController","AbortSingal","NodeList","HTMLCollection","MutationObserver","MutationRecord","Node","Document","DOMImplementation","DomcumentType","DocumentFragment","ShadowRoot","Element","NamedNodeMap","CharacterData","Text","CDATASection","ProcessingInstruction","Comment","AbstractRange","StaticRange","Range","NodeIterator","TreeWalker","NodeFilter","DOMTokenList","XPathResult","XPathExpression","XPathEvaluator"]);
			// cssom
			names = filterOut(names, ["CSS","CSSFontFaceRule","CSSStyleSheet","CSSStyleDeclaration","CSSRuleList","CSSRule","CSSStyleRule","CSSImportRule","CSSGroupingRule","CSSMediaRule","CSSPageRule","CSSMarginRule","CSSNamespaceRule","CSSStyleValue","StylePropertyMapReadOnly","StylePropertyMap","CSSUnparsedValue","CSSVariableReferenceValue","CSSKeywordValue","CSSNumericValue","CSSUnitValue","CSSMathValue","CSSMathSum","CSSMathProduct","CSSMathNegate","CSSMathInvert","CSSMathMin","CSSMathMax","CSSNumericArray","CSSTransformValue","CSSTransformComponent","CSSTranslate","CSSRotate","CSSScale","CSSSkew","CSSSkewX","CSSSkewY","CSSPerspective","CSSMatrixComponent","CSSPositionValue","CSSImageValue","CSSConditionRule","CSSMediaRule","CSSSupportsRule","AnimationEvent","CSSKeyframeRule","CSSKeyframesRule","screen","innerWidth","innerHeight","scrollX","pageXOffset","scrollY","pageYOffset","visualViewport","screenX","screenY","outerWidth","outerHeight","devicePixelRatio","clientInformation","event","offscreenBuffering","screenLeft","screenTop"]);
			// webgl
			names = filterOut(names, ["WebKitCSSMatrix"]);
			// screen-orientation
			names = filterOut(names, ["Screen","ScreenOrientation"]);
			// image-capture
			names = filterOut(names, ["PhotoCapabilities","MediaSettingsRange","ImageCapture"]);
			// media
			names = filterOut(names, ["MediaCapabilitiesInfo","MediaConfiguration","MediaDecodingConfiguration","MediaDeviceInfo","MediaDevices","MediaElementAudioSourceNode","MediaEncodingConfiguration","MediaError","MediaImage","MediaKeyMessageEvent","MediaKeySession","MediaKeyStatusMap","MediaKeySystemAccess","MediaKeySystemConfiguration","MediaKeys","MediaList","MediaMetadata","MediaPositionState","MediaQueryList","MediaQueryListEvent","MediaQueryListListener","MediaRecorder","MediaRecorderErrorEvent","MediaSession","MediaSessionActionDetails","MediaSource","MediaStream","MediaStreamAudioDestinationNode","MediaStreamAudioSourceNode","MediaStreamAudioSourceOptions","MediaStreamConstraints","MediaStreamEvent","MediaStreamTrack","MediaStreamTrackAudioSourceNode","MediaStreamTrackAudioSourceOptions","MediaStreamTrackEvent","MediaTrackConstraints","MediaTrackSettings","MediaTrackSupportedConstraints","NavigationPreloadManager","NavigatorConcurrentHardware","NavigatorLanguage","NavigatorOnLine","NavigatorStorage","InputDeviceInfo","OverconstrainedError","WorkerNavigator","MediaCapabilities"]);
			// webrtc-pc
			names = filterOut(names, ["RTCAnswerOptions","RTCCertificate","RTCConfiguration","RTCDTMFSender","RTCDTMFToneChangeEvent","RTCDataChannel","RTCDataChannelEvent","RTCDtlsTransport","RTCIceCandidate","RTCIceCandidateInit","RTCIceCandidatePair","RTCIceCandidatePairStats","RTCIceCandidateStats","RTCIceCandidateType","RTCIceComponent","RTCIceCredentialType","RTCIceGathererState","RTCIceParameters","RTCIceProtocol","RTCIceRole","RTCIceServer","RTCIceTcpCandidateType","RTCIceTransport","RTCIceTransportState","RTCIdentityAssertion","RTCIdentityErrorEvent","RTCIdentityEvent","RTCInboundRtpStreamStats","RTCNetworkType","RTCOfferAnswerOptions","RTCOfferOptions","RTCOutboundRtpStreamStats","RTCPeerConnection","RTCPeerConnectionIceEvent","RTCRtpCodecParameters","RTCRtpContributingSource","RTCRtpEncodingParameters","RTCRtpReceiver","RTCRtpSendParameters","RTCRtpSender","RTCRtpStreamStats","RTCRtpSynchronizationSource","RTCRtpTransceiver","RTCRtpTransceiverDirection","RTCRtpTransceiverInit","RTCSctpTransport","RTCSessionDescription","RTCSessionDescriptionCallback","RTCStats","RTCStatsIceCandidatePairState","RTCStatsReport","RTCStatsType","RTCTrackEvent","RTCTrackEventInit","RTCPeerConnectionIceErrorEvent","RTCErrorEvent","RTCError"]);
			// media-source
			names = filterOut(names, ["SourceBuffer","SourceBufferList"]);
			// Web Background Synchronization
			names = filterOut(names, ["ServiceWorkerRegistration"]);
			// indexedDB
			names = filterOut(names, ["indexedDB","IDBRequest","IDBOpenDBRequest","IDBVersionChangeEvent","WindowOrWorkerGlobalScope","IDBFactory","IDBDatabase","IDBObjectStore","IDBIndex","IDBKeyRange","IDBCursor","IDBCursorWithValue","IDBTransaction",]);
			// xhr
			names = filterOut(names, ["XMLHttpRequestUpload","XMLHttpRequestEventTarget","XMLHttpRequest","FormData","ProgressEvent",]);
			
			names = filterOut(names, ["Notification"]);
			
			
			
		    console.log(names);
		
		
		</script>
	</body>
</html>

```