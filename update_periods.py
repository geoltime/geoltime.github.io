import json, re, requests, shutil

api_root = "https://vocabs.ardc.edu.au/repository/api/lda/csiro/international-chronostratigraphic-chart/geologic-time-scale-2020/resource.text?uri="

def period_info_url(period):
    return (api_root +
    "http://resource.geosciml.org/classifier/ics/ischart/" +
    period.replace(" ", ""))

def period_start(period):
    response = requests.get(period_info_url(period))

    if response.status_code == 200:
        data = json.loads(response.content)
        try:
            startUri = data["result"]["primaryTopic"]["hasBeginning"]["_about"] + "Time"

            response = requests.get(api_root + startUri)

            if response.status_code == 200:
                data = json.loads(response.content)
                try:
                    return(data["result"]["primaryTopic"]["numericPosition"])
                except:
                    print("Could not load numericPosition from : " + startUri)
                    return 0
            else:
                print("Could not load beginning from: " + startUri)
                return 0
        except:
            print("Could not load beginning for: " + period)
            return 0


    else:
        print("Could not load info from: " + period)
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
