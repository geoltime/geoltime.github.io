<?php 
function periodCol($period){
print ".";
	preg_match("~rgb\((\d+,\d+,\d+)\)~", file_get_contents("http://en.wikipedia.org/w/api.php?format=dbg&action=expandtemplates&text={{Period%20color|".str_replace(" ", "%20", $period)."}}"), $col);
	return $col[1];
}
echo copy ("http://www.stratigraphy.org/geowhen/downloads/timelinestages.txt", "raw.dat")?"Updated dates. Fetching colours.":"Failed";
$raw = file("raw.dat");
foreach ($raw as $time){
	preg_match("~^\s*([\d\.]*).*Ma: ([\w ]+)( - ([\w ]+))?( - ([\w ]+))?( - ([\w ]+))?( - ([\w ]+))?( - ([\w ]+))?( - ([\w ]+))?$~", $time, $times[]);
}
foreach($times as $time){
	$i++;
	$t = $time[1];
	$periods[1][$i] = Array($time[2], $t);
	$periods[2][$i] = Array($time[4], $t);
	$periods[3][$i] = Array($time[6], $t);
	$periods[4][$i] = Array($time[8], $t);
	$periods[5][$i] = Array($time[10], $t);
	$periods[6][$i] = Array($time[12], $t);
}
$i=null;

$write = "<?php ";
foreach ($periods as $p){
	$i++;
	$write .= '$periods[' . "$i] = Array(";
	foreach ($p as $P => $d){
		if (strlen(trim($d[0]))) $write .= "\n\t$P => Array('$d[0]', '$d[1]', '".periodCol($d[0])."'),";
	}
	$write .= "\n\t999 => Array('Present', 0));\n";
}
file_put_contents("periods.dat", $write . "?>");
 ?>Done