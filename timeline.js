const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ma = urlParams.get("Ma") ? urlParams.get("Ma") : urlParams.get("ma");

if (ma != null) {
  document.title = ma + " million years ago - the geological timescale";
  document.getElementById("pageTitle").innerHTML = ma + " million years ago";
  document.getElementById("contentSub").innerHTML =
    "on the international stratigraphic timescale&nbsp;";

  let fsWhen = document.createElement("fieldset");
  fsWhen.innerHTML = "<legend>When</legend>";
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
