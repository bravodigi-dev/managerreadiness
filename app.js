
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
  participantName:val("participantName"),
  participantRole:val("participantRole"),
  roleStartDate:val("roleStartDate"),
  assessmentDate:val("participantDate") || new Date().toISOString().slice(0,10),
  previousRole:val("previousRole"),
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
 if(!d.participantName){
   alert("Please enter your name under Manager Details before generating the report.");
   document.getElementById("overview").scrollIntoView({behavior:"smooth"});
   return;
 }
 if(answeredCount() < totalQuestions){
   alert(`Please complete all ${totalQuestions} assessment questions before generating your report.`);
   document.getElementById("assessment").scrollIntoView({behavior:"smooth"});
   return;
 }
 let weighted=0,totalW=0;
 d.sections.forEach(s=>{weighted+=s.percent*s.weight;totalW+=s.weight});
 d.overall=totalW?weighted/totalW:0;
 d.label=readinessLabel(d.overall);
 const sorted=[...d.sections].sort((a,b)=>a.percent-b.percent);
 const exposure=d.sections.reduce((n,s)=>n+s.notExposed,0);
 const optionText={1:"Not Yet Exposed",2:"Basic Awareness",3:"Can Manage With Guidance",4:"Can Manage Independently",5:"Can Lead / Coach Others"};
 const detailedSections=d.sections.map((s,si)=>{
   const source=sections[si];
   const rawScore=s.values.reduce((a,b)=>a+(b||0),0);
   const maxScore=s.values.length*5;
   const calcPct=maxScore?(rawScore/maxScore)*100:0;
   const counts=[1,2,3,4,5].map(v=>({v,count:s.values.filter(x=>x===v).length,label:optionText[v]}));
   return `<div class="detailSection">
    <div class="detailSectionHeader"><div class="detailHeadLeft"><span class="detailSectionNumber">${si+1}</span><div><h3>${escapeHtml(s.title)}</h3><p>Weight: ${s.weight}%</p></div></div><div class="detailScoreBox"><span>Section Readiness</span><strong>${s.percent.toFixed(0)}%</strong></div></div>
    <div class="calcBox"><strong>Section calculation:</strong> ${rawScore} selected points ÷ ${maxScore} maximum points × 100 = <strong>${calcPct.toFixed(1)}%</strong></div>
    <div class="scoreCountBox"><strong>Selected score count</strong><div class="scoreCountGrid">${counts.map(c=>`<div class="scoreCountItem count${c.v}"><span>${c.v}</span><b>${c.count}</b><small>${c.label}</small></div>`).join("")}</div></div>
    <div class="questionDetailList">${source.questions.map((q,qi)=>{const value=s.values[qi];return `<div class="questionDetailRow"><div class="detailQNo">${si+1}.${qi+1}</div><div class="detailQuestion"><div class="detailQuestionText">${escapeHtml(q)}</div><div class="detailAnswer"><span class="answerBadge answer${value}">${value}</span><strong>${escapeHtml(optionText[value]||"")}</strong></div></div></div>`}).join("")}</div>
   </div>`;
 }).join("");
 const r=document.getElementById("report");
 r.className="";
 r.innerHTML=`
   <div class="personBanner"><div><h3>${escapeHtml(d.participantName)}</h3><p>${escapeHtml(d.participantRole||"Resolver Manager")} • 90-Day Development Assessment</p></div><div><p><strong>Assessment:</strong> ${escapeHtml(d.assessmentDate||"-")}</p><p><strong>Role Start:</strong> ${escapeHtml(d.roleStartDate||"-")}</p></div></div>
   <div class="reportGrid"><div class="reportMetric"><span>Overall Self-Readiness</span><b>${d.overall.toFixed(1)}%</b></div><div class="reportMetric"><span>Current Development Stage</span><b style="font-size:18px">${d.label}</b></div><div class="reportMetric"><span>Not Yet Exposed</span><b>${exposure}</b></div></div>
   <div class="capBars"><h3>Capability Readiness Summary</h3>${d.sections.map(s=>`<div class="capRow"><div class="capTop"><span>${s.title}</span><span>${s.percent.toFixed(0)}%</span></div><div class="capBar"><div class="capFill" style="width:${Math.min(100,s.percent)}%"></div></div></div>`).join("")}</div>
   <div class="discussionBox"><h3>Discussion Focus — Next 60–90 Days</h3><div class="discussionGrid">${sorted.slice(0,3).map((s,i)=>{const c=s.percent>=75?"discGreen":s.percent>=55?"discAmber":"discRed";const t=s.percent>=75?"Strengthen / Stretch":s.percent>=55?"Developing":"Priority Support";return `<div class="discussionItem ${c}"><strong>0${i+1} • ${s.title}</strong><p>${s.percent.toFixed(0)}% — ${t}. Use this as a discussion area for practical exposure, coaching and agreed next steps.</p></div>`}).join("")}</div></div>
   <div class="reportReflection"><h3>90-Day Reflection</h3><p><b>Most confident handover areas</b><br>${nl2br(d.strengths)||"Not provided"}</p><p><b>Learning / coaching required</b><br>${nl2br(d.support)||"Not provided"}</p><p><b>Areas not sufficiently exposed</b><br>${nl2br(d.notExposed)||"Not provided"}</p><p><b>Support required from Operations Manager</b><br>${nl2br(d.managerSupport)||"Not provided"}</p><p><b>What would improve client confidence</b><br>${nl2br(d.clientConfidence)||"Not provided"}</p><p><b>Top 3 priorities for next 60–90 days</b><br>${nl2br(d.priorities)||"Not provided"}</p></div>
   <div class="detailedReport"><div class="detailedReportTitle"><span class="sectionEyebrow">QUESTIONNAIRE DETAIL</span><h2>Complete Question & Response Breakdown</h2><p>Each section shows the exact question, selected readiness option and the calculation used to derive the section percentage.</p></div>${detailedSections}</div>
   <div class="reportActions"><button class="primaryBtn" onclick="window.print()">Save / Print Detailed Report as PDF</button><button class="secondaryBtn" onclick="downloadCSV()">Download Detailed CSV</button></div>`;
 document.getElementById("actionPlanCards").innerHTML=sorted.slice(0,3).map((s,i)=>`<div class="actionCard"><span>0${i+1}</span><h3>${s.title}</h3><p>Current self-readiness: <strong>${s.percent.toFixed(0)}%</strong>. Discuss practical exposure, guided ownership and the next review checkpoint.</p></div>`).join("");
 window.lastSurvey=d;
 document.getElementById("results").scrollIntoView({behavior:"smooth"});
}
function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function nl2br(s){return escapeHtml(s).replace(/\n/g,"<br>");}

