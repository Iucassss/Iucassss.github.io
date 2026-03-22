(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return new Promise((t,n)=>{e.toBlob(e=>{if(e===null){n(Error(`Failed to encode the canvas as a PNG blob.`));return}t(e)},`image/png`)})}async function t(t,n=`two-circles-webgpu.png`){let r=await e(t),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=n,a.click(),window.setTimeout(()=>{URL.revokeObjectURL(i)},0)}function n(e){return{minX:e.minX,minY:e.minY,maxX:e.maxX,maxY:e.maxY}}function r(e){if(!Number.isFinite(e.minX)||!Number.isFinite(e.minY)||!Number.isFinite(e.maxX)||!Number.isFinite(e.maxY))throw Error(`Scalar grid bounds must contain only finite values.`);if(e.maxX<=e.minX||e.maxY<=e.minY)throw Error(`Scalar grid bounds must have positive width and height.`);return n(e)}function i(e){return{cols:Math.max(2,Math.floor(e.cols)),rows:Math.max(2,Math.floor(e.rows))}}function a(e,t,n){return n*e.cols+t}function o(e,t,n){return{x:t===e.cols-1?e.bounds.maxX:e.bounds.minX+t*e.xStep,y:n===e.rows-1?e.bounds.maxY:e.bounds.minY+n*e.yStep}}function s(e,t){return t===`phi`||t===`psi`?{values:e[t],isValid:e.isPotentialDefined}:{values:e[t],isValid:e.isVelocityDefined}}function c(e){let t=1/0,n=-1/0;for(let r=0;r<e.values.length;r+=1){if(e.isValid[r]===0)continue;let i=e.values[r];Number.isFinite(i)&&(i<t&&(t=i),i>n&&(n=i))}return!Number.isFinite(t)||!Number.isFinite(n)?null:{min:t,max:n}}function l(e,t,n){let s=r(e),c=i(t),l=c.cols*c.rows,u=(s.maxX-s.minX)/(c.cols-1),d=(s.maxY-s.minY)/(c.rows-1),f=new Float64Array(l),p=new Float64Array(l),m=new Float64Array(l),h=new Float64Array(l),g=new Uint8Array(l),_=new Uint8Array(l),v=new Uint8Array(l),y={cols:c.cols,rows:c.rows,bounds:s,xStep:u,yStep:d,phi:f,psi:p,u:m,v:h,isPotentialDefined:g,isVelocityDefined:_,isInsideCylinder:v};for(let e=0;e<y.rows;e+=1)for(let t=0;t<y.cols;t+=1){let r=a(y,t,e),i=o(y,t,e),s=n.evaluateAtPoint(i.x,i.y);s.insideCylinder&&(v[r]=1),s.phi!==null&&s.psi!==null&&Number.isFinite(s.phi)&&Number.isFinite(s.psi)&&(f[r]=s.phi,p[r]=s.psi,g[r]=1),s.u!==null&&s.v!==null&&Number.isFinite(s.u)&&Number.isFinite(s.v)&&(m[r]=s.u,h[r]=s.v,_[r]=1)}return y}function u(e){let t=new Float64Array(e.u.length);for(let n=0;n<t.length;n+=1)e.isVelocityDefined[n]!==0&&(t[n]=Math.hypot(e.u[n],e.v[n]));return{values:t,isValid:e.isVelocityDefined}}function d(e,t){let n=new Float64Array(e.u.length),r=Math.max(1e-12,Math.abs(t)),i=1/(r*r);for(let t=0;t<n.length;t+=1)e.isVelocityDefined[t]!==0&&(n[t]=1-(e.u[t]*e.u[t]+e.v[t]*e.v[t])*i);return{values:n,isValid:e.isVelocityDefined}}function f(e,t){let n=e.cols*e.rows;if(t.values.length!==n||t.isValid.length!==n)throw Error(`Scalar field dimensions do not match the structured grid.`)}function p(e,t){return t.x>=e.bounds.minX&&t.x<=e.bounds.maxX&&t.y>=e.bounds.minY&&t.y<=e.bounds.maxY}function m(e,t,n){if(f(e,t),!p(e,n))return null;let r=(n.x-e.bounds.minX)/e.xStep,i=(n.y-e.bounds.minY)/e.yStep,o=Math.floor(r),s=Math.floor(i),c=Math.min(o+1,e.cols-1),l=Math.min(s+1,e.rows-1),u=r-o,d=i-s,m=a(e,o,s),h=a(e,c,s),g=a(e,o,l),_=a(e,c,l);if(t.isValid[m]===0||t.isValid[h]===0||t.isValid[g]===0||t.isValid[_]===0)return null;let v=t.values[m],y=t.values[h],ee=t.values[g],b=t.values[_],x=v*(1-u)+y*u,S=ee*(1-u)+b*u;return x*(1-d)+S*d}function h(e,t,n){return m(e,s(e,t),n)}var g=720,_=1.001;function v(e,t,n){let r=Math.max(1e-12,Math.abs(n));return 1-(e*e+t*t)/(r*r)}function y(e,t){let n=2*Math.PI/g,r=e.radius*_,i=0,a=0,o=0;for(let s=0;s<g;s+=1){let c=(s+.5)*n,l=Math.cos(c),u=Math.sin(c),d={x:e.center.x+r*l,y:e.center.y+r*u},f=t.solver.evaluateVelocityAtPoint(d.x,d.y);if(f.u===null||f.v===null||!Number.isFinite(f.u)||!Number.isFinite(f.v))continue;let p=v(f.u,f.v,t.flow.farfield.speed);i+=-.5*p*l*n,a+=-.5*p*u*n,o+=1}return{circleId:e.id,sampleCount:o,forceCoefficient:{x:i,y:a},magnitudeCoefficient:Math.hypot(i,a)}}function ee(e){let t=y(e.geometry.circleA,e),n=y(e.geometry.circleB,e),r={x:t.forceCoefficient.x+n.forceCoefficient.x,y:t.forceCoefficient.y+n.forceCoefficient.y};return{integrationRadiusFactor:_,frontCircle:t,rearCircle:n,totalForceCoefficient:r,totalMagnitudeCoefficient:Math.hypot(r.x,r.y)}}var b=[{id:`gap-center-near`,localPoint:{x:0,y:.25},expectedNormalizedPsi:.06767829768882974},{id:`gap-center-mid`,localPoint:{x:0,y:.75},expectedNormalizedPsi:.29212431680504614},{id:`above-gap-center`,localPoint:{x:0,y:1.5},expectedNormalizedPsi:.9140028147574542},{id:`above-gap-left`,localPoint:{x:-.25,y:1.5},expectedNormalizedPsi:.9055638081454729},{id:`above-gap-right`,localPoint:{x:.25,y:1.5},expectedNormalizedPsi:.9055638081454687},{id:`far-left-upper`,localPoint:{x:-3,y:.5},expectedNormalizedPsi:.29194050437573793}],x=`fixed-sample-regression`,S=`Reference psi regression`,C=3,w=1e-12,T=1e-9;function te(e){let t=2*Math.PI,n=e%t;return n>Math.PI&&(n-=t),n<-Math.PI&&(n+=t),n}function ne(e,t,n){return Math.abs(e-t)<=n}function re(e){return e.geometry.circleA.radius}function ie(e){return Math.abs(e.geometry.circleB.center.x-e.geometry.circleA.center.x)}function ae(e){return{x:.5*(e.geometry.circleA.center.x+e.geometry.circleB.center.x),y:.5*(e.geometry.circleA.center.y+e.geometry.circleB.center.y)}}function oe(e){let t=re(e),n=ie(e),r=te(e.flow.farfield.incidenceAngleRad);return ne(n/t,C,w)&&Math.abs(r)<=w}function se(e,t){let n=ae(e),r=re(e);return{x:n.x+r*t.x,y:n.y+r*t.y}}function ce(e){if(!oe(e))return{id:x,label:S,status:`skipped`,detail:`Skipped because the check only applies to centerDistance / radius = 3 and zero incidence angle.`,value:null,threshold:null};let t=e.flow.farfield.speed*re(e),n=-1/0,r=`n/a`;for(let i of b){let a=se(e,i.localPoint),o=e.solver.evaluatePsiAtPoint(a.x,a.y);if(o===null||!Number.isFinite(o))return{id:x,label:S,status:`fail`,detail:`Sample '${i.id}' evaluated to null or a non-finite value.`,value:null,threshold:T};let s=o/t,c=Math.abs(s-i.expectedNormalizedPsi);c>n&&(n=c,r=i.id)}return{id:x,label:S,status:n<=T?`pass`:`fail`,detail:`Checked ${b.length} fixed samples, worst case '${r}'.`,value:Number.isFinite(n)?n:null,threshold:T}}function le(e){let t=2*Math.PI,n=e%t;return n>Math.PI&&(n-=t),n<-Math.PI&&(n+=t),n}function ue(e){return e.reduce((e,t)=>Math.max(e,t),-1/0)}function de(e){return e.reduce((e,t)=>Math.min(e,t),1/0)}function fe(e){return e.length===0?NaN:e.reduce((e,t)=>e+t,0)/e.length}function E(e,t,n,r,i,a){return{id:e,label:t,status:n?`pass`:`fail`,detail:r,value:i,threshold:a}}function pe(e,t,n){return{id:e,label:t,status:`skipped`,detail:n,value:null,threshold:null}}function me(e){return e.geometry.circleA.radius}function he(e){return Math.abs(e.geometry.circleB.center.x-e.geometry.circleA.center.x)}function ge(e){return{x:.5*(e.geometry.circleA.center.x+e.geometry.circleB.center.x),y:.5*(e.geometry.circleA.center.y+e.geometry.circleB.center.y)}}function _e(e,t,n){let r=e.x-n.x,i=e.y-n.y,a=t.flow.farfield.incidenceAngleRad;return t.flow.farfield.speed*(i*Math.cos(a)-r*Math.sin(a))}function ve(e,t){let n=[],r=1.001;for(let i=0;i<128;i+=1){let a=i/128*2*Math.PI,o={x:e.center.x+e.radius*r*Math.cos(a),y:e.center.y+e.radius*r*Math.sin(a)},s=t.solver.evaluatePsiAtPoint(o.x,o.y);s!==null&&Number.isFinite(s)&&n.push(s)}return n.length<8?1/0:ue(n)-de(n)}function ye(e){let t=ve(e.geometry.circleA,e),n=ve(e.geometry.circleB,e),r=Math.max(t,n),i=.02*e.flow.farfield.speed*me(e);return E(`streamfunction-boundary-constancy`,`Streamfunction on cylinder boundary`,r<=i,`deltaPsi(circleA)=${t.toExponential(3)}, deltaPsi(circleB)=${n.toExponential(3)}`,r,i)}function be(e){if(!(Math.abs(le(e.flow.farfield.incidenceAngleRad))<1e-9))return pe(`streamfunction-antisymmetry`,`Streamfunction antisymmetry`,`Skipped because this check is only meaningful for zero incidence angle.`);let t=me(e),n=.5*he(e),r=ge(e),i=[-3,-1.5,0,1.5,3].map(e=>r.x+e*n),a=[.35,.8,1.5,2.5].map(e=>e*t),o=[];for(let t of i)for(let n of a){let i={x:t,y:r.y+n},a={x:t,y:r.y-n},s=e.solver.evaluatePsiAtPoint(i.x,i.y),c=e.solver.evaluatePsiAtPoint(a.x,a.y);if(s===null||c===null||!Number.isFinite(s)||!Number.isFinite(c))continue;let l=Math.abs(s+c),u=Math.max(1,Math.abs(s),Math.abs(c));o.push(l/u)}let s=fe(o),c=.02;return E(`streamfunction-antisymmetry`,`Streamfunction antisymmetry`,Number.isFinite(s)&&s<=c,`Mean relative error=${Number.isFinite(s)?s.toExponential(3):`NaN`}.`,Number.isFinite(s)?s:null,c)}function xe(e){let t=ge(e),n=.5*he(e),r=me(e),i=[];for(let e of[-1,1])for(let a of[-2,-1,0,1,2])i.push({x:t.x+e*10*n,y:t.y+a*r});let a=[];for(let n of i){let r=e.solver.evaluatePsiAtPoint(n.x,n.y);if(r===null||!Number.isFinite(r))continue;let i=_e(n,e,t);a.push(r-i)}if(a.length<4)return E(`far-field-condition`,`Far-field condition`,!1,`Too few valid far-field samples were available.`,null,null);let o=ue(a)-de(a),s=.12*e.flow.farfield.speed*r;return E(`far-field-condition`,`Far-field condition`,o<=s,`Offset variation against uniform flow=${o.toExponential(3)}.`,o,s)}function Se(e){let t=ge(e),n=me(e),r=[{x:t.x,y:t.y},{x:t.x,y:t.y+.25*n},{x:t.x,y:t.y+.75*n},{x:t.x-.25*n,y:t.y+1.5*n},{x:t.x+.25*n,y:t.y+1.5*n},{x:t.x-.25*n,y:t.y-1.5*n},{x:t.x+.25*n,y:t.y-1.5*n}],i=[];for(let t of r){let n=e.solver.evaluateAtPoint(t.x,t.y);if(n.diagnostics===null)continue;let r=n.diagnostics.kAtZetaOverBeta.tailEstimate+n.diagnostics.kAtZetaTimesBeta.tailEstimate;i.push(r)}let a=i.length>0?ue(i):1/0,o=.005;return E(`k-series-tail`,`K-series truncation`,a<=o,`Largest estimated series tail=${Number.isFinite(a)?a.toExponential(3):`Infinity`}.`,Number.isFinite(a)?a:null,o)}function Ce(e){if(e.sampleGrid===null)return pe(`grid-consistency`,`Grid consistency`,`Skipped because no full scalar grid is available for comparison.`);let t=l(e.sampleGrid.bounds,{cols:Math.max(32,Math.floor(e.sampleGrid.cols*.5)),rows:Math.max(32,Math.floor(e.sampleGrid.rows*.5))},e.solver),n=[{u:.12,v:.18},{u:.21,v:.72},{u:.34,v:.31},{u:.47,v:.83},{u:.62,v:.24},{u:.74,v:.65},{u:.88,v:.41}],r=[];for(let i of n){let n={x:e.sampleGrid.bounds.minX+i.u*(e.sampleGrid.bounds.maxX-e.sampleGrid.bounds.minX),y:e.sampleGrid.bounds.minY+i.v*(e.sampleGrid.bounds.maxY-e.sampleGrid.bounds.minY)},a=h(t,`psi`,n),o=h(e.sampleGrid,`psi`,n);a===null||o===null||!Number.isFinite(a)||!Number.isFinite(o)||r.push(Math.abs(a-o)/Math.max(1,Math.abs(o)))}let i=fe(r),a=.08;return E(`grid-consistency`,`Grid consistency`,Number.isFinite(i)&&i<=a,`Mean low/high grid error=${Number.isFinite(i)?i.toExponential(3):`NaN`}.`,Number.isFinite(i)?i:null,a)}function we(e){let t=.03;return E(`pressure-force-balance`,`Pressure-force balance`,e.totalMagnitudeCoefficient<=t,`Front C=(${e.frontCircle.forceCoefficient.x.toExponential(3)}, ${e.frontCircle.forceCoefficient.y.toExponential(3)}), rear C=(${e.rearCircle.forceCoefficient.x.toExponential(3)}, ${e.rearCircle.forceCoefficient.y.toExponential(3)}), total |C|=${e.totalMagnitudeCoefficient.toExponential(3)}.`,e.totalMagnitudeCoefficient,t)}function Te(e){let t=ee(e),n=[ye(e),be(e),xe(e),Se(e),Ce(e),ce(e),we(t)],r=n.filter(e=>e.status===`pass`).length,i=n.filter(e=>e.status===`fail`).length,a=n.filter(e=>e.status===`skipped`).length;return{allPassed:i===0,passedCount:r,failedCount:i,skippedCount:a,pressureForces:t,checks:n}}function Ee(e,t,n){return Math.min(Math.max(e,t),n)}function De(e){let t=Math.max(1,e.canvas.width)/Math.max(1,e.canvas.height),n=e.worldHeight*.5;return{halfWidth:t*n,halfHeight:n}}function Oe(e){let{halfWidth:t,halfHeight:n}=De(e);return{left:e.center.x-t,right:e.center.x+t,bottom:e.center.y-n,top:e.center.y+n}}function ke(e,t,n){let r=Math.max(1,n.canvas.width),i=Math.max(1,n.canvas.height),{halfWidth:a,halfHeight:o}=De(n),s=e/r*2-1,c=1-t/i*2;return{x:n.center.x+s*a,y:n.center.y+c*o}}function Ae(e,t,n){let r=Math.max(1,n.canvas.width),i=Math.max(1,n.canvas.height),{halfWidth:a,halfHeight:o}=De(n);return{x:e/r*2*a,y:-t/i*2*o}}function je(e,t,n,r){let i=Ee(t,.5,2),a=ke(n,r,e);e.worldHeight=Ee(e.worldHeight*i,.2,200);let o=ke(n,r,e);e.center.x+=a.x-o.x,e.center.y+=a.y-o.y}var D=6,Me=D*Float32Array.BYTES_PER_ELEMENT;function Ne(e,t,n,r,i){return e[t+0]=n,e[t+1]=r,e[t+2]=i[0],e[t+3]=i[1],e[t+4]=i[2],e[t+5]=i[3],t+D}function Pe(e,t=[.45,.49,.56,1]){let n=Oe(e),r=n.bottom<=0&&n.top>=0,i=n.left<=0&&n.right>=0,a=(r?1:0)+(i?1:0);if(a===0)return new Float32Array;let o=new Float32Array(a*2*D),s=0;return r&&(s=Ne(o,s,n.left,0,t),s=Ne(o,s,n.right,0,t)),i&&(s=Ne(o,s,0,n.bottom,t),Ne(o,s,0,n.top,t)),o}function Fe(e,t,n,r,i){return e[t+0]=n,e[t+1]=r,e[t+2]=i[0],e[t+3]=i[1],e[t+4]=i[2],e[t+5]=i[3],t+D}function Ie(e,t,n=128){let r=Math.max(3,Math.floor(n)),i=3*D,a=new Float32Array(r*i),o=0;for(let n=0;n<r;n+=1){let i=n/r*Math.PI*2,s=(n+1)/r*Math.PI*2,c=e.center.x+e.radius*Math.cos(i),l=e.center.y+e.radius*Math.sin(i),u=e.center.x+e.radius*Math.cos(s),d=e.center.y+e.radius*Math.sin(s);o=Fe(a,o,e.center.x,e.center.y,t),o=Fe(a,o,c,l,t),o=Fe(a,o,u,d,t)}return a}function O(e,t,n,r,i){return e[t+0]=n,e[t+1]=r,e[t+2]=i[0],e[t+3]=i[1],e[t+4]=i[2],e[t+5]=i[3],t+D}function Le(e,t,n,r=128){let i=Math.max(3,Math.floor(r)),a=.5*Math.max(1e-4,n),o=Math.max(1e-4,e.radius-a),s=e.radius+a,c=3*D,l=new Float32Array(i*2*c),u=0;for(let n=0;n<i;n+=1){let r=n/i*Math.PI*2,a=(n+1)/i*Math.PI*2,c=e.center.x+o*Math.cos(r),d=e.center.y+o*Math.sin(r),f=e.center.x+s*Math.cos(r),p=e.center.y+s*Math.sin(r),m=e.center.x+o*Math.cos(a),h=e.center.y+o*Math.sin(a),g=e.center.x+s*Math.cos(a),_=e.center.y+s*Math.sin(a);u=O(l,u,c,d,t),u=O(l,u,f,p,t),u=O(l,u,g,_,t),u=O(l,u,c,d,t),u=O(l,u,g,_,t),u=O(l,u,m,h,t)}return l}var Re=/^#[0-9a-f]{6}$/i,ze={cool:`#0f1318`,sunset:`#140d17`,paper:`#d9d0ba`};function Be(e,t){return Re.test(e)?e.toLowerCase():t}function Ve(e){let t=Be(e,`#000000`);return{r:Number.parseInt(t.slice(1,3),16)/255,g:Number.parseInt(t.slice(3,5),16)/255,b:Number.parseInt(t.slice(5,7),16)/255}}function He(e){return ze[e]}var Ue=[69/255,69/255,69/255,1];function We(e){let{r:t,g:n,b:r}=Ve(e);return[t,n,r,1]}function Ge(e){let{r:t,g:n,b:r}=Ve(e);return{r:t,g:n,b:r,a:1}}function Ke(e){let t=e.backgroundScalarField===`none`?e.backgroundColor:He(e.backgroundColorScheme);return{axisColor:[.45,.49,.56,1],frontCircleColor:Ue,rearCircleColor:Ue,streamlineColor:We(e.streamlineColor),clearColor:Ge(t)}}var qe=4;function Je(e){let t=e.reduce((e,t)=>e+t.length,0);if(t===0)return new Float32Array;let n=new Float32Array(t),r=0;for(let t of e)n.set(t,r),r+=t.length;return n}function Ye(e){let t=[],n=[],r=Ke(e.display),[i,a]=e.circles;if(e.flowFillVertices!==void 0&&e.flowFillVertices!==null&&e.flowFillVertices.length>0&&t.push(e.flowFillVertices),e.display.showAxes&&n.push(Pe(e.viewport,r.axisColor)),e.display.fillCircles&&(t.push(Ie(i,r.frontCircleColor,128)),t.push(Ie(a,r.rearCircleColor,128))),e.display.showCircleOutlines){let n=qe*(e.viewport.worldHeight/Math.max(1,e.viewport.canvas.height));t.push(Le(i,r.frontCircleColor,n,128)),t.push(Le(a,r.rearCircleColor,n,128))}return e.forceFillVertices!==void 0&&e.forceFillVertices!==null&&e.forceFillVertices.length>0&&t.push(e.forceFillVertices),{fillVertices:Je(t),lineVertices:Je(n)}}var Xe=`struct BackgroundUniforms {
    boundsMin: vec2f,
    boundsMax: vec2f,
    circleA: vec4f,
    circleB: vec4f,
    config: vec4f,
};

