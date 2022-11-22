"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
function hasNumber(str) {
  return typeof str === "string" && str.match(/\d/) != null;
}
const ma = hasNumber(urlParams.get("Ma")) ? urlParams.get("Ma") :
             hasNumber(urlParams.get("ma")) ? urlParams.get("ma") : null;

const range = ma.match(/([\d\.\s]+)[^\d\.\s]([\d\.\s]+)/);
const maFrom = range ? Math.max(Number(range[1]), Number(range[2])) : ma;
const maTo = range ? Math.min(Number(range[1]), Number(range[2])) : ma;

function wikilink(article, title = null) {
  return "<a href='https://en.wikipedia.org/wiki/" + article +
    "' title='" + article + " page on Wikipedia'>" +
    (title ? title : article) + "</a>";
}

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
  let fromStage = (fromPeriod != null && fromPeriod.name == "Carboniferous") ?
   findTime(stages, maFrom) : null;

  let toEon = findTime(eons, maTo);
  let toEra = findTime(eras, maTo);
  let toPeriod = findTime(periods, maTo);
  let toSubP = findTime(subperiods, maTo);
  let toEpoch = findTime(epochs, maTo);
  let toStage = (toPeriod != null && toPeriod.name == "Carboniferous") ?
   findTime(stages, maTo) : null;

  fsWhen.innerHTML = "<legend>When</legend>"
    + (fromEon == null ? "Before formation of Earth" : (wikilink(fromEon.name) + " eon"))
    + (fromEra == null ? "" : (", " + wikilink(fromEra.name) + " era"))
    + (fromPeriod == null ? "" : (", " + wikilink(fromPeriod.name) + " period"))
    + (fromSubP == null ? "" : (", " + wikilink(fromSubP.name) + " subperiod"))
    + (fromEpoch == null ? "" : (", " + wikilink(fromEpoch.name) + " epoch"))
    + (fromStage == null ? "" : (", " + wikilink(fromStage.name) + " stage"))
    + (maTo == maFrom ||
       toEon == null ||
        toStage == fromStage ||
         toEpoch == fromEpoch ? "" :
    (
      "<br /> to <br />"
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

  var allStart = document.createElement("div");
  allStart.id = "allStartArrow";
  allStart.classList.add("startArrow");
  allStart.innerHTML = maFrom + "&nbsp;Ma";
  allStart.style.right = 799 * (maFrom / eons[0].start ) - 1 + "px";

  var tlContent = document.getElementById("timelineContent")
  tlContent.append(allStart);
  if (maTo != maFrom) {
    let allEnd = document.createElement("div");
    allEnd.id = "allEndArrow";
    allEnd.classList.add("endArrow");
    allEnd.innerHTML = maTo + "&nbsp;Ma";
    allEnd.style.left = (799 - (799 * maTo / eons[0].start )) + "px";
    tlContent.append(allEnd)
  }

  function TimeBar(units, i, barStart) {
    if (i >= units.length - 1) return;
    let unit = units[i];
    let nextUnit = units[Number(i) + 1];
    let bar = document.createElement("div");
    bar.classList.add("timeBar");
    bar.style.left = (799 - (unit.start * 799 / barStart)) + "px";
    bar.style.width = ((unit.start - nextUnit.start) * 799 / barStart) + "px";
    bar.style.background = "rgb(" + unit.col + ")";
    bar.innerHTML = wikilink(unit.name);
    return bar;
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
          .replace(/([^-])(\wian)/, "$1<br />-$2")
          .replace(/([^m])ian/, "$1<br />-ian");
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

  function EmptyDiv(id = null) {
    let div = document.createElement("div");
    if (id) div.id = id;
    div.innerHTML = "&nbsp;"
    return div;
  }

  var allTimeScale = EmptyDiv("allTimeScale");
  allTimeScale.classList.add("scale");
  for (let i = 0; i < eons[0].start; i += 100) {
    let dash = EmptyDiv();
    dash.classList.add("timelineDash");
    if (i % 500 == 0) {
      dash.classList.add("tall");
    }
    dash.style.right = (i * 799 / eons[0].start) + "px";
    allTimeScale.append(dash);
  }

  const phanerozoic = eons[3];
  const showPhanerozoic = maFrom <= phanerozoic.start;
  if (showPhanerozoic) {
    allTimeScale.style.boxShadow = "inset -" +
      (799 * phanerozoic.start / eons[0].start) + "px 0 0 #E99";
  }

  var allTimeLegend = EmptyDiv("allTimeLegend");
  allTimeLegend.style.right = "-" + ((250 * 799 / eons[0].start) + 1) + "px";
  allTimeLegend.style.width = ((250 * 799 / eons[0].start) + 799 + 100) + "px";
  for (let i = 0; i < eons[0].start; i += 500) {
    let lab = document.createElement("div");
    lab.classList.add("timelineLabel");
    lab.classList.add("gap0");
    lab.style.right = (i * 799 / eons[0].start) + "px"
    lab.innerHTML = i;
    allTimeLegend.append(lab);
  }

  if (showPhanerozoic) {
      let pzStart = document.createElement("div");
      pzStart.id = "pzStartArrow";
      pzStart.classList.add("startArrow");
      pzStart.innerHTML = maFrom + "&nbsp;Ma";
      pzStart.style.right = 799 * (maFrom / phanerozoic.start ) - 1 + "px";
      pzStart.style.top = "115px";
      tlContent.append(pzStart);

      if (maTo != maFrom) {
        let pzEnd = document.createElement("div");
        pzEnd.id = "pzEndArrow";
        pzStart.classList.add("endArrow");
        pzEnd.innerHTML = maTo + "&nbsp;Ma";
        pzEnd.style.left = (799 - (799 * maTo / phanerozoic.start )) + "px";
        pzEnd.style.top = "115px";
        tlContent.append(pzEnd)
      }

      var pz = document.createElement("div");
      pz.id = "Phanerozoic";
      pz.classList.add("timelineHolder");
      pz.style.top = "115px";

      let phzBar = TimeBar(eons, 3, phanerozoic.start);
      phzBar.classList.add("topBar");
      pz.append(phzBar);

      for (let i = 0; i < eras.length; i++) {
        let bar = TimeBar(eras, i, phanerozoic.start);
        if (bar && eras[i].start <= phanerozoic.start) {
          bar.style.top = "35px";
          bar.style.height = "16px";
          pz.append(bar);
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
          pz.append(bar);
        }
      }

      var pzScale = EmptyDiv("pzScale");
      pzScale.classList.add("scale");
      pzScale.style.top = "194px";
      for (let i = 0; i < phanerozoic.start; i += 10) {
        let dash = EmptyDiv();
        dash.classList.add("timelineDash");
        if (i % 50 == 0) {
          dash.classList.add("tall");
        }
        dash.style.right = (i * 799 / phanerozoic.start) + "px";
        pzScale.append(dash);
      }

      var pzLegend = EmptyDiv("pzLegend");
      pzLegend.style.right = "-" + ((250 * 799 / phanerozoic.start) + 1) + "px";
      pzLegend.style.width = ((250 * 799 / phanerozoic.start) + 799 + 100) + "px";
      for (let i = 0; i < phanerozoic.start; i += 100) {
        let lab = document.createElement("div");
        lab.classList.add("timelineLabel");
        lab.classList.add("gap0");
        lab.style.right = (i * 799 / phanerozoic.start) + "px"
        lab.innerHTML = i;
        pzLegend.append(lab);
      }

      const cenozoic = eras[9];
      const showCenozoic = maFrom <= cenozoic.start
      if (showCenozoic) {
        var cz;
        var czScale;
        var czLegend;
      }
  }
}
tlContent.append(allTime);
tlContent.append(allTimeScale);
tlContent.append(allTimeLegend);
tlContent.append(pz);
tlContent.append(pzScale);
tlContent.append(pzLegend);
tlContent.append(allTimeLegend)
tlContent.append(cz);
tlContent.append(czScale);
tlContent.append(czLegend);
//tlContent.append(cz);

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
