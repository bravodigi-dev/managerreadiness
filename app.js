
const sections = [
{
 title:"Resolver Process & Operational Knowledge", short:"Process & Ops Knowledge", weight:25, icon:"⚙",
 desc:"Initial handover foundation: Resolver workflow, LOB ownership, case lifecycle, escalation flow, ageing and operational priorities.",
 questions:[
  "I understand the end-to-end Resolver operating model and how it differs from an Inbound Voice environment.",
  "I understand the key Resolver LOBs and responsibilities across Billing Resolver, General Enquiry, Network Resolver and Anti-Scam.",
  "I understand the Resolver case lifecycle from receipt through handling, follow-up, escalation and closure.",
  "I understand the meaning and required action for Open, Support Responded, Customer Responded, Waiting for Info and other relevant case statuses.",
  "I understand L1, L2 and L3 ownership boundaries and when a case should be escalated or returned.",
  "I understand the key case prioritisation logic including ageing, SLA risk, customer impact, urgency and dependency.",
  "I understand how AFRT, unresolved balance and ageing are affected by daily case management."
 ]
},
{
 title:"Performance & Data Management", short:"Performance & Data Mgmt", weight:15, icon:"▥",
 desc:"Understand the Resolver scorecard, daily/weekly performance health and how to translate data into actions.",
 questions:[
  "I understand the main Resolver KPIs and how each metric is interpreted.",
  "I can independently interpret AFRT, unresolved balance, ageing, CSAT, quality and productivity trends.",
  "I can identify operational drivers behind a weekly performance movement.",
  "I can identify agent or team outliers and determine whether the gap is behavioural, knowledge, process or dependency related.",
  "I understand how DSAT is reviewed and the difference between Agent Error and Non-Agent Error.",
  "I can translate findings into an RCA and action plan."
 ]
},
{
 title:"Team Leadership & People Management", short:"Team Leadership & People Mgmt", weight:20, icon:"♙",
 desc:"Establish leadership presence, understand the team and drive Team Leader ownership and follow-through.",
 questions:[
  "I have established regular engagement with the Team Leaders under Resolver.",
  "I understand the strengths and development areas of the Team Leaders supporting Resolver.",
  "I have sufficient visibility of agent performance, attendance, behaviour and operational challenges.",
  "I can coach Team Leaders and hold them accountable for their own team responsibilities.",
  "I can challenge incomplete actions and ensure follow-up until closure.",
  "I can maintain leadership continuity and ensure proper handover when I am unavailable.",
  "I can identify where the team requires refresher training, SME support or process reinforcement."
 ]
},
{
 title:"Client Management & Stakeholder Confidence", short:"Client Mgmt & Stakeholder Conf.", weight:15, icon:"◈",
 desc:"Build confidence to represent Resolver independently in client and cross-functional discussions.",
 questions:[
  "I understand the client's current expectations and concerns relating to Resolver performance.",
  "I can confidently present Resolver performance and explain what is driving the result.",
  "I can explain an operational issue using Issue → RCA → Impact → Action → Owner → Timeline.",
  "I can answer routine client questions about Resolver without depending heavily on another manager.",
  "I can distinguish between an internal operational gap and a dependency requiring client/L3 support.",
  "I follow through on commitments made during client discussions.",
  "I understand the level of urgency expected when the client highlights an escalated matter."
 ]
},
{
 title:"Decision Making & Ownership", short:"Decision Making & Ownership", weight:15, icon:"🎯",
 desc:"Move from observing the operation to independently controlling, prioritising and driving closure.",
 questions:[
  "I understand which decisions I am expected to make independently as the Resolver Manager.",
  "I know when an issue should be managed within Resolver and when it should be escalated to the Operations Manager.",
  "I can prioritise actions based on customer impact, SLA, ageing, volume and business risk.",
  "I take ownership of an issue until the owner, next step and closure path are clear.",
  "I can make timely operational decisions during volume spikes, outages or emerging performance risks.",
  "I can challenge unclear ownership between L1, L2, L3 or support functions.",
  "I can independently drive recovery actions when a KPI is below expectation."
 ]
},
{
 title:"Governance & Improvement", short:"Governance & Improvement", weight:10, icon:"✓",
 desc:"Understand recurring governance, improvement programmes and how to drive sustainable operational change.",
 questions:[
  "I understand the recurring Resolver governance cadence and the purpose of each review.",
  "I understand how recurring agent errors should be captured, reviewed and converted into coaching or process actions.",
  "I can differentiate whether an improvement requires a people, process, system or policy solution.",
  "I can track improvement actions with a clear PIC, due date and status.",
  "I can validate whether an implemented improvement is actually reducing errors, rework or ageing.",
  "I can identify trends that should be elevated to the client or relevant support team.",
  "I can independently lead a basic improvement discussion and provide a progress update.",
  "I have identified at least one area where I can personally improve the Resolver operation over the next 90 days."
 ]
}
];

