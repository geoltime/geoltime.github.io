"use strict";
// Define layout constant
const width = 799;

// User-defined constants
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
function hasNumber(str) {
  return typeof str === "string" && str.match(/\d/) != null;
}
const ma = hasNumber(urlParams.get("Ma")) ? urlParams.get("Ma") :
           hasNumber(urlParams.get("ma")) ? urlParams.get("ma") : null;

const range = ma === null ? null : ma.match(/([\d\.\s]+)[^\d\.\s]([\d\.\s]+)/);
const maFrom = range ? Math.max(Number(range[1]), Number(range[2])) : ma;
const maTo = range ? Math.min(Number(range[1]), Number(range[2])) : ma;

// Global function definitions
function TimeBar(units, i, barStart) {
  if (i >= units.length - 1) return;
  let unit = units[i];
  let nextUnit = units[Number(i) + 1];
  let bar = document.createElement("div");
  bar.classList.add("timeBar");
  bar.style.left = (width - (unit.start * width / barStart)) + "px";
  bar.style.width = ((unit.start - nextUnit.start) * width / barStart) + "px";
  bar.style.background = "rgb(" + unit.col + ")";
  bar.innerHTML = wikilink(unit.name);
  if (i == units.length - 2) {
    bar.style.boxShadow = "black -1px 0px 0px inset";
  }
  return bar;
}

function EmptyDiv(id = null) {
  let div = document.createElement("div");
  if (id) div.id = id;
  div.innerHTML = "&nbsp;"
  return div;
}

function wikilink(article, title = null) {
  return "<a href='https://en.wikipedia.org/wiki/" + article +
    "' title='" + article + " page on Wikipedia'>" +
    (title ? title : article) + "</a>";
}


// Draw page
if (ma != null) {
  document.title = ma + " million years ago - the geological timescale";
  document.getElementById("pageTitle").innerHTML = ma + " million years ago";
  document.getElementById("contentSub").innerHTML =
    "on the international stratigraphic timescale&nbsp;";

  let fsWhen = document.createElement("fieldset");

  function findTime(units, when) {
    let myTime = null;
    for (let i = 0; i < units.length; i++) {
      if (units[i].start < when) {
        return myTime;
      }
      myTime = units[i];
    }
  }

  let fromEon = findTime(eons, maFrom);
  let fromEra = findTime(eras, maFrom);
  let fromPeriod = findTime(periods, maFrom);
  let fromSubP = findTime(subperiods, maFrom);
  let fromEpoch = findTime(epochs, maFrom);
  // Commented out e.g. Upper Mississipian as `stages` no longer defined in 
  // periods.js; a fix, including to Update.php, would be welcome if motivated!
  let fromStage = /*(fromPeriod != null && fromPeriod.name == "Carboniferous") ?
   findTime(stages, maFrom) :*/ null;

  let toEon = findTime(eons, maTo);
  let toEra = findTime(eras, maTo);
  let toPeriod = findTime(periods, maTo);
  let toSubP = findTime(subperiods, maTo);
  let toEpoch = findTime(epochs, maTo);
  let toStage = /*(toPeriod != null && toPeriod.name == "Carboniferous") ?
   findTime(stages, maTo) :*/ null;

  fsWhen.innerHTML = "<legend>When</legend>"
    + (fromEon == null ? "Before formation of Earth" : (wikilink(fromEon.name) + " eon"))
    + (fromEra == null ? "" : (", " + wikilink(fromEra.name) + " era"))
    + (fromPeriod == null ? "" : (", " + wikilink(fromPeriod.name) + " period"))
    + (fromSubP == null ? "" : (", " + wikilink(fromSubP.name) + " subperiod"))
    + (fromEpoch == null ? "" : (", " + wikilink(fromEpoch.name) + " epoch"))
    + (fromStage == null ? "" : (", " + wikilink(fromStage.name) + " stage"))
    + ((maTo == maFrom ||
       toEon == null ||
        (toStage !== null && toStage == fromStage) ||
        (toEpoch !== null && toEpoch == fromEpoch)) ? "" :
    (
      "<br /> &mdash; to &mdash; <br />"
      + (toEon == fromEon ? "" : (wikilink(toEon.name) + " eon"))
      + (toEra == null || toEra == fromEra ? "" : (", " + wikilink(toEra.name) + " era"))
      + (toPeriod == null || toPeriod == fromPeriod ? "" : (", " + wikilink(toPeriod.name) + " period"))
      + (toSubP == null || toSubP == fromSubP ? "" : (", " + wikilink(toSubP.name) + " subperiod"))
      + (toEpoch == null || toEpoch == fromEpoch ? "" : (", " + wikilink(toEpoch.name) + " epoch"))
      + (toStage == null || toStage == fromStage ? "" : (", " + wikilink(toStage.name) + " stage"))
      )
    ).replace("<br />, ", "<br />")
  ;

  document.getElementById("laden").insertBefore(
    fsWhen,
    document.getElementById("fsTimeline")
  );
}

