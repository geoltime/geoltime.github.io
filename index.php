<?php

if (isset($_GET["Ma"])) $ma = htmlspecialchars(preg_replace("~[\s,]~","",$_GET["Ma"]));
if (isset($_SERVER["HTTP_REFERER"])) $from = $_SERVER["HTTP_REFERER"];
include("periods.dat");

$i = 0;
foreach ($periods as $p){
	$i++;
	foreach($p as $no => $P) {
		if ($P[0] && $P[1]<$ma && !isset($period[$i])) {$period[$i] = Array($lastNo, $no);}
		$lastNo = $no;
		if ($P[1]>0) $lastPeriod[$i] = $P[1];
	}
}
$lastPeriod[0] = $periods[1][2][1]; //"Start of time"

function wikilink($page, $title=null){
	if (!$title) $title=$page;
	return "<a href='http://en.wikipedia.org/wiki/$page' title='$page page on Wikipedia'>$title</a>";
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>   				
						
  <meta content="text/html; charset=UTF-8"
  <meta content="text/html; charset=UTF-8"
 http-equiv="content-type" />
   <meta content="Smith609" name="author">
  <meta content="The geological time scale" name="description" />

  <title>
   <? echo $ma?"$ma million years ago - the geological timescale - Wikimedia toolserver":"The geological time scale @ the Wikimedia toolserver";?>
  </title>
  <link rel='stylesheet' type="text/css" href='style.css' />
  <style type='text/css'>
    .gap0{width:<?echo ((500*799/$lastPeriod[0]));?>px}
    .gap1{width:<?echo (( 50*799/$lastPeriod[1]));?>px}
    .gap2{width:<?echo (( 10*799/$lastPeriod[2]));?>px}
  </style>
   
</head>
<body style="direction: ltr;" class="mediawiki ns--1 ltr"> 
  <div id="globalWrapper">
    <div id="column-content"> 
      <div id="content">
        <a name="top" id="top"></a>  
        <h1 class="firstHeading">
          <? echo $ma?"$ma million years ago":"The geological time scale";?>
				</h1> 
        <div id="bodyContent"> 
          <h3 id="siteSub">
            by Smith609, design adapted from Luxo's</h3> 
          <div id="contentSub">
            <? echo $ma?"on t":"T";?>he international stratigraphic timescale&nbsp;
          </div>
					<? if ($from) {?>
					<div style="float:left; padding-left:2em; font-size:smaller">
						<?if (preg_match('~^http://\w+\.wikipedia\.org~', $from)) {?>
						<a href='<? echo $from;?>' title="Return to referring page">&lt; Back to article</a><?}else{?>
						<a href='<? echo $from;?>' title="Return to referring page">&lt; Back</a><?}?>
					</div><?}
					$sot = $lastPeriod[0];?>
          <!-- start content --> 
          <div id="laden">
						<?if ($ma) {?>
             <fieldset>
              <legend>When</legend>
              <? if ($ma < $sot) echo wikilink($periods[1][$period[1][0]][0]), " era"; else echo "Before formation of Earth.";
							if ($periods[2][$period[2][0]][0]!="Present" && $period[1][0]<=$period[2][0] && $period[1][1]>=$period[2][1]) echo ", " , wikilink($periods[2][$period[2][0]][0]), " eon";
							if ($periods[3][$period[3][0]][0] && $period[2][0]<=$period[3][0] && $period[2][1]>=$period[3][1]) echo ", " , wikilink($periods[3][$period[3][0]][0]), " period";
							if ($periods[4][$period[4][0]][0] && $period[3][0]<=$period[4][0] && $period[3][1]>=$period[4][1]) echo ", " , wikilink($periods[4][$period[4][0]][0]), " subperiod";
							if ($periods[5][$period[5][0]][0] && $period[4][0]<=$period[5][0] && $period[4][1]>=$period[5][1]) echo ", " , wikilink($periods[5][$period[5][0]][0]), " epoch";
							if ($periods[6][$period[6][0]][0] && $period[5][0]<=$period[6][0] && $period[5][1]>=$period[6][1]) echo ", " , wikilink($periods[6][$period[6][0]][0]), " stage";
							?>
							</fieldset>
						<?}?>
							<fieldset>
							<legend>Timeline</legend>
							<div id='timeline_holder' style='width:799px; height:348px; position:relative; margin:0; padding:0;'>
							<?
							
							if ($ma) {
								preg_match("~([\d\.]+)([^\d\.]*([\d\.]+))?~", $ma, $range);
								$rangeStart = $range[1];
								$rangeEnd = $range[3];
								$ma = ($rangeEnd>$rangeStart)?$rangeEnd:$rangeStart;
							?>
								<div id='allStartArrow' style='position:absolute; right:<?echo ((799*$rangeStart/$sot)-1);?>px; border-right:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeStart;?>&nbsp;Ma</div>
							<? if ($rangeEnd){							?>
								<div id='allEndArrow' style='position:absolute; left:<?echo (799-(799*$rangeEnd/$sot));?>px; border-left:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeEnd;?>&nbsp;Ma</div>
							<? }
							}
							//Start the first timeline ?>
								<div id=allTime>
								<?foreach($periods[1] as $tp){//tp=Time Period
									if ($lastTP){?>
									<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
										height:16px; line-height:15px; top:18px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?echo wikilink($lastTP[0])?></div>
								<?}$lastTP = $tp;}$lastTP=null;
								
								foreach($periods[2] as $tp){//tp=Time Period
									if ($lastTP){
									if (strpos($lastTP[0],"erozoi") === FALSE){?>
									
									<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
										height:26px; font-size:smaller; line-height:12px; top:35px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
									echo wikilink($lastTP[0], str_replace("archean", "arch-<br>ean",str_replace("zoic", "-<br>zoic",$lastTP[0]))); ?></div>
								<?} else {?>
									
									<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
										height:26px;	font-size:smaller; line-height:25px; top:35px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
									echo wikilink($lastTP[0]); ?></div>
								<?}}$lastTP = $tp;}$lastTP=null;
								
								foreach($periods[3] as $tp){//tp=Time Period
									if ($lastTP){
									if ($lastTP[1]>700){//{Phanerozoic or Ediacaran}?>
									
									<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; height:25px;
									font-size:smaller; line-height:12px; top:62px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
									echo wikilink($lastTP[0],preg_replace("~([^-])(\wian)~", "$1<br>-$2", preg_replace("~([^m])ian~", "$1<br>-ian", $lastTP[0]))); ?></div>
								<?} else {?>
									
									<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; height:25px;
									font-size:smaller; line-height:25px; top:62px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
									echo wikilink($lastTP[0], str_replace("&", "&#x0404;",substr(str_replace("Cret", "K", str_replace("Camb", "&", $lastTP[0])), 0,1))); ?></div>
								<?}}$lastTP = $tp;}$lastTP=null;?>
								</div alltime>
								<div id=AllTimeBar style="position:absolute; top:88px; height:1px; right:-1px; width:799px;
										background:black; line-height:1px; border:none; font-size:1px;">&nbsp;</div>
								<div id=AllTimeScale style="z-index:10;position:absolute; top:89px; height:4px; right:-1px; width:799px;
										border-left:1px black solid; line-height:3px; border:none; font-size:3px;">
									<?
									for ($i=0;$i<$sot;$i+=100){?>
										<div class="timelineDash<?echo ($i%500==0)?" tall":"";?>" style="right:<?echo ($i*799/$lastPeriod[0]);?>px";>&nbsp;</div>
									<?}?>
								</div>
								<div id=AllTimeLegend style="text-align:center;position:absolute; top:95px; height:14px; right:-<?echo ((250*799/$lastPeriod[0])+1);?>px;
								width:<?echo ((250*799/$lastPeriod[0])+799+100);?>px;	line-height:13px; border:none; font-size:9px;">
									<?
									for ($i=0;$i<$sot;$i+=500){?>
										<div class="timelineLabel gap0" style="right:<?echo ($i*799/$lastPeriod[0]);?>px"><?echo $i;?></div> 
									<?}?>
								</div>
								<?
								//End of first timeline.  Do we need to draw another?
								if (!$ma || $ma <= $lastPeriod[1]){?>
									<div id=PhanerozoicScale style="z-index:1; position:absolute; top:89px; height:4px; right:-1px; width:<?echo ($lastPeriod[1]*799/$sot);?>px;
										border-left:1px black solid; line-height:1px; border:none; background:#e99; font-size:1px;">&nbsp;</div>
									
									
									
								<?
									$sot = $lastPeriod[1];
									if ($ma){
									?>
										<div id='PhanerozoicStartArrow' style='position:absolute; top:115px; right:<?echo ((799*$rangeStart/$sot)-1);?>px; border-right:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeStart;?>&nbsp;Ma</div>
									<? if ($rangeEnd){	?>
										<div id='PhanerozoicEndArrow' style='position:absolute; top:115px; left:<?echo (799-(799*$rangeEnd/$sot));?>px; border-left:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeEnd;?>&nbsp;Ma</div>
									<? }
									}
									
								//Start the Phanerozoic timeline?>
									
									<div id=Phanerozoic style="top:115px; position:relative;">
									<?
									foreach($periods[1] as $tp){//tp=Eon
										if ($lastTP[1]<=$lastPeriod[1]){?>
										<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
											height:16px; line-height:15px; top:18px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?echo wikilink($lastTP[0])?></div>
								<?}$lastTP = $tp;}$lastTP=null;
								
									foreach($periods[2] as $tp){//tp=Era
										if ($lastTP[1]<=$lastPeriod[1]){?>
										<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
											height:16px; line-height:15px; top:35px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?echo wikilink($lastTP[0])?></div>
								<?}$lastTP = $tp;}$lastTP=null;
									
									foreach($periods[3] as $tp){//tp=Period
										if ($lastTP[1]<=$lastPeriod[1]){
											if ($lastTP[1]>$lastPeriod[2]){?>
											<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; height:25px;
											font-size:smaller; line-height:25px; top:52px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
											echo wikilink($lastTP[0]); ?></div>
										<?}else{?>
											
											<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; height:25px;
											font-size:smaller; line-height:12px; top:52px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
											echo wikilink($lastTP[0], str_replace("gene", "-<br>gene",$lastTP[0])); ?></div>
										<?}}$lastTP = $tp;
									}$lastTP=null;?>
									
								
									</div Phanerozoic>
									<div id=PhanerozoicTimeScale style="z-index:10; position:absolute; top:194px; height:4px; right:-1px; width:799px;
									border-left:1px black solid; line-height:3px; border:none; font-size:3px;">
									<?
									for ($i=0;$i<$sot;$i+=10){?>
										<div class="timelineDash<?echo ($i%50==0)?" tall":"";?>" style="right:<?echo ($i*799/$lastPeriod[1]);?>px";>&nbsp;</div>
									<?}?>
									</div>
									<div id=PhanerozoicTimeLegend style="text-align:center;position:absolute; top:200px; height:14px;
									right:-<?echo ((25*799/$lastPeriod[1])+1);?>px;
									width:<?echo ((25*799/$lastPeriod[1])+799+100);?>px;	line-height:13px; border:none; font-size:9px;">
										<?
										for ($i=0;$i<$sot;$i+=100){?>
											<div class="timelineLabel gap1" style="right:<?echo ($i*799/$lastPeriod[1]);?>px"><?echo $i;?></div> 
										<?}?>
									</div>
										
									<?
									//End of second timeline.  Do we need a third for the Cenozoic?
									
									if (!$ma || $ma <= $lastPeriod[2]){?>
										<div id=CeonzoicScale style="z-index:1; position:absolute; top:194px; height:4px; right:-1px; width:<?echo ($lastPeriod[2]*799/$sot);?>px;
											border-left:1px black solid; line-height:1px; border:none; background-color:#e99; font-size:1px;">&nbsp;</div>
										<?
										$sot = $lastPeriod[2];
										if ($ma){
										?>
											<div id='CenozoicStartArrow' style='position:absolute; top:230px; right:<?echo ((799*$rangeStart/$sot)-1);?>px; border-right:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeStart;?>&nbsp;Ma</div>
										<? if ($rangeEnd){							?>
											<div id='CenozoicEndArrow' style='position:absolute; top:230px; left:<?echo (799-(799*$rangeEnd/$sot));?>px; border-left:solid #c33 1px; height:18px; line-height:18px; padding-left:1px; font-style:italic;'><?echo $rangeEnd;?>&nbsp;Ma</div>
										<? }
										}
										?>
										<div id=Cenozoic style="top:230px; position:relative;">
										<?
										foreach($periods[2] as $tp){//tp=Time Period
											if ($lastTP[1]<=$lastPeriod[2]){?>
											<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px;
											height:16px; line-height:15px; top:18px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?echo wikilink($lastTP[0])?></div>
										<?}$lastTP = $tp;
										}$lastTP=null;
										
										foreach($periods[3] as $tp){//tp=Time Period
											if ($lastTP[1]<=$lastPeriod[2]){?>
											<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; 
											height:17px; line-height:15px; top:35px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?echo wikilink($lastTP[0])?></div>
										<?}$lastTP = $tp;
										}$lastTP=null;
										
										foreach($periods[4] as $tp){//tp=Time Period
											if ($lastTP[1]<=$lastPeriod[2]){?>
																						
												<div style='position:absolute; text-align:center; border:1px solid; border-right:none; left:<?echo (799-($lastTP[1]*799/$sot));?>px; height:25px;
												font-size:smaller; line-height:25px; top:53px; width:<? echo (($lastTP[1]-$tp[1])*799/$sot);?>px; overflow:hidden; background:rgb(<?echo $lastTP[2];?>);'><?
												echo wikilink($lastTP[0]); ?></div>
											<?}$lastTP = $tp;
										}$lastTP=null;
										?>										
										</div Cenozoic>
										<div id=CenozoicTimeScale style="position:absolute; top:310px; height:4px; right:-1px; width:799px;
										border-left:1px black solid; line-height:3px; border:none; font-size:3px;">
										<?
										for ($i=0;$i<$sot;$i+=1){?>
											<div class="timelineDash<?echo ($i%10==0)?" tall":"";?>" style="right:<?echo ($i*799/$lastPeriod[2]);?>px";>&nbsp;</div>
										<?}?>
										</div>
										<div id=CenozoicTimeLegend style="text-align:center;position:absolute; top:317px; height:14px;
										right:-<?echo ((5*799/$lastPeriod[2])+1);?>px;
										width:<?echo ((5*799/$lastPeriod[2])+799+100);?>px;	line-height:13px; border:none; font-size:9px;">
											<?
											for ($i=0;$i<$sot;$i+=10){?>
												<div class="timelineLabel gap2" style="right:<?echo ($i*799/$lastPeriod[2]);?>px"><?echo $i;?></div> 
											<?}?>
										</div>
											
								<?}?>
							<?}?>
							<div id=myaLegend style="text-align:center; width:799px; font-size:10px; position:absolute; top:333px;">Million years ago</div>
							</div timeline_holder>
             </fieldset>
					</div>
					<div id=sources style="text-align:right; font-size:smaller; font-style:italic">
						Compiled using data from <a href="http://www.stratigraphy.org/geowhen/" 
						title="The GEOWHEN database, provided by the international commission for stratigraphy">the GeoWhen database</a>. <a href='http://en.wikipedia.org/wiki/User_talk:Smith609/Timeline' title="Talk page for this page">Discuss</a> this implementation by <a 
						href="http://en.wikipedia.org/wiki/User:Smith609" title="Martin Smith's Wikipedia user page">Martin Smith</a>. 
						
						<br><span xmlns:dc="http://purl.org/dc/elements/1.1/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dc:title" rel="dc:type">Geological timescale</span> is licensed under a
						<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.&nbsp;<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png"/></a>.
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