@group(0) @binding(0)
var uBackgroundSampler: sampler;

@group(0) @binding(1)
var uBackgroundTexture: texture_2d<f32>;

@group(0) @binding(2)
var<uniform> uBackground: BackgroundUniforms;

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) uv: vec2f,
};

fn mixColor(a: vec3f, b: vec3f, t: f32) -> vec3f {
    return a + (b - a) * t;
}

fn sampleRampStops(
    t: f32,
    c0: vec3f,
    c1: vec3f,
    c2: vec3f,
    c3: vec3f,
    c4: vec3f,
) -> vec3f {
    let clamped = clamp(t, 0.0, 1.0);

    if (clamped <= 0.2) {
        return mixColor(c0, c1, clamped / 0.2);
    }

    if (clamped <= 0.46) {
        return mixColor(c1, c2, (clamped - 0.2) / 0.26);
    }

    if (clamped <= 0.72) {
        return mixColor(c2, c3, (clamped - 0.46) / 0.26);
    }

    return mixColor(c3, c4, (clamped - 0.72) / 0.28);
}

fn sampleBackgroundColorRamp(t: f32, schemeIndex: i32) -> vec3f {
    if (schemeIndex == 1) {
        return sampleRampStops(
            t,
            vec3f(0.08, 0.05, 0.09),
            vec3f(0.15, 0.09, 0.2),
            vec3f(0.43, 0.13, 0.28),
            vec3f(0.83, 0.39, 0.18),
            vec3f(0.98, 0.83, 0.63),
        );
    }

    if (schemeIndex == 2) {
        return sampleRampStops(
            t,
            vec3f(0.85, 0.82, 0.73),
            vec3f(0.82, 0.79, 0.69),
            vec3f(0.9, 0.68, 0.37),
            vec3f(0.78, 0.39, 0.2),
            vec3f(0.33, 0.17, 0.09),
        );
    }

    return sampleRampStops(
        t,
        vec3f(0.06, 0.07, 0.09),
        vec3f(0.08, 0.15, 0.22),
        vec3f(0.1, 0.36, 0.47),
        vec3f(0.3, 0.68, 0.75),
        vec3f(0.93, 0.97, 0.98),
    );
}

