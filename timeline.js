const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
hasNumber = function(str) {
  return typeof str === "string" && str.match(/\d/) != null;
}
const ma = hasNumber(urlParams.get("Ma")) ? urlParams.get("Ma") :
             hasNumber(urlParams.get("ma")) ? urlParams.get("ma") : null;

const range = ma.match(/([\d\.\s]+)[^\d\.\s]([\d\.\s]+)/);
const maFrom = range ? Math.max(Number(range[1]), Number(range[2])) : ma;
const maTo = range ? Math.min(Number(range[1]), Number(range[2])) : ma;

wikilink = function(article, title = null) {
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

  function findTime (units, when) {
    let myTime = null;
    for (i in units) {
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

  let allStart = document.createElement("div");
  allStart.id = "allStartArrow";
  allStart.innerHTML = maFrom + "&nbsp;Ma";
  allStart.style.right = 799 * (maFrom / eons[0].start ) - 1 + "px";

  let tlContent = document.getElementById("timelineContent")
  tlContent.append(allStart);
  if (maTo != maFrom) {
    let allEnd = document.createElement("div");
    allEnd.id = "allEndArrow";
    allEnd.innerHTML = maTo + "&nbsp;Ma";
    allEnd.style.left = (799 - (799 * maTo / eons[0].start )) + "px";
    tlContent.append(allEnd)
  }

  TimeBar = function(units, i) {
    if (i >= units.length - 1) return;
    let unit = units[i];
    let nextUnit = units[Number(i) + 1];
    let bar = document.createElement("div");
    bar.classList.add("timeBar");
    bar.style.left = (799 - (unit.start * 799 / eons[0].start)) + "px";
    bar.style.width = ((unit.start - nextUnit.start) * 799 / eons[0].start) + "px";
    bar.style.background = "rgb(" + unit.col + ")";
    bar.innerHTML = wikilink(unit.name);
    return bar;
  }

  let allTime = document.createElement("div");
  allTime.id = "allTime";
  for (i in eons) {
    bar = TimeBar(eons, i);
    if (bar) {
      bar.style.top = "18px";
      bar.style.height = "16px";
      allTime.append(bar);
    }
  }
  for (i in eras) {
    bar = TimeBar(eras, i);
    if (bar) {
      bar.style.top = "35px";
      bar.style.height = "26px";
      bar.style.fontSize = "smaller";
      if (!eras[i].name.match("erozoi")) {
        bar.firstChild.innerHTML = bar.firstChild.innerHTML
          .replace("archean", "arch-<br>ean")
          .replace("zoic", "-<br>zoic");
      } else {

      }
      allTime.append(bar);
    }
  }

  tlContent.append(allTime);
}

if (1 || document.referrer) {
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
