import{o as m,c as E,n as f,g,u as s,d as n,_ as a}from"./entry.f699f0fd.js";import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const k={__name:"nuxt-error-page",props:{error:Object},setup(c){const u=c,{error:e}=u;(e.stack||"").split(`
`).splice(1).map(t=>({text:t.replace("webpack:/","").replace(".vue",".js").trim(),internal:t.includes("node_modules")&&!t.includes(".cache")||t.includes("internal")||t.includes("new Promise")})).map(t=>`<span class="stack${t.internal?" internal":""}">${t.text}</span>`).join(`
`);const r=Number(e.statusCode||500),o=r===404,i=e.statusMessage??(o?"Page Not Found":"Internal Server Error"),p=e.message||e.toString(),_=void 0,d=o?n(()=>a(()=>import("./error-404.fa76f6fa.js"),["./error-404.fa76f6fa.js","./nuxt-link.c1ef4add.js","./entry.f699f0fd.js","./entry.74239653.css","./_plugin-vue_export-helper.c27b6911.js","./error-404.ffa87f8c.css"],import.meta.url).then(t=>t.default||t)):n(()=>a(()=>import("./error-500.83621096.js"),["./error-500.83621096.js","./entry.f699f0fd.js","./entry.74239653.css","./_plugin-vue_export-helper.c27b6911.js","./error-500.36041578.css"],import.meta.url).then(t=>t.default||t));return(t,l)=>(m(),E(s(d),f(g({statusCode:s(r),statusMessage:s(i),description:s(p),stack:s(_)})),null,16))}},C=k;export{C as default};