fn isInsideCircle(world: vec2f, circle: vec4f) -> bool {
    let delta = world - circle.xy;
    return dot(delta, delta) < circle.z * circle.z;
}

@vertex
fn vsMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOut {
    var positions = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f(3.0, -1.0),
        vec2f(-1.0, 3.0),
    );
    var uvs = array<vec2f, 3>(
        vec2f(0.0, 0.0),
        vec2f(2.0, 0.0),
        vec2f(0.0, 2.0),
    );

    var output: VertexOut;
    output.position = vec4f(positions[vertexIndex], 0.0, 1.0);
    output.uv = uvs[vertexIndex];
    return output;
}

@fragment
fn fsMain(input: VertexOut) -> @location(0) vec4f {
    let uv = clamp(input.uv, vec2f(0.0, 0.0), vec2f(1.0, 1.0));
    let world = mix(uBackground.boundsMin, uBackground.boundsMax, uv);

    if (isInsideCircle(world, uBackground.circleA) || isInsideCircle(world, uBackground.circleB)) {
        discard;
    }

    let sampleValue = textureSample(uBackgroundTexture, uBackgroundSampler, uv);
    let schemeIndex = i32(round(uBackground.config.x));
    let color = sampleBackgroundColorRamp(sampleValue.r, schemeIndex);
    return vec4f(color, 1.0);
}
`,Ze=`struct Camera {
    values: vec4f,
};

@group(0) @binding(0)
var<uniform> uCamera: Camera;

struct VertexIn {
    @location(0) position: vec2f,
    @location(1) color: vec4f,
};

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) color: vec4f,
};

@vertex
fn vsMain(input: VertexIn) -> VertexOut {
    let center = uCamera.values.xy;
    let halfExtents = uCamera.values.zw;
    let ndc = (input.position - center) / halfExtents;

    var output: VertexOut;
    output.position = vec4f(ndc, 0.0, 1.0);
    output.color = input.color;
    return output;
}

