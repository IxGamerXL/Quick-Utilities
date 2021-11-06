defname=Vars.player.name;
macros={};

function help(){Log.info("[orange]place(block,team,x,y) - Returning + World Utility [lightgrey](Returns built block)");
Log.info("[orange]fill(block,team,x1,y1,x2,y2) - World Utility");
Log.info("[orange]destroy(x,y) - World Utility");
Log.info("[orange]team(team,playername) - Player Utility");
Log.info("[orange]spawn(unit,count,team,x,y) - Returning + Unit Utility [lightgrey](Returns spawned unit (obj/table) & unit count)");
Log.info("[green]rules() - Game Utility");
Log.info("[green]changeDefault(newname) - Misc");
Log.info("[green]info(playername) - Player Utility");
Log.info("[orange]kill(playername) - Player Utility");
Log.info("[orange]infhp(playername) - Player Utility");
Log.info("[green]checkrad(radius) - World Utility [lightgrey](Lags if radius is too large, WIP)");
Log.info("[green]getPlr(playername) - Returning Function [lightgrey](Returns player instance)");
Log.info("[green]createMacro(key,message) - Chat Utility");
Log.info("[green]m(key) - Chat Utility")}
 
function getPlr(name){ findp=name => Groups.player.find(e=>Strings.stripColors(e.name)==name); if(name==null) name=defname; p = findp(name); return p}
 
function place(block,t,x,y){ p=getPlr(); if(x==null) Math.floor(x=p.x/8); if(y==null) y=Math.floor(p.y/8); if(t==null) t=p.team(); ConstructBlock.constructFinish(Vars.world.tile(x,y),block,null,0,t,null); Log.info("Built block: "+block+" for "+t+" at "+x+","+y); bd=Vars.world.tile(x,y).build; return bd}
 
function fill(block,t,x1,y1,x2,y2){ p=getPlr(); if(x2==null){ x2=x1; y2=y1; x1=Math.floor(p.x/8); y1=Math.floor(p.y/8)} if(t==null) t=p.team(); c=0; for(let l=y1-1; l <= y2; l++){ for(let l2=x1-1; l2 <= x2; l2++){ if(Vars.world.tile(l2,l).block() !== block){ if(block !== null) ConstructBlock.constructFinish(Vars.world.tile(l2,l),block,null,0,t,null); if(block==null) ConstructBlock.deconstructFinish(Vars.world.tile(l2,l),Vars.world.tile(l2,l).block(),null); c++}}} Log.info("Successfully filled "+c+" tiles.")}
 
function destroy(x,y){ p=getPlr(); if(x==null) x=Math.floor(p.x/8); if(y==null) y=Math.floor(p.y/8); ConstructBlock.deconstructFinish(Vars.world.tile(x,y),Vars.world.tile(x,y).block(),null); Log.info("Broke block at coordinates: "+x+","+y)}
 
function team(t,name){ p=getPlr(name); p.team(t); disn=p.name; Log.info("Changed "+disn+"'s team to "+t)}
 
function spawn(unit,c,t,x,y){ p=getPlr(); if(x==null) x=p.x/8; if(y==null) y=p.y/8; if(t==null) t=p.team(); if(c==null) c=1; if(c>100) c=100; if(c==1) u=null; if(c>1) u={}; for(let l = 0; l < c; l++){ if(c==1){ u=unit.spawn((x+0.01*l)*8,y*8); u.team=t; Log.info("Spawned unit: "+unit+" for "+t+" at "+x+","+y)} if(c>1){ u[l]=unit.spawn((x+0.01*l)*8,y*8); u[l].team=t}} if(c>1) Log.info("Spawned "+c+" units: "+unit+" for "+t+" at "+x+","+y); return u,c}
 
function rules(){
Log.warn("Rule Relaying...");
Log.info("Waves: "+Vars.state.rules.waves);
Log.info("Wave Timer: "+Vars.state.rules.waveTimer);
Log.info("Wave Spacing: "+Vars.state.rules.waveSpacing/60);
Log.info("Infinite Resources: "+Vars.state.rules.infiniteResources);
Log.info("Reactor Explosions: "+Vars.state.rules.reactorExplosions);
Log.info("Fire Spread: "+Vars.state.rules.fire);
Log.info("Build Cost Multiplier: "+Vars.state.rules.buildCostMultiplier);
Log.info("Build Speed Multiplier: "+Vars.state.rules.buildSpeedMultiplier);
Log.info("Deconstruct Refund Multiplier: "+Vars.state.rules.deconstructRefundMultiplier);
Log.info("Block Health Multiplier: "+Vars.state.rules.blockHealthMultiplier);
Log.info("Block Damage Multiplier: "+Vars.state.rules.blockDamageMultiplier);
Log.info("Unit Damage Multiplier: "+Vars.state.rules.unitDamageMultiplier);
Log.warn("Finished relaying!");
}
 
function changeDefault(newname){ if(newname==null){ Log.warn("Name cannot be null."); return} p=getPlr(newname); if(p==null){ Log.warn("Player doesn't exist."); return} defname = newname; Log.info("The default target has been changed to "+p.name)}
 
function info(name){ p=getPlr(name); disn=p.name; px=Math.floor(p.x/8); py=Math.floor(p.y/8); h=Math.ceil(p.unit().health); mh=Math.ceil(p.unit().maxHealth); s=Math.ceil(p.unit().shield); if(p.unit().ammo > 1) a=Math.floor(p.unit().ammo); if(p.unit().ammo <= 1) a=Math.floor(p.unit().ammo*100)+"%"; r=Math.ceil(p.unit().armor); Log.info(disn+"'s Info"); Log.info(""); Log.info("Position: "+px+","+py); Log.info("Health: "+h+"/"+mh+" [cyan]("+r+")[]"); Log.info("Shield Health: "+s); Log.info("Ammo: "+a); Log.info("Unit: "+p.unit().type); Log.info("Team: "+p.unit().team);}

function kill(name){ p=getPlr(); p.unit().health = 0; Log.info("Internally discharged "+p.name+"'s electrical circuits, killing them in the process.")}

function infhp(name){ p=getPlr(); p.unit().maxHealth = Infinity; p.unit().health = Infinity; p.unit().shield = Infinity; p.unit().armor = Infinity; Log.info("[pink]Gave "+p.name+" the ultimate power of Infinity, enhancing all defense stats![]")}

function checkrad(r){ blockHistory = {}; same = false; mh = 0; p=getPlr(); px=p.x/8; py=p.y/8; function cf(ox,oy){ same = false; br=Vars.world.tile(px+ox,py+oy); if(br.block() !== Blocks.air){ Log.info(br); btype=br.block()} if(br.block() == null){ Log.info("non-existent"); return} if(btype == Blocks.air){ Log.info("nope"); return} for (let lh = 0; lh < mh; lh++) { if(same) return; if(br.build == blockHistory[lh]) same = true;} if(same) return; mh++; blockHistory[mh] = br.build; b=br.build; bx=b.x/8; by=b.y/8; Log.info("Found: [stat]"+btype+"[] -> Pos:[red]"+bx+"[],[green]"+by+"[]; Health: [lime]"+Math.ceil(b.health)+"[]; Team: "+b.team)} for (let ly = -1-r; ly < r; ly++) { for (let lx = -1-r; ly < r; ly++) { cf(px+lx,py+ly) }} }
 
function createMacro(key,msg){ macros[key] = msg}
 
function m(key){ Call.sendChatMessage(macros[key])}
 
Log.info("Quick Utilities 0.2.1 by IxGamerXL"); Log.info("All functions loaded. Use help() to see functions.");