(window.webpackJsonpCybexAddon=window.webpackJsonpCybexAddon||[]).push([[6],{369:function(e,t,n){"use strict";n.r(t),n.d(t,"ReferRule",function(){return s});var r,o=n(2),a=n(367),i=n(103),c=n(412),u=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),l=function(e){var t=e.title,n=e.contents,r=void 0===n?[]:n;return o.createElement(o.Fragment,null,o.createElement(a.A,{variant:"body1",style:{marginTop:"1em",marginBottom:"0.5em"},color:"secondary"},t),r.map(function(e,t){return o.createElement(a.A,{key:t,variant:"body2"},e)}))},s=Object(i.withStyles)(function(e){return{root:{height:"100%",display:"flex",flexDirection:"column"}}})(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return u(t,e),t.prototype.render=function(){var e=this.props.classes||{};return o.createElement(a.u,{classes:{root:e.root},square:!0,elevation:0},o.createElement("div",{style:{flex:"1 1 auto",overflowY:"auto",margin:16}},o.createElement(l,{title:"示例标题1",contents:["这是一个测试段落","Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?"]}),o.createElement(l,{title:"示例标题2",contents:["这是一个测试段落","Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam, adipisci quam ipsa temporibus qui, asperiores modi a aperiam minus sapiente repudiandae nemo doloribus nisi! Doloremque perspiciatis quibusdam alias laudantium! Corrupti ea quam iusto modi accusamus minima incidunt tempore voluptate dolorem quae placeat laboriosam deserunt soluta dolor sapiente inventore libero ad sed, quos voluptatibus tenetur aliquid quasi? Expedita, itaque ullam?"]})),o.createElement(c.a,null))},t}(o.Component))},381:function(e,t,n){"use strict";var r=n(2),o=n(367),a=n(103),i="linear-gradient(90deg, rgb(255,137,96) 0%, rgb(255,98,165) 90%)",c="white",u="rgb(179,185,199)",l=n(102);n.d(t,"b",function(){return f}),n.d(t,"a",function(){return h});var s,p=(s=function(e,t){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),d=function(){return(d=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n},f=function(e){var t=e.label,n=e.input,a=e.meta,i=(a.asyncValidating,a.touched),c=a.invalid,u=a.error,s=e.helperText,p=m(e,["label","input","meta","helperText"]),f=Object(l.b)(),h=f.t;f.i18n;return r.createElement(o.z,d({label:t,error:i&&c,helperText:i&&h(u)||s},n,p))},h=Object(a.withStyles)(function(e){return{root:{color:c,background:i,"&:disabled":{background:u}}}})(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return p(t,e),t.prototype.render=function(){return r.createElement(o.b,d({classes:this.props.classes},this.props))},t}(r.Component))},387:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var r,o=n(2),a=n(411),i=n.n(a),c=n(367),u=n(377),l=n(50),s=n(102),p=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),d=Object(s.c)()(function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.download=function(e){if(void 0===e&&(e="deposit.jpg"),t.qrcode){var n=t.qrcode.getElementsByTagName("canvas")[0];n&&n.toBlob(function(t){if(t){var n=new File([t],e,{type:"image/png"}),r=URL.createObjectURL(n),o=document.createElement("a");o.download=e,o.href=r,o.target="_blank",o.dispatchEvent(new MouseEvent("click"))}})}},t.updateQRImg=function(){if(t.qrcode&&t.qrcodeImg){var e=t.qrcode.getElementsByTagName("canvas")[0];if(!e)return;e.toBlob(function(e){if(e&&t.qrcodeImg){var n=URL.createObjectURL(e);t.qrcodeImg.src=n;var r=function(){window.URL.revokeObjectURL(n),t.qrcodeImg&&t.qrcodeImg.removeEventListener("load",r)};t.qrcodeImg.addEventListener("load",r)}})}},t.isAppleDevice=function(){return/iphone|ipad|ipod/i.test(navigator.userAgent)},t}return p(t,e),t.prototype.componentDidMount=function(){this.updateQRImg()},t.prototype.componentDidUpdate=function(){this.updateQRImg()},t.prototype.render=function(){var e=this,t=this.props,n=t.text,r=t.filename,a=t.t;return o.createElement(c.m,{container:!0,direction:"column",alignContent:"center"},o.createElement("div",{ref:function(t){return e.qrcode=t}},o.createElement("div",{style:{display:"none"}},o.createElement(i.a,{value:n})),o.createElement("img",{style:{width:"12em",height:"12em"},ref:function(t){return e.qrcodeImg=t}})),this.isAppleDevice()?o.createElement(c.A,{align:"center",style:{margin:"0.5em"}},a(l.a.SaveQRCodeLongPress)):o.createElement(c.b,{color:"secondary",onClick:function(t){return e.download(r)}},a(l.a.SaveQRCode),o.createElement(u.b,{style:{marginLeft:"4px"},fontSize:"small"})))},t}(o.Component))},412:function(e,t,n){"use strict";n.d(t,"a",function(){return q});var r,o,a=n(2),i=n(104),c=n(367),u=n(103),l=n(410),s=n.n(l),p=n(46),d=n(377),m=n(387),f=n(17),h=n(381),y=n(67),b=n(151),g=n(102),v=n(50),E=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),w=function(){return(w=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},O=function(e){var t=e.IconComponent,n=e.title,r=e.color,o=void 0===r?c.B.grey[300]:r,i=e.style,u=e.onClick;return a.createElement("div",{onClick:u,style:w({display:"flex",flexDirection:"column",alignItems:"center"},i)},a.createElement(c.a,{style:{background:o,width:48,height:48}},a.createElement(t,null)),a.createElement(c.A,{style:{color:"white",marginTop:"0.8em"},variant:"body2"},n))},_={pushNoti:p.b},q=Object(i.b)(function(e){return{accountName:Object(f.g)(e),referUrl:Object(y.c)(e)}},_)(Object(u.withStyles)(function(e){return{buttonRoot:{borderRadius:"unset"},drawerRoot:{height:"188px",backgroundColor:"rgba(27,34,48, 0.8)"}}})(Object(g.c)()(((o=function(e){function t(){var n,r=null!==e&&e.apply(this,arguments)||this;return r.state=((n={})[t.Panels.Drawer]=!1,n[t.Panels.QRCode]=!1,n),r.handleExpand=function(e){r.setState(function(t){var n;return(n={})[e]=!t[e],n})},r}return E(t,e),t.prototype.render=function(){var e=this,n=this.props.classes||{},r=this.props,o=r.pushNoti,i=r.accountName,u=r.referUrl,l=r.t,p=Object(b.a)(u,i);return a.createElement(a.Fragment,null,a.createElement(h.a,{onClick:this.handleExpand.bind(this,t.Panels.Drawer),size:"large",classes:{root:n.buttonRoot},fullWidth:!0},l(v.a.ShareLink)),p&&i&&a.createElement(c.y,{classes:{paper:n.drawerRoot},open:this.state[t.Panels.Drawer],onOpen:this.handleExpand.bind(this,t.Panels.Drawer),onClose:this.handleExpand.bind(this,t.Panels.Drawer),anchor:"bottom"},a.createElement(c.m,{style:{height:"100%"},container:!0,alignItems:"center",justify:"space-around"},p&&i&&a.createElement(s.a,{text:p.trim(),onCopy:function(){return o(l(v.a.ShareLinkCopied),{variant:"success"})}},a.createElement(O,{IconComponent:d.g,title:l(v.a.CopyShareLink),color:c.B.orange[300],onClick:this.handleExpand.bind(this,t.Panels.Drawer)})),a.createElement(O,{IconComponent:d.f,color:c.B.blue[300],title:l(v.a.ShareQRCode),onClick:function(){e.handleExpand(t.Panels.QRCode),e.handleExpand(t.Panels.Drawer)}}))),a.createElement(c.f,{open:this.state[t.Panels.QRCode],onClose:this.handleExpand.bind(this,t.Panels.QRCode)},a.createElement(c.h,{style:{padding:"2em",paddingBottom:"0.5em"}},a.createElement(m.a,{text:p,filename:"cybex_invite_"+i+".png"}))))},t}(a.Component)).Panels={Drawer:"Drawer",QRCode:"QRCode"},o))))}}]);