let totalQuestions = sections.reduce((n,s)=>n+s.questions.length,0);
document.getElementById("questionCount").textContent = totalQuestions;
document.getElementById("sideTotal").textContent = totalQuestions;

function renderStepper(){
 const wrap=document.getElementById("stepper");
 wrap.innerHTML=sections.map((s,i)=>`
  <div class="step ${i===0?'active':''}">
   <div class="stepNum">${i+1}</div>
   <div>${s.short}</div>
  </div>`).join("");
}
function renderSurvey(){
 const wrap=document.getElementById("surveyForm");
 wrap.innerHTML=sections.map((s,si)=>`
 <div class="sectionCard" id="section-${si}">
   <div class="sectionTop">
    <div class="sectionTitleWrap">
      <div class="sectionIcon">${s.icon}</div>
      <div>
        <h2>${si+1}. ${s.title}</h2>
        <p class="desc">${s.desc}</p>
        <div class="weight">Weight: ${s.weight}%</div>
      </div>
    </div>
   </div>
   ${s.questions.map((q,qi)=>`
    <div class="questionCard">
      <div class="qLeft">
        <div class="qNum">${si+1}.${qi+1}</div>
        <div>
          <div class="qText">${q}</div>
          <input class="noteInput" id="note_${si}_${qi}" placeholder="Notes (optional)" />
        </div>
      </div>
      <div class="ratingGrid">
        ${[
          [1,"Not Yet<br>Exposed","r1"],
          [2,"Basic<br>Awareness","r2"],
          [3,"Manage With<br>Guidance","r3"],
          [4,"Manage<br>Independently","r4"],
          [5,"Lead / Coach<br>Others","r5"]
        ].map(([v,t,c])=>`
          <div class="rateBtn ${c}">
            <input type="radio" name="q_${si}_${qi}" id="q_${si}_${qi}_${v}" value="${v}">
            <label for="q_${si}_${qi}_${v}"><div><strong>${v}</strong>${t}</div></label>
          </div>`).join("")}
      </div>
    </div>`).join("")}
 </div>`).join("");

 document.querySelectorAll('input[type="radio"]').forEach(el=>el.addEventListener('change',updateProgress));
}

function answeredCount(){
 return [...document.querySelectorAll('input[type="radio"]:checked')].length;
}
function updateProgress(){
 const answered=answeredCount();
 const pct=Math.round(answered/totalQuestions*100);
 document.getElementById("sideAnswered").textContent=answered;
 document.getElementById("sideProgressPct").textContent=pct+"%";
 document.getElementById("topProgressPct").textContent=pct+"%";
 document.getElementById("topProgressText").textContent=`${answered} answered`;
 const deg=pct*3.6;
 document.getElementById("sideProgressRing").style.background=`conic-gradient(#7d2cff 0deg,#5064ff ${deg}deg,rgba(255,255,255,.15) ${deg}deg)`;
 document.getElementById("topDonut").style.background=`conic-gradient(#f2a7ff 0deg,#50b5ff ${deg}deg,rgba(255,255,255,.25) ${deg}deg)`;
 sections.forEach((s,si)=>{
   const done=s.questions.filter((_,qi)=>document.querySelector(`input[name="q_${si}_${qi}"]:checked`)).length;
   const step=document.querySelectorAll(".step")[si];
   if(done===s.questions.length) step.classList.add("active");
   else if(si!==0) step.classList.remove("active");
 });
}

