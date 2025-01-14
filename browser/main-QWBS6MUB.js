import{a as xe,b as Re}from"./chunk-TPEZDGWC.js";import{G as we,H as De,I as Fe,b as be,d as ze,e as Ce,f as _e,g as Ie,h as Me,k as Te,m as Ae,s as Ne}from"./chunk-D672T6E5.js";import{$ as g,Ba as Q,Bc as ge,Da as ee,E as P,Eb as y,Ec as ye,G as H,Ga as te,Gb as v,Gc as ve,Hc as Se,I as $,K as k,Kb as S,O as B,Ob as s,Pa as ne,Pb as p,Q as U,Qb as b,Ra as ie,Wb as z,Xb as C,Yb as _,Z as J,_ as W,ba as q,bc as se,cc as pe,da as V,dc as le,fa as d,hb as l,ia as K,ib as c,j as L,jb as oe,k as f,ka as Z,kc as de,l as E,la as N,lb as re,lc as ce,mc as me,oa as G,oc as ue,p as O,pa as Y,q as A,qc as he,sb as m,t as j,tc as D,uc as fe,va as X,xb as ae,yb as w}from"./chunk-QTNLS44Y.js";var Le=[{path:"",loadComponent:()=>import("./chunk-QYO46OEV.js").then(n=>n.MoviesOverviewComponent)},{path:"movie/:id",loadComponent:()=>import("./chunk-3PHCG67N.js").then(n=>n.MovieDetailComponent)},{path:"**",redirectTo:"",pathMatch:"full"}];function Ue(n){let t=n,e=Math.floor(Math.abs(n)),i=n.toString().replace(/^[^.]*\.?/,"").length;return e===1&&i===0?1:5}var Ee=["en",[["a","p"],["AM","PM"],void 0],[["AM","PM"],void 0,void 0],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],void 0,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],void 0,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",void 0,"{1} 'at' {0}",void 0],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",Ue];var Je="@",We=(()=>{class n{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=N(Q);loadingSchedulerFn=N(qe,{optional:!0});_engine;constructor(e,i,o,r,a){this.doc=e,this.delegate=i,this.zone=o,this.animationType=r,this.moduleImpl=a}ngOnDestroy(){this._engine?.flush()}loadImpl(){let e=()=>this.moduleImpl??import("./chunk-SFSVFPRU.js").then(o=>o),i;return this.loadingSchedulerFn?i=this.loadingSchedulerFn(e):i=e(),i.catch(o=>{throw new V(5300,!1)}).then(({\u0275createEngine:o,\u0275AnimationRendererFactory:r})=>{this._engine=o(this.animationType,this.doc);let a=new r(this.delegate,this._engine,this.zone);return this.delegate=a,a})}createRenderer(e,i){let o=this.delegate.createRenderer(e,i);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let r=new F(o);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let Be=a.createRenderer(e,i);r.use(Be),this.scheduler??=this.injector.get(ee,null,{optional:!0}),this.scheduler?.notify(11)}).catch(a=>{r.use(o)}),r}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}static \u0275fac=function(i){oe()};static \u0275prov=d({token:n,factory:n.\u0275fac})}return n})(),F=class{delegate;replay=[];\u0275type=1;constructor(t){this.delegate=t}use(t){if(this.delegate=t,this.replay!==null){for(let e of this.replay)e(t);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(t,e){return this.delegate.createElement(t,e)}createComment(t){return this.delegate.createComment(t)}createText(t){return this.delegate.createText(t)}get destroyNode(){return this.delegate.destroyNode}appendChild(t,e){this.delegate.appendChild(t,e)}insertBefore(t,e,i,o){this.delegate.insertBefore(t,e,i,o)}removeChild(t,e,i){this.delegate.removeChild(t,e,i)}selectRootElement(t,e){return this.delegate.selectRootElement(t,e)}parentNode(t){return this.delegate.parentNode(t)}nextSibling(t){return this.delegate.nextSibling(t)}setAttribute(t,e,i,o){this.delegate.setAttribute(t,e,i,o)}removeAttribute(t,e,i){this.delegate.removeAttribute(t,e,i)}addClass(t,e){this.delegate.addClass(t,e)}removeClass(t,e){this.delegate.removeClass(t,e)}setStyle(t,e,i,o){this.delegate.setStyle(t,e,i,o)}removeStyle(t,e,i){this.delegate.removeStyle(t,e,i)}setProperty(t,e,i){this.shouldReplay(e)&&this.replay.push(o=>o.setProperty(t,e,i)),this.delegate.setProperty(t,e,i)}setValue(t,e){this.delegate.setValue(t,e)}listen(t,e,i){return this.shouldReplay(e)&&this.replay.push(o=>o.listen(t,e,i)),this.delegate.listen(t,e,i)}shouldReplay(t){return this.replay!==null&&t.startsWith(Je)}},qe=new K("");function Oe(n="animations"){return ie("NgAsyncAnimations"),G([{provide:re,useFactory:(t,e,i)=>new We(t,e,i,n),deps:[ge,Ie,te]},{provide:ne,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var x={production:!1,tmdbApiKey:"692bfd47a119e54a79dd7355a3f3c487",tmdbBaseUrl:"https://api.themoviedb.org/3/"};var je=(n,t)=>{let e=x.tmdbBaseUrl,i=x.tmdbApiKey;if(n.url.startsWith("/api/")){let o=n.clone({url:`${e}${n.url.replace("/api/","")}`,setParams:{api_key:i}});return t(o)}return t(n)};var u=class n{isLoadingSubject=new f(null);isLoading$=this.isLoadingSubject.asObservable().pipe(H(t=>t!==null));setLoadingState(t){this.isLoadingSubject.next(t)}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})};var I=class n{constructor(t){this.loaderService=t}pendingLoaderTimeout=null;activeRequests=new Set;loaderShown=!1;showLoaderTimeOut=500;intercept(t,e){return this.activeRequests.add(t),this.scheduleLoaderToShow(),e.handle(t).pipe(q(i=>this.handleResponse(i)),$(i=>j(()=>i)),U(()=>{this.activeRequests.delete(t),this.decrementRequestsAndHideLoader()}))}scheduleLoaderToShow(){this.activeRequests.size===1&&!this.loaderShown&&(this.pendingLoaderTimeout=setTimeout(()=>{this.loaderShown=!0,this.loaderService.setLoadingState(!0)},this.showLoaderTimeOut))}handleResponse(t){t instanceof be&&!this.loaderShown&&this.pendingLoaderTimeout!==null&&clearTimeout(this.pendingLoaderTimeout)}decrementRequestsAndHideLoader(){this.activeRequests.size===0&&(this.pendingLoaderTimeout!==null&&clearTimeout(this.pendingLoaderTimeout),this.loaderService.setLoadingState(!1),this.loaderShown=!1)}static \u0275fac=function(e){return new(e||n)(Z(u))};static \u0275prov=d({token:n,factory:n.\u0275fac})};ye(Ee);var He={providers:[ue({eventCoalescing:!0}),Ae(Le),Re(xe),Y(Ne),Oe(),{provide:ze,useClass:I,multi:!0},Ce(_e([je]))]};var Ve=["*"];function Ke(n,t){n&1&&(s(0,"span",2),b(1,"i",3)(2,"i",3)(3,"i",3)(4,"i",3),p())}function Ze(n,t){}function Ge(n,t){if(n&1&&(s(0,"div",6),pe(1),p()),n&2){let e=z(2);l(),le(e.nzTip)}}function Ye(n,t){if(n&1&&(s(0,"div")(1,"div",4),w(2,Ze,0,0,"ng-template",5)(3,Ge,2,1,"div",6),p()()),n&2){let e=z(),i=se(1);l(),v("ant-spin-rtl",e.dir==="rtl")("ant-spin-spinning",e.isLoading)("ant-spin-lg",e.nzSize==="large")("ant-spin-sm",e.nzSize==="small")("ant-spin-show-text",e.nzTip),l(),y("ngTemplateOutlet",e.nzIndicator||i),l(),S(e.nzTip?3:-1)}}function Xe(n,t){if(n&1&&(s(0,"div",7),_(1),p()),n&2){let e=z();v("ant-spin-blur",e.isLoading)}}var $e="spin",ke=(()=>{let n,t=[],e=[];return class R{static{let o=typeof Symbol=="function"&&Symbol.metadata?Object.create(null):void 0;n=[De()],O(null,null,n,{kind:"field",name:"nzIndicator",static:!1,private:!1,access:{has:r=>"nzIndicator"in r,get:r=>r.nzIndicator,set:(r,a)=>{r.nzIndicator=a}},metadata:o},t,e),o&&Object.defineProperty(this,Symbol.metadata,{enumerable:!0,configurable:!0,writable:!0,value:o})}constructor(o,r,a){this.nzConfigService=o,this.cdr=r,this.directionality=a,this._nzModuleName=$e,this.nzIndicator=A(this,t,null),this.nzSize=(A(this,e),"default"),this.nzTip=null,this.nzDelay=0,this.nzSimple=!1,this.nzSpinning=!0,this.destroy$=new L,this.spinning$=new f(this.nzSpinning),this.delay$=new E(1),this.isLoading=!1,this.dir="ltr"}ngOnInit(){this.delay$.pipe(J(this.nzDelay),B(),W(r=>r===0?this.spinning$:this.spinning$.pipe(k(a=>P(a?r:0)))),g(this.destroy$)).subscribe(r=>{this.isLoading=r,this.cdr.markForCheck()}),this.nzConfigService.getConfigChangeEventForComponent($e).pipe(g(this.destroy$)).subscribe(()=>this.cdr.markForCheck()),this.directionality.change?.pipe(g(this.destroy$)).subscribe(r=>{this.dir=r,this.cdr.detectChanges()}),this.dir=this.directionality.value}ngOnChanges(o){let{nzSpinning:r,nzDelay:a}=o;r&&this.spinning$.next(this.nzSpinning),a&&this.delay$.next(this.nzDelay)}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static{this.\u0275fac=function(r){return new(r||R)(c(we),c(he),c(Fe))}}static{this.\u0275cmp=m({type:R,selectors:[["nz-spin"]],hostVars:2,hostBindings:function(r,a){r&2&&v("ant-spin-nested-loading",!a.nzSimple)},inputs:{nzIndicator:"nzIndicator",nzSize:"nzSize",nzTip:"nzTip",nzDelay:[2,"nzDelay","nzDelay",fe],nzSimple:[2,"nzSimple","nzSimple",D],nzSpinning:[2,"nzSpinning","nzSpinning",D]},exportAs:["nzSpin"],features:[ae,X],ngContentSelectors:Ve,decls:4,vars:2,consts:[["defaultTemplate",""],[1,"ant-spin-container",3,"ant-spin-blur"],[1,"ant-spin-dot","ant-spin-dot-spin"],[1,"ant-spin-dot-item"],[1,"ant-spin"],[3,"ngTemplateOutlet"],[1,"ant-spin-text"],[1,"ant-spin-container"]],template:function(r,a){r&1&&(C(),w(0,Ke,5,0,"ng-template",null,0,me)(2,Ye,4,12,"div")(3,Xe,2,2,"div",1)),r&2&&(l(2),S(a.isLoading?2:-1),l(),S(a.nzSimple?-1:3))},dependencies:[ve],encapsulation:2})}}})();var et=["*"],M=class n{constructor(t){this.loaderService=t}static \u0275fac=function(e){return new(e||n)(c(u))};static \u0275cmp=m({type:n,selectors:[["app-spinner"]],ngContentSelectors:et,decls:3,vars:3,consts:[["nzTip","Loading...",3,"nzSpinning"]],template:function(e,i){e&1&&(C(),s(0,"nz-spin",0),de(1,"async"),_(2),p()),e&2&&y("nzSpinning",ce(1,1,i.loaderService.isLoading$))},dependencies:[ke,Se],encapsulation:2})};var T=class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=m({type:n,selectors:[["app-root"]],decls:3,vars:0,consts:[[1,"app-container"]],template:function(e,i){e&1&&(s(0,"div",0)(1,"app-spinner"),b(2,"router-outlet"),p()())},dependencies:[Te,M],styles:[".app-container[_ngcontent-%COMP%]{max-width:1200px;margin:0 auto;padding:20px}"]})};Me(T,He).catch(n=>console.error(n));
