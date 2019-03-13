(window.webpackJsonpCybexAddon=window.webpackJsonpCybexAddon||[]).push([[6],{368:function(e,t,n){"use strict";n.r(t),n.d(t,"ReferRule",function(){return f});var o,r=n(2),a=n(367),c=n(102),i=n(583),l=n(101),u=n(49),s=(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),p=function(e){var t=e.title,n=e.contents,o=void 0===n?[]:n;return r.createElement(r.Fragment,null,r.createElement(a.A,{variant:"body1",style:{marginTop:"1em",marginBottom:"0.5em"},color:"secondary"},t),o.map(function(e,t){return r.createElement(a.A,{style:{marginTop:"1em",textAlign:"justify"},key:t,variant:"body2"},e)}))},f=Object(c.withStyles)(function(e){return{root:{height:"100%",display:"flex",flexDirection:"column"}}})(Object(l.c)()(function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.render=function(){var e=this.props.classes||{},t=this.props.t;return r.createElement(a.u,{classes:{root:e.root},square:!0,elevation:0},r.createElement("div",{style:{flex:"1 10 auto",overflowY:"auto",margin:16}},r.createElement(p,{title:t(u.a.RefererRuleTitle),contents:[0,1,2,3,4,5].map(function(e){return t(u.a["RefererRuleContent_"+e])})})),r.createElement(i.a,null))},t}(r.Component)))},386:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=i(n(2)),c=i(n(387));function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(t.CopyToClipboard=function(e){function t(){var e,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,i=Array(r),u=0;u<r;u++)i[u]=arguments[u];return n=o=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i))),o.onClick=function(e){var t=o.props,n=t.text,r=t.onCopy,i=t.children,l=t.options,u=a.default.Children.only(i),s=(0,c.default)(n,l);r&&r(n,s),u&&u.props&&"function"==typeof u.props.onClick&&u.props.onClick(e)},l(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.PureComponent),r(t,[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),n=function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}(e,["text","onCopy","options","children"]),r=a.default.Children.only(t);return a.default.cloneElement(r,o({},n,{onClick:this.onClick}))}}]),t}()).defaultProps={onCopy:void 0,options:void 0}},387:function(e,t,n){"use strict";var o=n(388),r="Copy to clipboard: #{key}, Enter";e.exports=function(e,t){var n,a,c,i,l,u,s=!1;t||(t={}),n=t.debug||!1;try{if(c=o(),i=document.createRange(),l=document.getSelection(),(u=document.createElement("span")).textContent=e,u.style.all="unset",u.style.position="fixed",u.style.top=0,u.style.clip="rect(0, 0, 0, 0)",u.style.whiteSpace="pre",u.style.webkitUserSelect="text",u.style.MozUserSelect="text",u.style.msUserSelect="text",u.style.userSelect="text",document.body.appendChild(u),i.selectNode(u),l.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");s=!0}catch(o){n&&console.error("unable to copy using execCommand: ",o),n&&console.warn("trying IE specific stuff");try{window.clipboardData.setData("text",e),s=!0}catch(o){n&&console.error("unable to copy using clipboardData: ",o),n&&console.error("falling back to prompt"),a=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:r),window.prompt(a,e)}}finally{l&&("function"==typeof l.removeRange?l.removeRange(i):l.removeAllRanges()),u&&document.body.removeChild(u),c()}return s}},388:function(e,t){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,n=[],o=0;o<e.rangeCount;o++)n.push(e.getRangeAt(o));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||n.forEach(function(t){e.addRange(t)}),t&&t.focus()}}},392:function(e,t,n){"use strict";var o=n(386).CopyToClipboard;o.CopyToClipboard=o,e.exports=o}}]);