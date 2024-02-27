"use strict";(()=>{var e={};e.id=184,e.ids=[184],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},35900:e=>{e.exports=require("pg")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},32081:e=>{e.exports=require("child_process")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},82316:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>y,originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>w,staticGenerationBailout:()=>$});var s={};t.r(s),t.d(s,{POST:()=>l});var n=t(95419),i=t(69108),o=t(99678),a=t(68582),u=t(81355);let c=new(t(56846)).Z(process.env.STRIPE_SECRET_KEY,{apiVersion:"2023-10-16",typescript:!0}),l=async e=>{try{let r=await (0,u.getServerSession)(a.Z);if(!r.user.name||!r.user.email)throw Error("User details are missing");let{checkid:t}=await e.json(),s=-1;switch(parseInt(t)){case 1:s=4e3;break;case 2:s=3e3;break;case 3:s=1e4}if(-1===s)throw Error("There was an Error processing the payment");let n=await c.paymentIntents.create({amount:s,currency:"aud",automatic_payment_methods:{enabled:!0},metadata:{user_id:r.user.id,name:r.user.name},receipt_email:r.user.email});return Response.json(n.client_secret,{status:200})}catch(e){return console.log(e.message),Response.json(e.message,{status:500})}},p=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/getpaymentintent/route",pathname:"/api/getpaymentintent",filename:"route",bundlePath:"app/api/getpaymentintent/route"},resolvedPagePath:"/home/Frasier/Documents/web/JLSM/jlsm/app/api/getpaymentintent/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:w,serverHooks:m,headerHooks:y,staticGenerationBailout:$}=p,f="/api/getpaymentintent/route";function h(){return(0,o.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:w})}},68582:(e,r,t)=>{t.d(r,{Z:()=>o});var s=t(23106),n=t(10375),i=t(50694);let o={adapter:function(e){return{async createVerificationToken(r){let{identifier:t,expires:s,token:n}=r,i=`
        INSERT INTO verification_token ( identifier, expires, token ) 
        VALUES ($1, $2, $3)
        `;return await e.query(i,[t,s,n]),r},async useVerificationToken({identifier:r,token:t}){let s=`delete from verification_token
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token `,n=await e.query(s,[r,t]);return 0!==n.rowCount?n.rows[0]:null},async createUser(r){let{name:t,email:s,emailVerified:n,image:i}=r,o=`
        INSERT INTO users (name, email, "emailVerified", image) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, "emailVerified", image`,a=`
            INSERT INTO balances (user_id) VALUES ($1)
        `,u=await e.query(o,[t,s,n,i]);return await e.query(a,[u.rows[0].id]),u.rows[0]},async getUser(r){try{let t=await e.query("select * from users where id = $1",[r]);return 0===t.rowCount?null:t.rows[0]}catch(e){return null}},async getUserByEmail(r){let t=await e.query("select * from users where email = $1",[r]);return 0!==t.rowCount?t.rows[0]:null},async getUserByAccount({providerAccountId:r,provider:t}){let s=`
          select u.* from users u join accounts a on u.id = a."userId"
          where 
          a.provider = $1 
          and 
          a."providerAccountId" = $2`,n=await e.query(s,[t,r]);return 0!==n.rowCount?n.rows[0]:null},async updateUser(r){let{id:t,name:s,email:n,emailVerified:i,image:o}={...(await e.query("select * from users where id = $1",[r.id])).rows[0],...r},a=`
        UPDATE users set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;return(await e.query(a,[t,s,n,i,o])).rows[0]},async linkAccount(r){let t=`
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
      `,s=[r.userId,r.provider,r.type,r.providerAccountId,r.access_token,r.expires_at,r.refresh_token,r.id_token,r.scope,r.session_state,r.token_type];return function(e){let r=parseInt(e.expires_at);return{...e,expires_at:r}}((await e.query(t,s)).rows[0])},async createSession({sessionToken:r,userId:t,expires:s}){if(void 0===t)throw Error("userId is undef in createSession");let n=`insert into sessions ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;return(await e.query(n,[t,s,r])).rows[0]},async getSessionAndUser(r){if(void 0===r)return null;let t=await e.query('select * from sessions where "sessionToken" = $1',[r]);if(0===t.rowCount)return null;let s=t.rows[0],n=await e.query("select * from users where id = $1",[s.userId]);return 0===n.rowCount?null:{session:s,user:n.rows[0]}},async updateSession(r){let{sessionToken:t}=r,s=await e.query('select * from sessions where "sessionToken" = $1',[t]);if(0===s.rowCount)return null;let n={...s.rows[0],...r},i=`
        UPDATE sessions set
        expires = $2
        where "sessionToken" = $1
        `;return(await e.query(i,[n.sessionToken,n.expires])).rows[0]},async deleteSession(r){await e.query('delete from sessions where "sessionToken" = $1',[r])},async unlinkAccount(r){let{provider:t,providerAccountId:s}=r;await e.query('delete from accounts where "providerAccountId" = $1 and provider = $2',[s,t])},async deleteUser(r){await e.query("delete from users where id = $1",[r]),await e.query('delete from sessions where "userId" = $1',[r]),await e.query('delete from accounts where "userId" = $1',[r])}}}(s.d),providers:[(0,n.Z)({clientId:process.env.GOOGLE_ID,clientSecret:process.env.GOOGLE_SECRET}),(0,i.Z)({clientId:process.env.GITHUB_ID,clientSecret:process.env.GITHUB_SECRET})],callbacks:{session:async({session:e,user:r})=>(e.user=r,e)}}},23106:(e,r,t)=>{t.d(r,{d:()=>s});let s=new(t(35900)).Pool({connectionString:process.env.DBCONNSTR})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,553,462],()=>t(82316));module.exports=s})();