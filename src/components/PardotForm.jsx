"use client";

import { useEffect } from "react";
import Head from "next/head";

export default function ParadotForm() {

useEffect(()=>{

const steps=document.querySelectorAll(".step")
const circles=document.querySelectorAll(".circle")
const nextBtns=document.querySelectorAll(".next-btn")
const prevBtns=document.querySelectorAll(".prev-btn")
const progress=document.getElementById("progress")

let currentStep=0

function updateSteps(){

steps.forEach((step,index)=>{
step.classList.toggle("active",index===currentStep)
})

circles.forEach((circle,index)=>{
circle.classList.toggle("active",index<=currentStep)
})

progress.style.width=((currentStep+1)/steps.length)*100+"%"

}

function validateStep(){

const inputs=steps[currentStep].querySelectorAll("input[required]")

for(let input of inputs){

if(!input.value){
input.focus()
return false
}

}

return true

}

nextBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
if(!validateStep()) return
currentStep++
updateSteps()
})
})

prevBtns.forEach(btn=>{
btn.addEventListener("click",()=>{
currentStep--
updateSteps()
})
})

document.getElementById("leadForm").addEventListener("submit",function(){
document.getElementById("successMessage").style.display="block"
})

},[])

return (

<>
<Head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
</Head>

<style jsx global>{`

body{
font-family:Roboto,sans-serif;
background:linear-gradient(135deg,#eef2ff,#f8fafc,#eef2ff);
background-size:200% 200%;
animation:bgmove 8s infinite alternate;
}

@keyframes bgmove{
0%{background-position:left}
100%{background-position:right}
}

.form-wrapper{
display:flex;
justify-content:center;
align-items:center;
padding:40px 20px;
}

.form-card{
width:100%;
max-width:720px;
background:rgba(255,255,255,0.9);
backdrop-filter:blur(12px);
border-radius:18px;
padding:45px;
box-shadow:0 25px 60px rgba(0,0,0,0.15);
position:relative;
overflow:hidden;
}

.form-card:before{
content:"";
position:absolute;
top:0;
left:0;
width:100%;
height:4px;
background:linear-gradient(90deg,#2B7EC2,#BE0010,#2B7EC2);
animation:move 6s linear infinite;
}

@keyframes move{
0%{background-position:0}
100%{background-position:400px}
}

.form-title{
text-align:center;
font-size:28px;
font-weight:700;
margin-bottom:25px;
color:#222;
}

.step-indicators{
display:flex;
justify-content:center;
gap:14px;
margin-bottom:25px;
}

.circle{
width:36px;
height:36px;
border-radius:50%;
background:#e5e5e5;
display:flex;
align-items:center;
justify-content:center;
font-weight:600;
color:#777;
transition:0.3s;
}

.circle.active{
background:#2B7EC2;
color:white;
transform:scale(1.15);
box-shadow:0 6px 20px rgba(43,126,194,0.4);
}

.progress-bar{
height:6px;
background:#eee;
border-radius:20px;
margin-bottom:35px;
overflow:hidden;
}

.progress{
height:100%;
width:33%;
background:linear-gradient(90deg,#2B7EC2,#BE0010);
transition:0.4s;
}

.step{
display:none;
animation:fade 0.4s ease;
}

.step.active{
display:block;
}

@keyframes fade{
from{opacity:0;transform:translateX(20px)}
to{opacity:1;transform:translateX(0)}
}

.field{
position:relative;
margin-bottom:24px;
}

.field i{
position:absolute;
left:14px;
top:50%;
transform:translateY(-50%);
color:#aaa;
font-size:14px;
}

.field input{
width:100%;
padding:15px 14px 15px 44px;
border-radius:10px;
border:1px solid #ddd;
font-size:14px;
transition:0.25s;
}

.field input:focus{
border-color:#2B7EC2;
box-shadow:0 0 0 3px rgba(43,126,194,0.15);
outline:none;
}

.button-row{
display:flex;
justify-content:space-between;
margin-top:25px;
}

.btn{
padding:13px 26px;
border:none;
border-radius:8px;
font-weight:600;
cursor:pointer;
transition:0.25s;
position:relative;
overflow:hidden;
}

.next-btn{
background:#2B7EC2;
color:white;
}

.prev-btn{
background:#ddd;
}

.submit-btn{
background:#BE0010;
color:white;
width:100%;
font-size:16px;
margin-top:10px;
}

.success-message{
display:none;
text-align:center;
padding:40px;
}

.success-message i{
font-size:60px;
color:#28a745;
margin-bottom:10px;
}

`}</style>


<div className="form-wrapper">

<div className="form-card">

<div className="form-title">Request Product Information</div>

<div className="step-indicators">
<div className="circle active">1</div>
<div className="circle">2</div>
<div className="circle">3</div>
</div>

<div className="progress-bar">
<div className="progress" id="progress"></div>
</div>


<form id="leadForm" action="http://go.inkarp.co.in/l/1089472/2026-03-04/bljpnr" method="post">


<div className="step active">

<div className="field">
<i className="fa fa-user"></i>
<input type="text" name="First Name" placeholder="First Name" required/>
</div>

<div className="field">
<i className="fa fa-user"></i>
<input type="text" name="Last Name" placeholder="Last Name"/>
</div>

<div className="field">
<i className="fa fa-envelope"></i>
<input type="email" name="Email" placeholder="Email Address" required/>
</div>

<div className="button-row">
<button type="button" className="btn next-btn">Next</button>
</div>

</div>


<div className="step">

<div className="field">
<i className="fa fa-building"></i>
<input type="text" name="Company Name" placeholder="Company Name"/>
</div>

<div className="field">
<i className="fa fa-briefcase"></i>
<input type="text" name="Designation" placeholder="Designation"/>
</div>

<div className="field">
<i className="fa fa-sitemap"></i>
<input type="text" name="Department" placeholder="Department"/>
</div>

<div className="button-row">
<button type="button" className="btn prev-btn">Back</button>
<button type="button" className="btn next-btn">Next</button>
</div>

</div>


<div className="step">

<div className="field">
<i className="fa fa-phone"></i>
<input type="tel" name="Contact" placeholder="Phone Number"/>
</div>

<div className="field">
<i className="fa fa-industry"></i>
<input type="text" name="Industry" placeholder="Industry"/>
</div>

<div className="field">
<i className="fa fa-map-marker-alt"></i>
<input type="text" name="State" placeholder="State"/>
</div>

<div className="field">
<i className="fa fa-location-dot"></i>
<input type="text" name="City" placeholder="City"/>
</div>

<input type="hidden" name="product_interest" value="Rotary Evaporator"/>

<div className="button-row">
<button type="button" className="btn prev-btn">Back</button>

<button type="submit" className="btn submit-btn">
<i className="fa fa-paper-plane"></i> Submit Enquiry
</button>

</div>

</div>

</form>


<div className="success-message" id="successMessage">

<i className="fa fa-circle-check"></i>

<h3>Thank You!</h3>

<p>Your enquiry has been successfully submitted.</p>

</div>

</div>
</div>

</>

)

}