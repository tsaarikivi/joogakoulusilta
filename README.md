Projektipuun selitys:
Public folderi on se mikä pusketaan produktiovaiheessa firebase-platformiin.
Sinne siis buildaantuu webpack.config.js mukaisesti kaikki tarvittava sivuston
pyörittämistä varten. INDEX.HTML lepää public kansiossa. Periaatteessa public-
kansioon ei tarvitse koskea.

Src folderissa on kaikki kehitykseen liittyvä. Kaikki React ja Redux hommat
käsitellään tässä hakemistossa. kaikki js/jsx fileet buildataan yhteen
tiedostoon "app.min.js", joka sijaitsee public kansiossa.
Actions-hakemisto: Reduxin actionit.
Views-hakemisto & Components-hakemisto: Reactin näkymät. Eli jos sivustossa on
esim. home, about, login... sun muita näkymiä, nämä korkeamman tason COMPONENTIT
tulevat views-hakemistoon. näiden korkeamman tason komponenttien COMPONENTIT
tulevat components-hakemistoon. Näissä hakemistoissa olevat JavaScript tiedostot
Kannattaa nimetä .jsx tiedostoiksi. tällöin onnistuu inline html5 helposti.
Stores-hakemisto: Reduxin-storet.
Styles-hakemisto: pitää sisällään cssksi muutettavat SCSS tiedostot.

Tests kansiossa testit..

package.json pitää sisällään pakkaukset mitkä installoidaan komennolla
npm install
webpack.config.js pitää sisällään buildaussääntöjä sun muita trikkejä
webpack ajetaan komennolla
webpack
tai komennolla (joka käynnistää localhost:8080 serverin ja jättää sen pyörimään)
npm run dev

********************************************************************************
********************************************************************************

Joogakoulun vaatimukset:

********************************************************************************
********************************************************************************

Taskit: (NIMI | SUORITTAJA / VALMIS)

luo projektipuu | VALMIS
tuo scss sisään |
