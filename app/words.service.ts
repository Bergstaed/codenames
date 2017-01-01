
import {Injectable} from "@angular/core";

@Injectable()
export class WordsService {

    getWords(nr:number,randomWords:boolean): Promise<string[]> {
        let arrayAll:string[] = this.getAllNames().split(",");
        var wordsArray:string[] = [];
        if (randomWords) {
            let anz = Math.floor(arrayAll.length/25);
            anz--; // wg schwierigen Begriffen am Ende
            var randLi = this.buildArrayOfIncreasingNumbers(anz*25);

            let zufLi = [];

            for (let i:number = 0; i< 25; i= i + 1) {
                let zufIndex = Math.floor(Math.random() * (randLi.length) );
                zufLi.push(randLi[zufIndex]);
                wordsArray.push(arrayAll[randLi[zufIndex]]);
                randLi.splice(zufIndex,1);
            }
            console.log(zufLi);
        } else {
            for (let i:number = nr*25; i< nr*25 + 25; i= i + 1) {
                wordsArray.push(arrayAll[i]);
            }
        }

        return Promise.resolve(wordsArray);
    }

    getNumberOfGames(): Promise<number[]> {
        let arrayAll:string[] = this.getAllNames().split(",");
        let anz = Math.floor(arrayAll.length/25);
        let result:number[] = this.buildArrayOfIncreasingNumbers(anz);
        return Promise.resolve(result);
    }

    getNumberOfwords():Promise<number> {
        let arrayAll:string[] = this.getAllNames().split(",");
        return Promise.resolve(arrayAll.length);
    }

    getWordsSlowly(nr:number,randomWords:boolean): Promise<string[]> {
        return new Promise<string[]>(resolve =>
            setTimeout(resolve, 1000)) // delay 1 second(s)
            .then(() => this.getWords(nr,randomWords));
    }

    findDuplicates():Promise<string[]> {
        let arrayAll:string[] = this.getAllNames().split(",");

        let sorted_arr = arrayAll.slice().sort(); // You can define the comparing function here.
        // JS by default uses a crappy string compare.
        // (we use slice to clone the array so the
        // original array won't be modified)
        let results = [];
        for (let i = 0; i < arrayAll.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                results.push(sorted_arr[i]);
            }
        }

        return Promise.resolve(results);
    }

