(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[671],{2745:function(e,t,s){Promise.resolve().then(s.bind(s,9101))},9101:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return p}});var n=s(3827),a=s(4090),i=s(7262),l=s(1923),r=s(7191),c=s(9079),o=()=>{let e=(0,l.useStripe)(),t=(0,l.useElements)(),[s,i]=(0,a.useState)(!1);(0,a.useEffect)(()=>{if(!e||!t)return},[]);let o=async s=>{if(s.preventDefault(),!e||!t)return;i(!0);let{error:n}=await e.confirmPayment({elements:t,confirmParams:{return_url:"".concat(c.env.NEXT_PUBLIC_URL,"/dashboard/success")}});console.log(n)};return(0,n.jsx)(a.Fragment,{children:(0,n.jsxs)("form",{id:"payment-form",className:"flex p-8 mt-4 rounded-xl flex-col gap-4 w-full items-center md:items-stretch justify-center bg-white shadow-lg",onSubmit:o,children:[(0,n.jsx)(l.PaymentElement,{id:"payment-element",options:{layout:"tabs"}}),(0,n.jsx)(r.E.button,{whileHover:{y:-5},type:"submit",className:"max-w-[200px] p-4 bg-gradient-to-r rounded-md from-yellow-500 to-yellow-400 text-white font-bold",children:"Submit Payment"})]})})},m=s(7907);let d=(0,i.J)("pk_test_51Oh97gLOsCSkZC0WFdgCG1aftGXzP0a8HrncDeb7UhsSPcTxttE0IMNbiKKPTqjCED56dVzQ8t3kACz6EwKFitfe00f4VmohfE"),u=[{name:"Private Lesson",price:40,quantity:1},{name:"Group Lesson",price:30,quanitiy:1},{name:"Group Lesson",price:100,quantity:4}];var p=e=>{let{params:t}=e,[s,i]=a.useState(""),r=(0,m.useRouter)();return a.useEffect(()=>{fetch("/api/getpaymentintent",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({checkid:t.checkoutid})}).then(e=>e.json()).then(e=>i(e)).catch(e=>console.log(e.message))},[]),(0,n.jsxs)("div",{className:" flex flex-col items-center justify-center md:items-start md:justify-start ",children:[(0,n.jsx)("div",{className:"bg-slate-400 p-2 font-bold text-slate-100 rounded-xl mb-4 absolute md:relative top-[70px] left-[20px] md:top-0 md:left-0",children:(0,n.jsx)("button",{onClick:()=>r.push("/dashboard/addfunds/"),children:"Back"})}),(0,n.jsxs)("div",{className:"flex flex-col gap-4 items-center md:items-start",children:[(0,n.jsx)("h3",{className:"text-2xl font-semibold text-slate-500",children:"Payment"}),(0,n.jsx)("p",{className:"text-slate-500",children:"Details:"}),(0,n.jsxs)("p",{className:"text-slate-500",children:["Total: $",u[parseInt(t.checkoutid)-1].price]}),(0,n.jsxs)("p",{className:"text-slate-500",children:["Item:",u[parseInt(t.checkoutid)-1].name," ","x"," ",u[parseInt(t.checkoutid)-1].quantity]})]}),s&&(0,n.jsx)(l.Elements,{options:{appearance:{theme:"stripe"},clientSecret:s},stripe:d,children:(0,n.jsx)(o,{})})]})}}},function(e){e.O(0,[191,420,971,69,744],function(){return e(e.s=2745)}),_N_E=e.O()}]);