@fragment
fn fsMain(input: VertexOut) -> @location(0) vec4f {
    return input.color;
}
`;async function Qe(){let e=await navigator.gpu.requestAdapter();if(!e)throw Error(`No GPU adapter found.`);return e}function $e(e){let t=256;for(;t<e;)t*=2;return t}function et(e,t,n,r,i,a){return e.createRenderPipeline({label:a,layout:t,vertex:{module:n,entryPoint:`vsMain`,buffers:[{arrayStride:Me,attributes:[{shaderLocation:0,offset:0,format:`float32x2`},{shaderLocation:1,offset:8,format:`float32x4`}]}]},fragment:{module:n,entryPoint:`fsMain`,targets:[{format:r}]},primitive:{topology:i}})}function tt(e,t,n,r){return e.createRenderPipeline({label:`background-pipeline`,layout:t,vertex:{module:n,entryPoint:`vsMain`},fragment:{module:n,entryPoint:`fsMain`,targets:[{format:r}]},primitive:{topology:`triangle-list`}})}var nt=class e{static async create(t,n={}){if(!(`gpu`in navigator))throw Error(`WebGPU is not available in this browser.`);let r=t.getContext(`webgpu`);if(r===null)throw Error(`Failed to create the WebGPU canvas context.`);let i=new e(t,r,navigator.gpu.getPreferredCanvasFormat(),n);return await i.restoreDeviceResources(),i}canvas;context;format;setStatus;onDeviceLost;resources=null;fillVertexBuffer={buffer:null,capacityBytes:0,shadowVertices:new Float32Array,vertexCount:0};lineVertexBuffer={buffer:null,capacityBytes:0,shadowVertices:new Float32Array,vertexCount:0};backgroundTexture={texture:null,view:null,bindGroup:null,width:0,height:0};configuredWidth=0;configuredHeight=0;configuredDevicePixelRatio=0;restorePromise=null;isDestroyed=!1;isDeviceLost=!1;geometryUploadRequired=!0;backgroundUploadRequired=!0;constructor(e,t,n,r){this.canvas=e,this.context=t,this.format=n,this.setStatus=r.setStatus,this.onDeviceLost=r.onDeviceLost}registerDeviceLifecycle(e){e.lost.then(e=>{if(this.isDestroyed)return;this.isDeviceLost=!0;let t=`GPU device lost: ${e.message||e.reason}`;console.error(`WebGPU device lost:`,e),this.setStatus?.(t),this.onDeviceLost?.(t)}),e.addEventListener(`uncapturederror`,e=>{console.error(`WebGPU uncaptured error:`,e.error)})}async createDeviceResources(){let e=await(await Qe()).requestDevice(),t=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),n=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:`uniform`}}]}),r=e.createPipelineLayout({bindGroupLayouts:[n]}),i=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:`filtering`}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:`float`,viewDimension:`2d`}},{binding:2,visibility:GPUShaderStage.FRAGMENT,buffer:{type:`uniform`}}]}),a=e.createPipelineLayout({bindGroupLayouts:[i]}),o=e.createShaderModule({code:Ze}),s=e.createShaderModule({code:Xe}),c=e.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:t}}]}),l=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),u=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return this.registerDeviceLifecycle(e),{device:e,cameraBuffer:t,bindGroup:c,backgroundSampler:l,backgroundUniformBuffer:u,backgroundBindGroupLayout:i,backgroundPipeline:tt(e,a,s,this.format),fillPipeline:et(e,r,o,this.format,`triangle-list`,`fill-pipeline`),linePipeline:et(e,r,o,this.format,`line-list`,`line-pipeline`)}}destroyVertexBuffer(e){e.buffer!==null&&(e.buffer.destroy(),e.buffer=null),e.capacityBytes=0}destroyBackgroundTexture(){this.backgroundTexture.texture!==null&&this.backgroundTexture.texture.destroy(),this.backgroundTexture.texture=null,this.backgroundTexture.view=null,this.backgroundTexture.bindGroup=null,this.backgroundTexture.width=0,this.backgroundTexture.height=0}clearVertexShadow(e){e.shadowVertices=new Float32Array,e.vertexCount=0}destroyDeviceResources(){this.resources!==null&&(this.resources.cameraBuffer.destroy(),this.resources.backgroundUniformBuffer.destroy()),this.destroyVertexBuffer(this.fillVertexBuffer),this.destroyVertexBuffer(this.lineVertexBuffer),this.destroyBackgroundTexture(),this.resources=null,this.geometryUploadRequired=!0,this.backgroundUploadRequired=!0}configureCanvas(e,t){let n=Math.max(1,e.canvas.width),r=Math.max(1,e.canvas.height),i=Math.max(1,e.canvas.devicePixelRatio),a=Math.max(1,Math.floor(n*i)),o=Math.max(1,Math.floor(r*i));this.canvas.width!==a&&(this.canvas.width=a),this.canvas.height!==o&&(this.canvas.height=o),!(this.configuredWidth===a&&this.configuredHeight===o&&this.configuredDevicePixelRatio===i)&&(this.context.configure({device:t,format:this.format,alphaMode:`opaque`}),this.configuredWidth=a,this.configuredHeight=o,this.configuredDevicePixelRatio=i)}updateCameraUniform(e,t){if(this.resources===null)return;let{halfWidth:n,halfHeight:r}=De(e),i=new Float32Array([e.center.x,e.center.y,n,r]).buffer;t.queue.writeBuffer(this.resources.cameraBuffer,0,i)}ensureVertexBufferCapacity(e,t,n){return(t.buffer===null||t.capacityBytes<n)&&(this.destroyVertexBuffer(t),t.capacityBytes=$e(n),t.buffer=e.createBuffer({size:t.capacityBytes,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})),t.buffer}areVertexArraysEqual(e,t){if(e.length!==t.length)return!1;for(let n=0;n<t.length;n+=1)if(e[n]!==t[n])return!1;return!0}syncVertexBuffer(e,t,n,r){if(t.vertexCount=n.length/D,n.byteLength===0)return t.shadowVertices=new Float32Array,null;if(!(r||this.geometryUploadRequired||t.buffer===null||!this.areVertexArraysEqual(t.shadowVertices,n)))return t.buffer;let i=this.ensureVertexBufferCapacity(e,t,n.byteLength),a=n.buffer;return e.queue.writeBuffer(i,0,a,n.byteOffset,n.byteLength),t.shadowVertices=n.slice(),i}updateBackgroundUniform(e,t){if(this.resources===null)return;let n=t.scheme===`sunset`?1:t.scheme===`paper`?2:0,r=new Float32Array([t.bounds.minX,t.bounds.minY,t.bounds.maxX,t.bounds.maxY,t.circles[0].center.x,t.circles[0].center.y,t.circles[0].radius,0,t.circles[1].center.x,t.circles[1].center.y,t.circles[1].radius,0,n,0,0,0]);e.queue.writeBuffer(this.resources.backgroundUniformBuffer,0,r.buffer)}ensureBackgroundTexture(e,t){this.backgroundTexture.texture!==null&&this.backgroundTexture.width===t.cols&&this.backgroundTexture.height===t.rows||(this.destroyBackgroundTexture(),this.backgroundTexture.texture=e.createTexture({label:`scalar-background-texture`,size:{width:t.cols,height:t.rows},format:`rgba8unorm`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),this.backgroundTexture.view=this.backgroundTexture.texture.createView(),this.backgroundTexture.width=t.cols,this.backgroundTexture.height=t.rows,this.backgroundUploadRequired=!0,this.resources!==null&&this.backgroundTexture.view!==null&&(this.backgroundTexture.bindGroup=e.createBindGroup({layout:this.resources.backgroundBindGroupLayout,entries:[{binding:0,resource:this.resources.backgroundSampler},{binding:1,resource:this.backgroundTexture.view},{binding:2,resource:{buffer:this.resources.backgroundUniformBuffer}}]})))}syncScalarBackground(e,t,n){t===null||this.resources===null||(this.ensureBackgroundTexture(e,t),this.updateBackgroundUniform(e,t),!(this.backgroundTexture.texture===null||!n&&!this.backgroundUploadRequired)&&(e.queue.writeTexture({texture:this.backgroundTexture.texture},t.texels,{bytesPerRow:t.cols*4,rowsPerImage:t.rows},{width:t.cols,height:t.rows,depthOrArrayLayers:1}),this.backgroundUploadRequired=!1))}async restoreAfterDeviceLoss(){await this.restoreDeviceResources()}async restoreDeviceResources(){if(this.restorePromise!==null)return this.restorePromise;this.restorePromise=(async()=>{this.destroyDeviceResources(),this.resources=await this.createDeviceResources(),this.isDeviceLost=!1,this.configuredWidth=0,this.configuredHeight=0,this.configuredDevicePixelRatio=0,this.geometryUploadRequired=!0,this.backgroundUploadRequired=!0,this.setStatus?.(`WebGPU ready.`)})();try{await this.restorePromise}finally{this.restorePromise=null}}render(e,t,n,r={}){if(this.isDestroyed)return!1;if(this.resources===null||this.isDeviceLost)return this.restorePromise===null&&this.restoreDeviceResources(),!1;let{device:i,bindGroup:a,fillPipeline:o,linePipeline:s}=this.resources,c=r.geometryDirty??!1,l=r.backgroundDirty??!1,u=r.scalarBackground??null;this.configureCanvas(e,i),this.updateCameraUniform(e,i),this.syncScalarBackground(i,u,l);let d=this.syncVertexBuffer(i,this.fillVertexBuffer,t.fillVertices,c),f=this.syncVertexBuffer(i,this.lineVertexBuffer,t.lineVertices,c);this.geometryUploadRequired=!1;let p=i.createCommandEncoder(),m=p.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:n,loadOp:`clear`,storeOp:`store`}]});return u!==null&&this.backgroundTexture.bindGroup!==null&&this.resources.backgroundPipeline!==null&&(m.setPipeline(this.resources.backgroundPipeline),m.setBindGroup(0,this.backgroundTexture.bindGroup),m.draw(3)),m.setBindGroup(0,a),this.fillVertexBuffer.vertexCount>0&&d!==null&&(m.setPipeline(o),m.setVertexBuffer(0,d),m.draw(this.fillVertexBuffer.vertexCount)),this.lineVertexBuffer.vertexCount>0&&f!==null&&(m.setPipeline(s),m.setVertexBuffer(0,f),m.draw(this.lineVertexBuffer.vertexCount)),m.end(),i.queue.submit([p.finish()]),!0}destroy(){this.isDestroyed=!0,this.destroyDeviceResources(),this.clearVertexShadow(this.fillVertexBuffer),this.clearVertexShadow(this.lineVertexBuffer)}};function rt(e,t,n){let r=e.getBoundingClientRect();return{x:t-r.left,y:n-r.top}}function it(e,t){let n=!1,r=0,i=0;e.addEventListener(`pointerdown`,t=>{let a=rt(e,t.clientX,t.clientY);n=!0,r=a.x,i=a.y,e.setPointerCapture(t.pointerId)}),e.addEventListener(`pointermove`,a=>{if(!n)return;let o=rt(e,a.clientX,a.clientY),s=o.x-r,c=o.y-i;r=o.x,i=o.y,t.onPanByPixels(s,c)}),e.addEventListener(`pointerup`,t=>{n=!1,e.releasePointerCapture(t.pointerId)}),e.addEventListener(`pointercancel`,t=>{n=!1,e.releasePointerCapture(t.pointerId)}),e.addEventListener(`wheel`,n=>{n.preventDefault();let r=rt(e,n.clientX,n.clientY),i=Math.exp(n.deltaY*.0015);t.onZoomAtPoint(r.x,r.y,i)},{passive:!1})}function at(e){return Number.isFinite(e.valueAsNumber)?e.valueAsNumber:null}function k(e,t){return e.toFixed(t)}function A(e,t,n,r){let i=k(n,r);e.value=i,t.value=i}function j(e,t,n,r){e.addEventListener(`input`,()=>{let t=at(e);t!==null&&(n(),r(t))}),t.addEventListener(`change`,()=>{let e=at(t);e!==null&&(n(),r(e))})}function M(e,t,n){e.addEventListener(`change`,()=>{n?.(),t(e.checked)})}function ot(e,t){e.addEventListener(`input`,()=>{t(e.value)})}function st(e,t){e.addEventListener(`change`,()=>{t(e.value)})}function ct(e,t){let n=t!==`none`,r=e.backgroundColorSchemeSelect.closest(`.control-field`),i=e.backgroundColorInput.closest(`.control-field`);e.backgroundColorSchemeSelect.disabled=!n,e.backgroundColorInput.disabled=n,r!==null&&(r.hidden=!n),i!==null&&(i.hidden=n)}function lt(e,t){return j(e.radiusRangeInput,e.radiusNumberInput,t.onBeginInteractiveChange,t.onSetRadius),j(e.centerDistanceRangeInput,e.centerDistanceNumberInput,t.onBeginInteractiveChange,t.onSetCenterDistance),M(e.streamlineShowInput,t.onSetStreamlinesVisible,t.onBeginInteractiveChange),j(e.streamlineCountRangeInput,e.streamlineCountNumberInput,t.onBeginInteractiveChange,t.onSetStreamlineCount),j(e.streamlineThicknessRangeInput,e.streamlineThicknessNumberInput,t.onBeginInteractiveChange,t.onSetStreamlineThicknessPx),j(e.farfieldSpeedRangeInput,e.farfieldSpeedNumberInput,t.onBeginInteractiveChange,t.onSetFarfieldSpeed),j(e.incidenceAngleRangeInput,e.incidenceAngleNumberInput,t.onBeginInteractiveChange,t.onSetIncidenceAngleDeg),j(e.crowdySeriesTermsRangeInput,e.crowdySeriesTermsNumberInput,t.onBeginInteractiveChange,t.onSetCrowdySeriesTerms),j(e.flowGridColsRangeInput,e.flowGridColsNumberInput,t.onBeginInteractiveChange,t.onSetFlowGridCols),j(e.flowGridRowsRangeInput,e.flowGridRowsNumberInput,t.onBeginInteractiveChange,t.onSetFlowGridRows),st(e.backgroundFieldSelect,t.onSetBackgroundField),st(e.backgroundColorSchemeSelect,t.onSetBackgroundColorScheme),ot(e.streamlineColorInput,t.onSetStreamlineColor),ot(e.backgroundColorInput,t.onSetBackgroundColor),M(e.fillCirclesInput,t.onSetFillCircles),M(e.forceVectorsInput,t.onSetForceVectorsVisible),M(e.showAxesInput,t.onSetAxesVisible),e.resetViewButton.addEventListener(`click`,t.onResetView),e.exportPngButton.addEventListener(`click`,t.onExportPng),{sync(t){let n=Math.max(.05,t.radiusMax),r=Math.max(2*t.radius+.05,t.centerDistanceMin);e.radiusRangeInput.max=k(n,2),e.radiusNumberInput.max=k(n,2),e.centerDistanceRangeInput.min=k(r,2),e.centerDistanceNumberInput.min=k(r,2),e.farfieldSpeedRangeInput.max=k(Math.max(4,t.farfieldSpeedMax),2),A(e.radiusRangeInput,e.radiusNumberInput,t.radius,2),A(e.centerDistanceRangeInput,e.centerDistanceNumberInput,t.centerDistance,2),A(e.streamlineCountRangeInput,e.streamlineCountNumberInput,t.streamlineCount,0),A(e.streamlineThicknessRangeInput,e.streamlineThicknessNumberInput,t.streamlineThicknessPx,2),A(e.farfieldSpeedRangeInput,e.farfieldSpeedNumberInput,t.farfieldSpeed,2),A(e.incidenceAngleRangeInput,e.incidenceAngleNumberInput,t.incidenceAngleDeg,1),A(e.crowdySeriesTermsRangeInput,e.crowdySeriesTermsNumberInput,t.crowdySeriesTerms,0),A(e.flowGridColsRangeInput,e.flowGridColsNumberInput,t.flowGridCols,0),A(e.flowGridRowsRangeInput,e.flowGridRowsNumberInput,t.flowGridRows,0),e.streamlineShowInput.checked=t.streamlineShow,e.backgroundFieldSelect.value=t.backgroundField,e.backgroundColorSchemeSelect.value=t.backgroundColorScheme,e.streamlineColorInput.value=t.streamlineColor,e.backgroundColorInput.value=t.backgroundColor,e.fillCirclesInput.checked=t.fillCircles,e.forceVectorsInput.checked=t.forceVectorsVisible,e.showAxesInput.checked=t.axesVisible;let i=!t.streamlineShow;e.streamlineCountRangeInput.disabled=i,e.streamlineCountNumberInput.disabled=i,e.streamlineThicknessRangeInput.disabled=i,e.streamlineThicknessNumberInput.disabled=i,ct(e,t.backgroundField)}}}function N(e,t){let n=e.querySelector(t);if(n===null)throw Error(`Element ${t} not found.`);return n}function P(e){e.invalidation.viewportDirty=!0,e.invalidation.sceneDirty=!0,e.invalidation.flowPipelineDirty=!0,e.invalidation.diagnosticsDirty=!0,e.invalidation.gpuResourcesDirty=!0}function ut(e){e.invalidation.sceneDirty=!0,e.invalidation.flowPipelineDirty=!0,e.invalidation.diagnosticsDirty=!0,e.invalidation.gpuResourcesDirty=!0}function F(e){e.invalidation.sceneDirty=!0,e.invalidation.gpuResourcesDirty=!0}function I(e){e.invalidation.flowPipelineDirty=!0,e.invalidation.diagnosticsDirty=!0,e.invalidation.gpuResourcesDirty=!0}function dt(e){e.invalidation.viewportDirty=!1,e.invalidation.sceneDirty=!1,e.invalidation.flowPipelineDirty=!1,e.invalidation.diagnosticsDirty=!1,e.invalidation.gpuResourcesDirty=!1}function ft(e){e.invalidation.frameScheduled=!1}function pt(e){let t=null;return{schedule(n){n.invalidation.frameScheduled||(n.invalidation.frameScheduled=!0,t=window.requestAnimationFrame(()=>{t=null,ft(n),e()}))},cancel(e){t!==null&&(window.cancelAnimationFrame(t),t=null,ft(e))}}}function mt(e,t){if(!Number.isFinite(t))throw Error(`${e} must be a finite number.`)}function L(e){if(mt(`radius`,e.radius),mt(`centerDistance`,e.centerDistance),e.radius<=0)throw Error(`radius must be > 0.`);if(e.centerDistance<=2*e.radius)throw Error(`centerDistance must be > 2 * radius.`)}function ht(e){L(e);let t=.5*e.centerDistance;return{circleA:{id:`circleA`,center:{x:-t,y:0},radius:e.radius},circleB:{id:`circleB`,center:{x:t,y:0},radius:e.radius}}}function R(e,t=0){return{re:e,im:t}}function z(e,t){return{re:e.re+t.re,im:e.im+t.im}}function B(e,t){return{re:e.re-t.re,im:e.im-t.im}}function V(e,t){return{re:e.re*t,im:e.im*t}}function H(e,t){return{re:e.re*t.re-e.im*t.im,im:e.re*t.im+e.im*t.re}}function U(e,t){let n=t.re*t.re+t.im*t.im;if(n===0)throw Error(`Division by 0 in Complex.divide.`);return{re:(e.re*t.re+e.im*t.im)/n,im:(e.im*t.re-e.re*t.im)/n}}function gt(e,t){return{re:e*Math.cos(t),im:e*Math.sin(t)}}function _t(e){return e.re*e.re+e.im*e.im}var W=R(1,0),vt=1e-12,yt=1e-15,bt=1e-12;function xt(e){return Math.sqrt(_t(e))}function St(e){return H(e,e)}function Ct(e,t,n,r=bt){let i=B(W,e),a=V(U(e,i),-1),o=V(U(W,St(i)),-1),s=0,c=xt(a);for(let i=1;i<=n;i+=1){let n=t**(2*i);if(n<yt)break;let l=B(W,V(e,n)),u=B(e,R(n,0)),d=z(V(U(e,l),-n),U(R(n,0),u)),f=V(U(W,St(l)),-n),p=V(U(W,St(u)),-n);if(a=z(a,d),o=z(o,z(f,p)),s=i,c=xt(d),c<r)break}let l=t*t,u=c*(l/Math.max(vt,1-l));return{K:a,dKdZeta:o,diagnostics:{termsUsed:s,lastIncludedMagnitude:c,tailEstimate:u}}}function wt(e,t,n,r,i,a=bt){let o=r,s=V(e,1/t.beta),c=V(e,t.beta),l=Ct(s,t.q,i,a),u=Ct(c,t.q,i,a),d=gt(1,-o),f=gt(1,o),p=2*t.R*n,m=B(H(d,l.K),H(f,u.K)),h=B(V(H(d,l.dKdZeta),1/t.beta),V(H(f,u.dKdZeta),t.beta));return{W1:V(m,p),dW1dZeta:V(h,p),diagnostics:{zetaMagnitude:xt(e),kAtZetaOverBeta:l.diagnostics,kAtZetaTimesBeta:u.diagnostics}}}var Tt=1e-12;function Et(e,t,n){let r=ht(n),i=e-r.circleA.center.x,a=t-r.circleA.center.y,o=e-r.circleB.center.x,s=t-r.circleB.center.y,c=n.radius*n.radius,l=i*i+a*a<c,u=o*o+s*s<c;return{insideLeftCylinder:l,insideRightCylinder:u,insideAnyCylinder:l||u}}function Dt(e,t,n){let r=R(e,t),i=z(r,R(n.R,0)),a=B(r,R(n.R,0));return _t(a)<Tt?null:V(U(i,a),n.beta)}function Ot(e,t){let n=B(e,R(t.beta,0));return _t(n)<Tt?null:U(R(-2*t.R*t.beta,0),H(n,n))}var kt=1e-12;function At(e){L(e);let t=.5*e.centerDistance;if(t<=e.radius)throw Error(`Crowdy geometry requires separated cylinders with d/2 > radius.`);let n=e.radius/t;if(!(n>0&&n<1))throw Error(`Crowdy geometry requires a radius-to-distance ratio strictly in (0, 1).`);let r=n/(1+Math.sqrt(Math.max(0,1-n*n))),i=r*r;if(!(i>0&&i<1))throw Error(`Crowdy geometry produced an invalid annulus parameter q.`);let a=t*(1-i)/Math.max(kt,1+i);if(!(a>0))throw Error(`Crowdy geometry produced an invalid R parameter.`);return{radius:e.radius,centerDistance:e.centerDistance,halfCenterDistance:t,q:i,beta:r,R:a}}var jt=1e-12;function Mt(e){return{terms:Math.max(1,Math.floor(e.terms)),tolerance:e.tolerance===void 0?jt:Math.max(e.tolerance,2**-52)}}function Nt(e){if(!Number.isFinite(e.farfieldSpeed))throw Error(`Crowdy solver requires a finite farfield speed.`);if(!Number.isFinite(e.incidenceAngleRad))throw Error(`Crowdy solver requires a finite incidence angle.`);return{geometry:{...e.geometry},farfieldSpeed:e.farfieldSpeed,incidenceAngleRad:e.incidenceAngleRad,series:Mt(e.series)}}function Pt(e){return{phi:null,psi:null,u:null,v:null,insideCylinder:e,diagnostics:null}}function Ft(e){return{phi:e.W1.re,psi:e.W1.im,u:null,v:null,insideCylinder:!1,diagnostics:e.diagnostics}}function It(e){let t=Nt(e),n=At(t.geometry),r=(e,r)=>{if(Et(e,r,t.geometry).insideAnyCylinder)return Pt(!0);let i=Dt(e,r,n);if(i===null)return Pt(!1);let a=wt(i,n,t.farfieldSpeed,t.incidenceAngleRad,t.series.terms,t.series.tolerance),o=Ft(a),s=Ot(i,n);if(s===null)return o;let c=U(a.dW1dZeta,s);return{...o,u:c.re,v:-c.im}};return{input:t,params:n,evaluateAtPoint:r,evaluateVelocityAtPoint(e,t){let n=r(e,t);return{u:n.u,v:n.v}},evaluateW1AtPoint(e,t){let n=r(e,t);return{phi:n.phi,psi:n.psi}},evaluatePsiAtPoint(e,t){return r(e,t).psi},isPointInsideCylinder(e,n){return Et(e,n,t.geometry).insideAnyCylinder}}}function Lt(e,t){let n=Math.max(1,Math.floor(t));if(!Number.isFinite(e.min)||!Number.isFinite(e.max)||e.max<=e.min)return[];let r=(e.max-e.min)/(n+1),i=[];for(let t=0;t<n;t+=1)i.push(e.min+(t+1)*r);return i}function Rt(e,t,n){let r=c(s(e,t));return r===null?[]:Lt(r,n)}var G=1e-12;function zt(e){return Math.min(Math.max(e,0),1)}function Bt(e,t){let n=e.x-t.x,r=e.y-t.y;return n*n+r*r}function K(e,t,n){let r=e-n,i=t-n;return Math.abs(r)<G&&Math.abs(i)<G?!1:Math.abs(r)<G||Math.abs(i)<G?!0:r<0&&i>0||r>0&&i<0}function q(e,t,n,r,i){let a=r-t;if(Math.abs(a)<G)return{x:.5*(e.x+n.x),y:.5*(e.y+n.y)};let o=zt((i-t)/a);return{x:e.x+o*(n.x-e.x),y:e.y+o*(n.y-e.y)}}function Vt(e){let t=[];for(let n of e)t.some(e=>Bt(n,e)<G*G)||t.push(n);return t}function Ht(e,t,n,r){let i=a(e,n,r),s=a(e,n+1,r),c=a(e,n+1,r+1),l=a(e,n,r+1);return[{point:o(e,n,r),value:t.values[i],isValid:t.isValid[i]!==0},{point:o(e,n+1,r),value:t.values[s],isValid:t.isValid[s]!==0},{point:o(e,n+1,r+1),value:t.values[c],isValid:t.isValid[c]!==0},{point:o(e,n,r+1),value:t.values[l],isValid:t.isValid[l]!==0}]}function Ut(e,t,n){return t===0?!e[0].isValid||!e[1].isValid||!K(e[0].value,e[1].value,n)?null:q(e[0].point,e[0].value,e[1].point,e[1].value,n):t===1?!e[1].isValid||!e[2].isValid||!K(e[1].value,e[2].value,n)?null:q(e[1].point,e[1].value,e[2].point,e[2].value,n):t===2?!e[3].isValid||!e[2].isValid||!K(e[3].value,e[2].value,n)?null:q(e[3].point,e[3].value,e[2].point,e[2].value,n):!e[0].isValid||!e[3].isValid||!K(e[0].value,e[3].value,n)?null:q(e[0].point,e[0].value,e[3].point,e[3].value,n)}function J(e,t,n,r,i){let a=Ut(t,r,n),o=Ut(t,i,n);a!==null&&o!==null&&Bt(a,o)>=G*G&&e.push({a,b:o})}function Wt(e,t){let n=e[0].value-t,r=e[1].value-t,i=e[2].value-t,a=e[3].value-t,o=n*i-r*a;return Math.abs(o)<G?n+r+i+a>=0:o>0}function Gt(e,t,n){let r=(t[0].value>=n?1:0)|(t[1].value>=n?2:0)|(t[2].value>=n?4:0)|(t[3].value>=n?8:0);if(!(r===0||r===15))switch(r){case 1:J(e,t,n,3,0);break;case 2:J(e,t,n,0,1);break;case 3:J(e,t,n,3,1);break;case 4:J(e,t,n,1,2);break;case 5:Wt(t,n)?(J(e,t,n,0,1),J(e,t,n,2,3)):(J(e,t,n,3,0),J(e,t,n,1,2));break;case 6:J(e,t,n,0,2);break;case 7:J(e,t,n,3,2);break;case 8:J(e,t,n,2,3);break;case 9:J(e,t,n,2,0);break;case 10:Wt(t,n)?(J(e,t,n,3,0),J(e,t,n,1,2)):(J(e,t,n,0,1),J(e,t,n,2,3));break;case 11:J(e,t,n,2,1);break;case 12:J(e,t,n,1,3);break;case 13:J(e,t,n,0,1);break;case 14:J(e,t,n,3,0);break;default:break}}function Kt(e,t){let n=0,r=0,i=0;for(let a of t){let t=0;for(let n of a)e[n].isValid&&(t+=1);t===3&&(n+=1),t>=2&&(r+=1),i+=t}return[n,r,i]}function qt(e){let t=[[0,1,2],[0,2,3]],n=[[0,1,3],[1,2,3]],r=Kt(e,t),i=Kt(e,n);return i[0]>r[0]||i[0]===r[0]&&i[1]>r[1]||i[0]===r[0]&&i[1]===r[1]&&i[2]>r[2]?n:t}function Jt(e,t,n,r){let i=[],a=[[n[0],n[1]],[n[1],n[2]],[n[2],n[0]]];for(let[e,n]of a){let a=t[e],o=t[n];!a.isValid||!o.isValid||K(a.value,o.value,r)&&i.push(q(a.point,a.value,o.point,o.value,r))}let o=Vt(i);o.length===2&&Bt(o[0],o[1])>=G*G&&e.push({a:o[0],b:o[1]})}function Yt(e,t,n){let r=qt(t);for(let i of r)Jt(e,t,i,n)}function Xt(e,t,n){let r=[];for(let i=0;i<e.rows-1;i+=1)for(let a=0;a<e.cols-1;a+=1){let o=Ht(e,t,a,i),s=o.reduce((e,t)=>e+(t.isValid?1:0),0);if(s===4){Gt(r,o,n);continue}s>=2&&Yt(r,o,n)}return r}function Zt(e,t,n){return Xt(e,s(e,t),n)}function Qt(e,t,n){return n.map(n=>({level:n,segments:Zt(e,t,n)}))}function $t(e,t,n){return t===`pressure`?d(e,n.farfield.speed):u(e)}function en(e){return Math.max(0,Math.min(255,Math.round(e*255)))}function tn(e,t,n){let r=Math.floor(n/e),i=n-r*e,a=[];for(let n=-1;n<=1;n+=1)for(let o=-1;o<=1;o+=1){if(o===0&&n===0)continue;let s=i+o,c=r+n;s<0||s>=e||c<0||c>=t||a.push(c*e+s)}return a}function nn(e,t,n,r){let i=new Uint32Array(e.length),a=0,o=0;for(let n=0;n<e.length;n+=1)t[n]!==0&&(i[o]=n,o+=1);for(;a<o;){let s=i[a];a+=1;for(let a of tn(n,r,s))t[a]===0&&(e[a]=e[s],t[a]=1,i[o]=a,o+=1)}}function rn(e,t,n,r){if(r.backgroundScalarField===`none`)return null;let i=$t(e,r.backgroundScalarField,n),a=c(i);if(a===null||a.max-a.min<1e-12)return null;let o=new Float32Array(i.values.length),s=new Uint8Array(i.isValid),l=new Uint8Array(new ArrayBuffer(e.cols*e.rows*4)),u=1/(a.max-a.min);for(let e=0;e<i.values.length;e+=1){if(i.isValid[e]===0)continue;let t=i.values[e];if(!Number.isFinite(t))continue;let n=(t-a.min)*u;o[e]=Math.max(0,Math.min(1,n))}nn(o,s,e.cols,e.rows);for(let e=0;e<o.length;e+=1){let t=e*4;l[t+0]=en(o[e]),l[t+1]=0,l[t+2]=0,l[t+3]=255}return{field:r.backgroundScalarField,scheme:r.backgroundColorScheme,cols:e.cols,rows:e.rows,bounds:e.bounds,circles:t,texels:l}}var an=.5,on=.5;function Y(e,t,n,r,i){return e[t+0]=n,e[t+1]=r,e[t+2]=i[0],e[t+3]=i[1],e[t+4]=i[2],e[t+5]=i[3],t+D}function sn(e){let t=[];for(let n of e)t.push(...n.segments);return t}function cn(e){return e.maxX-e.minX}function ln(e){return e.maxY-e.minY}function un(e){let t=ht(e.geometryInput),n=.5*(t.circleA.center.x+t.circleB.center.x),r=.5*(t.circleA.center.y+t.circleB.center.y),i=.5*cn(e.sampleBounds),a=.5*ln(e.sampleBounds);return{minX:n-i,minY:r-a,maxX:n+i,maxY:r+a}}function dn(e){return e.quality===`full`?i(e.flow.grid):i({cols:Math.max(2,Math.floor(e.flow.grid.cols*an)),rows:Math.max(2,Math.floor(e.flow.grid.rows*an))})}function fn(e,t){return t===`full`?Math.max(1,Math.floor(e)):Math.max(4,Math.floor(e*on))}function pn(e,t,n){let r=3*D,i=new Float32Array(e.length*2*r),a=0;for(let r of e){let e=r.b.x-r.a.x,o=r.b.y-r.a.y,s=Math.hypot(e,o);if(s<=1e-12)continue;let c=n*.5,l=-o/s*c,u=e/s*c,d=r.a.x+l,f=r.a.y+u,p=r.a.x-l,m=r.a.y-u,h=r.b.x+l,g=r.b.y+u,_=r.b.x-l,v=r.b.y-u;a=Y(i,a,d,f,t),a=Y(i,a,p,m,t),a=Y(i,a,h,g,t),a=Y(i,a,h,g,t),a=Y(i,a,p,m,t),a=Y(i,a,_,v,t)}return a===i.length?i:i.slice(0,a)}function mn(e){let t=dn(e),n=fn(e.flow.streamline.count,e.quality),r=It({geometry:e.geometryInput,farfieldSpeed:e.flow.farfield.speed,incidenceAngleRad:e.flow.farfield.incidenceAngleRad,series:{terms:e.flow.crowdySeriesTerms}}),i=e.display.backgroundScalarField!==`none`,a=e.flow.streamline.show&&e.flow.streamline.count>=1;if(!i&&!a)return{solver:r,sampleGrid:null,scalarBackground:null,contourLevels:[],contours:[],flowFillVertices:new Float32Array,scalarRange:null,segmentCount:0,quality:e.quality,samplingCols:t.cols,samplingRows:t.rows,contourCount:0};let o=l(e.sampleBounds,t,r),s=a?l(un(e),t,r):null,u=ht(e.geometryInput),d=[u.circleA,u.circleB],f=i?rn(o,d,e.flow,e.display):null;if(!a)return{solver:r,sampleGrid:o,scalarBackground:f,contourLevels:[],contours:[],flowFillVertices:new Float32Array,scalarRange:null,segmentCount:0,quality:e.quality,samplingCols:o.cols,samplingRows:o.rows,contourCount:0};let p=c({values:o.psi,isValid:o.isPotentialDefined});if(p===null||p.max-p.min<1e-12)return{solver:r,sampleGrid:o,scalarBackground:f,contourLevels:[],contours:[],flowFillVertices:new Float32Array,scalarRange:p,segmentCount:0,quality:e.quality,samplingCols:o.cols,samplingRows:o.rows,contourCount:0};let m=Rt(s??o,`psi`,n),h=Qt(o,`psi`,m),g=e.viewport.worldHeight/Math.max(1,e.viewport.canvas.height),_=sn(h);return{solver:r,sampleGrid:o,scalarBackground:f,contourLevels:m,contours:h,flowFillVertices:pn(_,Ke(e.display).streamlineColor,e.flow.streamline.thicknessPx*g),scalarRange:p,segmentCount:_.length,quality:e.quality,samplingCols:o.cols,samplingRows:o.rows,contourCount:m.length}}var hn=3,gn=10,_n=10,vn=.95,yn=.22,bn=[1,1,1,.96];function xn(e,t,n,r){e.push(t,n,r[0],r[1],r[2],r[3])}function Sn(e,t,n,r,i){xn(e,t.x,t.y,i),xn(e,n.x,n.y,i),xn(e,r.x,r.y,i)}function Cn(e,t,n,r,i,a){Sn(e,t,n,r,a),Sn(e,t,r,i,a)}function wn(e,t,n,r,i,a,o,s,c){let l=Math.hypot(n,r);if(l<=1e-12||i<=1e-12)return;let u=n/l,d=r/l,f=-d,p=u,m=.5*i,h={x:t.x-u*m,y:t.y-d*m},g={x:t.x+u*m,y:t.y+d*m},_=Math.min(o,i*.65),v={x:g.x-u*_,y:g.y-d*_},y=.5*a,ee={x:h.x+f*y,y:h.y+p*y},b={x:h.x-f*y,y:h.y-p*y},x={x:v.x-f*y,y:v.y-p*y},S={x:v.x+f*y,y:v.y+p*y},C=.5*s,w={x:v.x+f*C,y:v.y+p*C},T={x:v.x-f*C,y:v.y-p*C};Cn(e,ee,b,x,S,c),Sn(e,w,g,T,c)}function Tn(e,t,n){if(t===null)return new Float32Array;let r=e[0].radius,i=Math.max(t.frontCircle.magnitudeCoefficient,t.rearCircle.magnitudeCoefficient);if(i<=1e-12)return new Float32Array;let a=n.worldHeight/Math.max(1,n.canvas.height),o=hn*a,s=gn*a,c=_n*a,l=vn*r,u=yn*r,d=Math.max(u,t.frontCircle.magnitudeCoefficient/i*l),f=Math.max(u,t.rearCircle.magnitudeCoefficient/i*l),p=[];return wn(p,e[0].center,t.frontCircle.forceCoefficient.x,t.frontCircle.forceCoefficient.y,d,o,s,c,bn),wn(p,e[1].center,t.rearCircle.forceCoefficient.x,t.rearCircle.forceCoefficient.y,f,o,s,c,bn),new Float32Array(p)}var En=.25,Dn=1024,On=1024,kn=1024,An=1e-6,jn=1e6;function X(e,t){if(!Number.isFinite(t))throw Error(`${e} must be a finite number.`)}function Mn(e,t,n){return Math.min(n,Math.max(t,e))}function Nn(e,t,n){return Math.min(n,Math.max(t,Math.floor(e)))}function Pn(e){X(`angleRad`,e);let t=2*Math.PI,n=e%t;return n>Math.PI&&(n-=t),n<-Math.PI&&(n+=t),n}function Fn(e){return{show:e.show,count:Nn(e.count,1,256),thicknessPx:Mn(e.thicknessPx,En,48)}}function In(e){return{speed:Mn(e.speed,An,jn),incidenceAngleRad:Pn(e.incidenceAngleRad)}}function Ln(e){return{cols:Nn(e.cols,16,Dn),rows:Nn(e.rows,16,On)}}function Rn(e){return{streamline:Fn(e.streamline),farfield:In(e.farfield),grid:Ln(e.grid),crowdySeriesTerms:Nn(e.crowdySeriesTerms,4,kn)}}function zn(e){if(X(`streamline.count`,e.count),X(`streamline.thicknessPx`,e.thicknessPx),e.count<1)throw Error(`streamline.count must be >= 1.`);if(e.count>256)throw Error(`streamline.count must be <= 256.`);if(e.thicknessPx<.25)throw Error(`streamline.thicknessPx must be >= ${En}.`);if(e.thicknessPx>48)throw Error(`streamline.thicknessPx must be <= 48.`)}function Bn(e){if(X(`farfield.speed`,e.speed),X(`farfield.incidenceAngleRad`,e.incidenceAngleRad),e.speed<1e-6)throw Error(`farfield.speed must be >= ${An}.`);if(e.speed>1e6)throw Error(`farfield.speed must be <= ${jn}.`)}function Vn(e){if(X(`grid.cols`,e.cols),X(`grid.rows`,e.rows),e.cols<16)throw Error(`grid.cols must be >= 16.`);if(e.cols>1024)throw Error(`grid.cols must be <= ${Dn}.`);if(e.rows<16)throw Error(`grid.rows must be >= 16.`);if(e.rows>1024)throw Error(`grid.rows must be <= ${On}.`)}function Hn(e){if(zn(e.streamline),Bn(e.farfield),Vn(e.grid),X(`crowdySeriesTerms`,e.crowdySeriesTerms),e.crowdySeriesTerms<4)throw Error(`crowdySeriesTerms must be >= 4.`);if(e.crowdySeriesTerms>1024)throw Error(`crowdySeriesTerms must be <= ${kn}.`)}function Z(e,t){if(!Number.isFinite(t))throw Error(`${e} must be a finite number.`)}function Un(e){if(Z(`canvas.width`,e.width),Z(`canvas.height`,e.height),Z(`canvas.devicePixelRatio`,e.devicePixelRatio),e.width<=0)throw Error(`canvas.width must be > 0.`);if(e.height<=0)throw Error(`canvas.height must be > 0.`);if(e.devicePixelRatio<=0)throw Error(`canvas.devicePixelRatio must be > 0.`)}function Wn(e){if(Z(`viewport.center.x`,e.center.x),Z(`viewport.center.y`,e.center.y),Z(`viewport.worldHeight`,e.worldHeight),e.worldHeight<=0)throw Error(`viewport.worldHeight must be > 0.`)}function Gn(e){Wn(e),Un(e.canvas)}var Q={scene:{geometryInput:{radius:1,centerDistance:3},flow:{streamline:{show:!0,count:18,thicknessPx:1.25},farfield:{speed:1,incidenceAngleRad:0},grid:{cols:180,rows:120},crowdySeriesTerms:80},display:{showAxes:!0,showCircleOutlines:!0,showForceVectors:!0,fillCircles:!0,backgroundScalarField:`speed`,backgroundColorScheme:`cool`,backgroundColor:`#0f1318`,streamlineColor:`#dce3f4`}},viewport:{center:{x:0,y:0},worldHeight:6}};function Kn(e){return{...e}}function qn(e){return{streamline:{...e.streamline},farfield:{...e.farfield},grid:{...e.grid},crowdySeriesTerms:e.crowdySeriesTerms}}function Jn(e){return{...e}}function Yn(e){return{center:{...e.center},worldHeight:e.worldHeight,canvas:{...e.canvas}}}function Xn(){return{frameScheduled:!1,viewportDirty:!0,sceneDirty:!0,flowPipelineDirty:!0,diagnosticsDirty:!0,gpuResourcesDirty:!0}}function Zn(){let e=Kn(Q.scene.geometryInput),t=Rn(qn(Q.scene.flow)),n=Jn(Q.scene.display),r={center:{...Q.viewport.center},worldHeight:Q.viewport.worldHeight,canvas:{width:1,height:1,devicePixelRatio:1}};return L(e),Hn(t),Gn(r),{scene:{geometryInput:e,flow:t,display:n},viewport:r,invalidation:Xn()}}function Qn(e){return Yn(e)}var $n=.05,er=.05,tr=1e3,nr=.2,rr=200,ir=[`none`,`speed`,`pressure`],ar=[`cool`,`sunset`,`paper`];function or(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):t}function sr(e){return ir.includes(e)}function cr(e){return ar.includes(e)}function lr(e){e.viewport.center={...Q.viewport.center},e.viewport.worldHeight=Q.viewport.worldHeight,P(e)}function ur(e,t,n,r){let i=Math.max(1,t),a=Math.max(1,n),o=Math.max(1,r);e.viewport.canvas.width===i&&e.viewport.canvas.height===a&&e.viewport.canvas.devicePixelRatio===o||(e.viewport.canvas.width=i,e.viewport.canvas.height=a,e.viewport.canvas.devicePixelRatio=o,P(e))}function dr(e,t,n){e.viewport.center={x:t,y:n},P(e)}function fr(e,t,n){e.viewport.center={...t},e.viewport.worldHeight=or(n,nr,rr),P(e)}function pr(e,t){let n=Math.max($n,.5*e.scene.geometryInput.centerDistance-.5*er);e.scene.geometryInput.radius=or(t,$n,n),L(e.scene.geometryInput),ut(e)}function mr(e,t){let n=2*e.scene.geometryInput.radius+er;e.scene.geometryInput.centerDistance=or(t,n,tr),L(e.scene.geometryInput),ut(e)}function hr(e,t){e.scene.flow.farfield=In({...e.scene.flow.farfield,speed:t}),I(e)}function gr(e,t){e.scene.flow.farfield=In({...e.scene.flow.farfield,incidenceAngleRad:t}),I(e)}function _r(e,t){e.scene.flow.streamline=Fn({...e.scene.flow.streamline,count:t}),I(e)}function vr(e,t){e.scene.flow.streamline=Fn({...e.scene.flow.streamline,thicknessPx:t}),I(e)}function yr(e,t){e.scene.flow.grid=Ln({...e.scene.flow.grid,cols:t}),I(e)}function br(e,t){e.scene.flow.grid=Ln({...e.scene.flow.grid,rows:t}),I(e)}function xr(e,t){e.scene.flow=Rn({...e.scene.flow,crowdySeriesTerms:t}),I(e)}function Sr(e,t){e.scene.display.showAxes!==t&&(e.scene.display.showAxes=t,F(e))}function Cr(e,t){e.scene.display.showForceVectors!==t&&(e.scene.display.showForceVectors=t,F(e))}function wr(e,t){sr(t)&&e.scene.display.backgroundScalarField!==t&&(e.scene.display.backgroundScalarField=t,I(e))}function Tr(e,t){cr(t)&&e.scene.display.backgroundColorScheme!==t&&(e.scene.display.backgroundColorScheme=t,I(e))}function Er(e,t){e.scene.flow.streamline.show!==t&&(e.scene.flow.streamline.show=t,I(e))}function Dr(e,t){let n=Be(t,e.scene.display.streamlineColor);e.scene.display.streamlineColor!==n&&(e.scene.display.streamlineColor=n,I(e))}function Or(e,t){let n=Be(t,e.scene.display.backgroundColor);e.scene.display.backgroundColor!==n&&(e.scene.display.backgroundColor=n,e.scene.display.backgroundScalarField===`none`&&F(e))}function kr(e,t){e.scene.display.fillCircles!==t&&(e.scene.display.fillCircles=t,F(e))}function Ar(e){return ht(e.scene.geometryInput)}function jr(e){let t=Ar(e);return[t.circleA,t.circleB]}function Mr(e){return Math.max(1,e.viewport.canvas.width)/Math.max(1,e.viewport.canvas.height)}function Nr(e){return e.viewport.worldHeight*.5}function Pr(e){return Mr(e)*Nr(e)}function Fr(e){let t=Pr(e),n=Nr(e);return{minX:e.viewport.center.x-t,minY:e.viewport.center.y-n,maxX:e.viewport.center.x+t,maxY:e.viewport.center.y+n}}function Ir(e){return e.innerHTML=`
    <main class="app-shell">
      <canvas id="gpu-canvas"></canvas>

      <div class="scene-brand">
        <div class="scene-brand-card">
          
          <h1>uniform potential flow past two equal, horizontally aligned cylinders.</h1>
        </div>
      </div>

      <aside class="controls-overlay">
        <div class="controls-shell">
          <div class="controls-header">
            <p class="controls-title">controls.</p>
            <div class="controls-tabs">
              <button id="tab-info" type="button">info.</button>
              <button id="tab-parameters" type="button">parameters.</button>
              <button id="tab-diagnostics" type="button">diagnostics.</button>
            </div>
          </div>

          <div id="panel-info" class="controls-panel" hidden>
            <div class="info-copy">
              <p>
                This app visualizes uniform potential flow past two equal, horizontally aligned cylinders.
                The current implementation focuses on the zero-circulation special case described by
                <a class="inline-link" href="https://doi.org/10.1016/j.euromechflu.2005.11.005" target="_blank" rel="noreferrer">Crowdy (2006)</a>.
              </p>
              <p>
                At a high level, the flow solution is evaluated analytically on the CPU using conformal mapping
                to an auxiliary annular domain and Crowdy's complex-potential formulas. Scalar sampling and
                streamline contour extraction also run on the CPU. WebGPU renders the interactive scene and shades
                the scalar background in a fragment pass after the sampled field is uploaded as a texture.
              </p>
              <p>
                This is a constrained reference setup: two equal cylinders, symmetric geometry, and zero net
                circulation. In the more general multiple-cylinder problem, additional circulation choices lead
                to a non-unique family of potential-flow solutions unless extra constraints are imposed.
              </p>
              <p>
                The current background modes show either speed magnitude or the pressure coefficient derived via Bernoulli's equation.
                Pressure is also integrated around both cylinder boundaries to estimate the equal-and-opposite
                interaction forces, while the combined drag remains consistent with d'Alembert's paradox.
              </p>
            </div>
          </div>

          <div id="panel-parameters" class="controls-panel">
            <form class="parameter-form">
              <section class="control-section">
                <h2>geometry.</h2>

                <label class="control-field" for="radius-range">
                  <span>radius.</span>
                  <div class="control-pair">
                    <input id="radius-range" type="range" min="0.05" max="4" step="0.01" />
                    <input id="radius-number" type="number" min="0.05" max="4" step="0.01" inputmode="decimal" />
                  </div>
                </label>

                <label class="control-field" for="center-distance-range">
                  <span>center distance.</span>
                  <div class="control-pair">
                    <input id="center-distance-range" type="range" min="0.15" max="12" step="0.01" />
                    <input id="center-distance-number" type="number" min="0.15" max="12" step="0.01" inputmode="decimal" />
                  </div>
                </label>
              </section>

              <section class="control-section">
                <h2>flow.</h2>

                <label class="control-toggle" for="streamline-show">
                  <span>show streamlines.</span>
                  <input id="streamline-show" type="checkbox" />
                </label>

                <label class="control-field" for="streamline-count-range">
                  <span>streamline count.</span>
                  <div class="control-pair">
                    <input id="streamline-count-range" type="range" min="1" max="256" step="1" />
                    <input id="streamline-count-number" type="number" min="1" max="256" step="1" inputmode="numeric" />
                  </div>
                </label>

                <label class="control-field" for="streamline-thickness-range">
                  <span>line thickness (px).</span>
                  <div class="control-pair">
                    <input id="streamline-thickness-range" type="range" min="${En}" max="48" step="0.25" />
                    <input id="streamline-thickness-number" type="number" min="${En}" max="48" step="0.25" inputmode="decimal" />
                  </div>
                </label>

                <label class="control-field" for="farfield-speed-range">
                  <span>farfield speed.</span>
                  <div class="control-pair">
                    <input id="farfield-speed-range" type="range" min="${An}" max="4" step="0.01" />
                    <input id="farfield-speed-number" type="number" min="${An}" max="${jn}" step="0.01" inputmode="decimal" />
                  </div>
                </label>

                <label class="control-field" for="incidence-angle-range">
                  <span>incidence angle (deg).</span>
                  <div class="control-pair">
                    <input id="incidence-angle-range" type="range" min="-180" max="180" step="1" />
                    <input id="incidence-angle-number" type="number" min="-180" max="180" step="1" inputmode="decimal" />
                  </div>
                </label>
              </section>

              <section class="control-section">
                <h2>sampling.</h2>

                <label class="control-field" for="crowdy-series-terms-range">
                  <span>series terms.</span>
                  <div class="control-pair">
                    <input id="crowdy-series-terms-range" type="range" min="4" max="${kn}" step="1" />
                    <input id="crowdy-series-terms-number" type="number" min="4" max="${kn}" step="1" inputmode="numeric" />
                  </div>
                </label>

                <label class="control-field" for="flow-grid-cols-range">
                  <span>grid cols.</span>
                  <div class="control-pair">
                    <input id="flow-grid-cols-range" type="range" min="16" max="${Dn}" step="1" />
                    <input id="flow-grid-cols-number" type="number" min="16" max="${Dn}" step="1" inputmode="numeric" />
                  </div>
                </label>

                <label class="control-field" for="flow-grid-rows-range">
                  <span>grid rows.</span>
                  <div class="control-pair">
                    <input id="flow-grid-rows-range" type="range" min="16" max="${On}" step="1" />
                    <input id="flow-grid-rows-number" type="number" min="16" max="${On}" step="1" inputmode="numeric" />
                  </div>
                </label>
              </section>

              <section class="control-section">
                <h2>display.</h2>

                <label class="control-field" for="background-field">
                  <span>background.</span>
                  <select id="background-field">
                    <option value="none">none.</option>
                    <option value="speed">speed magnitude.</option>
                    <option value="pressure">pressure coefficient.</option>
                  </select>
                </label>

                <label class="control-field" for="background-color-scheme">
                  <span>background scheme.</span>
                  <select id="background-color-scheme">
                    <option value="cool">cool.</option>
                    <option value="sunset">sunset.</option>
                    <option value="paper">paper.</option>
                  </select>
                </label>

                <label class="control-field" for="streamline-color">
                  <span>streamline color.</span>
                  <input id="streamline-color" class="color-input" type="color" />
                </label>

                <label class="control-field" for="background-color">
                  <span>background color.</span>
                  <input id="background-color" class="color-input" type="color" />
                </label>

                <label class="control-toggle" for="fill-circles">
                  <span>fill circles.</span>
                  <input id="fill-circles" type="checkbox" />
                </label>

                <label class="control-toggle" for="show-force-vectors">
                  <span>show force vectors.</span>
                  <input id="show-force-vectors" type="checkbox" />
                </label>

                <label class="control-toggle" for="show-axes">
                  <span>show axes.</span>
                  <input id="show-axes" type="checkbox" />
                </label>

                <div class="control-actions">
                  <button id="reset-view" class="control-button" type="button">reset view.</button>
                  <button id="export-png" class="control-button" type="button">export png.</button>
                </div>
              </section>
            </form>
          </div>

          <div id="panel-diagnostics" class="controls-panel" hidden>
            <pre id="diagnostics" class="status-copy">Diagnostics pending...</pre>
          </div>
        </div>
      </aside>
    </main>
  `,{root:e,canvas:N(e,`#gpu-canvas`),infoTabButton:N(e,`#tab-info`),parametersTabButton:N(e,`#tab-parameters`),diagnosticsTabButton:N(e,`#tab-diagnostics`),infoPanel:N(e,`#panel-info`),parametersPanel:N(e,`#panel-parameters`),diagnosticsPanel:N(e,`#panel-diagnostics`),diagnostics:N(e,`#diagnostics`),radiusRangeInput:N(e,`#radius-range`),radiusNumberInput:N(e,`#radius-number`),centerDistanceRangeInput:N(e,`#center-distance-range`),centerDistanceNumberInput:N(e,`#center-distance-number`),streamlineShowInput:N(e,`#streamline-show`),streamlineCountRangeInput:N(e,`#streamline-count-range`),streamlineCountNumberInput:N(e,`#streamline-count-number`),streamlineThicknessRangeInput:N(e,`#streamline-thickness-range`),streamlineThicknessNumberInput:N(e,`#streamline-thickness-number`),farfieldSpeedRangeInput:N(e,`#farfield-speed-range`),farfieldSpeedNumberInput:N(e,`#farfield-speed-number`),incidenceAngleRangeInput:N(e,`#incidence-angle-range`),incidenceAngleNumberInput:N(e,`#incidence-angle-number`),crowdySeriesTermsRangeInput:N(e,`#crowdy-series-terms-range`),crowdySeriesTermsNumberInput:N(e,`#crowdy-series-terms-number`),flowGridColsRangeInput:N(e,`#flow-grid-cols-range`),flowGridColsNumberInput:N(e,`#flow-grid-cols-number`),flowGridRowsRangeInput:N(e,`#flow-grid-rows-range`),flowGridRowsNumberInput:N(e,`#flow-grid-rows-number`),backgroundFieldSelect:N(e,`#background-field`),backgroundColorSchemeSelect:N(e,`#background-color-scheme`),streamlineColorInput:N(e,`#streamline-color`),backgroundColorInput:N(e,`#background-color`),fillCirclesInput:N(e,`#fill-circles`),forceVectorsInput:N(e,`#show-force-vectors`),showAxesInput:N(e,`#show-axes`),resetViewButton:N(e,`#reset-view`),exportPngButton:N(e,`#export-png`)}}function Lr(e){return e*180/Math.PI}function Rr(e){return e*Math.PI/180}function $(e){return e===null||!Number.isFinite(e)?`n/a`:Math.abs(e)>=1e3||Math.abs(e)<.01?e.toExponential(3):e.toFixed(4)}function zr(e,t){if(e===null)return t===`interactive`?`Diagnostics pending.
