"use strict";(()=>{var e={};e.id=976,e.ids=[976],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35900:e=>{e.exports=require("pg")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},33013:(e,r,s)=>{s.r(r),s.d(r,{headerHooks:()=>m,originalPathname:()=>$,patchFetch:()=>v,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>y,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>f});var t={};s.r(t),s.d(t,{PUT:()=>d});var n=s(95419),i=s(69108),o=s(99678),a=s(81355);s(40002);var u=s(68582),c=s(23106);let d=async e=>{try{let r=await (0,a.getServerSession)(u.Z);if(!r||!r.user)return Response.json({error:"Unauthorized"},{status:401});if(r.user.privilege<2)return Response.json({error:"Not verified"},{status:401});let{id:s,verified:t}=await e.json(),n=`
        UPDATE users
        SET verified = $1
        WHERE id = $2 
        
    `;return c.d.query(n,[t,s]),Response.json({message:"success"},{status:200})}catch(e){return console.log(e.message),Response.json(e.message,{status:500})}},l=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/verify/route",pathname:"/api/verify",filename:"route",bundlePath:"app/api/verify/route"},resolvedPagePath:"/home/Frasier/Documents/web/JLSM/jlsm/app/api/verify/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:p,staticGenerationAsyncStorage:w,serverHooks:y,headerHooks:m,staticGenerationBailout:f}=l,$="/api/verify/route";function v(){return(0,o.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:w})}},68582:(e,r,s)=>{s.d(r,{Z:()=>o});var t=s(23106),n=s(10375),i=s(50694);let o={adapter:function(e){return{async createVerificationToken(r){let{identifier:s,expires:t,token:n}=r,i=`
        INSERT INTO verification_token ( identifier, expires, token ) 
        VALUES ($1, $2, $3)
        `;return await e.query(i,[s,t,n]),r},async useVerificationToken({identifier:r,token:s}){let t=`delete from verification_token
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token `,n=await e.query(t,[r,s]);return 0!==n.rowCount?n.rows[0]:null},async createUser(r){let{name:s,email:t,emailVerified:n,image:i}=r,o=`
        INSERT INTO users (name, email, "emailVerified", image) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, "emailVerified", image`,a=`
            INSERT INTO balances (user_id) VALUES ($1)
        `,u=await e.query(o,[s,t,n,i]);return await e.query(a,[u.rows[0].id]),u.rows[0]},async getUser(r){try{let s=await e.query("select * from users where id = $1",[r]);return 0===s.rowCount?null:s.rows[0]}catch(e){return null}},async getUserByEmail(r){let s=await e.query("select * from users where email = $1",[r]);return 0!==s.rowCount?s.rows[0]:null},async getUserByAccount({providerAccountId:r,provider:s}){let t=`
          select u.* from users u join accounts a on u.id = a."userId"
          where 
          a.provider = $1 
          and 
          a."providerAccountId" = $2`,n=await e.query(t,[s,r]);return 0!==n.rowCount?n.rows[0]:null},async updateUser(r){let{id:s,name:t,email:n,emailVerified:i,image:o}={...(await e.query("select * from users where id = $1",[r.id])).rows[0],...r},a=`
        UPDATE users set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;return(await e.query(a,[s,t,n,i,o])).rows[0]},async linkAccount(r){let s=`
      insert into accounts 
      (
        "userId", 
        provider, 
        type, 
        "providerAccountId", 
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning
        id,
        "userId", 
        provider, 
        type, 
        "providerAccountId", 
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type
      `,t=[r.userId,r.provider,r.type,r.providerAccountId,r.access_token,r.expires_at,r.refresh_token,r.id_token,r.scope,r.session_state,r.token_type];return function(e){let r=parseInt(e.expires_at);return{...e,expires_at:r}}((await e.query(s,t)).rows[0])},async createSession({sessionToken:r,userId:s,expires:t}){if(void 0===s)throw Error("userId is undef in createSession");let n=`insert into sessions ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;return(await e.query(n,[s,t,r])).rows[0]},async getSessionAndUser(r){if(void 0===r)return null;let s=await e.query('select * from sessions where "sessionToken" = $1',[r]);if(0===s.rowCount)return null;let t=s.rows[0],n=await e.query("select * from users where id = $1",[t.userId]);return 0===n.rowCount?null:{session:t,user:n.rows[0]}},async updateSession(r){let{sessionToken:s}=r,t=await e.query('select * from sessions where "sessionToken" = $1',[s]);if(0===t.rowCount)return null;let n={...t.rows[0],...r},i=`
        UPDATE sessions set
        expires = $2
        where "sessionToken" = $1
        `;return(await e.query(i,[n.sessionToken,n.expires])).rows[0]},async deleteSession(r){await e.query('delete from sessions where "sessionToken" = $1',[r])},async unlinkAccount(r){let{provider:s,providerAccountId:t}=r;await e.query('delete from accounts where "providerAccountId" = $1 and provider = $2',[t,s])},async deleteUser(r){await e.query("delete from users where id = $1",[r]),await e.query('delete from sessions where "userId" = $1',[r]),await e.query('delete from accounts where "userId" = $1',[r])}}}(t.d),providers:[(0,n.Z)({clientId:process.env.GOOGLE_ID,clientSecret:process.env.GOOGLE_SECRET}),(0,i.Z)({clientId:process.env.GITHUB_ID,clientSecret:process.env.GITHUB_SECRET})],callbacks:{session:async({session:e,user:r})=>(e.user=r,e)}}},50482:(e,r,s)=>{e.exports=s(20399)},40002:(e,r,s)=>{e.exports=s(50482).vendored["react-rsc"].React},95419:(e,r,s)=>{e.exports=s(30517)},23106:(e,r,s)=>{s.d(r,{d:()=>t});let t=new(s(35900)).Pool({connectionString:process.env.DBCONNSTR})}};var r=require("../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[638,553],()=>s(33013));module.exports=t})();