(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{s0NH:function(n,t,e){"use strict";e.r(t),e.d(t,"startStatusTap",function(){return startStatusTap});var o=e("A36C");const startStatusTap=()=>{const n=window;n.addEventListener("statusTap",()=>{Object(o.h)(()=>{const t=n.innerWidth,e=n.innerHeight,s=document.elementFromPoint(t/2,e/2);if(!s)return;const c=s.closest("ion-content");c&&c.componentOnReady().then(()=>{Object(o.f)(()=>c.scrollToTop(300))})})})}}}]);