// Timeline content
var tlContent = document.getElementById("timelineContent")
tlContent.style.width = width + "px";
const allTimeHeight = 111;

const phanerozoic = eons[3];
const showPhanerozoic = ma == null || maFrom <= phanerozoic.start;
const pzHeight = showPhanerozoic ? 111 : 0;

const cenozoic = eras[9];
const showCenozoic = ma == null || maFrom <= cenozoic.start
const czHeight = showCenozoic ? 111 : 0;

const myaHeight = 17;

tlContent.style.height =
 (allTimeHeight + pzHeight + czHeight + myaHeight) + "px";

if (maFrom) {
  var allStart = document.createElement("div");
  allStart.id = "allStartArrow";
  allStart.classList.add("startArrow");
  allStart.innerHTML = maFrom + "&nbsp;Ma";
  allStart.style.right = width * (maFrom / eons[0].start ) - 1 + "px";

  tlContent.append(allStart);
  if (maTo != maFrom) {
    let allEnd = document.createElement("div");
    allEnd.id = "allEndArrow";
    allEnd.classList.add("endArrow");
    allEnd.innerHTML = maTo + "&nbsp;Ma";
    allEnd.style.left = (width - (width * maTo / eons[0].start )) + "px";
    tlContent.append(allEnd)
  }
}

var allTime = document.createElement("div");
allTime.id = "allTime";
allTime.classList.add("timelineHolder");
for (let i = 0; i < eons.length; i++) {
  let bar = TimeBar(eons, i, eons[0].start);
  if (bar) {
    bar.classList.add("topBar");
    allTime.append(bar);
  }
}

for (let i = 0; i < eras.length; i++) {
  let bar = TimeBar(eras, i, eons[0].start);
  if (bar) {
    bar.style.top = "35px";
    bar.style.height = "26px";
    bar.style.fontSize = "smaller";
    if (!eras[i].name.match("erozoi")) {
      // Hyphenate
      bar.firstChild.innerHTML = bar.firstChild.innerHTML
        .replace("archean", "arch-<br />ean")
        .replace("zoic", "-<br />zoic");
      bar.style.lineHeight = "12px";
    } else {
      bar.style.lineHeight = "25px";
    }
    allTime.append(bar);
  }
}

for (let i = 0; i < periods.length; i++) {
  let bar = TimeBar(periods, i, eons[0].start);
  if (bar) {
    bar.style.height = "25px";
    bar.style.top = "62px";
    bar.style.fontSize = "smaller";
    if (periods[i].start > 700) { // Phanerozoic or Ediacaran
      bar.style.lineHeight = "12px";

      // Hyphenate
      bar.firstChild.innerHTML = bar.firstChild.innerHTML
        .replace(/([^m])ian/, "$1<br />-ian")
        .replace(/([^-])(\wian)/, "$1<br />-$2")
      ;
    } else {
      bar.style.lineHeight = "25px";
      bar.firstChild.innerHTML = bar.firstChild.innerHTML
        .replace("Camb", "&")
        .replace("Cret", "K")
        .substring(0, 1)
        .replace("&", "&#x0404;");
    }
    allTime.append(bar);
  }
}

