import{a as _,i as f,j as v,r as C,k as g,l as n,m as y,o as s,b as r,e as c,p as k,u as o,t as h,c as x,q as B,s as M,v as D}from"./entry.f699f0fd.js";import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const N={ref:"root",class:"mermaid-container"},V=["textContent"],b={key:0,class:"mermaid-placeholder font-serif"},j=_({__name:"Mermaid",props:{code:{}},setup(i){const d=i,{$mermaid:t}=f(),l=v(()=>atob(d.code)),m=C(g().contentMermaid.spinnerComponent),a=n(null),e=n(!0);async function p(){if(e.value=!0,a.value&&t){try{await t.run({nodes:[a.value],suppressErrors:!0})}catch{}e.value=!1}}return y(()=>{setTimeout(()=>{p()},100)}),(u,A)=>(s(),r("figure",N,[c("pre",{ref_key:"codeBlock",ref:a,class:k({"opacity-0":o(e)}),textContent:h(o(l))},null,10,V),c("div",null,[o(e)?(s(),r("div",b,[(s(),x(B(o(m)),{class:"mermaid-placeholder__spinner"})),M(" Mermaid diagram is loading... ")])):D("",!0)])],512))}});export{j as default};