function collectData(){
 const d={
  date:new Date().toISOString().slice(0,10),
  strengths:val("strengths"),support:val("support"),notExposed:val("notExposed"),
  managerSupport:val("managerSupport"),clientConfidence:val("clientConfidence"),priorities:val("priorities"),
  sections:[]
 };
 sections.forEach((s,si)=>{
   const vals=s.questions.map((_,qi)=>{
      const c=document.querySelector(`input[name="q_${si}_${qi}"]:checked`);
      return c?Number(c.value):null;
   });
   const answered=vals.filter(v=>v!==null);
   const avg=answered.length?answered.reduce((a,b)=>a+b,0)/answered.length:0;
   d.sections.push({
     title:s.title,weight:s.weight,values:vals,
     notes:s.questions.map((_,qi)=>val(`note_${si}_${qi}`)),
     percent:avg*20,notExposed:vals.filter(v=>v===1).length
   });
 });
 return d;
}
function val(id){return document.getElementById(id)?.value?.trim()||""}

function readinessLabel(score){
 if(score>=85)return"Independent / Strong";
 if(score>=70)return"Developing Well";
 if(score>=50)return"Requires Guided Support";
 return"Early Learning Stage";
}

function generateReport(){
 const d=collectData();
 let weighted=0,totalW=0;
 d.sections.forEach(s=>{if(s.percent>0){weighted+=s.percent*s.weight;totalW+=s.weight}});
 d.overall=totalW?weighted/totalW:0;
 d.label=readinessLabel(d.overall);
 const sorted=[...d.sections].sort((a,b)=>a.percent-b.percent);
 const exposure= d.sections.reduce((n,s)=>n+s.notExposed,0);

 const r=document.getElementById("report");
 r.className="";
 r.innerHTML=`
  <div class="reportGrid">
    <div class="reportMetric"><span>Self Readiness</span><b>${d.overall.toFixed(1)}%</b></div>
    <div class="reportMetric"><span>Current Stage</span><b style="font-size:18px">${d.label}</b></div>
    <div class="reportMetric"><span>Not Yet Exposed</span><b>${exposure}</b></div>
  </div>
  <div class="capBars">
    ${d.sections.map(s=>`
      <div class="capRow">
        <div class="capTop"><span>${s.title}</span><span>${s.percent.toFixed(0)}%</span></div>
        <div class="capBar"><div class="capFill" style="width:${Math.min(100,s.percent)}%"></div></div>
      </div>`).join("")}
  </div>
  <div class="reportActions">
    <button class="primaryBtn" onclick="window.print()">Print / Save PDF</button>
    <button class="secondaryBtn" onclick="downloadCSV()">Download CSV</button>
    <button class="secondaryBtn" onclick="downloadJSON()">Download JSON</button>
  </div>`;

 document.getElementById("actionPlanCards").innerHTML=sorted.slice(0,3).map((s,i)=>`
   <div class="actionCard">
     <span>0${i+1}</span>
     <h3>${s.title}</h3>
     <p>Current readiness: <strong>${s.percent.toFixed(0)}%</strong>. Prioritise practical exposure, guided ownership and review checkpoints in this area.</p>
   </div>`).join("");

 window.lastSurvey=d;
 renderManagerInputs(d);
 document.getElementById("managerPanel").classList.remove("hidden");
 updateManagerComparison();
 document.getElementById("results").scrollIntoView({behavior:"smooth"});
}

function renderManagerInputs(d){
 const wrap=document.getElementById("managerScoreInputs");
 wrap.innerHTML=d.sections.map((s,i)=>`
   <div class="managerScoreItem">
     <label>${i+1}. ${s.title}</label>
     <input type="number" min="0" max="100" step="1" id="mgr_${i}" value="${Math.round(s.percent)}" aria-label="Manager score for ${s.title}">
   </div>`).join("");
}

function updateManagerComparison(){
 const d=window.lastSurvey;
 if(!d)return;
 const managerScores=d.sections.map((s,i)=>{
   const el=document.getElementById(`mgr_${i}`);
   let v=Number(el?.value);
   if(Number.isNaN(v))v=s.percent;
   return Math.max(0,Math.min(100,v));
 });
 d.managerScores=managerScores;

 let mgrWeighted=0, weightTotal=0;
 d.sections.forEach((s,i)=>{mgrWeighted+=managerScores[i]*s.weight;weightTotal+=s.weight});
 d.managerOverall=weightTotal?mgrWeighted/weightTotal:0;
 d.alignmentGap=d.overall-d.managerOverall;

 document.getElementById("comparisonArea").classList.remove("hidden");
 renderAlignment(d);
 renderHeatmap(d);
 drawRadar(d.sections.map(s=>s.percent),managerScores,d.sections.map(s=>shortenLabel(s.title)));
}

