"use strict";(self.webpackChunkgptminer=self.webpackChunkgptminer||[]).push([[195],{62195:function(De,ee,Ht){Ht.d(ee,{secp256k1:function(){return It}});function yt(t){if(!Number.isSafeInteger(t)||t<0)throw new Error(`Wrong positive integer: ${t}`)}function ne(t){if(typeof t!="boolean")throw new Error(`Expected boolean, not ${t}`)}function mt(t,...n){if(!(t instanceof Uint8Array))throw new Error("Expected Uint8Array");if(n.length>0&&!n.includes(t.length))throw new Error(`Expected Uint8Array of length ${n}, not of length=${t.length}`)}function Ut(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");yt(t.outputLen),yt(t.blockLen)}function ct(t,n=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(n&&t.finished)throw new Error("Hash#digest() has already been called")}function Rt(t,n){mt(t);const e=n.outputLen;if(t.length<e)throw new Error(`digestInto() expects output buffer of length at least ${e}`)}const Ke={number:yt,bool:ne,bytes:mt,hash:Ut,exists:ct,output:Rt};var We=null;const pt=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;const Et=t=>t instanceof Uint8Array,Ye=t=>new Uint8Array(t.buffer,t.byteOffset,t.byteLength),Ge=t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4)),xt=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),W=(t,n)=>t<<32-n|t>>>n;if(!(new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68))throw new Error("Non little-endian hardware is not supported");const re=Array.from({length:256},(t,n)=>n.toString(16).padStart(2,"0"));function Xe(t){if(!Et(t))throw new Error("Uint8Array expected");let n="";for(let e=0;e<t.length;e++)n+=re[t[e]];return n}function Qe(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);const n=t.length;if(n%2)throw new Error("padded hex string expected, got unpadded hex of length "+n);const e=new Uint8Array(n/2);for(let r=0;r<e.length;r++){const s=r*2,o=t.slice(s,s+2),f=Number.parseInt(o,16);if(Number.isNaN(f)||f<0)throw new Error("Invalid byte sequence");e[r]=f}return e}const se=async()=>{};async function Je(t,n,e){let r=Date.now();for(let s=0;s<t;s++){e(s);const o=Date.now()-r;o>=0&&o<n||(await se(),r+=o)}}function oe(t){if(typeof t!="string")throw new Error(`utf8ToBytes expected string, got ${typeof t}`);return new Uint8Array(new TextEncoder().encode(t))}function ft(t){if(typeof t=="string"&&(t=oe(t)),!Et(t))throw new Error(`expected Uint8Array, got ${typeof t}`);return t}function ie(...t){const n=new Uint8Array(t.reduce((r,s)=>r+s.length,0));let e=0;return t.forEach(r=>{if(!Et(r))throw new Error("Uint8Array expected");n.set(r,e),e+=r.length}),n}class kt{clone(){return this._cloneInto()}}const ce={}.toString;function Fe(t,n){if(n!==void 0&&ce.call(n)!=="[object Object]")throw new Error("Options should be object or undefined");return Object.assign(t,n)}function fe(t){const n=r=>t().update(ft(r)).digest(),e=t();return n.outputLen=e.outputLen,n.blockLen=e.blockLen,n.create=()=>t(),n}function tn(t){const n=(r,s)=>t(s).update(ft(r)).digest(),e=t({});return n.outputLen=e.outputLen,n.blockLen=e.blockLen,n.create=r=>t(r),n}function en(t){const n=(r,s)=>t(s).update(ft(r)).digest(),e=t({});return n.outputLen=e.outputLen,n.blockLen=e.blockLen,n.create=r=>t(r),n}function ae(t=32){if(pt&&typeof pt.getRandomValues=="function")return pt.getRandomValues(new Uint8Array(t));throw new Error("crypto.getRandomValues must be defined")}function ue(t,n,e,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(n,e,r);const s=BigInt(32),o=BigInt(4294967295),f=Number(e>>s&o),i=Number(e&o),c=r?4:0,a=r?0:4;t.setUint32(n+c,f,r),t.setUint32(n+a,i,r)}class le extends kt{constructor(n,e,r,s){super(),this.blockLen=n,this.outputLen=e,this.padOffset=r,this.isLE=s,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(n),this.view=xt(this.buffer)}update(n){ct(this);const{view:e,buffer:r,blockLen:s}=this;n=ft(n);const o=n.length;for(let f=0;f<o;){const i=Math.min(s-this.pos,o-f);if(i===s){const c=xt(n);for(;s<=o-f;f+=s)this.process(c,f);continue}r.set(n.subarray(f,f+i),this.pos),this.pos+=i,f+=i,this.pos===s&&(this.process(e,0),this.pos=0)}return this.length+=n.length,this.roundClean(),this}digestInto(n){ct(this),Rt(n,this),this.finished=!0;const{buffer:e,view:r,blockLen:s,isLE:o}=this;let{pos:f}=this;e[f++]=128,this.buffer.subarray(f).fill(0),this.padOffset>s-f&&(this.process(r,0),f=0);for(let l=f;l<s;l++)e[l]=0;ue(r,s-8,BigInt(this.length*8),o),this.process(r,0);const i=xt(n),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const a=c/4,w=this.get();if(a>w.length)throw new Error("_sha2: outputLen bigger than state");for(let l=0;l<a;l++)i.setUint32(4*l,w[l],o)}digest(){const{buffer:n,outputLen:e}=this;this.digestInto(n);const r=n.slice(0,e);return this.destroy(),r}_cloneInto(n){n||(n=new this.constructor),n.set(...this.get());const{blockLen:e,buffer:r,length:s,finished:o,destroyed:f,pos:i}=this;return n.length=s,n.pos=i,n.finished=o,n.destroyed=f,s%e&&n.buffer.set(r),n}}const de=(t,n,e)=>t&n^~t&e,he=(t,n,e)=>t&n^t&e^n&e,be=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Y=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),G=new Uint32Array(64);class we extends le{constructor(){super(64,32,8,!1),this.A=Y[0]|0,this.B=Y[1]|0,this.C=Y[2]|0,this.D=Y[3]|0,this.E=Y[4]|0,this.F=Y[5]|0,this.G=Y[6]|0,this.H=Y[7]|0}get(){const{A:n,B:e,C:r,D:s,E:o,F:f,G:i,H:c}=this;return[n,e,r,s,o,f,i,c]}set(n,e,r,s,o,f,i,c){this.A=n|0,this.B=e|0,this.C=r|0,this.D=s|0,this.E=o|0,this.F=f|0,this.G=i|0,this.H=c|0}process(n,e){for(let l=0;l<16;l++,e+=4)G[l]=n.getUint32(e,!1);for(let l=16;l<64;l++){const I=G[l-15],O=G[l-2],m=W(I,7)^W(I,18)^I>>>3,u=W(O,17)^W(O,19)^O>>>10;G[l]=u+G[l-7]+m+G[l-16]|0}let{A:r,B:s,C:o,D:f,E:i,F:c,G:a,H:w}=this;for(let l=0;l<64;l++){const I=W(i,6)^W(i,11)^W(i,25),O=w+I+de(i,c,a)+be[l]+G[l]|0,u=(W(r,2)^W(r,13)^W(r,22))+he(r,s,o)|0;w=a,a=c,c=i,i=f+O|0,f=o,o=s,s=r,r=O+u|0}r=r+this.A|0,s=s+this.B|0,o=o+this.C|0,f=f+this.D|0,i=i+this.E|0,c=c+this.F|0,a=a+this.G|0,w=w+this.H|0,this.set(r,s,o,f,i,c,a,w)}roundClean(){G.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}class nn extends null{constructor(){super(),this.A=-1056596264,this.B=914150663,this.C=812702999,this.D=-150054599,this.E=-4191439,this.F=1750603025,this.G=1694076839,this.H=-1090891868,this.outputLen=28}}const ge=fe(()=>new we),rn=null;var S=Ht(27499);const R=BigInt(0),N=BigInt(1),M=BigInt(2),ye=BigInt(3),Bt=BigInt(4),Ct=BigInt(5),Vt=BigInt(8),me=BigInt(9),pe=BigInt(16);function C(t,n){const e=t%n;return e>=R?e:n+e}function Ee(t,n,e){if(e<=R||n<R)throw new Error("Expected power/modulo > 0");if(e===N)return R;let r=N;for(;n>R;)n&N&&(r=r*t%e),t=t*t%e,n>>=N;return r}function j(t,n,e){let r=t;for(;n-- >R;)r*=r,r%=e;return r}function lt(t,n){if(t===R||n<=R)throw new Error(`invert: expected positive integers, got n=${t} mod=${n}`);let e=C(t,n),r=n,s=R,o=N,f=N,i=R;for(;e!==R;){const a=r/e,w=r%e,l=s-f*a,I=o-i*a;r=e,e=w,s=f,o=i,f=l,i=I}if(r!==N)throw new Error("invert: does not exist");return C(s,n)}function xe(t){const n=(t-N)/M;let e,r,s;for(e=t-N,r=0;e%M===R;e/=M,r++);for(s=M;s<t&&Ee(s,n,t)!==t-N;s++);if(r===1){const f=(t+N)/Bt;return function(c,a){const w=c.pow(a,f);if(!c.eql(c.sqr(w),a))throw new Error("Cannot find square root");return w}}const o=(e+N)/M;return function(i,c){if(i.pow(c,n)===i.neg(i.ONE))throw new Error("Cannot find square root");let a=r,w=i.pow(i.mul(i.ONE,s),e),l=i.pow(c,o),I=i.pow(c,e);for(;!i.eql(I,i.ONE);){if(i.eql(I,i.ZERO))return i.ZERO;let O=1;for(let u=i.sqr(I);O<a&&!i.eql(u,i.ONE);O++)u=i.sqr(u);const m=i.pow(w,N<<BigInt(a-O-1));w=i.sqr(m),l=i.mul(l,m),I=i.mul(I,w),a=O}return l}}function Be(t){if(t%Bt===ye){const n=(t+N)/Bt;return function(r,s){const o=r.pow(s,n);if(!r.eql(r.sqr(o),s))throw new Error("Cannot find square root");return o}}if(t%Vt===Ct){const n=(t-Ct)/Vt;return function(r,s){const o=r.mul(s,M),f=r.pow(o,n),i=r.mul(s,f),c=r.mul(r.mul(i,M),f),a=r.mul(i,r.sub(c,r.ONE));if(!r.eql(r.sqr(a),s))throw new Error("Cannot find square root");return a}}return t%pe,xe(t)}const sn=(t,n)=>(C(t,n)&N)===N,ve=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function Se(t){const n={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},e=ve.reduce((r,s)=>(r[s]="function",r),n);return(0,S.FF)(t,e)}function Ae(t,n,e){if(e<R)throw new Error("Expected power > 0");if(e===R)return t.ONE;if(e===N)return n;let r=t.ONE,s=n;for(;e>R;)e&N&&(r=t.mul(r,s)),s=t.sqr(s),e>>=N;return r}function Ie(t,n){const e=new Array(n.length),r=n.reduce((o,f,i)=>t.is0(f)?o:(e[i]=o,t.mul(o,f)),t.ONE),s=t.inv(r);return n.reduceRight((o,f,i)=>t.is0(f)?o:(e[i]=t.mul(o,e[i]),t.mul(o,f)),s),e}function on(t,n,e){return t.mul(n,typeof e=="bigint"?lt(e,t.ORDER):t.inv(e))}function cn(t){const n=(t.ORDER-N)/M;return e=>{const r=t.pow(e,n);return t.eql(r,t.ZERO)||t.eql(r,t.ONE)}}function vt(t,n){const e=n!==void 0?n:t.toString(2).length,r=Math.ceil(e/8);return{nBitLength:e,nByteLength:r}}function qe(t,n,e=!1,r={}){if(t<=R)throw new Error(`Expected Field ORDER > 0, got ${t}`);const{nBitLength:s,nByteLength:o}=vt(t,n);if(o>2048)throw new Error("Field lengths over 2048 bytes are not supported");const f=Be(t),i=Object.freeze({ORDER:t,BITS:s,BYTES:o,MASK:(0,S.dQ)(s),ZERO:R,ONE:N,create:c=>C(c,t),isValid:c=>{if(typeof c!="bigint")throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);return R<=c&&c<t},is0:c=>c===R,isOdd:c=>(c&N)===N,neg:c=>C(-c,t),eql:(c,a)=>c===a,sqr:c=>C(c*c,t),add:(c,a)=>C(c+a,t),sub:(c,a)=>C(c-a,t),mul:(c,a)=>C(c*a,t),pow:(c,a)=>Ae(i,c,a),div:(c,a)=>C(c*lt(a,t),t),sqrN:c=>c*c,addN:(c,a)=>c+a,subN:(c,a)=>c-a,mulN:(c,a)=>c*a,inv:c=>lt(c,t),sqrt:r.sqrt||(c=>f(i,c)),invertBatch:c=>Ie(i,c),cmov:(c,a,w)=>w?a:c,toBytes:c=>e?(0,S.S5)(c,o):(0,S.tL)(c,o),fromBytes:c=>{if(c.length!==o)throw new Error(`Fp.fromBytes: expected ${o}, got ${c.length}`);return e?(0,S.ty)(c):(0,S.bytesToNumberBE)(c)}});return Object.freeze(i)}function fn(t,n){if(!t.isOdd)throw new Error("Field doesn't have isOdd");const e=t.sqrt(n);return t.isOdd(e)?e:t.neg(e)}function an(t,n){if(!t.isOdd)throw new Error("Field doesn't have isOdd");const e=t.sqrt(n);return t.isOdd(e)?t.neg(e):e}function un(t,n,e=!1){t=ensureBytes("privateHash",t);const r=t.length,s=vt(n).nByteLength+8;if(s<24||r<s||r>1024)throw new Error(`hashToPrivateScalar: expected ${s}-1024 bytes of input, got ${r}`);const o=e?bytesToNumberLE(t):bytesToNumberBE(t);return C(o,n-N)+N}function Zt(t){if(typeof t!="bigint")throw new Error("field order must be bigint");const n=t.toString(2).length;return Math.ceil(n/8)}function Pt(t){const n=Zt(t);return n+Math.ceil(n/2)}function Oe(t,n,e=!1){const r=t.length,s=Zt(n),o=Pt(n);if(r<16||r<o||r>1024)throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);const f=e?(0,S.bytesToNumberBE)(t):(0,S.ty)(t),i=C(f,n-N)+N;return e?(0,S.S5)(i,s):(0,S.tL)(i,s)}class $t extends kt{constructor(n,e){super(),this.finished=!1,this.destroyed=!1,Ut(n);const r=ft(e);if(this.iHash=n.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const s=this.blockLen,o=new Uint8Array(s);o.set(r.length>s?n.create().update(r).digest():r);for(let f=0;f<o.length;f++)o[f]^=54;this.iHash.update(o),this.oHash=n.create();for(let f=0;f<o.length;f++)o[f]^=106;this.oHash.update(o),o.fill(0)}update(n){return ct(this),this.iHash.update(n),this}digestInto(n){ct(this),mt(n,this.outputLen),this.finished=!0,this.iHash.digestInto(n),this.oHash.update(n),this.oHash.digestInto(n),this.destroy()}digest(){const n=new Uint8Array(this.oHash.outputLen);return this.digestInto(n),n}_cloneInto(n){n||(n=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:r,finished:s,destroyed:o,blockLen:f,outputLen:i}=this;return n=n,n.finished=s,n.destroyed=o,n.blockLen=f,n.outputLen=i,n.oHash=e._cloneInto(n.oHash),n.iHash=r._cloneInto(n.iHash),n}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const zt=(t,n,e)=>new $t(t,n).update(e).digest();zt.create=(t,n)=>new $t(t,n);const Le=BigInt(0),St=BigInt(1);function Ne(t,n){const e=(s,o)=>{const f=o.negate();return s?f:o},r=s=>{const o=Math.ceil(n/s)+1,f=2**(s-1);return{windows:o,windowSize:f}};return{constTimeNegate:e,unsafeLadder(s,o){let f=t.ZERO,i=s;for(;o>Le;)o&St&&(f=f.add(i)),i=i.double(),o>>=St;return f},precomputeWindow(s,o){const{windows:f,windowSize:i}=r(o),c=[];let a=s,w=a;for(let l=0;l<f;l++){w=a,c.push(w);for(let I=1;I<i;I++)w=w.add(a),c.push(w);a=w.double()}return c},wNAF(s,o,f){const{windows:i,windowSize:c}=r(s);let a=t.ZERO,w=t.BASE;const l=BigInt(2**s-1),I=2**s,O=BigInt(s);for(let m=0;m<i;m++){const u=m*c;let d=Number(f&l);f>>=O,d>c&&(d-=I,f+=St);const h=u,g=u+Math.abs(d)-1,p=m%2!==0,B=d<0;d===0?w=w.add(e(p,o[h])):a=a.add(e(B,o[g]))}return{p:a,f:w}},wNAFCached(s,o,f,i){const c=s._WINDOW_SIZE||1;let a=o.get(s);return a||(a=this.precomputeWindow(s,c),c!==1&&o.set(s,i(a))),this.wNAF(c,a,f)}}}function jt(t){return Se(t.Fp),(0,S.FF)(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...vt(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}function _e(t){const n=jt(t);S.FF(n,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:e,Fp:r,a:s}=n;if(e){if(!r.eql(s,r.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if(typeof e!="object"||typeof e.beta!="bigint"||typeof e.splitScalar!="function")throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...n})}const{bytesToNumberBE:Te,hexToBytes:He}=S,et={Err:class extends Error{constructor(n=""){super(n)}},_parseInt(t){const{Err:n}=et;if(t.length<2||t[0]!==2)throw new n("Invalid signature integer tag");const e=t[1],r=t.subarray(2,e+2);if(!e||r.length!==e)throw new n("Invalid signature integer: wrong length");if(r[0]&128)throw new n("Invalid signature integer: negative");if(r[0]===0&&!(r[1]&128))throw new n("Invalid signature integer: unnecessary leading zero");return{d:Te(r),l:t.subarray(e+2)}},toSig(t){const{Err:n}=et,e=typeof t=="string"?He(t):t;if(!(e instanceof Uint8Array))throw new Error("ui8a expected");let r=e.length;if(r<2||e[0]!=48)throw new n("Invalid signature tag");if(e[1]!==r-2)throw new n("Invalid signature: incorrect length");const{d:s,l:o}=et._parseInt(e.subarray(2)),{d:f,l:i}=et._parseInt(o);if(i.length)throw new n("Invalid signature: left bytes after parsing");return{r:s,s:f}},hexFromSig(t){const n=a=>Number.parseInt(a[0],16)&8?"00"+a:a,e=a=>{const w=a.toString(16);return w.length&1?`0${w}`:w},r=n(e(t.s)),s=n(e(t.r)),o=r.length/2,f=s.length/2,i=e(o),c=e(f);return`30${e(f+o+4)}02${c}${s}02${i}${r}`}},D=BigInt(0),U=BigInt(1),X=BigInt(2),dt=BigInt(3),Dt=BigInt(4);function Ue(t){const n=_e(t),{Fp:e}=n,r=n.toBytes||((m,u,d)=>{const h=u.toAffine();return S.eV(Uint8Array.from([4]),e.toBytes(h.x),e.toBytes(h.y))}),s=n.fromBytes||(m=>{const u=m.subarray(1),d=e.fromBytes(u.subarray(0,e.BYTES)),h=e.fromBytes(u.subarray(e.BYTES,2*e.BYTES));return{x:d,y:h}});function o(m){const{a:u,b:d}=n,h=e.sqr(m),g=e.mul(h,m);return e.add(e.add(g,e.mul(m,u)),d)}if(!e.eql(e.sqr(n.Gy),o(n.Gx)))throw new Error("bad generator point: equation left != right");function f(m){return typeof m=="bigint"&&D<m&&m<n.n}function i(m){if(!f(m))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function c(m){const{allowedPrivateKeyLengths:u,nByteLength:d,wrapPrivateKey:h,n:g}=n;if(u&&typeof m!="bigint"){if(m instanceof Uint8Array&&(m=S.ci(m)),typeof m!="string"||!u.includes(m.length))throw new Error("Invalid key");m=m.padStart(d*2,"0")}let p;try{p=typeof m=="bigint"?m:S.bytesToNumberBE((0,S.ql)("private key",m,d))}catch{throw new Error(`private key must be ${d} bytes, hex or bigint, not ${typeof m}`)}return h&&(p=C(p,g)),i(p),p}const a=new Map;function w(m){if(!(m instanceof l))throw new Error("ProjectivePoint expected")}class l{constructor(u,d,h){if(this.px=u,this.py=d,this.pz=h,u==null||!e.isValid(u))throw new Error("x required");if(d==null||!e.isValid(d))throw new Error("y required");if(h==null||!e.isValid(h))throw new Error("z required")}static fromAffine(u){const{x:d,y:h}=u||{};if(!u||!e.isValid(d)||!e.isValid(h))throw new Error("invalid affine point");if(u instanceof l)throw new Error("projective point not allowed");const g=p=>e.eql(p,e.ZERO);return g(d)&&g(h)?l.ZERO:new l(d,h,e.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(u){const d=e.invertBatch(u.map(h=>h.pz));return u.map((h,g)=>h.toAffine(d[g])).map(l.fromAffine)}static fromHex(u){const d=l.fromAffine(s((0,S.ql)("pointHex",u)));return d.assertValidity(),d}static fromPrivateKey(u){return l.BASE.multiply(c(u))}_setWindowSize(u){this._WINDOW_SIZE=u,a.delete(this)}assertValidity(){if(this.is0()){if(n.allowInfinityPoint&&!e.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:u,y:d}=this.toAffine();if(!e.isValid(u)||!e.isValid(d))throw new Error("bad point: x or y not FE");const h=e.sqr(d),g=o(u);if(!e.eql(h,g))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y:u}=this.toAffine();if(e.isOdd)return!e.isOdd(u);throw new Error("Field doesn't support isOdd")}equals(u){w(u);const{px:d,py:h,pz:g}=this,{px:p,py:B,pz:A}=u,E=e.eql(e.mul(d,A),e.mul(p,g)),x=e.eql(e.mul(h,A),e.mul(B,g));return E&&x}negate(){return new l(this.px,e.neg(this.py),this.pz)}double(){const{a:u,b:d}=n,h=e.mul(d,dt),{px:g,py:p,pz:B}=this;let A=e.ZERO,E=e.ZERO,x=e.ZERO,v=e.mul(g,g),V=e.mul(p,p),H=e.mul(B,B),L=e.mul(g,p);return L=e.add(L,L),x=e.mul(g,B),x=e.add(x,x),A=e.mul(u,x),E=e.mul(h,H),E=e.add(A,E),A=e.sub(V,E),E=e.add(V,E),E=e.mul(A,E),A=e.mul(L,A),x=e.mul(h,x),H=e.mul(u,H),L=e.sub(v,H),L=e.mul(u,L),L=e.add(L,x),x=e.add(v,v),v=e.add(x,v),v=e.add(v,H),v=e.mul(v,L),E=e.add(E,v),H=e.mul(p,B),H=e.add(H,H),v=e.mul(H,L),A=e.sub(A,v),x=e.mul(H,V),x=e.add(x,x),x=e.add(x,x),new l(A,E,x)}add(u){w(u);const{px:d,py:h,pz:g}=this,{px:p,py:B,pz:A}=u;let E=e.ZERO,x=e.ZERO,v=e.ZERO;const V=n.a,H=e.mul(n.b,dt);let L=e.mul(d,p),Z=e.mul(h,B),P=e.mul(g,A),Q=e.add(d,h),b=e.add(p,B);Q=e.mul(Q,b),b=e.add(L,Z),Q=e.sub(Q,b),b=e.add(d,g);let y=e.add(p,A);return b=e.mul(b,y),y=e.add(L,P),b=e.sub(b,y),y=e.add(h,g),E=e.add(B,A),y=e.mul(y,E),E=e.add(Z,P),y=e.sub(y,E),v=e.mul(V,b),E=e.mul(H,P),v=e.add(E,v),E=e.sub(Z,v),v=e.add(Z,v),x=e.mul(E,v),Z=e.add(L,L),Z=e.add(Z,L),P=e.mul(V,P),b=e.mul(H,b),Z=e.add(Z,P),P=e.sub(L,P),P=e.mul(V,P),b=e.add(b,P),L=e.mul(Z,b),x=e.add(x,L),L=e.mul(y,b),E=e.mul(Q,E),E=e.sub(E,L),L=e.mul(Q,Z),v=e.mul(y,v),v=e.add(v,L),new l(E,x,v)}subtract(u){return this.add(u.negate())}is0(){return this.equals(l.ZERO)}wNAF(u){return O.wNAFCached(this,a,u,d=>{const h=e.invertBatch(d.map(g=>g.pz));return d.map((g,p)=>g.toAffine(h[p])).map(l.fromAffine)})}multiplyUnsafe(u){const d=l.ZERO;if(u===D)return d;if(i(u),u===U)return this;const{endo:h}=n;if(!h)return O.unsafeLadder(this,u);let{k1neg:g,k1:p,k2neg:B,k2:A}=h.splitScalar(u),E=d,x=d,v=this;for(;p>D||A>D;)p&U&&(E=E.add(v)),A&U&&(x=x.add(v)),v=v.double(),p>>=U,A>>=U;return g&&(E=E.negate()),B&&(x=x.negate()),x=new l(e.mul(x.px,h.beta),x.py,x.pz),E.add(x)}multiply(u){i(u);let d=u,h,g;const{endo:p}=n;if(p){const{k1neg:B,k1:A,k2neg:E,k2:x}=p.splitScalar(d);let{p:v,f:V}=this.wNAF(A),{p:H,f:L}=this.wNAF(x);v=O.constTimeNegate(B,v),H=O.constTimeNegate(E,H),H=new l(e.mul(H.px,p.beta),H.py,H.pz),h=v.add(H),g=V.add(L)}else{const{p:B,f:A}=this.wNAF(d);h=B,g=A}return l.normalizeZ([h,g])[0]}multiplyAndAddUnsafe(u,d,h){const g=l.BASE,p=(A,E)=>E===D||E===U||!A.equals(g)?A.multiplyUnsafe(E):A.multiply(E),B=p(this,d).add(p(u,h));return B.is0()?void 0:B}toAffine(u){const{px:d,py:h,pz:g}=this,p=this.is0();u==null&&(u=p?e.ONE:e.inv(g));const B=e.mul(d,u),A=e.mul(h,u),E=e.mul(g,u);if(p)return{x:e.ZERO,y:e.ZERO};if(!e.eql(E,e.ONE))throw new Error("invZ was invalid");return{x:B,y:A}}isTorsionFree(){const{h:u,isTorsionFree:d}=n;if(u===U)return!0;if(d)return d(l,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:u,clearCofactor:d}=n;return u===U?this:d?d(l,this):this.multiplyUnsafe(n.h)}toRawBytes(u=!0){return this.assertValidity(),r(l,this,u)}toHex(u=!0){return S.ci(this.toRawBytes(u))}}l.BASE=new l(n.Gx,n.Gy,e.ONE),l.ZERO=new l(e.ZERO,e.ONE,e.ZERO);const I=n.nBitLength,O=Ne(l,n.endo?Math.ceil(I/2):I);return{CURVE:n,ProjectivePoint:l,normPrivateKeyToScalar:c,weierstrassEquation:o,isWithinCurveOrder:f}}function Re(t){const n=jt(t);return S.FF(n,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...n})}function ke(t){const n=Re(t),{Fp:e,n:r}=n,s=e.BYTES+1,o=2*e.BYTES+1;function f(b){return D<b&&b<e.ORDER}function i(b){return C(b,r)}function c(b){return lt(b,r)}const{ProjectivePoint:a,normPrivateKeyToScalar:w,weierstrassEquation:l,isWithinCurveOrder:I}=Ue({...n,toBytes(b,y,q){const T=y.toAffine(),_=e.toBytes(T.x),k=S.eV;return q?k(Uint8Array.from([y.hasEvenY()?2:3]),_):k(Uint8Array.from([4]),_,e.toBytes(T.y))},fromBytes(b){const y=b.length,q=b[0],T=b.subarray(1);if(y===s&&(q===2||q===3)){const _=S.bytesToNumberBE(T);if(!f(_))throw new Error("Point is not on curve");const k=l(_);let $=e.sqrt(k);const z=($&U)===U;return(q&1)===1!==z&&($=e.neg($)),{x:_,y:$}}else if(y===o&&q===4){const _=e.fromBytes(T.subarray(0,e.BYTES)),k=e.fromBytes(T.subarray(e.BYTES,2*e.BYTES));return{x:_,y:k}}else throw new Error(`Point of length ${y} was invalid. Expected ${s} compressed bytes or ${o} uncompressed bytes`)}}),O=b=>S.ci(S.tL(b,n.nByteLength));function m(b){const y=r>>U;return b>y}function u(b){return m(b)?i(-b):b}const d=(b,y,q)=>S.bytesToNumberBE(b.slice(y,q));class h{constructor(y,q,T){this.r=y,this.s=q,this.recovery=T,this.assertValidity()}static fromCompact(y){const q=n.nByteLength;return y=(0,S.ql)("compactSignature",y,q*2),new h(d(y,0,q),d(y,q,2*q))}static fromDER(y){const{r:q,s:T}=et.toSig((0,S.ql)("DER",y));return new h(q,T)}assertValidity(){if(!I(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!I(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(y){return new h(this.r,this.s,y)}recoverPublicKey(y){const{r:q,s:T,recovery:_}=this,k=x((0,S.ql)("msgHash",y));if(_==null||![0,1,2,3].includes(_))throw new Error("recovery id invalid");const $=_===2||_===3?q+n.n:q;if($>=e.ORDER)throw new Error("recovery id 2 or 3 invalid");const z=_&1?"03":"02",J=a.fromHex(z+O($)),F=c($),rt=i(-k*F),ut=i(T*F),tt=a.BASE.multiplyAndAddUnsafe(J,rt,ut);if(!tt)throw new Error("point at infinify");return tt.assertValidity(),tt}hasHighS(){return m(this.s)}normalizeS(){return this.hasHighS()?new h(this.r,i(-this.s),this.recovery):this}toDERRawBytes(){return S.hexToBytes(this.toDERHex())}toDERHex(){return et.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return S.hexToBytes(this.toCompactHex())}toCompactHex(){return O(this.r)+O(this.s)}}const g={isValidPrivateKey(b){try{return w(b),!0}catch{return!1}},normPrivateKeyToScalar:w,randomPrivateKey:()=>{const b=Pt(n.n);return Oe(n.randomBytes(b),n.n)},precompute(b=8,y=a.BASE){return y._setWindowSize(b),y.multiply(BigInt(3)),y}};function p(b,y=!0){return a.fromPrivateKey(b).toRawBytes(y)}function B(b){const y=b instanceof Uint8Array,q=typeof b=="string",T=(y||q)&&b.length;return y?T===s||T===o:q?T===2*s||T===2*o:b instanceof a}function A(b,y,q=!0){if(B(b))throw new Error("first arg must be private key");if(!B(y))throw new Error("second arg must be public key");return a.fromHex(y).multiply(w(b)).toRawBytes(q)}const E=n.bits2int||function(b){const y=S.bytesToNumberBE(b),q=b.length*8-n.nBitLength;return q>0?y>>BigInt(q):y},x=n.bits2int_modN||function(b){return i(E(b))},v=S.dQ(n.nBitLength);function V(b){if(typeof b!="bigint")throw new Error("bigint expected");if(!(D<=b&&b<v))throw new Error(`bigint expected < 2^${n.nBitLength}`);return S.tL(b,n.nByteLength)}function H(b,y,q=L){if(["recovered","canonical"].some(nt=>nt in q))throw new Error("sign() legacy options not supported");const{hash:T,randomBytes:_}=n;let{lowS:k,prehash:$,extraEntropy:z}=q;k==null&&(k=!0),b=(0,S.ql)("msgHash",b),$&&(b=(0,S.ql)("prehashed msgHash",T(b)));const J=x(b),F=w(y),rt=[V(F),V(J)];if(z!=null){const nt=z===!0?_(e.BYTES):z;rt.push((0,S.ql)("extraEntropy",nt))}const ut=S.eV(...rt),tt=J;function Tt(nt){const st=E(nt);if(!I(st))return;const Jt=c(st),ot=a.BASE.multiply(st).toAffine(),K=i(ot.x);if(K===D)return;const it=i(Jt*i(tt+K*F));if(it===D)return;let Ft=(ot.x===K?0:2)|Number(ot.y&U),te=it;return k&&m(it)&&(te=u(it),Ft^=1),new h(K,te,Ft)}return{seed:ut,k2sig:Tt}}const L={lowS:n.lowS,prehash:!1},Z={lowS:n.lowS,prehash:!1};function P(b,y,q=L){const{seed:T,k2sig:_}=H(b,y,q),k=n;return S.n$(k.hash.outputLen,k.nByteLength,k.hmac)(T,_)}a.BASE._setWindowSize(8);function Q(b,y,q,T=Z){var ot;const _=b;if(y=(0,S.ql)("msgHash",y),q=(0,S.ql)("publicKey",q),"strict"in T)throw new Error("options.strict was renamed to lowS");const{lowS:k,prehash:$}=T;let z,J;try{if(typeof _=="string"||_ instanceof Uint8Array)try{z=h.fromDER(_)}catch(K){if(!(K instanceof et.Err))throw K;z=h.fromCompact(_)}else if(typeof _=="object"&&typeof _.r=="bigint"&&typeof _.s=="bigint"){const{r:K,s:it}=_;z=new h(K,it)}else throw new Error("PARSE");J=a.fromHex(q)}catch(K){if(K.message==="PARSE")throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(k&&z.hasHighS())return!1;$&&(y=n.hash(y));const{r:F,s:rt}=z,ut=x(y),tt=c(rt),Tt=i(ut*tt),nt=i(F*tt),st=(ot=a.BASE.multiplyAndAddUnsafe(J,Tt,nt))==null?void 0:ot.toAffine();return st?i(st.x)===F:!1}return{CURVE:n,getPublicKey:p,getSharedSecret:A,sign:P,verify:Q,ProjectivePoint:a,Signature:h,utils:g}}function Ce(t,n){const e=t.ORDER;let r=D;for(let m=e-U;m%X===D;m/=X)r+=U;const s=r,o=X<<s-U-U,f=o*X,i=(e-U)/f,c=(i-U)/X,a=f-U,w=o,l=t.pow(n,i),I=t.pow(n,(i+U)/X);let O=(m,u)=>{let d=l,h=t.pow(u,a),g=t.sqr(h);g=t.mul(g,u);let p=t.mul(m,g);p=t.pow(p,c),p=t.mul(p,h),h=t.mul(p,u),g=t.mul(p,m);let B=t.mul(g,h);p=t.pow(B,w);let A=t.eql(p,t.ONE);h=t.mul(g,I),p=t.mul(B,d),g=t.cmov(h,g,A),B=t.cmov(p,B,A);for(let E=s;E>U;E--){let x=E-X;x=X<<x-U;let v=t.pow(B,x);const V=t.eql(v,t.ONE);h=t.mul(g,d),d=t.mul(d,d),v=t.mul(B,d),g=t.cmov(h,g,V),B=t.cmov(v,B,V)}return{isValid:A,value:g}};if(t.ORDER%Dt===dt){const m=(t.ORDER-dt)/Dt,u=t.sqrt(t.neg(n));O=(d,h)=>{let g=t.sqr(h);const p=t.mul(d,h);g=t.mul(g,p);let B=t.pow(g,m);B=t.mul(B,p);const A=t.mul(B,u),E=t.mul(t.sqr(B),h),x=t.eql(E,d);let v=t.cmov(A,B,x);return{isValid:x,value:v}}}return O}function ln(t,n){if(mod.validateField(t),!t.isValid(n.A)||!t.isValid(n.B)||!t.isValid(n.Z))throw new Error("mapToCurveSimpleSWU: invalid opts");const e=Ce(t,n.Z);if(!t.isOdd)throw new Error("Fp.isOdd is not implemented!");return r=>{let s,o,f,i,c,a,w,l;s=t.sqr(r),s=t.mul(s,n.Z),o=t.sqr(s),o=t.add(o,s),f=t.add(o,t.ONE),f=t.mul(f,n.B),i=t.cmov(n.Z,t.neg(o),!t.eql(o,t.ZERO)),i=t.mul(i,n.A),o=t.sqr(f),a=t.sqr(i),c=t.mul(a,n.A),o=t.add(o,c),o=t.mul(o,f),a=t.mul(a,i),c=t.mul(a,n.B),o=t.add(o,c),w=t.mul(s,f);const{isValid:I,value:O}=e(o,a);l=t.mul(s,r),l=t.mul(l,O),w=t.cmov(w,f,I),l=t.cmov(l,O,I);const m=t.isOdd(r)===t.isOdd(l);return l=t.cmov(t.neg(l),l,m),w=t.div(w,i),{x:w,y:l}}}function Ve(t){return{hash:t,hmac:(n,...e)=>zt(t,n,ie(...e)),randomBytes:ae}}function Ze(t,n){const e=r=>ke({...t,...Ve(r)});return Object.freeze({...e(n),create:e})}const ht=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),bt=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Kt=BigInt(1),wt=BigInt(2),Wt=(t,n)=>(t+n/wt)/n;function Yt(t){const n=ht,e=BigInt(3),r=BigInt(6),s=BigInt(11),o=BigInt(22),f=BigInt(23),i=BigInt(44),c=BigInt(88),a=t*t*t%n,w=a*a*t%n,l=j(w,e,n)*w%n,I=j(l,e,n)*w%n,O=j(I,wt,n)*a%n,m=j(O,s,n)*O%n,u=j(m,o,n)*m%n,d=j(u,i,n)*u%n,h=j(d,c,n)*d%n,g=j(h,i,n)*u%n,p=j(g,e,n)*w%n,B=j(p,f,n)*m%n,A=j(B,r,n)*a%n,E=j(A,wt,n);if(!At.eql(At.sqr(E),t))throw new Error("Cannot find square root");return E}const At=qe(ht,void 0,void 0,{sqrt:Yt}),It=Ze({a:BigInt(0),b:BigInt(7),Fp:At,n:bt,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const n=bt,e=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-Kt*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),s=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=e,f=BigInt("0x100000000000000000000000000000000"),i=Wt(o*t,n),c=Wt(-r*t,n);let a=C(t-i*e-c*s,n),w=C(-i*r-c*o,n);const l=a>f,I=w>f;if(l&&(a=n-a),I&&(w=n-w),a>f||w>f)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:l,k1:a,k2neg:I,k2:w}}}},ge),gt=BigInt(0),Gt=t=>typeof t=="bigint"&&gt<t&&t<ht,Pe=t=>typeof t=="bigint"&&gt<t&&t<bt,Mt={};function qt(t,...n){let e=Mt[t];if(e===void 0){const r=sha256(Uint8Array.from(t,s=>s.charCodeAt(0)));e=concatBytes(r,r),Mt[t]=e}return sha256(concatBytes(e,...n))}const Xt=t=>t.toRawBytes(!0).slice(1),Ot=t=>numberToBytesBE(t,32),Lt=t=>mod(t,ht),at=t=>mod(t,bt),Nt=It.ProjectivePoint,$e=(t,n,e)=>Nt.BASE.multiplyAndAddUnsafe(t,n,e);function _t(t){let n=It.utils.normPrivateKeyToScalar(t),e=Nt.fromPrivateKey(n);return{scalar:e.hasEvenY()?n:at(-n),bytes:Xt(e)}}function ze(t){if(!Gt(t))throw new Error("bad x: need 0 < x < p");const n=Lt(t*t),e=Lt(n*t+BigInt(7));let r=Yt(e);r%wt!==gt&&(r=Lt(-r));const s=new Nt(t,r,Kt);return s.assertValidity(),s}function Qt(...t){return at(bytesToNumberBE(qt("BIP0340/challenge",...t)))}function dn(t){return _t(t).bytes}function hn(t,n,e=randomBytes(32)){const r=ensureBytes("message",t),{bytes:s,scalar:o}=_t(n),f=ensureBytes("auxRand",e,32),i=Ot(o^bytesToNumberBE(qt("BIP0340/aux",f))),c=qt("BIP0340/nonce",i,s,r),a=at(bytesToNumberBE(c));if(a===gt)throw new Error("sign failed: k is zero");const{bytes:w,scalar:l}=_t(a),I=Qt(w,s,r),O=new Uint8Array(64);if(O.set(w,0),O.set(Ot(at(l+I*o)),32),!je(O,r,s))throw new Error("sign: Invalid signature produced");return O}function je(t,n,e){const r=ensureBytes("signature",t,64),s=ensureBytes("message",n),o=ensureBytes("publicKey",e,32);try{const f=ze(bytesToNumberBE(o)),i=bytesToNumberBE(r.subarray(0,32));if(!Gt(i))return!1;const c=bytesToNumberBE(r.subarray(32,64));if(!Pe(c))return!1;const a=Qt(Ot(i),Xt(f),s),w=$e(f,c,at(-a));return!(!w||!w.hasEvenY()||w.toAffine().x!==i)}catch{return!1}}const bn=null,wn=null,gn=null,yn=null,mn=null,pn=null}}]);
