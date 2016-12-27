
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

    getWordsSlowly(nr:number): Promise<string[]> {
        return new Promise<string[]>(resolve =>
            setTimeout(resolve, 1000)) // delay 1 second(s)
            .then(() => this.getWords(nr));
    }

    wordsArray: string[];

    getAllNames() :string {
        return "Apfel, Baum, Hannah, Schauspieler, Lautsprecher, Musik," +
            "Kino,Mac,Thermoskanne,Hochzeit,Weltmeister,Klempner,Schraube," +
            "Fuß, Röntgen, Speichel, Sandwich, Sand, Licht, Zug, Los Angeles, " +
            "Angel, Berg, Vieleck, Jacke, Laptop, Punkt, Kopfhörer, Jörg, " +
            "Pinsel, Ankunft, Buchstabe, Name, Schal, Krankheit, Zahlen, Geld," +
            "Elefant,Uboot,Wäsche,Seilspringen,Asterix,Uhr,Geldschein,Jesus," +
            "Johannes, YouTube, Beruf, Ente, Kaninchen, König, Dach, Durchsage, " +
            "Geschichte, Musik, Uhr, Hemd, Gras, Lehne, Bushaltestelle, Stuhl, Spielplatz, " +
            "Fisch, Essen, Handy, blau, Auto, Prozent, Wasser, Boden, Keim, Brille," +
            "Klavier,Glas,Leber,Internet,Igel,Spaziergang,Dolch,Kissen,Boden," +
            "Fuchs, Spieß, Spiel, Spaß, Blatt, Zigarette, Kind, Ball, Birne, Korb, " +
            "Buch, Spannung, Chemie, Larissa, Haare, Perücke, Eis, Nachname, Koffer, " +
            "Lampe, Messer, Mord, Note, Notiz, Schimmel, Schlange, Schaf, Luftballon, " +
            "Nadel, Trommel, Takt, Haus, Australien, Kauf, schnell, nah, Zimmer, Rakete, " +
            "Fenster, Rauch, Team, Rinde, Tanne, Weihnachten, Graffiti, Design, Tour, rot, " +
            "Gans, Liebe, Welt, Reise, Riese, Nase, Nagel, Finger, Strom, Krug, Saft, Briefe, " +
            "Welle, USA, Tablette, Geschenk, Schuh, Sattel, Erkundung, Foto, Sprechblase, Luft, " +
            "Aufzug, Akku, Ablage, Linie, Balance, Hilfe, Dreck, Kugel, Schaum, Show, Kamera, " +
            "Km/h, Wolken, Schnee, Gott, Erbse, Klo, Hund, Wüste, Spule, Spüle, braun, jung, " +
            "gestern, Geschmack, Schmetterling, Schloss, schlau, Dummkopf, Deo, Bart, Schnitt, " +
            "Fall, Jura, Dino, Kabel, Telekom, Pommes, Hülle, Folie, Fell, Mast, Prinz, Schaffner, " +
            "Tür, Schatte, Schornsteinfeger, Glück, Ritter, Wand, Gewinn, Traum, Code, Tüte, Lippe," +
            " Film, Sound, Melodie, Kampf, Alpen, Rio de Janeiro, Wald, Natur, Badewanne, Verpackung," +
            " Sonne, grau, Versteck, Farbe, Mauer, Kleinkind, Arbeit, Rezeption, Fahrstuhl, Nacht," +
            " Pause, Herd, Schnur, Hunger, Genick, Normandie, Hamburg, Pupille, Galerie, Zahn, Mathe," +
            " Wagen, Rad, Sport, Yoga, Matte, Sushi, Verbot, Preis, President, Staat, Titanic, " +
            "Ruine, Ordner, Ärmel, Verlauf, Käse, lila, Parfum, Prag, Bus, Decke, Kleber, Video, " +
            "Leuchtturm, Serie, Eimer, Muschel, Zucker, Zucht, Zeiger, Zeichen, Opa, Beutel, Tier," +
            " Dart, dunkel, Klavier, Würfel, Rahmen, Clown, Taste, April, Tag, Zeichen, Kissenbezug," +
            " Umzug, Henkel, Regal, Insel, Vulkan, Hocker, Figur, Stern, Mond, Flöte, Schildkröte, Wachs, Sturm," +
            "Auge, Brille, Abfalleimer, Not, gelb, Husten, Bonbon, Amerika, Apfel, Süssigkeit, Elbe," +
            "Hamburg, Konzert, Lang Lang, Gold, Stoff,  Tatort, Getränk, Katze, Wald,Rucksack, Laptop," +
            "Kreide, Bluse, Rohrstock, Trauer, Teppich, Besteck, Kopierer";

    }

}
