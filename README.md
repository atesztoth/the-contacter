# The Contacter

## Description / Leírás:


This repository has been created for the course of 'Alkalmazások fejlesztése' at ELTE University. Here I keep the files of my project organised, and updated.


Ez a repository az ELTE 'Alkalmazások fejlesztése' című kurzushozához jött létre. Az itt található fileok mindig a legfrissebb állást tükrözik.

## Névjegyzék kezelése


### Funkcionális követelmények

#### Vendégként (nem regisztrált felhasználó)
- Vendégként a főoldalon szeretnék egy üdvözlő üzenetet látni
- Vendégként szeretnék egy üdvözlő oldalt látni
- Vendégként szeretnék regisztrációs lehetőséget

#### Felhasználóként (regisztrált felhasználó)
- Felhasználóként szeretném a saját kontaktjaimat látni a főoldalon.
- Felhasználóként szeretném a kedvenc kontaktjaimat elsőként látni.
- Felhasználóként szeretnék új kontaktot létrehozi.
- Felhasználóként képet szeretnék tudni csatolni egy-egy kontakthoz.
- Felhasználóként meg szeretnék adni több telefonszámot egy-egy kontakthoz.
- Felhasználóként akár e-mail címet is szeretnék társítani egy-egy kontakthoz.
- Felhasználóként szeretnék egy saját kontaktot.

### Nem funkcionális követelmények
- Felhasználóbarát, ergonomikus elrendezés és kinézet.
- Gyors működés.
- Biztonságos működés: jelszavak hashének tárolása.
- Egyszerű, következetes felhasználói felület, egyszerű használat.
- Kellemes kinzet.

 ### Szakterületi fogalomjegyzék
 
 - Kontakt: Egy ismerős adatait számon tartó objektum, hozzá tartozik kép is telefonszámok is.
 - Kontakt csoport: kontakt objektumokból álló csoport.

### Használatiest-modell, funkcionális követelmények

## Vendég

Csak a főoldalt, és a regisztrációt éri el.

- Főoldal
- Bejelentkezés
- Regisztráció

## Bejelentkezett felhasználó:

A publikus oldalakon kívül ezeket is eléri:

- Új kontakt hozzáadása
- Kontakthoz kép csatolása
- Kontakthoz e-mail cím csatolása
- Kontakthoz telefonszámok csatolása
- Kontakthoz megjegyzés csatolása
- Becenév megadása
- Lakhely beírása

## Egy eset bemutatása: kontakt hozzáadása
- A felhasználó az oldalra érkezve bejelentkezik, vagy regisztrál.
- A regisztráció után elérhetővé vált menük közül kiíválsztja a kontakt hozzáadását.
- Ez után az elé kerülő formot kitölti, melynek kötelező eleme csak egy név.
- Opcionálisan megad telefonszámot, képet, lakhelyet...
- Mentés gombra kattintva véglegesíti az adatokat.

 #### Tervezés
 
 ### Architektúra terv
 
 ## Komplemensdiagram
 
 ## Oldaltérkép
 
 # Publikus:
 - Főoldal
 - Bejelentkezési oldal
 - Regisztrációs oldal
 
 # Bejelentkezett felhasználó:
 - Főoldal
 - Új kontakt hozzáadása
 - Meglévő kontakt szerkesztése
 - Kontaktcsoportok megjelenítése

## Végpontok

- GET / : Főoldal
- GET,POST /login : Bejelentkezés
- GET,POST /registration : Regisztráció
- GET /contacts : Kontaktok oldal
- GET /contact/contact-url-nev : Kontakt megtekintése
- GET /contacts/groups : Kontaktcsoportok megjelenítése
- GET,POST /contact/new-contact : Kontakt létrehozása
- GET,POST /contact/contact-url-nev : Kontakt szerkesztése

 ## Felhasználói-felület modell
 
 A tervektől való esetleges eltérések megeshetnek, ugyan is előfordulhat, hogy szerkesztés közben derül ki, hogy minimális változtatással sokkal esztétikusabb eredményt érhetek el.
 
 ### Főoldal
 
 ### Regisztrációs oldal
 
 ### Bejelentkezés oldal
 
 ### Kontaktok listázása oldal
 
 ### Kontakt hozzáadása / szerkesztése oldal
 
 ### Kontaktcsoportok megjelenítése oldal
 
 ## Designtervek
 
 ### Főoldal
 
 ### Regisztrációs oldal
 
 ### Bejelentkezés oldal
 
 ### Kontaktok listázása oldal
 
 ### Kontakt hozzáadása / szerkesztése oldal
 
 ### Kontaktcsoportok megjelenítése oldal
 
 ## Osztálymodell
 
 ### Adatmodell
 
 ### Adatbázisterv
 
 ## Szekvenciadiagram
 
 Vegyünk például egy regisztrációt, majd egy új kontakt felvételét, szerkesztését, törlését.
 
 ### Implementáció
 
 ## Fejlesztői környezet
 
 ### PHPStorm, local IDE
 
 ## Könyvtárstruktúra
 
 * **the-contacter**
  * **config**
    * _waterline.js_
  * **controllers**
    * _index.js_
    * _recipes.js_
    * _login.js_
  * **models**
    * _comment.js_
    * _recipes.js_
    * _recipes.test.js_
    * _user.js_
    * _user.test.js_
  * **views**: handlebars (hbs) fájlok
    * **login**
      * _index.hbs_
      * _signup.hbs_
    * **recipes**
      * _edit.hbs_
      * _list.hbs_
      * _new.hbs_
      * _show.hbs_
    * _index.hbs_
    * _layout.hbs_
  * _bower.json_
  * _package.json_
  * _server.js_
  
  ###	Irodalomjegyzék:

http://webprogramozas.inf.elte.hu/alkfejl.php

http://ade.web.elte.hu/wabp/lecke2_lap1.html

http://webprogramozas.inf.elte.hu/alkfejl/A_dokumentacio_felepitese.pdf
