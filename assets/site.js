(function(){
var b=document.querySelector('.burger'),n=document.querySelector('nav');
if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var ZID='19907806',LIB='https://www.zotero.org/krishnamboori/library';
var TY={journalArticle:'Journal Article',bookSection:'Book Chapter',book:'Book',conferencePaper:'Conference Paper',preprint:'Preprint',thesis:'Thesis',report:'Report'};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function safe(u){return /^https?:\/\//i.test(u||'')?u:''}
async function load(){var all=[],st=0;
for(;;){var r=await fetch('https://api.zotero.org/users/'+ZID+'/items/top?format=json&sort=date&direction=desc&limit=100&start='+st);
if(!r.ok)throw new Error(r.status);var j=await r.json();all=all.concat(j);st+=j.length;if(j.length<100)break}
return all.map(function(x){return x.data}).filter(function(d){return ['attachment','note','annotation'].indexOf(d.itemType)<0&&d.title})}
function item(d){var a=(d.creators||[]).filter(function(c){return !c.creatorType||c.creatorType==='author'}).map(function(c){return c.name||((c.lastName||'')+' '+(c.firstName||'').split(/\s+/).map(function(p){return p.charAt(0)}).join(''))});
if(a.length>8)a=a.slice(0,8).concat('et al.');
var y=((d.date||'').match(/\d{4}/)||[''])[0],v=d.publicationTitle||d.bookTitle||d.proceedingsTitle||d.repository||d.publisher||'';
var u=d.DOI?'https://doi.org/'+d.DOI:safe(d.url);
var m=[v?'<i>'+esc(v)+'</i>':'',y,d.volume?'vol. '+esc(d.volume):'',d.pages?'pp. '+esc(d.pages):''].filter(Boolean).join(', ');
return{y:y||'Undated',t:d.itemType,h:'<div class="pub"><span class="t">'+esc(TY[d.itemType]||d.itemType)+'</span><h4>'+(u?'<a href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(d.title)+'</a>':esc(d.title))+'</h4><div class="m">'+esc(a.join(', '))+'</div><div class="m">'+m+'</div></div>',q:(d.title+' '+a.join(' ')+' '+v).toLowerCase()}}
function fail(el){el.innerHTML='<div class="zmsg"><b>Publications are loading from Zotero.</b> If they do not appear, please view the complete list directly on our <a href="'+LIB+'" target="_blank" rel="noopener">Zotero library</a>.</div>'}
document.querySelectorAll('[data-zotero]').forEach(function(el){
var mode=el.getAttribute('data-zotero');el.innerHTML='<p>Loading publications from Zotero…</p>';
load().then(function(items){var L=items.map(item);
document.querySelectorAll('[data-zot-count]').forEach(function(c){c.textContent=L.length+(L.length>=20?'+':'')});
if(mode==='latest'){el.className='grid g3';el.innerHTML=L.slice(0,3).map(function(i){return'<div class="card">'+i.h+'</div>'}).join('')||'';return}
var f='all',q='',types=['all'].concat(Object.keys(TY).filter(function(k){return L.some(function(i){return i.t===k})}));
el.innerHTML='<div class="zbar" id="zb"></div><div id="zl"></div>';
var zb=el.querySelector('#zb'),zl=el.querySelector('#zl');
zb.innerHTML=types.map(function(k){return'<button type="button" data-k="'+k+'" class="'+(k==='all'?'on':'')+'">'+(k==='all'?'All':esc(TY[k]))+'</button>'}).join('')+'<input type="search" placeholder="Search publications…" aria-label="Search publications">';
function draw(){var s=L.filter(function(i){return(f==='all'||i.t===f)&&(!q||i.q.indexOf(q)>-1)}),y='',h='';
s.forEach(function(i){if(i.y!==y){y=i.y;h+='<div class="zy">'+esc(y)+'</div>'}h+=i.h});
zl.innerHTML=h||'<p>No publications match.</p>'}
zb.addEventListener('click',function(e){var k=e.target.getAttribute('data-k');if(!k)return;f=k;zb.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===e.target)});draw()});
zb.querySelector('input').addEventListener('input',function(e){q=e.target.value.toLowerCase();draw()});
draw()}).catch(function(){fail(el)})});
var cf=document.getElementById('cform');
if(cf)cf.addEventListener('submit',function(e){e.preventDefault();var g=function(k){return cf.elements[k].value};
var body='Name: '+g('name')+'\nEmail: '+g('email')+'\nOrganization: '+g('org')+'\nInquiry type: '+g('type')+'\n\n'+g('msg');
location.href='mailto:ceo_biopharma@outlook.com?cc=namboorikrishnan@gmail.com&subject='+encodeURIComponent('Website inquiry: '+g('type'))+'&body='+encodeURIComponent(body)});
})();
