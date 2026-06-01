import{t as e}from"./ordinal-3qmO7xdp.js";import{t}from"./arc-ATKea9jl.js";import{Bt as n,Cn as r,H as i,L as a,Rn as o,Sn as s,St as c,Tn as l,Tt as u,an as d,cn as f,dn as p,fn as m,ln as h,nn as g,sn as _,zn as v,zt as y}from"./index-DYeI6AhR.js";import{t as b}from"./mermaid-parser.core-DqiJzvS9.js";import{t as x}from"./chunk-4BX2VUAB-CHIYZsoJ.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var e=C,t=S,r=null,i=n(0),a=n(y),o=n(0);function s(n){var s,c=(n=u(n)).length,l,d,f=0,p=Array(c),m=Array(c),h=+i.apply(this,arguments),g=Math.min(y,Math.max(-y,a.apply(this,arguments)-h)),_,v=Math.min(Math.abs(g)/c,o.apply(this,arguments)),b=v*(g<0?-1:1),x;for(s=0;s<c;++s)(x=m[p[s]=s]=+e(n[s],s,n))>0&&(f+=x);for(t==null?r!=null&&p.sort(function(e,t){return r(n[e],n[t])}):p.sort(function(e,n){return t(m[e],m[n])}),s=0,d=f?(g-c*b)/f:0;s<c;++s,h=_)l=p[s],x=m[l],_=h+(x>0?x*d:0)+b,m[l]={data:n[l],index:s,value:x,startAngle:h,endAngle:_,padAngle:v};return m}return s.value=function(t){return arguments.length?(e=typeof t==`function`?t:n(+t),s):e},s.sortValues=function(e){return arguments.length?(t=e,r=null,s):t},s.sort=function(e){return arguments.length?(r=e,t=null,s):r},s.startAngle=function(e){return arguments.length?(i=typeof e==`function`?e:n(+e),s):i},s.endAngle=function(e){return arguments.length?(a=typeof e==`function`?e:n(+e),s):a},s.padAngle=function(e){return arguments.length?(o=typeof e==`function`?e:n(+e),s):o},s}var T=_.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:o(()=>structuredClone(k),`getConfig`),clear:o(()=>{D=new Map,O=E.showData,g()},`clear`),setDiagramTitle:l,getDiagramTitle:m,setAccTitle:r,getAccTitle:h,setAccDescription:s,getAccDescription:f,addSection:o(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),v.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:o(()=>D,`getSections`),setShowData:o(e=>{O=e},`setShowData`),getShowData:o(()=>O,`getShowData`)},j=o((e,t)=>{x(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:o(async e=>{let t=await b(`pie`,e);v.debug(t),j(t,A)},`parse`)},N=o(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=o(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return w().value(e=>e.value).sort(null)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:o((n,r,o,s)=>{v.debug(`rendering pie chart
`+n);let l=s.db,u=p(),f=a(l.getConfig(),u.pie),m=c(r),h=m.append(`g`);h.attr(`transform`,`translate(225,225)`);let{themeVariables:g}=u,[_]=i(g.pieOuterStrokeWidth);_??=2;let y=f.textPosition,b=t().innerRadius(0).outerRadius(185),x=t().innerRadius(185*y).outerRadius(185*y);h.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+_/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=P(S),w=[g.pie1,g.pie2,g.pie3,g.pie4,g.pie5,g.pie6,g.pie7,g.pie8,g.pie9,g.pie10,g.pie11,g.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=e(w).domain([...S.keys()]);h.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),h.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=h.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),k=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=h.selectAll(`.legend`).data(k).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*k.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),M=O.node()?.getBoundingClientRect().width??0,N=450/2-M/2,F=450/2+M/2,I=Math.min(0,N),L=Math.max(j,F)-I;m.attr(`viewBox`,`${I} 0 ${L} 450`),d(m,450,L,f.useMaxWidth)},`draw`)},styles:N};export{F as diagram};