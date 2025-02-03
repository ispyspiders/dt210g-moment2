# Moment 2 - Dynamisk Todo-lista med React och TypeScript
#### DT210G – Fördjupad frontend-utveckling
#### Av Kajsa Classon, VT25. 

En applikation som fungerar som en "att göra"-lista, skapad med React och TypeScript. Applikationen kommunicerar med ett backend-API som hanterar CRUD-funktioner för todo-objekt.

## Uppgiftsbeskrivning
### Backend-API
#### Funktionella krav
* Stöd för CRUD-operationer för att skapa, läsa, uppdatera och ta bort todos.
* Varje todo-objekt ska innehålla minst titel (obligatoirisk), beskrivning, och status (ej påbörjad, pågående eller avklarad, där ej påbörjad är standardvärde)


Backend-API:et är skapat med Laravel. 
Länk till repo för backend: https://github.com/ispyspiders/todo-backend.git

### Frontend
Skapa en ny React-applikation med stöd för TypeScript. Applikationen kan bestå utav en undersida, formulär och utskrift av "Att göra"-listan kan skrivas ut på samma sida, fördelade i lämpliga komponenter som hämtas in till root-komponenten (App.js). Önskar du implementera routing är det tillåtet men inget krav på uppgiften.

Applikationen ska uppfylla följande krav:
* Använda TypeScript för typning och ökad kodkvalitet
* Applikationen ska vara uppdelad i lämpliga komponenter, tex en komponent för utskrift av lista, en för formulär.
* Implementera dynamisk datahämtning med useEffect-hook
* Skapa ett formulär för att lägga till nya todos med följande validering:
    * Titel måste vara minst 3 tecken lång
    * Beskrivning är valfri men får max vara 200 tecken
* Hantera olika status för todos: Ej påbörjad/Pågående/Avklarad
* Implementera funktioner för att:
    * Hämta in samtliga todos och skriv ut på lämpligt sätt på sidan
    * Lägga till en ny todo
    * Uppdatera status för en todo (ej påbörjad, pågående, avklarad)
    * Ta bort en todo
* Hantera laddnings- och felmeddelanden vid API-anrop
* Uppdatera listans tillstånd när en todo läggs till, uppdateras eller tas bort

Frivilliga funktioner:
* Använd Context API för att hantera global state och undvika prop drilling
* Implementera funktionalitet för att kunna uppdatera titel och beskrivning av en todo.
* Implementera sortering och filtrering av todos
* Lägg till animations- eller övergångseffekter