function saveProgress(){
 localStorage.setItem("resolverManagerDashboardV3",JSON.stringify(collectData()));
 alert("Progress saved on this device.");
}
function loadProgress(){
 const raw=localStorage.getItem("resolverManagerDashboardV3");
 if(!raw){
   const dateEl=document.getElementById("participantDate");
   if(dateEl) dateEl.value=new Date().toISOString().slice(0,10);
   return;
 }
 const d=JSON.parse(raw);
 if(document.getElementById("participantDate")) document.getElementById("participantDate").value=d.assessmentDate||d.date||new Date().toISOString().slice(0,10);
 ["participantName","participantRole","roleStartDate","assessmentDate","previousRole","strengths","support","notExposed","managerSupport","clientConfidence","priorities"].forEach(id=>{
   if(document.getElementById(id))document.getElementById(id).value=d[id]||"";
 });
 const profileMap={participantName:"participantName",participantRole:"participantRole",roleStartDate:"roleStartDate",previousRole:"previousRole"};
 Object.entries(profileMap).forEach(([key,id])=>{const el=document.getElementById(id);if(el)el.value=d[key]||el.value||"";});
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

function startNewAssessment(){
 const confirmed=confirm("Start a new assessment? This will clear all saved answers, notes, reflections and manager details on this device.");
 if(!confirmed) return;
 localStorage.removeItem("resolverManagerDashboardV3");
 window.lastSurvey=null;
 location.href=location.pathname;
}

function toggleDark(){document.body.classList.toggle("dark")}
function downloadCSV(){
 const d=window.lastSurvey||collectData();
 const optionText={1:"Not Yet Exposed",2:"Basic Awareness",3:"Can Manage With Guidance",4:"Can Manage Independently",5:"Can Lead / Coach Others"};
 const rows=[["Resolver Manager 90-Day Self-Assessment — Detailed Report"],["Manager Name",d.participantName||""],["Current Role",d.participantRole||""],["Role Start",d.roleStartDate||""],["Assessment Date",d.assessmentDate||""],["Previous Role",d.previousRole||""],[],["Overall Self-Readiness",d.overall?.toFixed(1)+"%"||""],[],["SECTION SUMMARY"],["Capability","Weight","Readiness","Not Yet Exposed"]];
 d.sections.forEach(s=>rows.push([s.title,s.weight+"%",s.percent.toFixed(1)+"%",s.notExposed]));
 rows.push([], ["DETAILED QUESTIONNAIRE"], ["Section","Question No.","Question","Selected Score","Selected Option","Section %"]);
 d.sections.forEach((s,si)=>{sections[si].questions.forEach((q,qi)=>{const selected=s.values[qi];rows.push([s.title,`${si+1}.${qi+1}`,q,selected,optionText[selected]||"",s.percent.toFixed(1)+"%"]);});});
 rows.push([], ["REFLECTION","Response"],["Most confident areas",d.strengths],["Learning / coaching required",d.support],["Not sufficiently exposed",d.notExposed],["Manager support",d.managerSupport],["Client confidence support",d.clientConfidence],["Next priorities",d.priorities]);
 const csv=rows.map(r=>r.map(x=>`"${String(x??"").replaceAll('"','""')}"`).join(",")).join("\n");
 saveBlob(csv,`${safe(d.participantName||"manager")}_90_day_detailed_assessment.csv`,"text/csv");
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

(function(){
 const el=document.getElementById("participantDate");
 if(el && !el.value) el.value=new Date().toISOString().slice(0,10);
})();
