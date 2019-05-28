dyn.load("rQuartetDist.so")
.Call("allPairsQuartetDistance", "../trees/two_trees.new")
.Call("quartetDistance", "../trees/tree1.new", "../trees/tree2.new")
