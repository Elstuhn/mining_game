function hide(thing) {
  if (thing == "before") {
  document.getElementById("before").remove();
  } else if (thing == "closehelp") {
    document.getElementById("helpscreen").style.display = "none";
  } else if (thing == "shopclose") {
    document.getElementById("shopmain").style.display = "none";
  } else if (thing == "uncover") {
    document.getElementById("uncover").style.visibility = "hidden";
  }
}
var rarity = 0;
var _yield = 0;
var rebirthAmt = 0;

function show(thing) {
  if (thing == "help") {
    document.getElementById("helpscreen").style.display = "inline-block";
  } else if (thing == "shop") {
    document.getElementById("shopmain").style.display = "inline-block";
  } else if (thing == "uncover") {
    document.getElementById("uncover").style.visibility = "visible";
  }
}

function closehelp() {
  document.getElementById("helpscreen").style.display = "none";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

ores = ['stone', 'coal', 'iron', 'titanium', 'tin', 'silver', 'copper', 'gold', 'diamond', 'emerald', 'uranium']

async function mine() {
  var count = 0;
  var multiplier = 1;
  for (let i=1;i<12;i++) {
    var random = Math.floor((Math.random() * multiplier) + 1); 
    if (random == 1) {
      var random = Math.floor((Math.random() * 3+_yield) + 1);
      updatelogs(`Mined ${random} ${ores[count]}`);
      var ore = document.getElementById(`${ores[count]}`).innerHTML;
      var x = ore.indexOf("x");
      var amount = ore.slice(x+1);
      amount = Number(amount)+random;
      document.getElementById(ores[count]).innerHTML = ore.slice(0, x+1)+String(amount);
    }
    count++;
    multiplier*=(2.1-rarity);
  }
  var random = Math.floor((Math.random() * 16000)+1)
  if (random==1) {
    updatelogs("Mined 1 Automine Card!");
    var automine = document.getElementById("autominecard").innerHTML;
    var x = automine.indexOf(":");
    var autominecard = automine.slice(x+2);
    autominecard = Number(autominecard) + 1;
    autominecard = String(autominecard);
    document.getElementById("autominecard").innerHTML = automine.slice(0, x+2) + autominecard;
    show("uncover");
    await sleep(4000);
    hide("uncover");
    }
}

function sell() {
  var money = 0;
  for (let i=0;i<11;i++) {
    console.log(document.getElementById(`${ores[i]}`).innerHTML);
    var ore = document.getElementById(`${ores[i]}`).innerHTML;
    var x = ore.indexOf("x");
    var amount = ore.slice(x+1);
    var orename = ore.slice(0, x-1);
    if (orename=="Stone") {
      money += Number(amount)*0.5;
    } else if (orename=="Coal") {
      money += Number(amount) * 0.8;
    } else if (orename=="Iron") {
      money += Number(amount) * 1.5;
    } else if (orename=="Titanium") {
      money += Number(amount) * 2.2;
    } else if (orename=="Tin") {
      money += Number(amount) * 3;
    } else if (orename=="Silver") {
      money += Number(amount) * 3.8;
    } else if (orename=="Copper") {
      money += Number(amount) * 4.5;
    } else if (orename=="Gold") {
      money += Number(amount) * 6;
    } else if (orename=="Diamond") {
      money += Number(amount) * 15;
    } else if (orename=="Emerald") {
      money += Number(amount) * 25;
    } else {
      money += Number(amount) * 35;
    }
    document.getElementById(`${ores[i]}`).innerHTML = ore.slice(0, x+1) + "0";
  }
  money = Math.floor(money*100)/100;
  updatelogs(`Sold all ores for $${money}`);
  var text = document.getElementById("money").innerHTML;
  var x = text.indexOf("$");
  var totalmoney = text.slice(x+1);
  totalmoney = Math.floor((Number(totalmoney) + money)*100)/100;
  document.getElementById("money").innerHTML = text.slice(0, x+1) + totalmoney;
}

function invbutton() {
  var text = document.getElementById("inventorytitle").value;
  if (text=="Show Inventory") {
    document.getElementById("inventorytitle").value="Hide Inventory";

    document.getElementById("inventory").style.display = "inline-block";
  } else {
    document.getElementById("inventorytitle").value="Show Inventory";

    document.getElementById("inventory").style.display = "none";
  }
}

function background(code) {
  if (code=="base") {
    document.body.style.background = "https://external-preview.redd.it/Swz0DHU8LxpDr96cZ42YCNHRxcRHqp7dyGaTRx731GM.png?format=pjpg&auto=webp&s=7da1a7b5649da987703bbad80d67a162d7c2567b"; 
  }
}

function updatelogs(update) {
  var i = 0;
  for (let i=0;i<9;i++) {
    document.getElementById("action" + String(i)).innerHTML = document.getElementById("action" + String(i+1)).innerHTML;
  }
  document.getElementById("action9").innerHTML = update;
}

async function automine() {
  var automine = document.getElementById("autominecard").innerHTML;
  var cards = automine.slice(16);
  if (document.getElementById("autominetext").value == "Automining..." || cards==0) {
    return;
  }
  if (cards>0) {
    document.getElementById("autominetext").value = "Automining...";
    document.getElementById("minestatus").src = "https://steamuserimages-a.akamaihd.net/ugc/299860700350014959/A74757226F159EED80CDE086DFA0AAEFED5A6915/";
    cards = Number(cards)-1;
    document.getElementById("autominecard").innerHTML = automine.slice(0, 16)+String(cards);

    for (let i=0;i<1001;i++) {
      mine();
      await sleep(1500);
    }
  }
  document.getElementById("autominetext").value = "Automine (Costs 1 automine card)";
  document.getElementById("minestatus").src = "https://i1.sndcdn.com/artworks-000214772235-9ldzsb-t500x500.jpg";
}

function uprarity() {
  var text = document.getElementById("raritycss").innerHTML;
  var x = text.indexOf(":");
  var level = text.slice(x+8);
  var money = document.getElementById("money").innerHTML;
  var y = money.indexOf("$");
  var dollar = money.slice(y+1);
  var required = level * 1700;
  dollar = Number(dollar);
  if (dollar >= required) {
    level = Number(level) + 1;
    rarity += 0.1;
    document.getElementById("raritycss").innerHTML = text.slice(0, 13)+ String(level*1700) + ": Level " + level; 
    x = money.indexOf(":")
    document.getElementById("money").innerHTML = money.slice(0, x+1) + ` $${String(dollar-required)}`;

  } else {
    alert("Not enough money!");
  }
}

function yieldup() {
  var text = document.getElementById("yieldcss").innerHTML;
  var x = text.indexOf(":");
  var level = text.slice(x+8);
  var money = document.getElementById("money").innerHTML;
  var y = money.indexOf("$");
  var dollar = money.slice(y+1);
  var required = level * 1600;
  dollar = Number(dollar);
  if (dollar >= required) {
    level = Number(level) + 1;
    _yield ++;
    document.getElementById("yieldcss").innerHTML = text.slice(0, 13) + String(level*1600) + `: Level ${level}`;
    console.log(dollar-required);
    console.log(text.slice(0, 13) + String(level*900) + `: Level ${level}`);
    x = money.indexOf(":");
    document.getElementById("money").innerHTML = money.slice(0, x+1) + ` $${String(dollar-required)}`;
  } else {
    alert("Not enough money!");
  }
}

function rebirth() {
  var money = document.getElementById("money").innerHTML;
  var y = money.indexOf("$");
  var dollar = money.slice(y+1);
  var required = rebirthAmt*75000;
  var cur_required = document.getElementById("rebirth").innerHTML;
  var x = cur_required.indexOf("$");
  cur_required = cur_required.slice(x+1);
  dollar = Number(dollar);
  if (dollar > required) {
    rebirthAmt++;
    
  }
}