(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f6906ae"],{2934:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return n}));var r=i("b775");function s(){return Object(r["a"])({url:"/common/getId",method:"get"})}function n(){return Object(r["a"])({url:"/common/getType",method:"get"})}},8464:function(t,e,i){},"8a24":function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"publish-container"},[e("div",{staticClass:"page-title"},[t._v("写评论")]),t.movieData.title?e("div",{staticClass:"movie-info"},[e("img",{staticClass:"info-img",attrs:{src:t.movieData.posterURL}}),e("div",{staticClass:"right-info"},[e("div",{staticClass:"title"},[t._v(t._s(t.movieData.title))]),e("div",{staticClass:"desc"},[t._v(" "+t._s(t.movieData.language)+" "+t._s(t.movieData.types.join(" / "))+" "+t._s(null==t.movieData.score?0:t.movieData.score)+"分 "+t._s(t.movieData.rateCount)+"人 ")])])]):t._e(),e("div",{staticClass:"score-add"},[e("div",[t._v("给个评价吧：")]),e("div",{staticClass:"rankstar",on:{mouseleave:t.resetScore}},t._l(t.starList.list||[],(function(i,r){return e("div",{key:r,class:["star-item",i.state],on:{click:function(e){return t.sendScore(r)},mouseenter:function(e){return t.changeScore(r)}}})})),0)]),e("div",{staticClass:"text-input"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{id:"commentInput",placeholder:"写评论..."},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),e("div",{attrs:{id:"submitBtn"},on:{click:t.submit}},[t._v("提交")])])},s=[],n=i("fc91"),o=i("5f87"),c=i("2934"),u=i("dab6"),a=i("2f62"),m={name:"publish",data(){return{content:"",movieData:{},starList:{list:new Array(5).fill({state:"normal"})},commentForm:{id:"",uid:"",mid:"",comment:""},score:0}},computed:{id:function(){return this.$route.query.id},...Object(a["b"])({user:function(){return this.$store.state.user}})},mounted(){this.init()},created(){void 0!==Object(o["b"])()&&null!==Object(o["b"])()||this.$router.push("/")},methods:{async init(){await Object(n["c"])(this.id).then(t=>{200===t.code?this.movieData=t.obj:this.$message.error(t.message)})},changeScore(t){let e=[];this.starList.list.forEach((i,r)=>{i.state=r<=t?"full":"normal",e.push({...i})}),this.starList.list=e},sendScore(t){this.user.token?(t+=1,Object(u["c"])(this.id,this.user.id,t).then(e=>{200===e.code?(this.score=t,this.resetScore()):this.$message.error(e.message)})):(this.$message.error("请先登录"),this.$router.push({name:"login",query:{redirect:this.$router.currentRoute.fullPath}}))},async getScore(){this.user.token&&Object(u["b"])(this.id,this.user.id).then(t=>{200===t.code?(this.score=t.obj,this.resetScore()):this.$message.error(t.message)})},resetScore(){let t=[],e=this.score-1;this.starList.list.forEach((i,r)=>{i.state=r<=e?"full":"normal",t.push({...i})}),this.starList.list=t},submit(){this.commentForm.comment=this.content,Object(n["i"])(this.commentForm).then(t=>{200===t.code?(this.$message.success("发布影评成功"),this.$router.push({path:"movie/"+this.id})):this.$message.error(t.message)})},async initForm(){Object(c["b"])().then(t=>{200===t.code?this.commentForm.id=t.obj:this.$message.error("未知错误！请刷新后重试！")}),this.commentForm.uid=this.user.id,this.commentForm.mid=this.id}},created(){null!==this.user.id&&void 0!==this.user.id&&""!==this.user.id||this.$router.push({name:"login",query:{redirect:this.$router.currentRoute.fullPath}}),this.initForm(),this.getScore()}},d=m,h=(i("96d4"),i("2877")),l=Object(h["a"])(d,r,s,!1,null,"43a0b043",null);e["default"]=l.exports},"96d4":function(t,e,i){"use strict";i("8464")},dab6:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return o}));var r=i("b775");function s(t,e){return Object(r["a"])({url:"/movie/score/"+t+"?uid="+e,method:"get"})}function n(t,e,i){return Object(r["a"])({url:"/movie/rate/"+t,method:"get",params:{uid:e,score:i}})}function o(t){return Object(r["a"])({url:"/user/ratingDistribution/"+t,method:"get"})}},fc91:function(t,e,i){"use strict";i.d(e,"c",(function(){return s})),i.d(e,"e",(function(){return n})),i.d(e,"d",(function(){return o})),i.d(e,"h",(function(){return c})),i.d(e,"a",(function(){return u})),i.d(e,"b",(function(){return a})),i.d(e,"i",(function(){return m})),i.d(e,"g",(function(){return d})),i.d(e,"f",(function(){return h}));var r=i("b775");function s(t){return Object(r["a"])({url:"/movie/detail/"+t,method:"get"})}function n(t){return Object(r["a"])({url:"/movie/movies",method:"get",params:t})}function o(t){return Object(r["a"])({url:"/movieRecommend/movie/"+t,method:"get"})}function c(){return Object(r["a"])({url:"/home/getCarousels",method:"get"})}function u(t){return Object(r["a"])({url:"/movie/articleMovieInfo/"+t,method:"get"})}function a(t){return Object(r["a"])({url:"/movie/comments",method:"get",params:t})}function m(t){return Object(r["a"])({url:"/movie/comment",method:"post",data:t})}function d(t){return Object(r["a"])({url:"/movie/videos/"+t,method:"get"})}function h(t){return Object(r["a"])({url:"/home/sysReco",method:"get",params:t})}}}]);
//# sourceMappingURL=chunk-7f6906ae.dc38ba82.js.map