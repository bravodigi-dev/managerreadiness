
const sections = [
{
 title:"1. Resolver Process & Operational Knowledge", weight:25,
 note:"Initial handover foundation: Resolver workflow, LOB ownership, case lifecycle, escalation flow, ageing and operational priorities.",
 questions:[
  "I understand the end-to-end Resolver operating model and how it differs from an Inbound Voice environment.",
  "I understand the key Resolver LOBs and responsibilities: Billing Resolver, General Enquiry, Network Resolver and Anti-Scam.",
  "I understand the Resolver case lifecycle from case creation/receipt through handling, follow-up, escalation and closure.",
  "I understand the meaning and required action for Open, Support Responded, Customer Responded, Waiting for Info and other relevant case statuses.",
  "I understand L1, L2 and L3 ownership boundaries and when a case should be escalated or returned.",
  "I understand the key case prioritisation logic including ageing, SLA risk, customer impact, urgency and dependency.",
  "I understand how AFRT, unresolved balance and ageing are affected by daily case management.",
  "I understand Network / ITSM / NGA Tech escalation flows and the common errors that can cause rework.",
  "I understand Parent Case handling during identified outages and how duplicate escalation should be reduced.",
  "I understand the role of Daisy and other operational tools used by the Resolver team.",
  "I can explain the difference between operational backlog, L3 dependency and cases that remain actionable by Resolver.",
  "I can independently identify which Resolver cases require urgent management attention."
 ]
},
{
 title:"2. Performance & Data Management", weight:15,
 note:"Handover expectation: understand the Resolver scorecard, daily/weekly performance health and how to translate data into actions.",
 questions:[
  "I understand the main Resolver KPIs and how each metric is calculated or interpreted.",
  "I can independently interpret AFRT, unresolved balance, ageing, CSAT, quality and productivity trends.",
  "I understand the expected case balance / ageing position and can identify when performance is moving outside expectation.",
  "I can review weekly trend movements and identify the likely operational drivers behind an increase or decline.",
  "I can identify agent or team outliers and determine whether the issue is behavioural, knowledge-related, process-related or dependency-related.",
  "I understand how DSAT is reviewed and the difference between Agent Error and Non-Agent Error.",
  "I can use data to prepare an RCA instead of only describing the performance result.",
  "I can convert an RCA into clear actions, owners and completion timelines.",
  "I can track whether the agreed action has resulted in actual performance improvement."
 ]
},
{
 title:"3. Team Leadership & People Management", weight:20,
 note:"Handover expectation: establish leadership presence, understand the team and drive Team Leader ownership.",
 questions:[
  "I have established regular engagement with the Team Leaders under Resolver.",
  "I understand the roles, strengths and development areas of the Team Leaders supporting Resolver.",
  "I have sufficient visibility of agent performance, attendance, behaviour and operational challenges.",
  "I can coach Team Leaders rather than directly taking over issues that should remain under TL ownership.",
  "I can challenge incomplete actions and ensure follow-up until closure.",
  "I can set clear expectations and hold Team Leaders accountable for operational deliverables.",
  "I understand the expected governance for agent coaching, error tracking and improvement follow-up.",
  "I can manage competing people and operational priorities without losing visibility of pending actions.",
  "I can maintain leadership continuity and ensure proper handover when I am unavailable.",
  "I am building sufficient subject-matter knowledge to earn confidence from the Resolver team.",
  "I can identify where the team requires refresher training, SME support or process reinforcement."
 ]
},
{
 title:"4. Client Management & Stakeholder Confidence", weight:15,
 note:"Handover expectation: progressively build confidence to represent Resolver independently in client and cross-functional discussions.",
 questions:[
  "I understand the client's current expectations and concerns relating to Resolver performance.",
  "I can confidently present Resolver performance and explain what is driving the result.",
  "I can explain an operational issue using Issue → RCA → Impact → Action → Owner → Timeline.",
  "I can answer routine client questions about Resolver without depending heavily on another manager.",
  "I can clearly distinguish between an internal operational gap and a dependency requiring client/L3 support.",
  "I follow through on commitments made during client discussions and provide updates without being prompted.",
  "I can engage L3, Governance, WFM, Training, QA and other support teams when their involvement is required.",
  "I am comfortable raising a risk early rather than waiting until it becomes a larger client concern.",
  "I can communicate what the team has already done, what remains open and what support is required.",
  "I understand the level of urgency expected when the client highlights an escalated matter."
 ]
},
{
 title:"5. Decision Making, Ownership & Operational Control", weight:15,
 note:"Handover expectation: move from observing the operation to independently controlling, prioritising and driving closure.",
 questions:[
  "I understand which decisions I am expected to make independently as the Resolver Manager.",
  "I know when an issue should be managed within Resolver and when it should be escalated to the Operations Manager.",
  "I can prioritise cases or actions based on customer impact, SLA, ageing, volume and business risk.",
  "I take ownership of an issue until the owner, next step and closure path are clear.",
  "I can make timely operational decisions during volume spikes, outages or emerging performance risks.",
  "I can identify when a process gap is repeatedly creating rework or avoidable escalation.",
  "I can challenge unclear ownership between L1, L2, L3 or support functions.",
  "I can independently drive recovery actions when a KPI is below expectation.",
  "I can balance short-term firefighting with the longer-term actions required to prevent recurrence.",
  "I am increasingly confident making decisions without excessive reliance on my reporting manager."
 ]
},
{
 title:"6. Governance, Improvement & Resolver Development", weight:10,
 note:"Handover expectation: understand recurring governance, improvement programmes and the manager's role in driving sustainable change.",
 questions:[
  "I understand the recurring Resolver governance cadence and the purpose of each review.",
  "I understand the current Network / ITSM escalation improvement initiatives and the role of Resolver in those actions.",
  "I understand how recurring agent errors should be captured, reviewed and converted into coaching or process actions.",
  "I can differentiate whether an improvement requires a people, process, system or policy solution.",
  "I can track improvement actions with a clear PIC, due date and status.",
  "I can validate whether an implemented improvement is actually reducing errors, rework or ageing.",
  "I can identify trends that should be elevated to the client or relevant support team.",
  "I understand the importance of cross-functional alignment between Operations, L3, Governance, QA, Training and WFM.",
  "I can independently lead a basic improvement discussion and provide a progress update.",
  "I have identified at least one area where I can personally improve the Resolver operation over the next 90 days."
 ]
}
];

