# Matnettside, working title: FeedMe

### Kloning og kjøring av prosjekt

Prosjektet bygges og kjøres ved hjelp av npm, npm er altså en prerequisite for kjøring
Etter kloning av repo må det kjøres et par kommandoer i terminalen for å sikre feilfri kjøring.
Disse kommandoene er:

1. `cd feedme`
2. `npm install`
3. `npm i firebase`
4. `npm i react-router-dom`


Dersom dette gjennomføres korrekt kan prosjektet startes vha.:

`npm start`

og vil være tilgjenglig på `localhost:3000` hvis ingenting annet er spesifisert.

### Endring av Firebase tilkobling

Prosjektet bruker database og backend hostet av Firebase, og kobles opp mot dette vha. `firebase-config.js` i `./feedme/src`.
Dersom du vil koble det opp mot en annen server må du endre `const firebaseConfig` til din egen servers api-nøkkel.

### Database ER-diagram

Som utgangspunkt samler vi alle oppskrifter i en mega-collection med navn 'Oppskrifter'
Vi kan videre lage vilkårlig antall samlinger og kategorier ved å opprette samlinger som refererer til 'OppskriftID' fra 'Oppskrifter'
Synligheten av disse bestemmes av en boolsk variabel som kan bruker for å velge om samlingen skal være offentlig tilgjenglig.
På denne måten kan vi bruke collection strukturen for å lage alt fra kategorier til favorittlister

![ER-diagram](PU_DB.png)
