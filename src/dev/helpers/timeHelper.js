function mapDay(dayin) {
    return (dayin == 0) ? 7 : dayin;
}

export function hasDayPassed(dayNumber) {
    var JHLP = {}
    JHLP.courseTime = new Date();
    if (dayNumber < mapDay(JHLP.courseTime.getDay())) {
        return true;
    } else {
        return false;
    }
}

export function timeToMoment(startTime) {
    return startTime - Date.now();
}

export function getCourseTimeUTC(weeksForward, timeOfStart, dayNumber) {
    JHLP.courseTimeUTC = getCourseTimeLocal(weeksForward, timeOfStart, dayNumber);
    JHLP.courseTimeUTC.setTime(JHLP.courseTimeUTC.getTime() + JHLP.courseTimeUTC.getTimezoneOffset() * 60 * 1000);
}

export function getCourseTimeLocal(weeksForward, timeOfStart, dayNumber) {

    var JHLP = {}
    JHLP.courseTime = new Date();
    JHLP.dayNumber = JHLP.courseTime.getDay()
    JHLP.dayNumber = (JHLP.dayNumber == 0) ? 7 : JHLP.dayNumber;
    JHLP.daysToAdd = weeksForward * 7 + dayNumber - JHLP.dayNumber;

    JHLP.courseTime.setHours(0);
    JHLP.courseTime.setMinutes(0);
    JHLP.courseTime.setSeconds(0);
    JHLP.courseTime.setMilliseconds(0);
    JHLP.courseTime.setTime(JHLP.courseTime.getTime() + JHLP.daysToAdd * 24 * 60 * 60 * 1000 + timeOfStart);

    return JHLP.courseTime;
}

export function getDayStrMs(ms) {
    let day = new Date();
    day.setTime(ms);
    return getDayStr(day)
}

export function getTimeStrMs(ms) {
    let day = new Date();
    day.setTime(ms)
    return getTimeStr(day)
}

export function getDayStr(day) {
    let month = day.getMonth() + 1
    let weekday = day.getDay();
    let weekdays = ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']
    return weekdays[weekday] + " " + day.getDate() + "." + month + "." + day.getFullYear()
}

export function getTimeStr(day) {
    return day.toTimeString().slice(0, 5)
}