function renderAlignment(d){
 const wrap=document.getElementById("alignmentSummary");
 const overallGap=d.alignmentGap;
 const cls=Math.abs(overallGap)<5?"gapSame":overallGap>0?"gapPos":"gapNeg";
 const label=Math.abs(overallGap)<5?"Aligned":overallGap>0?"Self Higher":"Manager Higher";
 wrap.innerHTML=`
   <div class="reportGrid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
     <div class="reportMetric"><span>Self</span><b>${d.overall.toFixed(1)}%</b></div>
     <div class="reportMetric"><span>Manager</span><b>${d.managerOverall.toFixed(1)}%</b></div>
     <div class="reportMetric"><span>Gap</span><b>${overallGap>=0?"+":""}${overallGap.toFixed(1)}%</b></div>
   </div>
   ${d.sections.map((s,i)=>{
      const gap=s.percent-d.managerScores[i];
      const c=Math.abs(gap)<5?"gapSame":gap>0?"gapPos":"gapNeg";
      return `<div class="alignCard">
        <div>
          <strong>${s.title}</strong>
          <div class="alignMeta">Self ${s.percent.toFixed(0)}% • Manager ${d.managerScores[i].toFixed(0)}%</div>
        </div>
        <div class="gapBadge ${c}">${gap>=0?"+":""}${gap.toFixed(0)}%</div>
      </div>`;
   }).join("")}
   <p class="alignMeta" style="margin-top:12px"><strong>${label}:</strong> gaps below 5 percentage points are treated as broadly aligned.</p>`;
}

function renderHeatmap(d){
 const wrap=document.getElementById("heatmap");
 wrap.innerHTML=d.sections.map((s,i)=>{
   const score=d.managerScores?.length ? (s.percent+d.managerScores[i])/2 : s.percent;
   const cls=score>=75?"heatGreen":score>=55?"heatAmber":"heatRed";
   const label=score>=75?"Stronger Readiness":score>=55?"Developing":"Priority Support";
   return `<div class="heatCell ${cls}">
      <h4>${s.title}</h4>
      <div class="heatScore">${score.toFixed(0)}%</div>
      <p><strong>${label}</strong><br>${heatmapAction(score)}</p>
   </div>`;
 }).join("");
}

function heatmapAction(score){
 if(score>=75)return"Maintain ownership and introduce stretch responsibilities.";
 if(score>=55)return"Continue guided exposure with clear checkpoints and coaching.";
 return"Prioritise structured learning, shadowing and manager support in the next 60–90 days.";
}

function shortenLabel(label){
 return label
   .replace("Resolver Process & Operational Knowledge","Process & Ops")
   .replace("Performance & Data Management","Performance & Data")
   .replace("Team Leadership & People Management","Team Leadership")
   .replace("Client Management & Stakeholder Confidence","Client Confidence")
   .replace("Decision Making & Ownership","Decision & Ownership")
   .replace("Governance & Improvement","Governance");
}

function drawRadar(selfScores,managerScores,labels){
 const canvas=document.getElementById("radarCanvas");
 if(!canvas)return;
 const ctx=canvas.getContext("2d");
 const dpr=window.devicePixelRatio||1;
 const cssW=canvas.clientWidth||600, cssH=460;
 canvas.width=cssW*dpr;canvas.height=cssH*dpr;canvas.style.height=cssH+"px";
 ctx.scale(dpr,dpr);
 ctx.clearRect(0,0,cssW,cssH);

 const cx=cssW/2, cy=cssH/2+10, radius=Math.min(cssW,cssH)*0.34, n=labels.length;
 const angleStep=Math.PI*2/n, start=-Math.PI/2;

 ctx.font="11px Arial";
 ctx.textAlign="center";ctx.textBaseline="middle";

 // Grid
 for(let level=1;level<=5;level++){
   const r=radius*level/5;
   ctx.beginPath();
   for(let i=0;i<n;i++){
     const a=start+i*angleStep,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
     i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
   }
   ctx.closePath();ctx.strokeStyle="rgba(120,130,160,.25)";ctx.lineWidth=1;ctx.stroke();
 }
 for(let i=0;i<n;i++){
   const a=start+i*angleStep;
   ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*radius,cy+Math.sin(a)*radius);
   ctx.strokeStyle="rgba(120,130,160,.2)";ctx.stroke();

   const lx=cx+Math.cos(a)*(radius+45),ly=cy+Math.sin(a)*(radius+32);
   ctx.fillStyle=getComputedStyle(document.body).getPropertyValue("--text")||"#111827";
   ctx.fillText(labels[i],lx,ly);
 }

 plotRadar(ctx,selfScores,cx,cy,radius,start,angleStep,"rgba(91,76,245,.20)","#5b4cf5");
 plotRadar(ctx,managerScores,cx,cy,radius,start,angleStep,"rgba(18,168,160,.14)","#12a8a0");
}

