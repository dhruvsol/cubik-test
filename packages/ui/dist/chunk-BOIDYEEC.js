'use strict';

var jsxRuntime = require('react/jsx-runtime');

function o({variant:t,onClick:e,children:i}){return jsxRuntime.jsx("button",{className:`ui-py-3 ui-px-4 ui-w-full ui-min-w-[120px] ui-rounded ui-font-medium ui-transition-all ui-duration-300 ${(u=>{switch(u){case"primary":return "ui-bg-white ui-text-black";case"secondary":return "ui-bg-black ui-text-neutral-200 ui-border ui-border-neutral-400 hover:ui-border-white hover:ui-text-white";default:return "ui-bg-white ui-text-black"}})(t)}`,onClick:e,type:"button",children:i})}

exports.a = o;
