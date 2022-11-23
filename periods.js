const eons = [
  {name: "Hadean", start: 4567.17, col: "221,47,135"},
	{name: "Archean", start: 3800, col: "226,0,122"},
	{name: "Proterozoic", start: 2500, col: "232,82,113"},
	{name: "Phanerozoic", start: 542, col: "154,217,221"},
	{name: "Present", start: 0}
];
const startOfTime = eons[0].start;
const eras = [
	{name: "Eoarchean", start: 3800, col: "221,47,135"},
	{name: "Paleoarchean", start: 3600, col: "233,96,155"},
	{name: "Mesoarchean", start: 3200, col: "238,135,172"},
	{name: "Neoarchean", start: 2800, col: "244,180,200"},
	{name: "Paleoproterozoic", start: 2500, col: "223,96,124"},
	{name: "Mesoproterozoic", start: 1600, col: "249,193,126"},
	{name: "Neoproterozoic", start: 1000, col: "250,191,93"},
	{name: "Paleozoic", start: 541.0, col: "153,192,141"},
	{name: "Mesozoic", start: 251, col: "98,196,221"},
	{name: "Cenozoic", start: 66.0, col: "242,249,29"},
	{name: "Present", start: 0}
];
const periods = [
	{name: "Siderian", start: 2500, col: "235,110,136"},
	{name: "Rhyacian", start: 2300, col: "236,122,147"},
	{name: "Orosirian", start: 2050, col: "238,134,160"},
	{name: "Statherian", start: 1800, col: "239,147,174"},
	{name: "Calymmian", start: 1600, col: "251,204,150"},
	{name: "Ectasian", start: 1400, col: "252,214,164"},
	{name: "Stenian", start: 1200, col: "253,224,178"},
	{name: "Tonian", start: 1000, col: "252,200,106"},
	{name: "Cryogenian", start: 850, col: "253,210,120"},
	{name: "Ediacaran", start: 630, col: "255,220,135"},
	{name: "Cambrian", start: 541.0, col: "147,171,110"},
	{name: "Ordovician", start: 485.4, col: "0,149,126"},
	{name: "Silurian", start: 443.7, col: "179,225,182"},
	{name: "Devonian", start: 416, col: "211,160,80"},
	{name: "Carboniferous", start: 358.9, col: "111,175,176"},
	{name: "Permian", start: 298.9, col: "240,64,60"},
	{name: "Triassic", start: 251, col: "146,76,148"},
	{name: "Jurassic", start: 199.6, col: "0,176,222"},
	{name: "Cretaceous", start: 145.5, col: "127,198,78"},
	{name: "Paleogene", start: 66.0, col: "253,154,82"},
	{name: "Neogene", start: 23.03, col: "255,230,25"},
	{name: "Quaternary", start: 2.588, col: "244,249,173"},
	{name: "Present", start: 0}
];
const subperiods = [
	{name: "Terreneuvian", start: 541.0, col: "159,184,133"},
	{name: "Cambrian Series 2", start: 521, col: "171,196,146"},
	{name: "Miaolingian", start: 509, col: "171,196,146"},
	{name: "Furongian", start: 497, col: ""},
	{name: "Early Ordovician", start: 485.4, col: "0,158,126"},
	{name: "Middle Ordovician", start: 470.0, col: "71,179,147"},
	{name: "Late Ordovician", start: 458.4, col: "141,200,170"},
	{name: "Llandovery", start: 443.4, col: "167,214,201"},
	{name: "Wenlock", start: 433.4, col: "167,214,201"},
	{name: "Ludlow", start: 427.4, col: "203,230,223"},
	{name: "Pridoli", start: 423.0, col: "203,230,223"},
	{name: "Early Devonian", start: 416, col: "229,180,110"},
	{name: "Middle Devonian", start: 397.5, col: "244,207,132"},
	{name: "Late Devonian", start: 385.3, col: "245,228,181"},
	{name: "Mississippian", start: 358.9, col: "120,158,126"},
	{name: "Pennsylvanian", start: 323.2, col: "167,201,202"},
	{name: "Early Permian", start: 298.9, col: "228,117,92"},
	{name: "Middle Permian", start: 270.6, col: "241,143,116"},
	{name: "Late Permian", start: 260.4, col: "247,188,169"},
	{name: "Early Triassic", start: 251, col: "152,57,153"},
	{name: "Middle Triassic", start: 245, col: "187,135,182"},
	{name: "Late Triassic", start: 228, col: "198,167,203"},
	{name: "Early Jurassic", start: 199.6, col: "0,176,227"},
	{name: "Middle Jurassic", start: 175.6, col: "132,207,232"},
	{name: "Late Jurassic", start: 161.2, col: "189,228,247"},
	{name: "Early Cretaceous", start: 145.5, col: "161,200,167"},
	{name: "Late Cretaceous", start: 99.6, col: "188,209,94"},
	{name: "Paleocene", start: 66.0, col: "253,167,95"},
	{name: "Eocene", start: 56.0, col: "253,180,108"},
	{name: "Oligocene", start: 33.9, col: "253,192,122"},
	{name: "Miocene", start: 23.03, col: "255,255,0"},
	{name: "Pliocene", start: 5.333, col: "244,249,173"},
	{name: "Pleistocene", start: 2.588, col: "255,242,174"},
	{name: "Holocene", start: 0.01143, col: "254,242,224"},
	{name: "Present", start: 0}
];
const epochs = [
	{name: "Fortunian", start: 541.0, col: ""},
	{name: "Cambrian Stage 2", start: 529, col: ""},
	{name: "Cambrian Stage 3", start: 521, col: ""},
	{name: "Cambrian Stage 4", start: 514, col: ""},
	{name: "Wuliuan", start: 509, col: ""},
	{name: "Drumian", start: 504.5, col: ""},
	{name: "Guzhangian", start: 500.5, col: ""},
	{name: "Paibian", start: 497, col: ""},
	{name: "Jiangshanian", start: 494, col: ""},
	{name: "Cambrian Stage 10", start: 489.5, col: ""},
	{name: "Tremadocian", start: 485.4, col: "0,158,126"},
	{name: "Floian", start: 477.7, col: ""},
	{name: "Dapingian", start: 470.0, col: ""},
	{name: "Darriwilian", start: 467.3, col: ""},
	{name: "Sandbian", start: 458.4, col: ""},
	{name: "Katian", start: 453.0, col: ""},
	{name: "Hirnantian", start: 445.2, col: "141,200,170"},
	{name: "Rhuddanian", start: 443.4, col: "167,214,201"},
	{name: "Aeronian", start: 440.8, col: "167,214,201"},
	{name: "Telychian", start: 438.5, col: "167,214,201"},
	{name: "Sheinwoodian", start: 428.2, col: "192,224,213"},
	{name: "Homerian", start: 428.2, col: "192,224,213"},
	{name: "Gorstian", start: 427.4, col: "203,230,223"},
	{name: "Ludfordian", start: 425.6, col: "203,230,223"},
	{name: "Pridoli", start: 423.0, col: "236,245,236"},
	{name: "Lochkovian", start: 416, col: "229,180,110"},
	{name: "Praghian", start: 411.2, col: "229,180,110"},
	{name: "Emsian", start: 407, col: "229,180,110"},
	{name: "Eifelian", start: 397.5, col: "244,207,132"},
	{name: "Givetian", start: 391.8, col: "244,207,132"},
	{name: "Frasnian", start: 385.3, col: "245,228,181"},
	{name: "Famennian", start: 374.5, col: "245,228,181"},
	{name: "Tournaisian", start: 358.9, col: ""},
	{name: "Visean", start: 346.7, col: "171,188,133"},
	{name: "Serpukhovian", start: 330.9, col: ""},
	{name: "Bashkirian", start: 323.2, col: ""},
	{name: "Moscovian", start: 315.2, col: "180,206,203"},
	{name: "Kasimovian", start: 307, col: ""},
	{name: "Gzhelian", start: 303.7, col: ""},
	{name: "Asselian", start: 298.9, col: ""},
	{name: "Sakmarian", start: 294.6, col: ""},
	{name: "Artinskian", start: 284.4, col: ""},
	{name: "Kungurian", start: 275.6, col: ""},
	{name: "Roadian", start: 270.6, col: ""},
	{name: "Wordian", start: 268, col: ""},
	{name: "Capitanian", start: 265.8, col: ""},
	{name: "Wuchiapingian", start: 260.4, col: ""},
	{name: "Changhsingian", start: 253.8, col: ""},
	{name: "Induan", start: 251, col: "152,57,153"},
	{name: "Olenekian", start: 249.7, col: "152,57,153"},
	{name: "Anisian", start: 245, col: "187,135,182"},
	{name: "Ladinian", start: 237, col: "187,135,182"},
	{name: "Carnian", start: 228, col: "198,167,203"},
	{name: "Norian", start: 216.5, col: "198,167,203"},
	{name: "Rhaetian", start: 203.6, col: "198,167,203"},
	{name: "Hettangian", start: 199.6, col: "189,228,247"},
	{name: "Sinemurian", start: 196.5, col: "189,228,247"},
	{name: "Pliensbachian", start: 189.6, col: "189,228,247"},
	{name: "Toarcian", start: 183, col: "189,228,247"},
	{name: "Aalenian", start: 175.6, col: "132,207,232"},
	{name: "Bajocian", start: 171.6, col: "132,207,232"},
	{name: "Bathonian", start: 167.7, col: "132,207,232"},
	{name: "Callovian", start: 164.7, col: "132,207,232"},
	{name: "Oxfordian", start: 161.2, col: "0,176,227"},
	{name: "Kimmeridgian", start: 155.7, col: "0,176,227"},
	{name: "Tithonian", start: 150.8, col: "0,176,227"},
	{name: "Berriasian", start: 145.5, col: "161,200,167"},
	{name: "Valanginian", start: 140.2, col: "161,200,167"},
	{name: "Hauterivian", start: 136.4, col: "161,200,167"},
	{name: "Barremian", start: 130, col: "161,200,167"},
	{name: "Aptian", start: 125, col: "161,200,167"},
	{name: "Albian", start: 112, col: "161,200,167"},
	{name: "Cenomanian", start: 99.6, col: "188,209,94"},
	{name: "Turonian", start: 93.5, col: "188,209,94"},
	{name: "Coniacian", start: 89.3, col: "188,209,94"},
	{name: "Santonian", start: 85.8, col: "188,209,94"},
	{name: "Campanian", start: 83.5, col: "188,209,94"},
	{name: "Maastrichtian", start: 70.6, col: "188,209,94"},
	{name: "Danian", start: 66.0, col: ""},
	{name: "Selandian", start: 61.6, col: ""},
	{name: "Thanetian", start: 59.2, col: ""},
	{name: "Ypresian", start: 56.0, col: ""},
	{name: "Lutetian", start: 47.8, col: ""},
	{name: "Bartonian", start: 41.3, col: ""},
	{name: "Priabonian", start: 38.0, col: ""},
	{name: "Rupelian", start: 33.9, col: ""},
	{name: "Chattian", start: 28.1, col: ""},
	{name: "Aquitanian", start: 23.03, col: ""},
	{name: "Burdigalian", start: 20.44, col: ""},
	{name: "Langhian", start: 15.97, col: ""},
	{name: "Serravillian", start: 13.82, col: ""},
	{name: "Tortonian", start: 11.63, col: ""},
	{name: "Messinian", start: 7.246, col: ""},
	{name: "Zanclean", start: 5.333, col: ""},
	{name: "Piacenzian", start: 3.6, col: ""},
	{name: "Gelasian", start: 2.588, col: ""},
	{name: "Calabrian", start: 1.806, col: ""},
	{name: "Chibanian", start: 0.774, col: ""},
	{name: "Stage 4", start: 0.129, col: ""},
	{name: "Greenlandian", start: 0.01143, col: ""},
	{name: "Northgrippian", start: 0.008, col: ""},
	{name: "Meghalayan", start: 0.004, col: ""},
	{name: "Present", start: 0}
];
