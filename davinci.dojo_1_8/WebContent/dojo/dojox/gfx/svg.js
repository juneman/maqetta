//>>built
define("dojox/gfx/svg",["dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/_base/declare","dojo/_base/array","dojo/dom-geometry","dojo/dom-attr","dojo/_base/Color","./_base","./shape","./path"],function(_1,_2,_3,_4,_5,_6,_7,_8,g,gs,_9){var _a=g.svg={};_a.useSvgWeb=(typeof window.svgweb!="undefined");var _b=navigator.userAgent.toLowerCase(),_c=_b.search("iphone")>-1||_b.search("ipad")>-1||_b.search("ipod")>-1;function _d(ns,_e){if(_2.doc.createElementNS){return _2.doc.createElementNS(ns,_e);}else{return _2.doc.createElement(_e);}};function _f(_10){if(_a.useSvgWeb){return _2.doc.createTextNode(_10,true);}else{return _2.doc.createTextNode(_10);}};function _11(){if(_a.useSvgWeb){return _2.doc.createDocumentFragment(true);}else{return _2.doc.createDocumentFragment();}};_a.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};_a.getRef=function(_12){if(!_12||_12=="none"){return null;}if(_12.match(/^url\(#.+\)$/)){return _3.byId(_12.slice(5,-1));}if(_12.match(/^#dojoUnique\d+$/)){return _3.byId(_12.slice(1));}return null;};_a.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};var _13=0;_4("dojox.gfx.svg.Shape",gs.Shape,{destroy:function(){if(this.fillStyle&&"type" in this.fillStyle){var _14=this.rawNode.getAttribute("fill"),ref=_a.getRef(_14);if(ref){ref.parentNode.removeChild(ref);}}if(this.clip){var _15=this.rawNode.getAttribute("clip-path");if(_15){var _16=_3.byId(_15.match(/gfx_clip[\d]+/)[0]);_16&&_16.parentNode.removeChild(_16);}}this.rawNode=null;gs.Shape.prototype.destroy.apply(this,arguments);},setFill:function(_17){if(!_17){this.fillStyle=null;this.rawNode.setAttribute("fill","none");this.rawNode.setAttribute("fill-opacity",0);return this;}var f;var _18=function(x){this.setAttribute(x,f[x].toFixed(8));};if(typeof (_17)=="object"&&"type" in _17){switch(_17.type){case "linear":f=g.makeParameters(g.defaultLinearGradient,_17);var _19=this._setFillObject(f,"linearGradient");_5.forEach(["x1","y1","x2","y2"],_18,_19);break;case "radial":f=g.makeParameters(g.defaultRadialGradient,_17);var _1a=this._setFillObject(f,"radialGradient");_5.forEach(["cx","cy","r"],_18,_1a);break;case "pattern":f=g.makeParameters(g.defaultPattern,_17);var _1b=this._setFillObject(f,"pattern");_5.forEach(["x","y","width","height"],_18,_1b);break;}this.fillStyle=f;return this;}f=g.normalizeColor(_17);this.fillStyle=f;this.rawNode.setAttribute("fill",f.toCss());this.rawNode.setAttribute("fill-opacity",f.a);this.rawNode.setAttribute("fill-rule","evenodd");return this;},setStroke:function(_1c){var rn=this.rawNode;if(!_1c){this.strokeStyle=null;rn.setAttribute("stroke","none");rn.setAttribute("stroke-opacity",0);return this;}if(typeof _1c=="string"||_1.isArray(_1c)||_1c instanceof _8){_1c={color:_1c};}var s=this.strokeStyle=g.makeParameters(g.defaultStroke,_1c);s.color=g.normalizeColor(s.color);if(s){rn.setAttribute("stroke",s.color.toCss());rn.setAttribute("stroke-opacity",s.color.a);rn.setAttribute("stroke-width",s.width);rn.setAttribute("stroke-linecap",s.cap);if(typeof s.join=="number"){rn.setAttribute("stroke-linejoin","miter");rn.setAttribute("stroke-miterlimit",s.join);}else{rn.setAttribute("stroke-linejoin",s.join);}var da=s.style.toLowerCase();if(da in _a.dasharray){da=_a.dasharray[da];}if(da instanceof Array){da=_1._toArray(da);for(var i=0;i<da.length;++i){da[i]*=s.width;}if(s.cap!="butt"){for(var i=0;i<da.length;i+=2){da[i]-=s.width;if(da[i]<1){da[i]=1;}}for(var i=1;i<da.length;i+=2){da[i]+=s.width;}}da=da.join(",");}rn.setAttribute("stroke-dasharray",da);rn.setAttribute("dojoGfxStrokeStyle",s.style);}return this;},_getParentSurface:function(){var _1d=this.parent;for(;_1d&&!(_1d instanceof g.Surface);_1d=_1d.parent){}return _1d;},_setFillObject:function(f,_1e){var _1f=_a.xmlns.svg;this.fillStyle=f;var _20=this._getParentSurface(),_21=_20.defNode,_22=this.rawNode.getAttribute("fill"),ref=_a.getRef(_22);if(ref){_22=ref;if(_22.tagName.toLowerCase()!=_1e.toLowerCase()){var id=_22.id;_22.parentNode.removeChild(_22);_22=_d(_1f,_1e);_22.setAttribute("id",id);_21.appendChild(_22);}else{while(_22.childNodes.length){_22.removeChild(_22.lastChild);}}}else{_22=_d(_1f,_1e);_22.setAttribute("id",g._base._getUniqueId());_21.appendChild(_22);}if(_1e=="pattern"){_22.setAttribute("patternUnits","userSpaceOnUse");var img=_d(_1f,"image");img.setAttribute("x",0);img.setAttribute("y",0);img.setAttribute("width",f.width.toFixed(8));img.setAttribute("height",f.height.toFixed(8));img.setAttributeNS(_a.xmlns.xlink,"xlink:href",f.src);_22.appendChild(img);}else{_22.setAttribute("gradientUnits","userSpaceOnUse");for(var i=0;i<f.colors.length;++i){var c=f.colors[i],t=_d(_1f,"stop"),cc=c.color=g.normalizeColor(c.color);t.setAttribute("offset",c.offset.toFixed(8));t.setAttribute("stop-color",cc.toCss());t.setAttribute("stop-opacity",cc.a);_22.appendChild(t);}}this.rawNode.setAttribute("fill","url(#"+_22.getAttribute("id")+")");this.rawNode.removeAttribute("fill-opacity");this.rawNode.setAttribute("fill-rule","evenodd");return _22;},_applyTransform:function(){var _23=this.matrix;if(_23){var tm=this.matrix;this.rawNode.setAttribute("transform","matrix("+tm.xx.toFixed(8)+","+tm.yx.toFixed(8)+","+tm.xy.toFixed(8)+","+tm.yy.toFixed(8)+","+tm.dx.toFixed(8)+","+tm.dy.toFixed(8)+")");}else{this.rawNode.removeAttribute("transform");}return this;},setRawNode:function(_24){var r=this.rawNode=_24;if(this.shape.type!="image"){r.setAttribute("fill","none");}r.setAttribute("fill-opacity",0);r.setAttribute("stroke","none");r.setAttribute("stroke-opacity",0);r.setAttribute("stroke-width",1);r.setAttribute("stroke-linecap","butt");r.setAttribute("stroke-linejoin","miter");r.setAttribute("stroke-miterlimit",4);r.__gfxObject__=this.getUID();},setShape:function(_25){this.shape=g.makeParameters(this.shape,_25);for(var i in this.shape){if(i!="type"){this.rawNode.setAttribute(i,this.shape[i]);}}this.bbox=null;return this;},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);return this;},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);return this;},setClip:function(_26){this.inherited(arguments);var _27=_26?"width" in _26?"rect":"cx" in _26?"ellipse":"points" in _26?"polyline":"d" in _26?"path":null:null;if(_26&&!_27){return this;}if(_27==="polyline"){_26=_1.clone(_26);_26.points=_26.points.join(",");}var _28,_29,_2a=_7.get(this.rawNode,"clip-path");if(_2a){_28=_3.byId(_2a.match(/gfx_clip[\d]+/)[0]);if(_28){_28.removeChild(_28.childNodes[0]);}}if(_26){if(_28){_29=_d(_a.xmlns.svg,_27);_28.appendChild(_29);}else{var _2b=++_13;var _2c="gfx_clip"+_2b;var _2d="url(#"+_2c+")";this.rawNode.setAttribute("clip-path",_2d);_28=_d(_a.xmlns.svg,"clipPath");_29=_d(_a.xmlns.svg,_27);_28.appendChild(_29);this.rawNode.parentNode.appendChild(_28);_7.set(_28,"id",_2c);}_7.set(_29,_26);}else{this.rawNode.removeAttribute("clip-path");if(_28){_28.parentNode.removeChild(_28);}}return this;},_removeClipNode:function(){var _2e,_2f=_7.get(this.rawNode,"clip-path");if(_2f){_2e=_3.byId(_2f.match(/gfx_clip[\d]+/)[0]);if(_2e){_2e.parentNode.removeChild(_2e);}}return _2e;}});_4("dojox.gfx.svg.Group",_a.Shape,{constructor:function(){gs.Container._init.call(this);},setRawNode:function(_30){this.rawNode=_30;this.rawNode.__gfxObject__=this.getUID();},destroy:function(){this.clear(true);_a.Shape.prototype.destroy.apply(this,arguments);}});_a.Group.nodeType="g";_4("dojox.gfx.svg.Rect",[_a.Shape,gs.Rect],{setShape:function(_31){this.shape=g.makeParameters(this.shape,_31);this.bbox=null;for(var i in this.shape){if(i!="type"&&i!="r"){this.rawNode.setAttribute(i,this.shape[i]);}}if(this.shape.r!=null){this.rawNode.setAttribute("ry",this.shape.r);this.rawNode.setAttribute("rx",this.shape.r);}return this;}});_a.Rect.nodeType="rect";_4("dojox.gfx.svg.Ellipse",[_a.Shape,gs.Ellipse],{});_a.Ellipse.nodeType="ellipse";_4("dojox.gfx.svg.Circle",[_a.Shape,gs.Circle],{});_a.Circle.nodeType="circle";_4("dojox.gfx.svg.Line",[_a.Shape,gs.Line],{});_a.Line.nodeType="line";_4("dojox.gfx.svg.Polyline",[_a.Shape,gs.Polyline],{setShape:function(_32,_33){if(_32&&_32 instanceof Array){this.shape=g.makeParameters(this.shape,{points:_32});if(_33&&this.shape.points.length){this.shape.points.push(this.shape.points[0]);}}else{this.shape=g.makeParameters(this.shape,_32);}this.bbox=null;this._normalizePoints();var _34=[],p=this.shape.points;for(var i=0;i<p.length;++i){_34.push(p[i].x.toFixed(8),p[i].y.toFixed(8));}this.rawNode.setAttribute("points",_34.join(" "));return this;}});_a.Polyline.nodeType="polyline";_4("dojox.gfx.svg.Image",[_a.Shape,gs.Image],{setShape:function(_35){this.shape=g.makeParameters(this.shape,_35);this.bbox=null;var _36=this.rawNode;for(var i in this.shape){if(i!="type"&&i!="src"){_36.setAttribute(i,this.shape[i]);}}_36.setAttribute("preserveAspectRatio","none");_36.setAttributeNS(_a.xmlns.xlink,"xlink:href",this.shape.src);_36.__gfxObject__=this.getUID();return this;}});_a.Image.nodeType="image";_4("dojox.gfx.svg.Text",[_a.Shape,gs.Text],{setShape:function(_37){this.shape=g.makeParameters(this.shape,_37);this.bbox=null;var r=this.rawNode,s=this.shape;r.setAttribute("x",s.x);r.setAttribute("y",s.y);r.setAttribute("text-anchor",s.align);r.setAttribute("text-decoration",s.decoration);r.setAttribute("rotate",s.rotated?90:0);r.setAttribute("kerning",s.kerning?"auto":0);r.setAttribute("text-rendering","optimizeLegibility");if(r.firstChild){r.firstChild.nodeValue=s.text;}else{r.appendChild(_f(s.text));}return this;},getTextWidth:function(){var _38=this.rawNode,_39=_38.parentNode,_3a=_38.cloneNode(true);_3a.style.visibility="hidden";var _3b=0,_3c=_3a.firstChild.nodeValue;_39.appendChild(_3a);if(_3c!=""){while(!_3b){if(_3a.getBBox){_3b=parseInt(_3a.getBBox().width);}else{_3b=68;}}}_39.removeChild(_3a);return _3b;}});_a.Text.nodeType="text";_4("dojox.gfx.svg.Path",[_a.Shape,_9.Path],{_updateWithSegment:function(_3d){this.inherited(arguments);if(typeof (this.shape.path)=="string"){this.rawNode.setAttribute("d",this.shape.path);}},setShape:function(_3e){this.inherited(arguments);if(this.shape.path){this.rawNode.setAttribute("d",this.shape.path);}else{this.rawNode.removeAttribute("d");}return this;}});_a.Path.nodeType="path";_4("dojox.gfx.svg.TextPath",[_a.Shape,_9.TextPath],{_updateWithSegment:function(_3f){this.inherited(arguments);this._setTextPath();},setShape:function(_40){this.inherited(arguments);this._setTextPath();return this;},_setTextPath:function(){if(typeof this.shape.path!="string"){return;}var r=this.rawNode;if(!r.firstChild){var tp=_d(_a.xmlns.svg,"textPath"),tx=_f("");tp.appendChild(tx);r.appendChild(tp);}var ref=r.firstChild.getAttributeNS(_a.xmlns.xlink,"href"),_41=ref&&_a.getRef(ref);if(!_41){var _42=this._getParentSurface();if(_42){var _43=_42.defNode;_41=_d(_a.xmlns.svg,"path");var id=g._base._getUniqueId();_41.setAttribute("id",id);_43.appendChild(_41);r.firstChild.setAttributeNS(_a.xmlns.xlink,"xlink:href","#"+id);}}if(_41){_41.setAttribute("d",this.shape.path);}},_setText:function(){var r=this.rawNode;if(!r.firstChild){var tp=_d(_a.xmlns.svg,"textPath"),tx=_f("");tp.appendChild(tx);r.appendChild(tp);}r=r.firstChild;var t=this.text;r.setAttribute("alignment-baseline","middle");switch(t.align){case "middle":r.setAttribute("text-anchor","middle");r.setAttribute("startOffset","50%");break;case "end":r.setAttribute("text-anchor","end");r.setAttribute("startOffset","100%");break;default:r.setAttribute("text-anchor","start");r.setAttribute("startOffset","0%");break;}r.setAttribute("baseline-shift","0.5ex");r.setAttribute("text-decoration",t.decoration);r.setAttribute("rotate",t.rotated?90:0);r.setAttribute("kerning",t.kerning?"auto":0);r.firstChild.data=t.text;}});_a.TextPath.nodeType="text";_4("dojox.gfx.svg.Surface",gs.Surface,{constructor:function(){gs.Container._init.call(this);},destroy:function(){this.defNode=null;this.inherited(arguments);},setDimensions:function(_44,_45){if(!this.rawNode){return this;}this.rawNode.setAttribute("width",_44);this.rawNode.setAttribute("height",_45);return this;},getDimensions:function(){var t=this.rawNode?{width:g.normalizedLength(this.rawNode.getAttribute("width")),height:g.normalizedLength(this.rawNode.getAttribute("height"))}:null;return t;}});_a.createSurface=function(_46,_47,_48){var s=new _a.Surface();s.rawNode=_d(_a.xmlns.svg,"svg");s.rawNode.setAttribute("overflow","hidden");if(_47){s.rawNode.setAttribute("width",_47);}if(_48){s.rawNode.setAttribute("height",_48);}var _49=_d(_a.xmlns.svg,"defs");s.rawNode.appendChild(_49);s.defNode=_49;s._parent=_3.byId(_46);s._parent.appendChild(s.rawNode);return s;};var _4a={_setFont:function(){var f=this.fontStyle;this.rawNode.setAttribute("font-style",f.style);this.rawNode.setAttribute("font-variant",f.variant);this.rawNode.setAttribute("font-weight",f.weight);this.rawNode.setAttribute("font-size",f.size);this.rawNode.setAttribute("font-family",f.family);}};var C=gs.Container,_4b={openBatch:function(){this.fragment=_11();},closeBatch:function(){if(this.fragment){this.rawNode.appendChild(this.fragment);delete this.fragment;}},add:function(_4c){if(this!=_4c.getParent()){if(this.fragment){this.fragment.appendChild(_4c.rawNode);}else{this.rawNode.appendChild(_4c.rawNode);}C.add.apply(this,arguments);_4c.setClip(_4c.clip);}return this;},remove:function(_4d,_4e){if(this==_4d.getParent()){if(this.rawNode==_4d.rawNode.parentNode){this.rawNode.removeChild(_4d.rawNode);}if(this.fragment&&this.fragment==_4d.rawNode.parentNode){this.fragment.removeChild(_4d.rawNode);}_4d._removeClipNode();C.remove.apply(this,arguments);}return this;},clear:function(){var r=this.rawNode;while(r.lastChild){r.removeChild(r.lastChild);}var _4f=this.defNode;if(_4f){while(_4f.lastChild){_4f.removeChild(_4f.lastChild);}r.appendChild(_4f);}return C.clear.apply(this,arguments);},getBoundingBox:C.getBoundingBox,_moveChildToFront:C._moveChildToFront,_moveChildToBack:C._moveChildToBack};var _50={createObject:function(_51,_52){if(!this.rawNode){return null;}var _53=new _51(),_54=_d(_a.xmlns.svg,_51.nodeType);_53.setRawNode(_54);_53.setShape(_52);this.add(_53);return _53;}};_1.extend(_a.Text,_4a);_1.extend(_a.TextPath,_4a);_1.extend(_a.Group,_4b);_1.extend(_a.Group,gs.Creator);_1.extend(_a.Group,_50);_1.extend(_a.Surface,_4b);_1.extend(_a.Surface,gs.Creator);_1.extend(_a.Surface,_50);_a.fixTarget=function(_55,_56){if(!_55.gfxTarget){if(_c&&_55.target.wholeText){_55.gfxTarget=gs.byId(_55.target.parentElement.__gfxObject__);}else{_55.gfxTarget=gs.byId(_55.target.__gfxObject__);}}return true;};if(_a.useSvgWeb){_a.createSurface=function(_57,_58,_59){var s=new _a.Surface();if(!_58||!_59){var pos=_6.position(_57);_58=_58||pos.w;_59=_59||pos.h;}_57=_3.byId(_57);var id=_57.id?_57.id+"_svgweb":g._base._getUniqueId();var _5a=_d(_a.xmlns.svg,"svg");_5a.id=id;_5a.setAttribute("width",_58);_5a.setAttribute("height",_59);svgweb.appendChild(_5a,_57);_5a.addEventListener("SVGLoad",function(){s.rawNode=this;s.isLoaded=true;var _5b=_d(_a.xmlns.svg,"defs");s.rawNode.appendChild(_5b);s.defNode=_5b;if(s.onLoad){s.onLoad(s);}},false);s.isLoaded=false;return s;};_a.Surface.extend({destroy:function(){var _5c=this.rawNode;svgweb.removeChild(_5c,_5c.parentNode);}});var _5d={connect:function(_5e,_5f,_60){if(_5e.substring(0,2)==="on"){_5e=_5e.substring(2);}if(arguments.length==2){_60=_5f;}else{_60=_1.hitch(_5f,_60);}this.getEventSource().addEventListener(_5e,_60,false);return [this,_5e,_60];},disconnect:function(_61){this.getEventSource().removeEventListener(_61[1],_61[2],false);delete _61[0];}};_1.extend(_a.Shape,_5d);_1.extend(_a.Surface,_5d);}return _a;});