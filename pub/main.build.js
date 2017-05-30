var _Mathmax=Math.max,_Mathmin=Math.min,_Mathabs=Math.abs,_Mathsqrt=Math.sqrt;(function(A){function B(D){if(C[D])return C[D].exports;var E=C[D]={i:D,l:!1,exports:{}};return A[D].call(E.exports,E,E.exports,B),E.l=!0,E.exports}var C={};return B.m=A,B.c=C,B.i=function(D){return D},B.d=function(D,E,F){B.o(D,E)||Object.defineProperty(D,E,{configurable:!1,enumerable:!0,get:F})},B.n=function(D){var E=D&&D.__esModule?function(){return D['default']}:function(){return D};return B.d(E,'a',E),E},B.o=function(D,E){return Object.prototype.hasOwnProperty.call(D,E)},B.p='/',B(B.s=11)})([function(A,B){'use strict';B.a=4;B.c=2;B.b=4278190080},function(A,B,C){'use strict';var D=C(2);const E=Math.PI/180;class F{static create(G=4,H=4){for(var I=[];I.length<H;){for(var J=[];J.length<G;J.push(0));I.push(J)}return I}static identity(G){for(let H=0;H<G.length;H++)for(let I=0;I<G[H].length;I++)G[H][I]=H==I?1:0}static clone(G,H){for(let I=0;I<G.length;I++)for(let J=0;J<G[I].length;J++)H[I][J]=G[I][J]}static transform(G,H,I){var J=G[0]*H[0][0]+G[1]*H[1][0]+G[2]*H[2][0]+H[3][0],K=G[0]*H[0][1]+G[1]*H[1][1]+G[2]*H[2][1]+H[3][1],L=G[0]*H[0][2]+G[1]*H[1][2]+G[2]*H[2][2]+H[3][2],N=G[0]*H[0][3]+G[1]*H[1][3]+G[2]*H[2][3]+H[3][3];let O=0!=N&&1!=N?1/N:1;I[0]=J*O,I[1]=K*O,I[2]=L}static translate(G,H){F.identity(H),H[3][0]=G[0],H[3][1]=G[1],H[3][2]=G[2]}static perspective(G,H,I,J,K){let N=1/Math.tan(G*E/2);F.clone([[N,0,0,0],[0,N*H,0,0],[0,0,-(J+I)/(J-I),-1],[0,0,-2*J*I/(J-I),0]],K)}static lookat(G,H,I,J){let K=D.a.create();D.a.sub(G,H,K),D.a.norm(K,K);let L=D.a.create();D.a.cross(I,K,L),D.a.norm(L,L);let N=D.a.create();D.a.cross(K,L,N),D.a.norm(N,N);let O=-D.a.dot(L,G),Q=-D.a.dot(N,G),R=-D.a.dot(K,G),S=[[L[0],N[0],K[0],0],[L[1],N[1],K[1],0],[L[2],N[2],K[2],0],[O,Q,R,1]];F.clone(S,J)}static rotationy(G,H){let I=G*E,J=Math.sin(I),K=Math.cos(I);F.clone([[K,0,-J,0],[0,1,0,0],[J,0,K,0],[0,0,0,1]],H)}static concat(G,H){let I=G[0];for(let J=1,K=G.length-1;J<=K;J++)F.mul(I,G[J],H),J<K&&F.clone(H,I)}static mul(G,H,I){if(G[0].length!=H.length)throw RangeError('Matrices do not match!');for(let J=0;J<G.length;J++)for(let K=0;K<H[J].length;K++){I[J][K]=0;for(let L=0;L<G[J].length;L++)I[J][K]+=G[J][L]*H[L][K]}}}B.a=F},function(A,B){'use strict';class D{constructor(E=0,F=0,G=0){this.x=E,this.y=F,this.z=G}static create(E,F,G){return[E||0,F||0,G||0]}static add(E,F,G){G[0]=E[0]+F[0],G[1]=E[1]+F[1],G[2]=E[2]+F[2]}static sub(E,F,G){G[0]=E[0]-F[0],G[1]=E[1]-F[1],G[2]=E[2]-F[2]}static mul(E,F,G){G[0]=E[0]*F,G[1]=E[1]*F,G[2]=E[2]*F}static div(E,F,G){let H=1/F;G[0]=E[0]*H,G[1]=E[1]*H,G[2]=E[2]*H}static norm(E,F){let G=D.mag(E);0==G?F=[]:[F[0],F[1],F[2]]=[E[0]/G,E[1]/G,E[2]/G]}static mag(E){return _Mathsqrt(E[0]*E[0]+E[1]*E[1]+E[2]*E[2])}static dot(E,F){return E[0]*F[0]+E[1]*F[1]+E[2]*F[2]}static cross(E,F,G){G[0]=E[1]*F[2]-E[2]*F[1],G[1]=E[2]*F[0]-E[0]*F[2],G[2]=E[0]*F[1]-E[1]*F[0]}add(E){return new D(this.x+E.x,this.y+E.y,this.z+E.z)}sub(E){return new D(this.x-E.x,this.y-E.y,this.z-E.z)}norm(){let E=this.mag();return 0==E?new D:new D(this.x/E,this.y/E,this.z/E)}mag(){return _Mathsqrt(this.x*this.x+this.y*this.y+this.z*this.z)}dot(E){return this.x*E.x+this.y*E.y+this.z*E.z}cross(E){return new D(this.y*E.z-this.z*E.y,this.z*E.x-this.x*E.z,this.x*E.y-this.y*E.x)}}B.a=D},function(A,B){'use strict';class D{constructor(E,F){this.size=0,this.wasm=E,F&&this.allocate(F)}allocate(E){return this.size=E,this._heap=this.wasm._malloc(E),this._buffer=new Uint8ClampedArray(this.wasm.buffer,this._heap,this.size),this._buffer32=new Uint32Array(this.wasm.buffer,this._heap,this.size),this.size}copy(E){if(!this.size)throw ReferenceError('Copying into unallocated memory');E.length!=this._buffer.length&&console.warn('Array byte size mis-match, truncating will occur'),this._buffer.set(E)}get heap(){return this.wasm.buffer}get buffer(){return this._buffer}get buffer32(){return this._buffer32}get pointer(){return this._heap}}B.a=D},function(A,B,C){'use strict';var D=C(2),E=C(1),F=C(0),G=C(13);B.a=class{constructor(I,J,K){this.width=I,this.height=J,this.hwidth=I/2>>0,this.hheight=J/2>>0,this.currentraster=0,this.container=null,this.rasteroptions=K,this.rasteriser=this.rasteroptions[this.currentraster],this.rasteriser.init(I,J),this.bytes=I*J*F.a}create(I){let J=I?document.getElementById(I):document.body,K=document.createElement('canvas');this.container=document.getElementById('output');let L=document.getElementById('info');this.container.style.width=this.width+'px',this.container.style.height=this.height+'px',this.stats=new G.a(G.b.MS,this.container),this.container.onclick=()=>{this.cyclerasteriser(),this.stats.setview(this.currentraster)},this.container.insertBefore(K,L),K.width=this.width,K.height=this.height,this.canvas=K,this.context=this.canvas.getContext('2d'),this.imageData=this.context.getImageData(0,0,this.width,this.height),J.appendChild(this.container),this.clear()}cyclerasteriser(){this.currentraster=1-this.currentraster,this.rasteriser=this.rasteroptions[this.currentraster],this.rasteriser.ready||this.rasteriser.init(this.width,this.height)}use(I){I.ready||I.init(this.width,this.height),this.rasteriser=I}clear(){this.rasteriser.begin()}flip(){if(!this.rasteriser.buffer)throw new ReferenceError('`rasteriser.buffer: Uint8ClampedArray` is required!');this.imageData.data.set(this.rasteriser.buffer),this.context.putImageData(this.imageData,0,0)}render(I,J){if(!I.ready)return;let K=[0,0,-1],O=D.a.create(),Q=D.a.create(),R=D.a.create(),S=[D.a.create(),D.a.create(),D.a.create()],T=[D.a.create(),D.a.create(),D.a.create()],U,V=E.a.create();E.a.concat([I.matrix,J],V);for(let X,W=0;W<I.faces.length;W++){X=I.faces[W];for(let Z=0;3>Z;Z++)U=I.vertices[X[Z]],E.a.transform(U,V,T[Z]),S[Z][0]=T[Z][0]*this.width+this.hwidth,S[Z][1]=-T[Z][1]*this.height+this.hheight,S[Z][2]=T[Z][2];D.a.sub(T[2],T[1],O),D.a.sub(T[1],T[0],Q),D.a.cross(O,Q,R),D.a.norm(R,R);let Y=D.a.dot(R,K);0<Y&&0<I.textures.length&&this.rasteriser.tri(S,I.uvs[W],0.3+Y*1.35,I.textures[I.uvtextures[W]],I.wireframe)}}}},function(A,B,C){'use strict';var D=C(3),E=C(0);B.a=class{constructor(G,H){this.ready=!1,H&&this.load(H),this.wasm=G}load(G){let H=document.createElement('img');H.src=G,H.onload=()=>{let I=document.createElement('canvas'),J=I.getContext('2d');this.maxu=H.width-1,this.maxv=H.height-1,I.width=H.width,I.height=H.height,this.width=H.width,this.height=H.height,J.drawImage(H,0,0,H.width,H.height,0,0,H.width,H.height);let K=J.getImageData(0,0,H.width,H.height).data;this.data=new D.a(this.wasm,E.a*H.width*H.height),this.data.copy(K),this.ready=!0,H=null,K=null}}}},function(A,B,C){'use strict';var D=C(1);B.a=class{constructor(F){this.matrix=D.a.create(),this.mrotation=D.a.create(),this.mtranslation=D.a.create(),this.position=[0,0,0],this.rotation=[0,0,0],this.ready=!1,this.textures=[],F&&(this.wireframe=F.wireframe||!1)}updatematrix(){D.a.rotationy(this.rotation[1],this.mrotation),D.a.translate(this.position,this.mtranslation),D.a.concat([this.mrotation,this.mtranslation],this.matrix)}set(F,G){this.position=F,this.rotation=G?G:this.rotation,this.updatematrix()}setrotation(F){this.rotation=F,this.updatematrix()}load(F){fetch(F).then((G)=>G.json()).then((G)=>{this.vertices=G.vertices,this.faces=G.faces,this.uvs=G.uvs,this.uvtextures=[];for(let H=0;H<G.faces.length;H++)this.uvtextures.push(0);console.log('Ready to render'+this.faces.length+' polygons'),this.ready=!0})}boxgeometry(F,G,H){this.vertices=[[0.5,0.5,0.5],[0.5,0.5,-0.5],[0.5,-0.5,0.5],[0.5,-0.5,-0.5],[-0.5,0.5,-0.5],[-0.5,0.5,0.5],[-0.5,-0.5,-0.5],[-0.5,-0.5,0.5]],this.faces=[[0,2,1],[2,3,1],[4,6,5],[6,7,5],[4,5,1],[5,0,1],[7,6,2],[6,3,2],[5,7,0],[7,2,0],[1,3,4],[3,6,4]],this.uvs=[[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[0,0],[1,1]],[[0,0],[1,0],[1,1]]],this.uvtextures=[0,0,0,0,0,0,0,0,0,0,0,0];for(let I of this.vertices)I[0]*=F,I[1]*=G,I[2]*=H;this.ready=!0}}},function(A,B,C){'use strict';var D=C(12),E=C(0);B.a=class{constructor(){this.ready=!1}init(G,H){this.ready||(this.width=G,this.hwidth=G/2>>0,this.height=H,this.hheight=H/2>>0,this.pagesize=G*H*E.a,this.buffer=new Uint8ClampedArray(this.pagesize),this.buffer32=new Uint32Array(this.buffer.buffer),this.zbuffer=new Float32Array(G*H),this.ready=!0)}begin(){this.zbuffer.fill(0),this.buffer32.fill(E.b)}line(G,H,I,J,K,L,N,O){if(O){let W=D.a.line(G,H,I,J,0,0,this.width-1,this.height-1);if(!W.visible)return;[G,H,I,J]=[W.x0,W.y0,W.x1,W.y1]}let Q=!1;_Mathabs(G-I)<_Mathabs(H-J)&&([G,H]=[H,G],[I,J]=[J,I],Q=!0),G>I&&([G,I]=[I,G],[H,J]=[J,H]);let R=I-G,S=J-H,T=2*_Mathabs(S),U=0,V=H;for(let W=G;W<=I;W++)Q?this.pset(V,W,K,L,N):this.pset(W,V,K,L,N),U+=T,U>R&&(V+=J>H?1:-1,U-=2*R)}wireframe(G){for(let H=0;3>H;H++){let I=G[H],J=G[(H+1)%3];this.line(I[0],I[1],J[0],J[1],160,160,160,!0)}}tri(G,H,I,J,K){if(!J.ready||K)return void this.wireframe(G);let L=_Mathmin(G[0][0],_Mathmin(G[1][0],G[2][0])),N=_Mathmax(G[0][0],_Mathmax(G[1][0],G[2][0])),O=_Mathmin(G[0][1],_Mathmin(G[1][1],G[2][1])),Q=_Mathmax(G[0][1],_Mathmax(G[1][1],G[2][1]));if(L=_Mathmax(0,L),O=_Mathmax(0,O),N=_Mathmin(this.width-1,N),Q=_Mathmin(this.height-1,Q),0>N)return;if(0>Q)return;if(L>=this.width)return;if(O>=this.height)return;L>>=0,N>>=0,O>>=0,Q>>=0;let da,ga,ha,ia,R=[0,0],S=[0,0,0],T=J.data.buffer,U=J.maxu,V=J.maxv,W=J.width,X=J.height,Y=0,Z=0,ba=G[2][0]-G[0][0],ca=G[1][0]-G[0][0],ea=G[2][1]-G[0][1],fa=G[1][1]-G[0][1],ja=ba*fa-ca*ea;if(1>_Mathabs(ja))return;let ka=1/G[0][2],la=1/G[1][2],ma=1/G[2][2],na=H[0][0]*ka,oa=H[1][0]*la,pa=H[2][0]*ma,qa=H[0][1]*ka,ra=H[1][1]*la,sa=H[2][1]*ma,ta=0,va=0,wa=0,xa=1/ja;for(ha=ca*ga-da*fa,ia=da*ea-ba*ga,R[1]=O;R[1]<=Q;R[1]++)for(R[0]=L;R[0]<=N;R[0]++){if(da=G[0][0]-R[0],ga=G[0][1]-R[1],ha=ca*ga-da*fa,ia=da*ea-ba*ga,S[0]=1-(ha+ia)*xa,S[1]=ia*xa,S[2]=ha*xa,0>S[0]||0>S[1]||0>S[2])continue;ta=ka*S[0]+la*S[1]+ma*S[2];let ya=R[1]*this.width+R[0];if(this.zbuffer[ya]>ta)continue;this.zbuffer[ya]=ta,va=na*S[0]+oa*S[1]+pa*S[2],wa=qa*S[0]+ra*S[1]+sa*S[2],Y=va/ta*U>>0,Z=wa/ta*V>>0;let za=(Z*W<<E.c)+(Y<<E.c),Aa=T[za+0]*I,Ba=T[za+1]*I,Ca=T[za+2]*I;this.pset(R[0],R[1],Aa,Ba,Ca)}}pset(G,H,I,J,K){let L=(H>>0)*this.width*E.a+(G>>0)*E.a;this.buffer[L+0]=I,this.buffer[L+1]=J,this.buffer[L+2]=K,this.buffer[L+3]=255}}},function(A,B,C){'use strict';var D=C(3),E=C(0);class F{constructor(G){this.wasm=G,this.ready=!1}begin(){this.zbuffer.fill(0),this.framebuffer.buffer32.fill(4278190080)}init(G,H){this.ready||(this.width=G,this.height=H,this.pagesize=G*H*E.a,this.framebuffer=new D.a(this.wasm,this.pagesize),this._zbuffer=this.wasm._malloc(4*(G*H)),this.zbuffer=new Uint8Array(this.wasm.buffer,this._zbuffer,4*(G*H)),this.wasm._init(this.framebuffer.pointer,this._zbuffer,G,H),this.ready=!0)}get buffer(){return this.framebuffer.buffer}rgbpack(G,H,I){return E.b+(I<<16)+(H<<8)+G}pset(G,H,I,J,K){this.wasm._pset(G<<0,H<<0,this.rgbpack(I,J,K))}vline(G,H,I,J,K,L){this.wasm._vline(G,H,I,this.rgbpack(J,K,L))}fill(G,H,I){this.wasm._fill(this.rgbpack(G,H,I))}tri(G,H,I,J){J.ready&&this.wasm._tri(G[0][0],G[0][1],G[0][2],H[0][0],H[0][1],G[1][0],G[1][1],G[1][2],H[1][0],H[1][1],G[2][0],G[2][1],G[2][2],H[2][0],H[2][1],J.data.pointer,J.width,I)}}B.a=F},function(A,B){'use strict';window.Module={};B.a=class{constructor(){}load(E){let F=E+'.wasm';return console.log('Fetching '+F),new Promise((H,I)=>{return'WebAssembly'in window?void(console.log('\uD83D\uDCAA WebAssembly ENABLED \uD83D\uDCAA'),fetch(F).then((J)=>{return J.arrayBuffer()}).then((J)=>{window.Module.wasmBinary=J,window.script=document.createElement('script'),window.doneEvent=new Event('done'),window.script.addEventListener('done',()=>{H(window.Module)}),window.script.src=E+'.js',document.body.appendChild(window.script)})):(console.log('\uD83D\uDE02 WebAssembly not supported. Cool browser bro. \uD83D\uDE02'),I(window.Module))})}}},function(A){(function(D,E){A.exports=E()})(this,function(){'use strict';navigator.sayswho=function(){var F,E=navigator.userAgent,G=E.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];return /trident/i.test(G[1])?(F=/\brv[ :]+(\d+)/g.exec(E)||[],'IE '+(F[1]||'')):'Chrome'===G[1]&&(F=E.match(/\b(OPR|Edge)\/(\d+)/),null!=F)?F.slice(1).join(' ').replace('OPR','Opera'):(G=G[2]?[G[1],G[2]]:[navigator.appName,navigator.appVersion,'-?'],null!=(F=E.match(/version\/(\d+)/i))&&G.splice(1,1,F[1]),G.join(' '))}();var D=function(){function F(R){return I.appendChild(R.dom),R}function G(R){for(var S=0;S<I.children.length;S++)I.children[S].style.display=S===R?'block':'none'}var I=document.createElement('div');I.style.cssText='position:fixed;top:0;left:0;cursor:pointer;opacity:0.7;z-index:10000';var J=(performance||Date).now(),K=J,L=0,N=F(new D.Panel('FPS','#0ff','#002')),O=F(new D.Panel('MS','#000','#060'));if(self.performance&&self.performance.memory)var Q=F(new D.Panel('MB','#f08','#201'));return G(0),{REVISION:16,AV_COUNT:10,avbuffer:[],dom:I,addPanel:F,showPanel:G,setview:function(R){O.textlabel=R?'WebAssembly / C:':'Javascript:',O.fillCol=R?'#E855E8':'#00BB00',O.bgCol=R?'#E855E8':'#00BB00'},begin:function(){J=(performance||Date).now()},accumulate:function(R){this.avbuffer.length==this.AV_COUNT&&this.avbuffer.shift(),this.avbuffer.push(R);let S=0;for(let T of this.avbuffer)S+=T;return S/this.AV_COUNT},end:function(){L++;var R=(performance||Date).now();if(O.update(R-J,200,this.accumulate(R-J)),R>K+1e3&&(N.update(1e3*L/(R-K),100),K=R,L=0,Q)){var S=performance.memory;Q.update(S.usedJSHeapSize/1048576,S.jsHeapSizeLimit/1048576)}return R},update:function(){J=this.end()},domElement:I,setMode:G}};return D.Panel=function(E,F,G){var H=navigator.sayswho,I=Infinity,J=0,K=Math.round,L=K(window.devicePixelRatio||1),N=640*L,O=96*L,S=3*L,T=15*L,U=592*L,V=60*L,W=document.createElement('canvas');W.width=N,W.height=O,W.style.cssText='width:'+N+'px;height:'+O+'px';var X=W.getContext('2d');return X.font='bold '+15*L+'px Helvetica,Arial,sans-serif',X.textBaseline='top',X.fillStyle=G,X.fillStyle=F,X.fillStyle='#000000',X.globalAlpha=1,X.fillRect(S,T,U,V),{dom:W,textlabel:'Javascript:',fillCol:'#00BB00',bgCol:'#006600',update:function(Y,Z,$){I=_Mathmin(I,Y),J=_Mathmax(J,Y),X.fillStyle='#000',X.globalAlpha=1,X.fillRect(S,V+15,U,T+5),X.fillStyle=this.fillCol;let _=(1e3/$).toFixed(1),aa=' '+this.textlabel+' '+K($)+' '+E.toLowerCase()+'  ('+_+' fps)';X.fillText(aa,6*L,V+16),X.fillStyle=this.fillCol,X.drawImage(W,S+L,T,U-L,V,S,T,U-L,V),X.fillRect(S+U-L,T,L,V),X.fillStyle='#000000',X.globalAlpha=1,X.fillRect(S+U-L,T,L,K((1-Y/Z)*V))}}},D})},function(A,B,C){'use strict';Object.defineProperty(B,'__esModule',{value:!0});var D=C(6),E=C(9),F=C(5),G=C(7),H=C(8),I=C(4),J=C(1);const K=640,L=480;let R=new E.a,T=[],V=new D.a({wireframe:!1});V.load('./obj/african_head.json'),V.set([0,0,5.5],[0,0,0]);let W=J.a.create(),X=J.a.create(),Y=J.a.create();J.a.perspective(45,K/L,0.01,1,W),J.a.lookat([0,0,12.5],[0,0,0],[0,1,0],X),J.a.concat([X,W],Y),R.load('./wasm/WasmRasteriser').then((Z)=>{function $(){aa.stats.begin(),V.setrotation([0,(ba-=2)%360,0]),aa.clear(),aa.render(V,Y),aa.flip(),aa.stats.end(),requestAnimationFrame($)}T[0]=new G.a,T[1]=new H.a(Z);let _=new F.a(Z,'./img/african_head_diffuse_180.jpg');V.textures.push(_);let aa=new I.a(K,L,T);aa.create(),requestAnimationFrame($);var ba=360})},function(A,B){'use strict';B.a=class{constructor(){}static line(E,F,G,H,I,J,K,L){let[N,O]=[0,1],Q={x0:0,y0:0,x1:0,y1:0,visible:!1},R=G-E,S=H-F,T=[-1*R,R,-1*S,S],U=[E-I,K-E,F-J,L-F],V=!0;for(let W=0;4>W;W++){let X=T[W],Y=U[W];if(0==X&&0>Y){V=!1;break}let Z=Y/X;if(0>X&&(N=_Mathmax(N,Z)),0<X&&(O=_Mathmin(O,Z)),N>O){V=!1;break}}return V?(1>O&&(G=E+O*R,H=F+O*S),0<N&&(E+=N*R,F+=N*S),Q.visible=!0,Q.x0=E,Q.y0=F,Q.x1=G,Q.y1=H):(Q.visible=!1,Q.x0=-1,Q.y0=-1,Q.x1=-1,Q.y1=-1),Q}}},function(A,B,C){'use strict';C.d(B,'b',function(){return G});var D=C(10),E=C.n(D);B.a=class{constructor(H=1,I,J){this.stats=D(J);let K=I||document.body;K.appendChild(this.stats.dom),this.stats.showPanel(H),this.stats.dom.style.position='absolute',this.stats.dom.style.top='',this.stats.dom.style.bottom='0',this.stats.dom.style.left='30px'}begin(){this.stats.begin()}setview(H){this.stats.setview(H)}end(){this.stats.end()}};var G;(function(H){H[H.FPS=0]='FPS',H[H.MS=1]='MS',H[H.MB=2]='MB',H[H.CUSTOM=3]='CUSTOM'})(G||(G={}))}]);