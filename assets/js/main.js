(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Sauce of the week
  var SW=[['Puttanesca','Tomatoes, olives, capers and a little chilli: bold, briny and ready in 20 minutes.'],
    ['Aglio, olio e peperoncino','Garlic gently sizzled in olive oil with chilli and parsley. The ultimate midnight pasta.'],
    ['Arrabbiata','A fiery tomato sauce with plenty of garlic and dried chilli.'],
    ['Pasta al limone','Lemon zest, butter and grated hard cheese for a bright, silky sauce.'],
    ['Tuna and tomato','Pantry tuna simmered in tomato with capers and parsley.'],
    ['Pangrattato','Crispy garlic breadcrumbs make a crunchy topping when cheese runs out.'],
    ['Fresh tomato and basil','Ripe tomatoes, torn basil and good olive oil, barely cooked.'],
    ['Cacio e pepe','Pecorino and black pepper emulsified with starchy pasta water.']];
  var d=new Date(),t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())),dn=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-dn);
  var wk=Math.ceil(((t-new Date(Date.UTC(t.getUTCFullYear(),0,1)))/864e5+1)/7),sw=document.getElementById('sow');
  if(sw){var s=SW[wk%SW.length];sw.querySelector('.wk b').textContent=wk;sw.querySelector('h2').textContent=s[0];sw.querySelector('p').textContent=s[1];}
  // Pantry pasta builder
  var DISH={putt:['Spaghetti alla puttanesca',['tomatoes','olives','capers','garlic','chilli','anchovies'],'Contains anchovies; leave them out for a vegetarian version.'],
    aglio:['Spaghetti aglio, olio e peperoncino',['garlic','chilli','parsley'],'Vegan. Cook the garlic gently so it turns golden, never brown.'],
    tonno:['Pasta al tonno',['tuna','tomatoes','garlic','capers','parsley'],'Contains fish. Drain the tuna well and add it at the end.'],
    limone:['Pasta al limone',['lemon','parmesan','garlic'],'Vegetarian if you use a rennet-free hard cheese.'],
    arrab:['Penne all&#8217;arrabbiata',['tomatoes','garlic','chilli','parsley'],'Vegan. Adjust the chilli to taste.'],
    pang:['Spaghetti with garlic pangrattato',['breadcrumbs','garlic','chilli','lemon','parsley'],'Vegan. Toast the crumbs in olive oil until golden and crisp.']};
  var pf=document.getElementById('pantry');
  function pantry(){if(!pf)return;var have=[].slice.call(pf.querySelectorAll('input:checked')).map(function(x){return x.value;}),best=null,bs=-1,bm=[];
    for(var k in DISH){var req=DISH[k][1],h=req.filter(function(r){return have.indexOf(r)>-1;}).length,sc=h/req.length+h*0.01;if(sc>bs){bs=sc;best=k;bm=req.filter(function(r){return have.indexOf(r)<0;});}}
    var dd=DISH[best],pct=Math.round((dd[1].length-bm.length)/dd[1].length*100);
    document.getElementById('d-name').innerHTML=dd[0];document.getElementById('d-pct').textContent=pct+'%';document.getElementById('d-bar').style.width=pct+'%';
    document.getElementById('d-need').innerHTML=bm.length?'You still need: <b>'+bm.join(', ')+'</b>.':'You have everything you need. Put the water on!';
    document.getElementById('d-note').innerHTML=dd[2];
    document.querySelectorAll('[data-dish]').forEach(function(i){i.hidden=i.dataset.dish!==best;});}
  if(pf){pf.addEventListener('change',pantry);pantry();}
  // Portion calculator
  var pp=document.getElementById('ppl'),np=4;
  function portion(){if(!pp)return;var a=document.querySelector('[name=app]:checked').value,g=a==='light'?75:a==='hungry'?125:100,tot=g*np,l=Math.max(2,Math.round(tot/100*10)/10),sl=Math.round(l*10);
    pp.textContent=np;document.getElementById('o-g').textContent=tot+' g';document.getElementById('o-l').textContent=l+' L';document.getElementById('o-s').textContent=sl+' g';}
  document.querySelectorAll('[data-np]').forEach(function(x){x.addEventListener('click',function(){np=Math.min(12,Math.max(1,np+parseInt(x.dataset.np,10)));portion();});});
  document.querySelectorAll('[name=app]').forEach(function(x){x.addEventListener('change',portion);});portion();
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('pg_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('pg_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