function renderSurvey(){
 const form=document.getElementById("surveyForm"); form.innerHTML="";
 sections.forEach((s,si)=>{
  const card=document.createElement("section"); card.className="card";
  card.innerHTML=`<div class="handoverTag">HANDOVER-BASED</div><h2>${s.title}</h2>
    <p class="sectionNote">${s.note}</p><p><strong>Weight:</strong> ${s.weight}%</p>`;
  s.questions.forEach((q,qi)=>{
   const div=document.createElement("div"); div.className="question";
   div.innerHTML=`<div class="qtext">${qi+1}. ${q}</div>
    <div class="rating">${[1,2,3,4,5].map(v=>`<label><input type="radio" name="q_${si}_${qi}" value="${v}"> ${v}</label>`).join("")}</div>`;
   card.appendChild(div);
  });
  form.appendChild(card);
 });
 document.getElementById("date").value ||= new Date().toISOString().slice(0,10);
}

function collectData(){
 const result={
  name:val("name"),date:val("date"),strengths:val("strengths"),support:val("support"),
  notExposed:val("notExposed"),managerSupport:val("managerSupport"),
  clientConfidence:val("clientConfidence"),priorities:val("priorities"),sections:[]
 };
 sections.forEach((s,si)=>{
  let values=s.questions.map((_,qi)=>{
   const c=document.querySelector(`input[name="q_${si}_${qi}"]:checked`);
   return c?Number(c.value):null;
  });
  const answered=values.filter(v=>v!==null);
  const avg=answered.length?answered.reduce((a,b)=>a+b,0)/answered.length:0;
  const exposureCount=values.filter(v=>v===1).length;
  result.sections.push({title:s.title.replace(/^\d+\.\s*/,''),weight:s.weight,values,avg,percent:avg*20,exposureCount,total:s.questions.length});
 });
 return result;
}
function val(id){return document.getElementById(id).value.trim()}

function readinessLabel(score){
 if(score>=85)return["Independent / Strong","high"];
 if(score>=70)return["Developing Well","high"];
 if(score>=50)return["Requires Guided Support","mid"];
 return["Early Learning Stage","low"];
}

