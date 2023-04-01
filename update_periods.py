import json, re, requests, shutil

period = "Silurian"

def period_start(period):
    url = "https://vocabs.ardc.edu.au/repository/api/lda/csiro/international-chronostratigraphic-chart/geologic-time-scale-2020/resource.text?uri=http://resource.geosciml.org/classifier/ics/ischart/Base" + period.replace(" ", "") + "Time"
    response = requests.get(url)

    if response.status_code == 200:
        data = json.loads(response.content)
        return(data["result"]["primaryTopic"]["numericPosition"])
    else:
        print("Could not load data from: " + period)
        return 0

with open("periods.dat", "r") as f:
    lines = f.readlines()

pattern = r"^(.*)(\d+ => Array\(')([\w\s]+)(\',\s*\')([\d\.]+)(',\s*')([\d,]+)('.*)$"
with open("~periods.dat.tmp", "w") as f:
    for line in lines:
        match = re.search(pattern, line)
        if match:
            period = match.group(3)
            start = period_start(period)

            f.write(
              match.group(1) + match.group(2) + match.group(3) + match.group(4) +
              (str(start) if start else match.group(5))
              + match.group(6)
              + match.group(7)
              + match.group(8)
              + "\n"
            )
        else:
            f.write(line)

shutil.copy("~periods.dat.tmp", "periods.dat")
