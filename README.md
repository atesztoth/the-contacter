# Dokumentáció
## The Contacter
Készítette: Tóth Attila

### Description / Leírás:
This repository has been created for the course of 'Alkalmazások fejlesztése' at ELTE University. Here I keep the files of my project organised, and updated.

Ez a repository az ELTE 'Alkalmazások fejlesztése' című kurzushozához jött létre. Az itt található fileok mindig a legfrissebb állást tükrözik.

### 1. Követelményanalízis

#### 1.1 Célkitűzés, információ az alkalmazásról
Az alkalmazás célja az, hogy egy élvezhetően használható, kellemes felületet biztosítson kontaktjaink
kezeléséhez, azok rendezetten tartásához, konktakcsoportok meghatározásához.
Az alkalmazás használatához registráció szükséges.

#####  Funkcionális követelmények

**Vendégként** (*nem regisztrált felhasználó*)
- Vendégként a főoldalon szeretnék egy üdvözlő üzenetet látni
- Vendégként szeretnék egy üdvözlő oldalt látni
- Vendégként szeretnék regisztrációs lehetőséget

**Felhasználóként** (*regisztrált felhasználó*)
- Felhasználóként szeretném a saját kontaktjaimat látni a főoldalon.
- Felhasználóként szeretném a kedvenc kontaktjaimat elsőként látni.
- Felhasználóként szeretnék új kontaktot létrehozi.
- Felhasználóként képet szeretnék tudni csatolni egy-egy kontakthoz.
- Felhasználóként meg szeretnék adni több telefonszámot egy-egy kontakthoz.
- Felhasználóként akár e-mail címet is szeretnék társítani egy-egy kontakthoz.
- Felhasználóként szeretnék egy saját kontaktot.

##### Nem funkcionális követelmények
- **Felhasználóbarát**, ergonomikus elrendezés és kinézet.
- **Gyors** működés.
- **Biztonságos** működés: jelszavak hashének tárolása.
- **Egyszerű**, következetes felhasználói felület, egyszerű használat.
- **Kellemes** kinzet.

#### 1.2 Szakterületi fogalomjegyzék
 
 - **Kontakt**: Egy ismerős adatait reprezentáló objektum, hozzá tartozik kép is telefonszámok is.
 - **Kontakt csoport**: kontakt objektumokból álló csoport.

#### 1.3 Használatiest-modell, funkcionális követelmények

**Vendég**

Csak a főoldalt, és a regisztrációt éri el.

- Főoldal
- Bejelentkezés
- Regisztráció

**Bejelentkezett felhasználó**

A publikus oldalakon kívül ezeket is eléri:

- Új kontakt hozzáadása
- Kontakthoz kép csatolása
- Kontakthoz e-mail cím csatolása
- Kontakthoz telefonszámok csatolása
- Kontakthoz megjegyzés csatolása
- Becenév megadása
- Lakhely beírása

![](docs/images/use-case.png)

Egy eset bemutatása: ***kontakt hozzáadása***
1. A felhasználó az oldalra érkezve bejelentkezik, vagy regisztrál.
2. A regisztráció után elérhetővé vált menük közül kiíválsztja a kontakt hozzáadását.
3. Ez után az elé kerülő formot kitölti, melynek kötelező eleme csak egy név.
4. (Opcionálisan megad telefonszámot, képet, lakhelyet...)
5. Mentés gombra kattintva véglegesíti az adatokat.

![](docs/images/add-contact.png)

### 2. Tervezés
 
#### 2.1 Architektúra terv
 
##### 2.1.1 Komplemensdiagram

![](docs/images/complements.png)
 
##### 2.1.2 Oldaltérkép
 
###### Publikus:
- Főoldal
- Bejelentkezési oldal
- Regisztrációs oldal
 
###### Bejelentkezett felhasználó:
- Főoldal
- Új kontakt hozzáadása
- Listaoldal
    - kontaktcsoportok megjelenítése
    - kontaktok megjelenítése
- Szerkesztő oldalak
    - kontakt szerkesztése
    - kontaktcsoport szerkesztése
- Képfeltöltő oldal

##### 2.1.3 Végpontok

- GET / : Főoldal
- GET,POST /login : Bejelentkezés
- GET,POST /registration : Regisztráció
- GET /contacts : Kontaktok oldal
- GET /contact/contact-url-nev : Kontakt megtekintése
- GET /contacts/groups : Kontaktcsoportok megjelenítése
- GET,POST /contact/new-contact : Kontakt létrehozása
- GET,POST /contact/contact-url-nev : Kontakt szerkesztése

##### 2.2 Felhasználói-felület modell
 
###### 2.2.1 Oldalválzlatok:
 
 A tervektől való esetleges eltérések megeshetnek, ugyan is előfordulhat, hogy szerkesztés közben derül ki, hogy minimális változtatással sokkal esztétikusabb eredményt érhetek el.
 
###### Főoldal
![](docs/pageplans/Homepage.jpg)
 
###### Regisztrációs oldal

![](docs/pageplans/regisztracio.jpg)
 
###### Bejelentkezés oldal
![](docs/pageplans/bejelentkezes.jpg)
 
###### Kontaktok listázása oldal
![](docs/pageplans/listpage.jpg)
 
###### Kontakt hozzáadása / szerkesztése oldal
![](docs/pageplans/newcontact.jpg)
 
##### 2.2.2 Osztálymodell
 
###### Adatmodell


###### Adatbázisterv
 
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
