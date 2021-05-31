# bills-system-analysis

## Problem

The core problem to build this application is collecting electricity, water, and phone bills, and compare the consumption them with neighbors who registered in the app depending on common factors Like location , number of devices and individuals ,To help individuals rationalize consumption

## Goals

- Create Comparison system for utility billing in general.
- Find solutions to the problem of different consumption.
- Finding different price problems for the same consumption of water, electricity and telephone.

## User Journey

As a user I can add my information like (number of individuals, consumption of utilities) , and compare my bill that I choose with the same bills from the same users with the same background and information and display the result with some charts and statistics, and i can add new bill

## user Story

1. As a user I can see the landing page
2. As a user I can enter the login page.
3. As a user I can sign up in new accounts.
4. As a user I can see the home page.
5. As a user I can choose the type of bills that i want .
6. As a user I can see the bills for the type I chose .
7. As a user I can see the bill statistics.
8. As a user I can see the contact information page.
9. As a user I can see the menu.
10. As a user I can choose the profile from the menu and see the profile page .
11. As a user I can add new bill.
12. As a user if I’m logged in I can see another menu.

## Database Schema

![Bill Db  (2)](https://user-images.githubusercontent.com/7718220/86216726-28efba80-bb87-11ea-8492-1a0e1b41980e.jpg)

## Setup the project

To setup the app locally follow these steps :

- Git clone bills-system-analysis repo : `git clone`
- Install node modules for client side and server side : `npm i`
- Add .env file then and DATABASE_URL
- run this command to run the project : `node Server/database/dbBuild.js` to Build Data Base
- run this command to run the project : `npm run dev`

## Used Technologies

<h4>Front end</h4>
<ul>
<li>React</li>
<li>Material UI</li>
</ul>
<h4>Back end</h4>
<ul>
<li>PostgreSQL</li>
<li>Nodejs</li>
<li>Express</li>
</ul>