Validation waits for the next full-quality frame.`:`Diagnostics pending.`;let n=[e.allPassed?`summary: all checks passed (${e.passedCount} pass, ${e.skippedCount} skipped).`:`summary: ${e.passedCount} pass, ${e.failedCount} fail, ${e.skippedCount} skipped.`,t===`interactive`?`mode: showing the last full-quality report while interactive quality is active.`:`mode: current full-quality report.`,``,`pressure force coefficients.`,`front: Cx=${$(e.pressureForces.frontCircle.forceCoefficient.x)}, Cy=${$(e.pressureForces.frontCircle.forceCoefficient.y)}, |C|=${$(e.pressureForces.frontCircle.magnitudeCoefficient)}`,`rear: Cx=${$(e.pressureForces.rearCircle.forceCoefficient.x)}, Cy=${$(e.pressureForces.rearCircle.forceCoefficient.y)}, |C|=${$(e.pressureForces.rearCircle.magnitudeCoefficient)}`,`total: Cx=${$(e.pressureForces.totalForceCoefficient.x)}, Cy=${$(e.pressureForces.totalForceCoefficient.y)}, |C|=${$(e.pressureForces.totalMagnitudeCoefficient)}`,``];for(let t of e.checks)n.push(`[${t.status}] ${t.label}`),n.push(t.detail),(t.value!==null||t.threshold!==null)&&n.push(`value=${$(t.value)}, threshold=${$(t.threshold)}`),n.push(``);return n.join(`
`).trimEnd()}var Br=180;async function Vr(){let e=Ir(N(document,`#app`)),n=Zn(),r=pt(()=>{w()}),i=null,a=null,o=null,s=null,c=`full`,l=null,u=`parameters`;function d(){r.schedule(n)}function f(t){e.diagnostics.textContent=t}function p(){let t=u===`info`,n=u===`parameters`,r=u===`diagnostics`;e.infoPanel.hidden=!t,e.parametersPanel.hidden=!n,e.diagnosticsPanel.hidden=!r,e.infoTabButton.setAttribute(`aria-pressed`,String(t)),e.infoTabButton.setAttribute(`aria-expanded`,String(t)),e.parametersTabButton.setAttribute(`aria-pressed`,String(n)),e.parametersTabButton.setAttribute(`aria-expanded`,String(n)),e.diagnosticsTabButton.setAttribute(`aria-pressed`,String(r)),e.diagnosticsTabButton.setAttribute(`aria-expanded`,String(r))}function m(e){u=u===e?null:e,p()}function h(){l!==null&&(window.clearTimeout(l),l=null)}function g(){h(),l=window.setTimeout(()=>{l=null,c!==`full`&&(c=`full`,I(n),d())},Br)}function _(){c!==`interactive`&&(c=`interactive`,I(n)),g()}function v(){h(),c=`full`}function y(){T.sync({radius:n.scene.geometryInput.radius,radiusMax:.5*n.scene.geometryInput.centerDistance-.5*.05,centerDistance:n.scene.geometryInput.centerDistance,centerDistanceMin:2*n.scene.geometryInput.radius+.05,streamlineShow:n.scene.flow.streamline.show,streamlineCount:n.scene.flow.streamline.count,streamlineThicknessPx:n.scene.flow.streamline.thicknessPx,farfieldSpeed:n.scene.flow.farfield.speed,farfieldSpeedMax:n.scene.flow.farfield.speed,incidenceAngleDeg:Lr(n.scene.flow.farfield.incidenceAngleRad),crowdySeriesTerms:n.scene.flow.crowdySeriesTerms,flowGridCols:n.scene.flow.grid.cols,flowGridRows:n.scene.flow.grid.rows,backgroundField:n.scene.display.backgroundScalarField,backgroundColorScheme:n.scene.display.backgroundColorScheme,streamlineColor:n.scene.display.streamlineColor,backgroundColor:n.scene.display.backgroundColor,fillCircles:n.scene.display.fillCircles,forceVectorsVisible:n.scene.display.showForceVectors,axesVisible:n.scene.display.showAxes})}function ee(){f(zr(s,c))}function b(){p(),y(),ee()}function x(){let t=e.canvas.getBoundingClientRect(),r=Math.max(1,t.width),i=Math.max(1,t.height),a=Math.min(window.devicePixelRatio||1,2),o=n.viewport.canvas.width!==r||n.viewport.canvas.height!==i||n.viewport.canvas.devicePixelRatio!==a;return ur(n,r,i,a),o}function S(){v(),x()&&d()}function C(){v(),lr(n),x(),b(),d()}async function w(){if(i===null)return;let e=a===null||n.invalidation.flowPipelineDirty,t=o===null||n.invalidation.sceneDirty||n.invalidation.gpuResourcesDirty||e;if(e&&(a=mn({geometryInput:n.scene.geometryInput,flow:n.scene.flow,display:n.scene.display,viewport:n.viewport,sampleBounds:Fr(n),quality:c})),(s===null||n.invalidation.diagnosticsDirty)&&a!==null&&c===`full`&&(s=Te({geometry:Ar(n),flow:n.scene.flow,sampleGrid:a.sampleGrid,solver:a.solver})),o===null||n.invalidation.sceneDirty||e){let e=jr(n);o=Ye({circles:e,display:n.scene.display,viewport:n.viewport,flowFillVertices:a?.flowFillVertices??null,forceFillVertices:n.scene.display.showForceVectors?Tn(e,s?.pressureForces??null,n.viewport):null})}let r=i.render(n.viewport,o,Ke(n.scene.display).clearColor,{geometryDirty:t,backgroundDirty:e,scalarBackground:a?.scalarBackground??null});b(),r&&dt(n)}let T=lt(e,{onBeginInteractiveChange:()=>{_()},onSetRadius:e=>{pr(n,e),d()},onSetCenterDistance:e=>{mr(n,e),d()},onSetStreamlinesVisible:e=>{Er(n,e),d()},onSetStreamlineCount:e=>{_r(n,e),d()},onSetStreamlineThicknessPx:e=>{vr(n,e),d()},onSetFarfieldSpeed:e=>{hr(n,e),d()},onSetIncidenceAngleDeg:e=>{gr(n,Rr(e)),d()},onSetCrowdySeriesTerms:e=>{xr(n,e),d()},onSetFlowGridCols:e=>{yr(n,e),d()},onSetFlowGridRows:e=>{br(n,e),d()},onSetBackgroundField:e=>{wr(n,e),d()},onSetBackgroundColorScheme:e=>{Tr(n,e),d()},onSetStreamlineColor:e=>{Dr(n,e),d()},onSetBackgroundColor:e=>{Or(n,e),d()},onSetFillCircles:e=>{kr(n,e),d()},onSetForceVectorsVisible:e=>{Cr(n,e),d()},onSetAxesVisible:e=>{Sr(n,e),d()},onResetView:()=>{C()},onExportPng:()=>{(async()=>{d(),await new Promise(e=>{window.requestAnimationFrame(()=>{e()})}),await t(e.canvas)})().catch(e=>{console.error(e)})}});e.infoTabButton.addEventListener(`click`,()=>{m(`info`)}),e.parametersTabButton.addEventListener(`click`,()=>{m(`parameters`)}),e.diagnosticsTabButton.addEventListener(`click`,()=>{m(`diagnostics`)}),it(e.canvas,{onPanByPixels:(e,t)=>{_();let r=Ae(e,t,n.viewport);dr(n,n.viewport.center.x-r.x,n.viewport.center.y-r.y),d()},onZoomAtPoint:(e,t,r)=>{_();let i=Qn(n.viewport);je(i,r,e,t),fr(n,i.center,i.worldHeight),d()}}),window.addEventListener(`resize`,S),`ResizeObserver`in window&&new ResizeObserver(()=>{S()}).observe(e.canvas),i=await nt.create(e.canvas,{setStatus:e=>{console.info(e)},onDeviceLost:()=>{i!==null&&i.restoreAfterDeviceLoss().then(()=>{d()}).catch(e=>{console.error(e)})}}),x(),b(),d()}Vr().catch(e=>{console.error(e);let t=document.querySelector(`#app`);t!==null&&(e instanceof Error?t.textContent=`Error: ${e.message}`:t.textContent=`Error: ${String(e)}`)});