var allTimeScale = EmptyDiv("allTimeScale");
allTimeScale.classList.add("scale");
allTimeScale.style.top = "88px";
for (let i = 0; i < eons[0].start; i += 100) {
  let dash = EmptyDiv();
  dash.classList.add("timelineDash");
  if (i % 500 == 0) {
    dash.classList.add("tall");
  }
  dash.style.right = (i * width / eons[0].start) + "px";
  allTimeScale.append(dash);
}

if (showPhanerozoic) {
  allTimeScale.style.boxShadow = "inset -" +
    (width * phanerozoic.start / eons[0].start) + "px 0 0 #E99";
}

var allTimeLegend = EmptyDiv("allTimeLegend");
allTimeLegend.classList.add("legendHolder");
allTimeLegend.style.top = "95px";
for (let i = 0; i < eons[0].start; i += 500) {
  let lab = document.createElement("div");
  lab.classList.add("timelineLabel");
  lab.style.right = (i * width / eons[0].start) + "px"
  lab.innerHTML = i;
  allTimeLegend.appendChild(lab);
}

tlContent.append(allTime);
tlContent.append(allTimeScale);
tlContent.append(allTimeLegend);


// Phanerozoic timeline
if (showPhanerozoic) {
    if (maFrom) {
      let pzStart = document.createElement("div");
      pzStart.id = "pzStartArrow";
      pzStart.classList.add("startArrow");
      pzStart.innerHTML = maFrom + "&nbsp;Ma";
      pzStart.style.right = width * (maFrom / phanerozoic.start ) - 1 + "px";
      pzStart.style.top = "115px";
      tlContent.appendChild(pzStart);

      if (maTo != maFrom) {
        let pzEnd = document.createElement("div");
        pzEnd.id = "pzEndArrow";
        pzEnd.classList.add("endArrow");
        pzEnd.innerHTML = maTo + "&nbsp;Ma";
        pzEnd.style.left = (width - (width * maTo / phanerozoic.start )) + "px";
        pzEnd.style.top = "115px";
        tlContent.appendChild(pzEnd)
      }
    }

    var pz = document.createElement("div");
    pz.id = "Phanerozoic";
    pz.classList.add("timelineHolder");
    pz.style.top = "115px";

    let phzBar = TimeBar(eons, 3, phanerozoic.start);
    phzBar.classList.add("topBar");
    pz.appendChild(phzBar);

    for (let i = 0; i < eras.length; i++) {
      let bar = TimeBar(eras, i, phanerozoic.start);
      if (bar && eras[i].start <= phanerozoic.start) {
        bar.style.top = "35px";
        bar.style.height = "16px";
        pz.appendChild(bar);
      }
    }

    for (let i = 0; i < periods.length; i++) {
      let bar = TimeBar(periods, i, phanerozoic.start);
      if (bar && periods[i].start <= phanerozoic.start) {
        bar.style.height = "25px";
        bar.style.top = "52px";
        bar.style.fontSize = "smaller";
        bar.style.lineHeight = "25px";
        if (periods[i].name == "Neogene") {
          bar.firstChild.innerHTML = bar.firstChild.innerHTML
            .replace("gene", "-<br />gene");
          bar.style.lineHeight = "12px";
        }
        pz.appendChild(bar);
      }
    }

    var pzScale = EmptyDiv("pzScale");
    pzScale.classList.add("scale");
    pzScale.style.top = "193px";
    for (let i = 0; i < phanerozoic.start; i += 10) {
      let dash = EmptyDiv();
      dash.classList.add("timelineDash");
      if (i % 50 == 0) {
        dash.classList.add("tall");
      }
      dash.style.right = (i * width / phanerozoic.start) + "px";
      pzScale.appendChild(dash);
    }

    if (showCenozoic) {
      pzScale.style.boxShadow = "inset -" +
        (width * cenozoic.start / phanerozoic.start) + "px 0 0 #E99";
    }

    var pzLegend = EmptyDiv("pzLegend");
    pzLegend.style.top = "200px";
    pzLegend.classList.add("legendHolder");
    for (let i = 0; i < phanerozoic.start; i += 100) {
      let lab = document.createElement("div");
      lab.classList.add("timelineLabel");
      lab.style.right = (i * width / phanerozoic.start) + "px"
      lab.innerHTML = i;
      pzLegend.appendChild(lab);
    }

    tlContent.append(pz);
    tlContent.append(pzScale);
    tlContent.append(pzLegend);

    // Cenozoic bar
    if (showCenozoic) {
      if (maFrom) {
        let czStart = document.createElement("div");
        czStart.id = "czStartArrow";
        czStart.classList.add("startArrow");
        czStart.innerHTML = maFrom + "&nbsp;Ma";
        czStart.style.right = width * (maFrom / cenozoic.start ) - 1 + "px";
        czStart.style.top = "230px";
        tlContent.appendChild(czStart);

        if (maTo != maFrom) {
          let czEnd = document.createElement("div");
          czEnd.id = "czEndArrow";
          czEnd.classList.add("endArrow");
          czEnd.innerHTML = maTo + "&nbsp;Ma";
          czEnd.style.left = (width - (width * maTo / cenozoic.start )) + "px";
          czEnd.style.top = "230px";
          tlContent.appendChild(czEnd);
        }
      }

      var cz = document.createElement("div");
      cz.id = "Phanerozoic";
      cz.classList.add("timelineHolder");
      cz.style.top = "230px";

      let czBar = TimeBar(eras, 9, cenozoic.start);
      czBar.classList.add("topBar");
      cz.appendChild(czBar);

      for (let i = 0; i < periods.length; i++) {
        let bar = TimeBar(periods, i, cenozoic.start);
        if (bar && periods[i].start <= cenozoic.start) {
          bar.style.top = "35px";
          bar.style.height = "17px";
          bar.style.lineHeight = "16px";
          cz.appendChild(bar);
        }
      }

      for (let i = 0; i < subperiods.length; i++) {
        let bar = TimeBar(subperiods, i, cenozoic.start);
        if (bar && subperiods[i].start <= cenozoic.start) {
          bar.style.height = "25px";
          bar.style.top = "53px";
          bar.style.fontSize = "smaller";
          bar.style.lineHeight = "25px";
          cz.appendChild(bar);
        }
      }

      var czScale = EmptyDiv("czScale");
      czScale.classList.add("scale");
      czScale.style.top = "309px";
      for (let i = 0; i < cenozoic.start; i += 1) {
        let dash = EmptyDiv();
        dash.classList.add("timelineDash");
        if (i % 10 == 0) {
          dash.classList.add("tall");
        }
        dash.style.right = (i * width / cenozoic.start) + "px";
        czScale.appendChild(dash);
      }

      var czLegend = EmptyDiv("czLegend");
      czLegend.style.top = "317px";
      czLegend.classList.add("legendHolder");
      for (let i = 0; i < cenozoic.start; i += 10) {
        let lab = document.createElement("div");
        lab.classList.add("timelineLabel");
        lab.style.right = (i * width / cenozoic.start) + "px"
        lab.innerHTML = i;
        czLegend.appendChild(lab);
      }

      tlContent.append(cz);
      tlContent.append(czScale);
      tlContent.append(czLegend);
   }
}

let myaLegend = EmptyDiv("myaLegend")
myaLegend.innerHTML = "Million years ago";
tlContent.appendChild(myaLegend);

if (document.referrer) {
  let fromDiv = document.createElement("div");
  fromDiv.id = "referrer";
  let fromLink = document.createElement("a");
  fromLink.href = document.referrer;
  fromLink.title = "Return to referring page";
  fromLink.innerHTML =
    document.referrer.match(/^https?:\/\/\w+\.wikipedia\.org/) ?
      "&lt; Back to article" :
      "&lt; Back"
    ;
  fromDiv.appendChild(fromLink);
  document.getElementById("preContent").append(fromDiv);
}
