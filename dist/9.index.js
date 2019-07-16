(window.webpackJsonpCybexAddon=window.webpackJsonpCybexAddon||[]).push([[9],{5602:function(e,t,n){"use strict";n.r(t),n.d(t,"DepositModal",function(){return x});var r,a=n(1),o=n(114),i=n(19),s=n(61),c=n(115),l=n(5600),p=n(5621),u=n.n(p),d=n(17),f=n(5664),m=n(113),h=n(33),y=n(5625),b=n(5617),g=n(4),w=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),v={doWithdraw:i.m,verifyAddress:i.l,selectAsset:i.j,selectFirstAsset:i.k,closeModal:i.h,pushNoti:d.b},x=Object(o.b)(function(e){return{modalState:Object(s.f)(e),gateway:Object(s.a)(e),balances:Object(g.F)(e),currentDeposit:Object(s.e)(e),currentCoinInfo:Object(s.d)(e),coinList:Object(s.c)(e),state:e}},v)(Object(c.withStyles)(function(e){return{root:{height:"470px"},innerWrapper:{margin:2*e.spacing.unit+"px 0",height:"100%","&>*:not(:first-of-type)":{marginTop:2*e.spacing.unit}},copyCard:{background:"rgb(243,243,243)",width:"100%"},inputBase:{fontSize:"16px"},inputLabel:{fontSize:"17.6px"}}})(Object(m.c)()(function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={currentTab:0,withValue:0,address:""},t}return w(t,e),t.prototype.componentDidMount=function(){this.props.currentDeposit||this.props.selectFirstAsset()},t.prototype.render=function(){var e=this,t=this.props,n=t.coinList,r=t.gateway,o=t.verifyAddress,c=t.selectAsset,p=t.currentDeposit,d=t.currentCoinInfo,m=t.pushNoti,g=t.modalState,w=t.doWithdraw,v=t.closeModal,x=t.balances,E=t.state,O=t.t,j=this.props.classes||{},A=(n.find(function(e){return e.asset===r.currentAsset}),p&&x&&x[p.asset]||{value:0}),S=!!this.state.address&&!!p&&Object(s.b)(p.type,this.state.address)(E)===i.a.Invalid,C=!!this.state.address&&!!p&&Object(s.b)(p.type,this.state.address)(E)===i.a.Valid&&d&&this.state.withValue>=+d.raw.minWithdraw;return this.state.withValue<=A.value&&this.state.withValue,a.createElement(y.a,{open:g!==i.c.Closed,dialogProps:{disableBackdropClick:!0},onCloseClick:v,title:O(h.a.Funding)},a.createElement(l.K,{value:this.state.currentTab,onChange:function(t,n){return e.setState({currentTab:n})},indicatorColor:"primary",textColor:"primary",variant:"fullWidth"},a.createElement(l.E,{label:O(h.a.Deposit)})),0===this.state.currentTab&&a.createElement(l.A,{classes:{root:j.root},square:!0,elevation:0},a.createElement(l.q,{className:j.innerWrapper,container:!0,direction:"column",alignItems:"center"},a.createElement(l.n,{fullWidth:!0},a.createElement(l.v,{style:{fontSize:"17.5px"},shrink:!0,htmlFor:"currentAsset"},O(h.a.AssetType)),a.createElement(l.D,{fullWidth:!0,displayEmpty:!0,value:r.currentAsset,input:a.createElement(l.t,{name:"currentAsset",id:"currentAsset"}),onChange:function(e){return c(e.target.value)},style:{fontSize:"16px"},name:"currentAsset"},n.map(function(e){return a.createElement(l.z,{key:e.asset,value:e.asset},e.currency)}))),p&&a.createElement(l.q,{style:{marginTop:"2em",textAlign:"center"},container:!0,direction:"column",alignItems:"center"},a.createElement(f.a,{text:p.address.trim(),filename:(p&&[p.accountName,p.type,p.address].join("_"))+".png"})),a.createElement(l.c,{elevation:0,classes:{root:j.copyCard}},a.createElement(l.M,{style:{overflowWrap:"break-word",whiteSpace:"pre-wrap",textAlign:"center",fontSize:"14px",padding:"24px 0"},variant:"body1"},p&&p.address)),p&&a.createElement(u.a,{text:p.address,onCopy:function(){return m(""+(p&&p.type)+O(h.a.AddressCopied),{variant:"success"})}},a.createElement(b.a,{fullWidth:!0,style:{height:"48px",marginTop:"24px",fontSize:"16px"}},O(h.a.CopyAddress))))),1===this.state.currentTab&&a.createElement(l.A,{classes:{root:j.root},square:!0,elevation:0},a.createElement(l.q,{className:j.innerWrapper,container:!0,direction:"column",alignItems:"center"},a.createElement(l.n,{fullWidth:!0},a.createElement(l.v,{style:{fontSize:"17.5px"},shrink:!0,htmlFor:"currentAsset"},O(h.a.AssetType)),a.createElement(l.D,{fullWidth:!0,displayEmpty:!0,value:r.currentAsset,input:a.createElement(l.t,{name:"currentAsset",id:"currentAsset"}),onChange:function(e){return c(e.target.value)},style:{fontSize:"16px"},name:"currentAsset"},n.map(function(e){return a.createElement(l.z,{key:e.asset,value:e.asset},e.currency)}))),a.createElement(l.n,{fullWidth:!0},a.createElement(l.v,{style:{fontSize:"17.5px"},htmlFor:"withValue"},O(h.a.Amount)),a.createElement(l.t,{id:"withValue",placeholder:O(h.a.WithdrawMinimum),value:this.state.withValue,style:{fontSize:"16px"},onChange:function(t){return e.setState({withValue:Number(t.target.value)})},endAdornment:a.createElement(l.u,{position:"end"},A.value)})),a.createElement(l.n,{fullWidth:!0},a.createElement(l.L,{id:"address",label:O(h.a.WithdrawAddress),error:S,helperText:S&&O(h.a.AddressError)||" ",InputLabelProps:{style:{fontSize:"17.5px"}},inputProps:{style:{fontSize:"16px"}},value:this.state.address,onChange:function(t){return e.setState({address:t.target.value},function(){e.state.address&&p&&o(p.type,e.state.address)})}})),a.createElement("div",{style:{marginTop:"12px"}}),a.createElement(l.q,{container:!0,wrap:"nowrap"},a.createElement(l.n,null,a.createElement(l.v,{style:{fontSize:"17.5px"},htmlFor:"withdrawFee"},O(h.a.WithdrawalFee)),a.createElement(l.t,{disabled:!0,disableUnderline:!0,id:"withdrawFee",value:d&&d.raw.withdrawFee,style:{fontSize:"16px"}})),a.createElement(l.n,null,a.createElement(l.v,{style:{fontSize:"17.5px"},htmlFor:"withdrawFee"},O(h.a.YouWillGet)),a.createElement(l.t,{disabled:!0,disableUnderline:!0,id:"withdrawFee",value:Math.max(0,this.state.withValue-(d?+d.raw.withdrawFee:this.state.withValue)),style:{fontSize:"16px"}}))),a.createElement(b.a,{fullWidth:!0,disabled:!C,style:{height:"48px",marginTop:"24px",fontSize:"16px"},onClick:function(){d&&w({to:d.raw.gatewayAccount,asset:d.asset,coinType:d.currency,address:e.state.address,value:e.state.withValue,memoPrefix:d.raw.withdrawPrefix})}},O(h.a.Withdraw)))))},t}(a.Component))))},5617:function(e,t,n){"use strict";n.d(t,"b",function(){return d}),n.d(t,"a",function(){return f});var r,a=n(1),o=n(5600),i=n(115),s=n(5618),c=n(113),l=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),p=function(){return(p=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},u=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n},d=function(e){var t=e.label,n=e.input,r=e.meta,i=(r.asyncValidating,r.touched),s=r.invalid,l=r.error,d=e.helperText,f=u(e,["label","input","meta","helperText"]),m=Object(c.b)(),h=m.t;m.i18n;return a.createElement(o.L,p({label:t,InputProps:{style:{fontSize:"16px"}},InputLabelProps:{style:{fontSize:"16px"}},error:i&&s,helperText:i&&h(l)||d},n,f))},f=Object(i.withStyles)(function(e){return{root:{color:s.a.btnPrimary,background:s.a.btnBgPrimary,"&:disabled":{color:s.a.btnPrimary,background:s.a.btnBgDisabled}}}})(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.render=function(){return a.createElement(o.b,p({classes:this.props.classes},this.props))},t}(a.Component))},5618:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r={primary:"rgb(0,0,0)",secondary:"rgb(10, 56, 102)",btnBgPrimary:"rgb(10, 56, 102)",btnPrimary:"white",btnBgDisabled:"rgba(155, 155, 155, 0.48)",btnIcon:{purple:"#b692dd",blue:"#54b8e1",yellow:"#fac050"}}},5625:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var r=n(1),a=n(5660),o=n(5600),i=n(155),s=n(5622),c=n(113),l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&(n[r[a]]=e[r[a]])}return n},u=Object(a.a)(function(e){return{paper:{position:"relative",width:"90vw",maxWidth:"536px"},header:{position:"absolute",right:"36px",top:0,zIndex:100,"(max-width:599px)":{right:0},"(min-width:600px)":{right:"36px"}}}},{withTheme:!0}),d=function(e){var t=e.title,n=e.open,a=e.onCloseClick,d=e.children,f=e.hideHeader,m=e.dialogProps,h=e.titleProps,y=(p(e,["title","open","onCloseClick","children","hideHeader","dialogProps","titleProps"]),u()),b=Object(s.unstable_useMediaQuery)("(min-width:600px)"),g=Object(c.b)(),w=g.t;g.i18n;return r.createElement(o.h,l({open:n,classes:l({paper:y.paper},(m||{classes:{}}).classes),onClose:a},m),!f&&r.createElement("div",{style:{padding:b?"16px 48px 0 48px":0,boxShadow:b?"inset 0 -1px 0 0 #f8f9fb":"unset"}},b?r.createElement(o.q,{container:!0,style:{height:"64px"},justify:"space-between",alignItems:"center"},r.createElement(o.M,l({variant:"h4",style:{fontSize:"26px",fontWeight:600}},h),t?w(t):null),r.createElement(o.s,{style:{right:"-12px"},onClick:a},r.createElement(i.a,null))):r.createElement("div",{className:y.header,style:{right:b?"36px":0}},r.createElement(o.s,{onClick:a},r.createElement(i.a,null)))),r.createElement("div",{style:{padding:b?(f?32:0)+"px 48px 32px 48px":"16px"}},d))}},5664:function(e,t,n){"use strict";n.d(t,"a",function(){return d});var r,a=n(1),o=n(5711),i=n.n(o),s=n(5600),c=n(155),l=n(33),p=n(113),u=(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),d=Object(p.c)()(function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.download=function(e){if(void 0===e&&(e="deposit.jpg"),t.qrcode){var n=t.qrcode.getElementsByTagName("canvas")[0];n&&n.toBlob(function(t){if(t){var n=new File([t],e,{type:"image/png"}),r=URL.createObjectURL(n),a=document.createElement("a");a.download=e,a.href=r,a.target="_blank",a.dispatchEvent(new MouseEvent("click"))}})}},t.updateQRImg=function(){if(t.qrcode&&t.qrcodeImg){var e=t.qrcode.getElementsByTagName("canvas")[0];if(!e)return;e.toBlob(function(e){if(e&&t.qrcodeImg){var n=URL.createObjectURL(e);t.qrcodeImg.src=n;var r=function(){window.URL.revokeObjectURL(n),t.qrcodeImg&&t.qrcodeImg.removeEventListener("load",r)};t.qrcodeImg.addEventListener("load",r)}})}},t.isAppleDevice=function(){return/iphone|ipad|ipod/i.test(navigator.userAgent)},t}return u(t,e),t.prototype.componentDidMount=function(){this.updateQRImg()},t.prototype.componentDidUpdate=function(){this.updateQRImg()},t.prototype.render=function(){var e=this,t=this.props,n=t.text,r=t.filename,o=t.t;return a.createElement(s.q,{container:!0,direction:"column",alignContent:"center"},a.createElement("div",{ref:function(t){return e.qrcode=t}},a.createElement("div",{style:{display:"none"}},a.createElement(i.a,{value:n})),a.createElement("img",{style:{width:"12em",height:"12em"},ref:function(t){return e.qrcodeImg=t}})),this.isAppleDevice()?a.createElement(s.M,{align:"center",style:{margin:"0.5em"}},o(l.a.SaveQRCodeLongPress)):a.createElement(s.b,{color:"secondary",onClick:function(t){return e.download(r)}},o(l.a.SaveQRCode),a.createElement(c.b,{style:{marginLeft:"4px"},fontSize:"small"})))},t}(a.Component))}}]);