function plotRadar(ctx,scores,cx,cy,radius,start,angleStep,fill,stroke){
 ctx.beginPath();
 scores.forEach((score,i)=>{
   const r=radius*(score/100),a=start+i*angleStep,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
   i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
 });
 ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=2.5;ctx.stroke();
 scores.forEach((score,i)=>{
   const r=radius*(score/100),a=start+i*angleStep,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
   ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=stroke;ctx.fill();
 });
}

function saveProgress(){
 localStorage.setItem("resolverManagerDashboardV3",JSON.stringify(collectData()));
 alert("Progress saved on this device.");
}
function loadProgress(){
 const raw=localStorage.getItem("resolverManagerDashboardV3");
 if(!raw)return;
 const d=JSON.parse(raw);
 ["strengths","support","notExposed","managerSupport","clientConfidence","priorities"].forEach(id=>{
   if(document.getElementById(id))document.getElementById(id).value=d[id]||"";
 });
 d.sections?.forEach((s,si)=>{
  s.values?.forEach((v,qi)=>{
   if(v!==null){
    const el=document.querySelector(`input[name="q_${si}_${qi}"][value="${v}"]`);
    if(el)el.checked=true;
   }
  });
  s.notes?.forEach((n,qi)=>{
   const el=document.getElementById(`note_${si}_${qi}`);if(el)el.value=n||"";
  });
 });
 updateProgress();
}
function toggleDark(){document.body.classList.toggle("dark")}
function downloadCSV(){
 const d=window.lastSurvey||collectData();
 const rows=[["Overall Readiness",d.overall?.toFixed(1)+"%"||""],[],["Capability","Weight","Readiness","Not Yet Exposed"]];
 d.sections.forEach(s=>rows.push([s.title,s.weight+"%",s.percent.toFixed(1)+"%",s.notExposed]));
 rows.push([],["Reflection","Response"],["Most confident areas",d.strengths],["Learning / coaching required",d.support],["Not sufficiently exposed",d.notExposed],["Manager support",d.managerSupport],["Client confidence support",d.clientConfidence],["Next priorities",d.priorities]);
 const csv=rows.map(r=>r.map(x=>`"${String(x??"").replaceAll('"','""')}"`).join(",")).join("\n");
 saveBlob(csv,"resolver_manager_90_day_readiness.csv","text/csv");
}
function downloadJSON(){
 const d=window.lastSurvey||collectData();
 saveBlob(JSON.stringify(d,null,2),"resolver_manager_90_day_readiness.json","application/json");
}
function saveBlob(content,name,type){
 const blob=new Blob([content],{type});const a=document.createElement("a");
 a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);
}

document.querySelectorAll(".navItem").forEach(btn=>{
 btn.addEventListener("click",()=>{
   document.querySelectorAll(".navItem").forEach(x=>x.classList.remove("active"));
   btn.classList.add("active");
   document.getElementById(btn.dataset.target).scrollIntoView({behavior:"smooth"});
 });
});

renderStepper();
renderSurvey();
loadProgress();
updateProgress();

window.addEventListener("resize",()=>{
  if(window.lastSurvey?.managerScores){
    drawRadar(
      window.lastSurvey.sections.map(s=>s.percent),
      window.lastSurvey.managerScores,
      window.lastSurvey.sections.map(s=>shortenLabel(s.title))
    );
  }
});
