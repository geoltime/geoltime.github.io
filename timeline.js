const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
hasNumber = function(str) {
  return typeof str === "string" && str.match(/\d/) != null;
}
const ma = hasNumber(urlParams.get("Ma")) ? urlParams.get("Ma") :
             hasNumber(urlParams.get("ma")) ? urlParams.get("ma") : null;

const range = ma.match(/([\d\.\s]+)[^\d\.\s]([\d\.\s]+)/);
const maFrom = range ? Math.max(Number(range[1]), Number(range[2])) : ma;
const maTo = range ? Math.max(Number(range[1]), Number(range[2])) : ma;

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

  fsWhen.innerHTML = "<legend>When</legend>"
    + ((fromEon == null) ? "Before formation of Earth" : (wikilink(fromEon.name) + " eon"))
    + ((fromEra == null) ? "" : (", " + wikilink(fromEra.name) + " era"))
    + ((fromPeriod == null) ? "" : (", " + wikilink(fromPeriod.name) + " period"))
    + ((fromSubP == null) ? "" : (", " + wikilink(fromSubP.name) + " subperiod"))
    + ((fromEpoch == null) ? "" : (", " + wikilink(fromEpoch.name) + " epoch"))
    + ((fromStage == null) ? "" : (", " + wikilink(fromStage.name) + " stage"))
  ;

  document.getElementById("laden").insertBefore(
    fsWhen,
    document.getElementById("fs_timeline")
  );
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
