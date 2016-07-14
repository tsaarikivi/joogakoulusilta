
function mapDay(dayin){
  return (dayin == 0)? 7 : dayin;
}

export function hasDayPassed(dayNumber){
  var JHLP = {}
  JHLP.courseTime = new Date();
  if(dayNumber < mapDay(JHLP.courseTime.getDay())){
    return true;
  } else {
    return false;
  }
}

export function timeToMoment(startTime){
  return startTime - Date.now();
}

export function getCourseTimeGMT(weeksForward, timeOfStart, dayNumber){

  var JHLP = {}
  JHLP.courseTime = new Date();
  JHLP.dayNumber = JHLP.courseTime.getDay()
  JHLP.dayNumber = (JHLP.dayNumber == 0)? 7 : JHLP.dayNumber;
  JHLP.daysToAdd = weeksForward*7 + dayNumber - JHLP.dayNumber;

  JHLP.courseTime.setHours(0);
  JHLP.courseTime.setMinutes(0);
  JHLP.courseTime.setSeconds(0);
  JHLP.courseTime.setMilliseconds(0);
  JHLP.courseTime.setTime(JHLP.courseTime.getTime() + JHLP.daysToAdd*24*60*60*1000 + timeOfStart);

  return JHLP.courseTime;
}
