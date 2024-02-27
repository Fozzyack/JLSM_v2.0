"use strict";(()=>{var e={};e.id=10,e.ids=[10],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35900:e=>{e.exports=require("pg")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},24347:(e,r,s)=>{s.r(r),s.d(r,{headerHooks:()=>m,originalPathname:()=>f,patchFetch:()=>q,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>y,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>$});var t={};s.r(t),s.d(t,{GET:()=>d});var i=s(95419),n=s(69108),o=s(99678),a=s(81355),u=s(68582),c=s(23106);let d=async e=>{try{let e=await (0,a.getServerSession)(u.Z);if(!e||!e.user)throw Error("Expected User to be Signed in However No User was Found");let r=`
            SELECT u.colour, u.name as name, u.id, u.email, u.image, u.privilege, g.name as grade, g.difficulty FROM users u
            JOIN grades g
            ON g.id = u.grade_id
            WHERE privilege >= 1 AND verified = true
        `,s=await c.d.query(r);return Response.json(s.rows)}catch(e){return Response.json(e.message,{status:500})}},l=new i.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/teachers/route",pathname:"/api/teachers",filename:"route",bundlePath:"app/api/teachers/route"},resolvedPagePath:"/home/Frasier/Documents/web/JLSM/jlsm/app/api/teachers/route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:p,staticGenerationAsyncStorage:w,serverHooks:y,headerHooks:m,staticGenerationBailout:$}=l,f="/api/teachers/route";function q(){return(0,o.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:w})}},68582:(e,r,s)=>{s.d(r,{Z:()=>o});var t=s(23106),i=s(10375),n=s(50694);let o={adapter:function(e){return{async createVerificationToken(r){let{identifier:s,expires:t,token:i}=r,n=`
        INSERT INTO verification_token ( identifier, expires, token ) 
        VALUES ($1, $2, $3)
        `;return await e.query(n,[s,t,i]),r},async useVerificationToken({identifier:r,token:s}){let t=`delete from verification_token
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token `,i=await e.query(t,[r,s]);return 0!==i.rowCount?i.rows[0]:null},async createUser(r){let{name:s,email:t,emailVerified:i,image:n}=r,o=`
        INSERT INTO users (name, email, "emailVerified", image) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, "emailVerified", image`,a=`
            INSERT INTO balances (user_id) VALUES ($1)
        `,u=await e.query(o,[s,t,i,n]);return await e.query(a,[u.rows[0].id]),u.rows[0]},async getUser(r){try{let s=await e.query("select * from users where id = $1",[r]);return 0===s.rowCount?null:s.rows[0]}catch(e){return null}},async getUserByEmail(r){let s=await e.query("select * from users where email = $1",[r]);return 0!==s.rowCount?s.rows[0]:null},async getUserByAccount({providerAccountId:r,provider:s}){let t=`
          select u.* from users u join accounts a on u.id = a."userId"
          where 
          a.provider = $1 
          and 
          a."providerAccountId" = $2`,i=await e.query(t,[s,r]);return 0!==i.rowCount?i.rows[0]:null},async updateUser(r){let{id:s,name:t,email:i,emailVerified:n,image:o}={...(await e.query("select * from users where id = $1",[r.id])).rows[0],...r},a=`
        UPDATE users set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;return(await e.query(a,[s,t,i,n,o])).rows[0]},async linkAccount(r){let s=`
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
      `,t=[r.userId,r.provider,r.type,r.providerAccountId,r.access_token,r.expires_at,r.refresh_token,r.id_token,r.scope,r.session_state,r.token_type];return function(e){let r=parseInt(e.expires_at);return{...e,expires_at:r}}((await e.query(s,t)).rows[0])},async createSession({sessionToken:r,userId:s,expires:t}){if(void 0===s)throw Error("userId is undef in createSession");let i=`insert into sessions ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;return(await e.query(i,[s,t,r])).rows[0]},async getSessionAndUser(r){if(void 0===r)return null;let s=await e.query('select * from sessions where "sessionToken" = $1',[r]);if(0===s.rowCount)return null;let t=s.rows[0],i=await e.query("select * from users where id = $1",[t.userId]);return 0===i.rowCount?null:{session:t,user:i.rows[0]}},async updateSession(r){let{sessionToken:s}=r,t=await e.query('select * from sessions where "sessionToken" = $1',[s]);if(0===t.rowCount)return null;let i={...t.rows[0],...r},n=`
        UPDATE sessions set
        expires = $2
        where "sessionToken" = $1
        `;return(await e.query(n,[i.sessionToken,i.expires])).rows[0]},async deleteSession(r){await e.query('delete from sessions where "sessionToken" = $1',[r])},async unlinkAccount(r){let{provider:s,providerAccountId:t}=r;await e.query('delete from accounts where "providerAccountId" = $1 and provider = $2',[t,s])},async deleteUser(r){await e.query("delete from users where id = $1",[r]),await e.query('delete from sessions where "userId" = $1',[r]),await e.query('delete from accounts where "userId" = $1',[r])}}}(t.d),providers:[(0,i.Z)({clientId:process.env.GOOGLE_ID,clientSecret:process.env.GOOGLE_SECRET}),(0,n.Z)({clientId:process.env.GITHUB_ID,clientSecret:process.env.GITHUB_SECRET})],callbacks:{session:async({session:e,user:r})=>(e.user=r,e)}}},95419:(e,r,s)=>{e.exports=s(30517)},23106:(e,r,s)=>{s.d(r,{d:()=>t});let t=new(s(35900)).Pool({connectionString:process.env.DBCONNSTR})}};var r=require("../../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[638,553],()=>s(24347));module.exports=t})();