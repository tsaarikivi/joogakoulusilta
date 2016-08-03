export function getCurrentBaseUrl(loc) {
    console.log("INCOMING", loc);
    let arrayOf = loc.split('/')
    console.log(arrayOf);
    return arrayOf[0] + '//' + arrayOf[2];
}

