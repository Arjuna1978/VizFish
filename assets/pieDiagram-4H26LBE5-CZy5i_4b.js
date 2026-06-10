import{t as e}from"./ordinal-hYBb2elL.js";import{t}from"./arc-EucC4Eo2.js";import{$t as n,I as r,Mn as i,Nn as a,Nt as o,Pt as s,Xt as c,_n as l,an as u,gn as d,gt as f,j as p,nn as m,on as h,rn as g,tn as _,yn as v,yt as y}from"./index-Z8BGX5W9.js";import{t as b}from"./mermaid-parser.core-B7jY4JeA.js";import{t as x}from"./chunk-4BX2VUAB-CBQulGu4.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var e=C,t=S,n=null,r=s(0),i=s(o),a=s(0);function c(s){var c,l=(s=y(s)).length,u,d,f=0,p=Array(l),m=Array(l),h=+r.apply(this,arguments),g=Math.min(o,Math.max(-o,i.apply(this,arguments)-h)),_,v=Math.min(Math.abs(g)/l,a.apply(this,arguments)),b=v*(g<0?-1:1),x;for(c=0;c<l;++c)(x=m[p[c]=c]=+e(s[c],c,s))>0&&(f+=x);for(t==null?n!=null&&p.sort(function(e,t){return n(s[e],s[t])}):p.sort(function(e,n){return t(m[e],m[n])}),c=0,d=f?(g-l*b)/f:0;c<l;++c,h=_)u=p[c],x=m[u],_=h+(x>0?x*d:0)+b,m[u]={data:s[u],index:c,value:x,startAngle:h,endAngle:_,padAngle:v};return m}return c.value=function(t){return arguments.length?(e=typeof t==`function`?t:s(+t),c):e},c.sortValues=function(e){return arguments.length?(t=e,n=null,c):t},c.sort=function(e){return arguments.length?(n=e,t=null,c):n},c.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:s(+e),c):r},c.endAngle=function(e){return arguments.length?(i=typeof e==`function`?e:s(+e),c):i},c.padAngle=function(e){return arguments.length?(a=typeof e==`function`?e:s(+e),c):a},c}var T=_.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:i(()=>structuredClone(k),`getConfig`),clear:i(()=>{D=new Map,O=E.showData,c()},`clear`),setDiagramTitle:v,getDiagramTitle:h,setAccTitle:l,getAccTitle:g,setAccDescription:d,getAccDescription:m,addSection:i(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),a.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:i(()=>D,`getSections`),setShowData:i(e=>{O=e},`setShowData`),getShowData:i(()=>O,`getShowData`)},j=i((e,t)=>{x(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:i(async e=>{let t=await b(`pie`,e);a.debug(t),j(t,A)},`parse`)},N=i(e=>`
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
`,`getStyles`),P=i(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1);return w().value(e=>e.value).sort(null)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:i((i,o,s,c)=>{a.debug(`rendering pie chart
`+i);let l=c.db,d=u(),m=p(l.getConfig(),d.pie),h=f(o),g=h.append(`g`);g.attr(`transform`,`translate(225,225)`);let{themeVariables:_}=d,[v]=r(_.pieOuterStrokeWidth);v??=2;let y=m.textPosition,b=t().innerRadius(0).outerRadius(185),x=t().innerRadius(185*y).outerRadius(185*y);g.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=P(S),w=[_.pie1,_.pie2,_.pie3,_.pie4,_.pie5,_.pie6,_.pie7,_.pie8,_.pie9,_.pie10,_.pie11,_.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=e(w).domain([...S.keys()]);g.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),g.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`);let O=g.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`),k=[...S.entries()].map(([e,t])=>({label:e,value:t})),A=g.selectAll(`.legend`).data(k).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*k.length/2;return`translate(216,`+(t*22-n)+`)`});A.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),A.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let j=512+Math.max(...A.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0)),M=O.node()?.getBoundingClientRect().width??0,N=450/2-M/2,F=450/2+M/2,I=Math.min(0,N),L=Math.max(j,F)-I;h.attr(`viewBox`,`${I} 0 ${L} 450`),n(h,450,L,m.useMaxWidth)},`draw`)},styles:N};export{F as diagram};