//    wordsArray: string[];

    getAllNames() :string {

        //

        /*
        "nochInArbeit1,nochInArbeit2,nochInArbeit3,nochInArbeit4,nochInArbeit5," +
        "nochInArbeit6,nochInArbeit7,nochInArbeit8,nochInArbeit9,nochInArbeit10," +
        "nochInArbeit11,nochInArbeit12,nochInArbeit13,nochInArbeit14,nochInArbeit15," +
        "nochInArbeit16,nochInArbeit17,nochInArbeit18,nochInArbeit19,nochInArbeit20," +
        "nochInArbeit21,nochInArbeit22,nochInArbeit23,nochInArbeit24,nochInArbeit25," +
        */
        return "Birne,Baum,Hannah,Schauspieler," +
            "Johannes,YouTube,Beruf,Ente,Kaninchen,König,Dach,Durchsage,Geschichte," +
            "Musik,Uhr,Hemd,Gras,Lehne,Bushaltestelle,Stuhl,Spielplatz," +
            "Fisch,Essen,Handy,blau," +

            "Auto,Prozent,Wasser,Boden,Keim,Brille," +
            "Fuchs,Spieß,Spiel,Spaß,Blatt,Zigarette,Kind,Ball,Fehler,Korb," +
            "Buch,Spannung,Chemie,Larissa,Haare,Perücke,Eis,Nachname,Koffer," +

            "Feier,Rote Beete,rosa,Hose,Keyboard,Zeitschrift,Raclette,Stoppelmarkt,Noten," +
            "Hänsel&Gretel,Stift,Hausschuhe,Schlafsack,Rasen,Fußball,Fahrkarte,Schnuller," +
            "Bettwäsche,Tatort,Schlüssel,Schere,Cello,Mann,Heizung,Wurst," +

            "Flugzeug,Stroh,Urlaub,Palme,Aufkleber,Pfeil,Kommissar,Streifen,Stein," +
            "Braut,Gefahr,zerbrechlich,Käfig,Zirkus,Autopanne,Werkstatt,Garantie," +
            "Glasscheibe,Angeber,Computer,Sohle,Rost,Schokolade,Medizin,Marmelade," +

            "Lampe,Messer,Mord,Note,Notiz,Schimmel,Schlange,Schaf,Luftballon," +
            "Nadel,Trommel,Takt,Haus,Australien,Kauf,schnell,nah,Zimmer,Rakete," +
            "Fenster,Rauch,Team,Rinde,Tanne,Weihnachten," +

            "Schweiz,Fernglas,Rasenmäher,Schiedsrichter,Maulwurf,Kuh,Gewinner,Fahne," +
            "Nutella,Autoscooter,Krawatte,Stinktier,gestreift,Wolkenkratzer," +
            "Sauna,Tee,Himmel,Liegestuhl,Strandkorb,Afrika," +
            "Golfball,Minigolf,Biene Maja,Punker,Zahnlücke," +

            "Zwerg,Rathaus,Zollstock,Popel,Kaffee,Gerüst,Gehirn,Dachziegel,Pirat,SPD,Ballon," +
            "Plakat,Steckdose,3D Drucker,Scheebesen,Entzündung,Gurke,Butter,Turnschuh,Maja," +
            "Torte,Donald Duck,Beamer,Milch,grün," +

            "Reklame,Müllfahrer,Locher,Post,Pizza,Poster,Zebra,Zucchini,Hamster,Schornstein," +
            "Superman,Papier,Maus,Leiter,Fitnessstudio,Restaurant,Gulli,Magnet,Liege,Telefonzelle," +
            "Ast,Käfer,Putzeimer,FKK,Portemonai," +

            "Graffiti,Design,Tour,rot," +
            "Gans,Liebe,Welt,Reise,Riese,Nase,Nagel,Finger,Strom,Krug,Saft,Briefe," +
            "Welle,USA,Tablette,Geschenk,Schuh,Sattel,Erkundung,Foto,Sprechblase,Luft," +
            "Aufzug,Akku,Ablage,Linie,Balance,Hilfe,Dreck,Kugel,Schaum,Show,Kamera," +
            "Paul,Jakob,Geburtstag,FC St. Pauli," +
            "Km/h,Wolken,Schnee,Gott,Erbse,Klo,Hund,Wüste,Spule,Spüle,braun,jung," +
            "gestern,Geschmack,Schmetterling,Schloss,schlau,Dummkopf,Deo,Bart,Schnitt," +
            "Wähler,Donald Trump,Idiot,Urne," +
            "Fall,Jura,Dino,Kabel,Telekom,Pommes,Hülle,Folie,Fell,Mast,Prinz,Schaffner," +
            "Blockflöte,Gisela,Los,Jahrmarkt,Monopoly,Whisky,Lasso,Einbruch,Po," +
            "Tür,Schatte,Schornsteinfeger,Glück,Wärmflasche,Wand,Gewinn,Traum,Birgit,Code,Tüte,Lippe," +
            "Film,Sound,Melodie,Kampf,Alpen,Rio de Janeiro,Wald,Natur,Badewanne,Verpackung," +
            "Sonne,grau,Versteck,Farbe,Mauer,Kleinkind,Arbeit,Rezeption,Fahrstuhl,Nacht,Daumen," +
            "Pause,Herd,Schnur,Hunger,Genick,Normandie,Hamburg,Pupille,Galerie,Zahn,Mathe," +
            "Wagen,Rad,Sport,Yoga,Matte,Sushi,Verbot,Preis,President,Staat,Titanic," +
            "Ruine,Ordner,Ärmel,Verlauf,Käse,lila,Parfum,Prag,Bus,Decke,Kleber,Video," +
            "Leuchtturm,Serie,Eimer,Muschel,Zucker,Zucht,Zeiger,Füller,Vegetarier,Beutel,Tier," +
            "Dart,dunkel,Orgel,Würfel,Rahmen,Clown,Taste,April,Tag,Zeichen,Kissenbezug," +
            "Umzug,Henkel,Regal,Insel,Vulkan,Hocker,Figur,Stern,Mond,Flöte,Schildkröte,Wachs,Sturm," +
            "Auge,4 gewinnt,Abfalleimer,Not,gelb,Husten,Bonbon,Amerika,Apfel,Süssigkeit,Elbe," +
            "Banane,Konzert,Lang Lang,Gold,Stoff, Tatort,Getränk,Katze,Kette,Rucksack,Laptop," +
            "Fuß,Röntgen,Speichel,Sandwich,Sand,Licht,Zug,Los Angeles," +
            "Fischstäbchen,Berg,Vieleck,Jacke,Fett,Punkt,Kopfhörer,Jörg,fleißig,Esel,Garage,Kerze," +
            "Pinsel,Ankunft,Buchstabe,Name,Schal,Krankheit,Zahlen,Geld," +
            "Schild,Braunschweig,Briefkasten,Hotel,Wurzel,Urknall,Tastatur,Spiegel,Gießkanne," +
            "Theke,Sektempfang,42,Anhalter ,Monitor,Ringbuch,Mühe,Alphabet," +
            "Elefant,Uboot,Wäsche,Seilspringen,Asterix,Docht,Geldschein,Jesus,Ostern,Kicker,Sack,Gewalt," +
            "Zugbrücke,Dusche,See,Eichhörnchen,Bücherei,Lagerfeuer,Dieb,Alkohol,Leseratte,Seepferdchen,PI," +
            "Kino,Mac,Thermoskanne,Hochzeit,Weltmeister,Klempner,Schraube,Fusel,Fleck,Jonglieren,Roman,Abfluss," +
            "Klavier,Glas,Leber,Internet,Igel,Spaziergang,Dolch,Kissen,Holz,Gemälde,August,Fußbank," +
            "Google,Harfe,Bier,Detektiv,Tanz,Ritter,Baumhaus,Pralinen,Coca Cola,Nikolaus,Bagger,Taxi,Steinbock," +
            "Band,Schwein,Knäckebrot,Müsli,Mikrofon,Anhalter,Reifen,Panne,Halbmond,Gespenst,Waage,Trampolin," +
            "Nebel,Rosenkohl,Brunnen,Kastanie,Köln,DDR,Fanta,Ernte,Vater,Dick & Doof," +
            "Kreide,Bluse,Rohrstock,Trauer,Teppich,Besteck,Kopierer,Scheiße,Angel,Parkhaus,Fernbedienung," +
            "Sommer," +

            "Hai,Putzfrau,Schokokuss,Gardinen,Lautsprecher,Frage,Schatten,Bumerang,Schwimmbad,Kran,Antwort," +
            "Bobbycar,Motorsäge,Schuhe,Stiefel,Sessel,Mülleimer,Mobilée,Teddybär,Treppe,Zelt,Laterne," +
            "schwanger,Kuchen,Bürgermeister," +

            "Sandalen,Rolltreppe,Schneemann,Stadion,Sandkorn,Lupe,Mikroskop,Jäger,Wildschwein,Obelix," +
            "Paternoster,Kirche,Paris,London,Niedenstein,Schlumpf,Sieb,Schublade," +
            "Schleife,Zebrastreifen,Schaufel,Stop,Schlittschuh,Burg,Windrad," +

            "Raabe,Schwan,Sonnenbrille,Einhorn,Osterhase,Sandburg,Ohr,Friseur,Schuhcreme,Stube," +
            "Italien,Seerose,Museum,Gepäckträger,Schale,Engel,Bauernhof,Vase,Kaktus,Bücherboard,Mon Cherie," +
            "Feuerzeug,Uhrzeiger,Lampion,Ton," +

            "Herz,Karo,Kopf,Leumund,Skat,Ikea,Knochen,Frühling,Seifenblase,Barok,Hitler,Sesamstraße," +
            "Mondschein,Sternen,Glanz,Puzzle,Bücherwurm,Kammerjäger," +
            "Präsident,Moskau,Attentäter,Geburt,Truhe,David Bowie,Oldtimer," +

            "Schach,Student,blond,Schaufenster,Benzin,Dollar,Thermomix,Schimpanse,Werbung," +
            "Lippenstift,Silvester,Glocke,Palette,Gleise,Hexe,Garten,Minion,Pfanne," +
            "Robin Hood,Pfütze,Pappe,Kiesel,Schnürsenkel,Tannenbaum,Tankstelle," +

            "Drohne,Wolke,Jupiter,Bombe,Ampel,Klasse,Tiefkühltruhe,Cornflakes,Kokain," +
            "Felge,Geschwindigkeit,Schule,Edeka,Böller,Hölle,Mars,Grashüpfer," +
            "Martini,Porsche,Brücke,Brötchen,Nudeln,Schienen,Stickstoff,Tau," +

            "Fettpolster,England,Ei,Hirsch,Wahrheit,Zielscheibe,Hecke,Busch,Trommelfell,Adidas," +
            "Feuerlöscher,Chips,Würmchen,Jägermeister,Satelit,Fernseher,Glühwürmchen," +
            "Heuhaufen,Neonröhre,Lehrer,Mutter,Ring,Frisbee,Bohrer,Webcam," +

            "Opa,Oper,Haargel,Hagel,Hans,Hanf,Amazon,Amazonas,Bett,Beet," +
            "Aas,Ass,satt,Saat,Volt,Watt,Ohm,Sauerstoff,Diamant,Kritiker,Safari,Chrome,Quelle,Pfad,Windmühle," +

            "Barbar,Zombie,Pony,Huhn,Moos,Sonnenuntergang,Bach,Pendel,Weizen,Hafer," +
            "Pferd,Bremse,Reh,Kreuzfahrt,Notausgang,Beton,Dübel,Silo,Imbusschlüssel,Bohrmaschine,Walzer," +
            "Flohwalzer,Floh,Werkbank,Schmalz," +

            "120,17,36,1,-5,-19,33,50,49,42,11,10,32,100,99,2,5,40,unendlich,444," +
            "-300,16,0,56,39," +

            "meridional,Agglutination,Folikel,Hyperglykämie,partizipativ,diskursiv," +
            "dediziert,Prekariat,usurpieren,Nimbus,matrimonial,Nepotismus,einfach,intrinsisch," +
            "Rekuperation,Ressentiment,unisono,Misanthrop,paralysieren,pekuniär," +
            "soigniert,gustatorisch,Konvolut,Zampano,Euphemismus," +

            "Augenbrauen,Sekt,Marsmännchen,Aldi,Mantel,Bikini,AFD,Loriot,ZDF," +
            "Ende";

        //
    }


    buildArrayOfIncreasingNumbers(num:number):number[] {
        let result:number[] = [];
        for (let i:number = 0; i< num; i= i + 1) {
            result.push(i);
        }
        return result;
    }
}
