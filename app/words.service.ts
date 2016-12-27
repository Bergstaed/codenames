
import {Injectable} from "@angular/core";

@Injectable()
export class WordsService {

    getWords(nr:number): Promise<string[]> {
        let arrayAll:string[] = this.getAllNames().split(",");
        this.wordsArray = [];
        for (let i:number = nr*25; i< nr*25 + 25; i= i + 1) {
            this.wordsArray.push(arrayAll[i]);
        }
        return Promise.resolve(this.wordsArray);
    }

    getNumberOfGames(): Promise<number[]> {
        let arrayAll:string[] = this.getAllNames().split(",");
        let anz = Math.floor(arrayAll.length/25);
        let result:number[] = this.buildArrayOfIncreasingNumbers(anz);
        return Promise.resolve(result);
    }

    getWordsSlowly(nr:number): Promise<string[]> {
        return new Promise<string[]>(resolve =>
            setTimeout(resolve, 1000)) // delay 1 second(s)
            .then(() => this.getWords(nr));
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

    wordsArray: string[];

    getAllNames() :string {
        // Brille,Hilfe,Korb,Laptop,Musik,Orgel,Stuhl,Uhr,Wald
        return "Birne,Baum,Hannah,Schauspieler," +
            "Johannes,YouTube,Beruf,Ente,Kaninchen,König,Dach,Durchsage," +
            "Geschichte,Musik,Uhr,Hemd,Gras,Lehne,Bushaltestelle,Stuhl,Spielplatz," +
            "Fisch,Essen,Handy,blau,Auto,Prozent,Wasser,Boden,Keim,Brille," +
            "Fuchs,Spieß,Spiel,Spaß,Blatt,Zigarette,Kind,Ball,Fehler,Korb," +
            "Buch,Spannung,Chemie,Larissa,Haare,Perücke,Eis,Nachname,Koffer," +
            "Lampe,Messer,Mord,Note,Notiz,Schimmel,Schlange,Schaf,Luftballon," +
            "Nadel,Trommel,Takt,Haus,Australien,Kauf,schnell,nah,Zimmer,Rakete," +
            "Fenster,Rauch,Team,Rinde,Tanne,Weihnachten," +

            "meridional,Agglutination,Folikel,Hyperglykämie,partizipativ,diskursiv," +
            "dediziert,Prekariat,usurpieren,Nimbus,matrimonial,Nepotismus,einfach,intrinsisch," +
            "Rekuperation,Ressentiment,unisono,Misanthrop,paralysieren,pekuniär," +
            "soigniert,gustatorisch,Konvolut,Zampano,Euphemismus," +

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
            "Leuchtturm,Serie,Eimer,Muschel,Zucker,Zucht,Zeiger,Füller,Opa,Beutel,Tier," +
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
            "Sommer,Hai,Putzfrau,Schokokuss,Gardinen,Lautsprecher,Frage,Ass,Bumerang,Schwimmbad,Kran," +
            "Antwort," +
            "Ende";

    }


    buildArrayOfIncreasingNumbers(num:number):number[] {
        let result:number[] = [];
        for (let i:number = 0; i< num; i= i + 1) {
            result.push(i);
        }
        return result;
    }
}