function generateReport(){
 const d=collectData();
 if(!d.name){alert("Please enter the participant name.");return}
 const missing=d.sections.some(s=>s.values.some(v=>v===null));
 if(missing&&!confirm("Some questions are unanswered. Generate report anyway?"))return;
 let totalW=0, weighted=0;
 d.sections.forEach(s=>{if(s.avg>0){weighted+=s.percent*s.weight;totalW+=s.weight}});
 d.overall=totalW?weighted/totalW:0;
 [d.label,d.cls]=readinessLabel(d.overall);
 const exposure=d.sections.reduce((a,s)=>a+s.exposureCount,0);
 const totalQuestions=d.sections.reduce((a,s)=>a+s.total,0);
 d.exposurePercent=totalQuestions?exposure/totalQuestions*100:0;

 const sorted=[...d.sections].sort((a,b)=>a.percent-b.percent);
 const priorities=sorted.slice(0,3);

 const r=document.getElementById("report");r.classList.remove("hidden");
 r.innerHTML=`
  <h2>Resolver Manager 90-Day Readiness Report</h2>
  <p><strong>${esc(d.name)}</strong> • ${esc(d.date)}</p>
  <div class="summaryGrid">
   <div class="metric"><div>Overall Readiness</div><div class="big">${d.overall.toFixed(1)}%</div></div>
   <div class="metric"><div>Current Stage</div><div class="big" style="font-size:18px">${d.label}</div></div>
   <div class="metric"><div>Not Yet Exposed</div><div class="big">${exposure}</div><small>of ${totalQuestions} statements</small></div>
  </div>
  <p><span class="tag ${d.cls}">${d.label}</span></p>
  <h3>Capability Readiness</h3>
  ${d.sections.map(s=>`<div class="barRow"><div class="barTop"><span>${esc(s.title)}</span><span>${s.percent.toFixed(0)}%</span></div>
    <div class="bar"><div class="fill" style="width:${Math.min(100,s.percent)}%"></div></div>
    <small>${s.exposureCount} item(s) marked Not Yet Exposed</small></div>`).join("")}
  <h3>Suggested Development Focus</h3>
  ${priorities.map((s,i)=>`<div class="priorityBox"><strong>${i+1}. ${esc(s.title)}</strong> — ${s.percent.toFixed(0)}% readiness</div>`).join("")}
  <h3>90-Day Reflection</h3>
  <p><strong>Most confident handover areas:</strong><br>${esc(d.strengths||"Not provided")}</p>
  <p><strong>Learning / coaching required:</strong><br>${esc(d.support||"Not provided")}</p>
  <p><strong>Areas not sufficiently exposed:</strong><br>${esc(d.notExposed||"Not provided")}</p>
  <p><strong>Support requested from Operations Manager:</strong><br>${esc(d.managerSupport||"Not provided")}</p>
  <p><strong>Support required to improve client confidence:</strong><br>${esc(d.clientConfidence||"Not provided")}</p>
  <p><strong>Next 60–90 day priorities:</strong><br>${esc(d.priorities||"Not provided")}</p>
  <div class="reportActions">
   <button class="primary" onclick="window.print()">Print / Save as PDF</button>
   <button class="secondary" onclick="downloadCSV()">Download CSV</button>
   <button class="secondary" onclick="downloadJSON()">Download JSON</button>
  </div>`;
 window.lastSurvey=d; r.scrollIntoView({behavior:"smooth"});
}

function saveProgress(){localStorage.setItem("resolverManager90",JSON.stringify(collectData()));alert("Progress saved on this device.")}
function loadProgress(){
 const raw=localStorage.getItem("resolverManager90");if(!raw){alert("No saved progress found.");return}
 const d=JSON.parse(raw);
 ["name","date","strengths","support","notExposed","managerSupport","clientConfidence","priorities"].forEach(id=>document.getElementById(id).value=d[id]||"");
 d.sections?.forEach((s,si)=>s.values?.forEach((v,qi)=>{if(v!==null){const el=document.querySelector(`input[name="q_${si}_${qi}"][value="${v}"]`);if(el)el.checked=true}}));
 alert("Saved progress restored.");
}
function downloadCSV(){
 const d=window.lastSurvey||collectData();
 const rows=[["Participant",d.name],["Date",d.date],["Overall Readiness",d.overall?d.overall.toFixed(1)+"%":""],[],["Capability","Weight","Readiness","Not Yet Exposed"]];
 d.sections.forEach(s=>rows.push([s.title,s.weight+"%",s.percent.toFixed(1)+"%",s.exposureCount]));
 rows.push([],["Most Confident Areas",d.strengths],["Learning/Coaching Required",d.support],["Not Yet Exposed",d.notExposed],["Manager Support",d.managerSupport],["Client Confidence Support",d.clientConfidence],["Next 60–90 Day Priorities",d.priorities]);
 const csv=rows.map(r=>r.map(x=>`"${String(x??"").replaceAll('"','""')}"`).join(",")).join("\n");
 blob(csv,`${safe(d.name)}_resolver_90_day_readiness.csv`,"text/csv");
}
function downloadJSON(){const d=window.lastSurvey||collectData();blob(JSON.stringify(d,null,2),`${safe(d.name)}_resolver_90_day_readiness.json`,"application/json")}
function blob(c,f,t){const b=new Blob([c],{type:t});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=f;a.click();URL.revokeObjectURL(a.href)}
function safe(s){return(s||"manager").replace(/[^a-z0-9_-]+/gi,"_")}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
renderSurvey();
