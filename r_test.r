require("rtqdist")

t = tripletDistance("../trees/tree1.new", "../trees/tree2.new")

q = quartetDistance("../trees/tree1.new", "../trees/tree2.new")

allT = allPairsTripletDistance("../trees/two_trees.new")

allQ = allPairsQuartetDistance("../trees/two_quartets.new")
