BEGIN;

    INSERT INTO address
        (city, town)
    VALUES
        ( 'Hebron', 'Halhul') ,
        ('Hebron', 'Dura') ,
        ( 'Hebron', 'Alshyoukh') ,
        ( 'Bethlehem', 'Karkafeh'),
        ('Bethlehem', 'Doha');

    INSERT INTO users
        ( display_name, email, password, phone, personal_status, number_of_individuals, address_id, number_of_devices, email_active, reset_password_code)
    VALUES
        --1
        ('Hanan', 'hawawdeh95@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 8, 2, 10, true, null),

        --2
        ('Banan', 'bananohaj7@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'married', 3, 1, 7, true, null),
        --3
        ( 'Kholoud', 'kholoud1996k@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 5, 5, 12, true, null),
        --4
        ( 'Duaa', 'duaa.halayqa@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 9, 3, 15, true, null),
        --5
        ( 'Yakoub', 'yakoob.hammouri@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 8, 1, 14, true, null),

        --6
        ('Hanan', 'hawawdeh95@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 8, 2, 10, true, null),
        --7
        ('Hanan', 'hawawdeh95@gmail.com', '$2a$10$D/IX/AtYw5YHT4YWI2B2aOg5ZGMBodHNDx2x6vIbHWomyH4fsJ9SG', 0500000000, 'single', 8, 2, 10, true, null);

    INSERT INTO provider
        ( Name , type_supported , address , email , phone1 , phone2, phone3, po_Box)
    VALUES
        ('Hebron electric power', '{"electricity"}' , 'Hebron' , 'info@hebo-pal.com', '022292818', '0598144445' , '022292821' , 818),

        ('Hebron Municipality' , '{"water"}' , 'Hebron' , 'pr@hebron-city.ps', '022228121' , '022228293' , null, 6 ),
        ('Hadara' , '{"internet"}' , 'Hebron', 'wecare@hadara.ps', '1700100100', '1700100101' , 0 , null),
        ('Bethlehem electric power' , '{"electricity"}' , 'Bethlehem' , 'info@jdeco.net' , '2744260' , '2760810' , '2770905' , null ),
        ('Bethlehem Municipality' , '{"water"}', ' Bethlehem', 'info@bethlehem-city.org', '022741322' , '1700660660' , '022741327', 48);

    INSERT INTO bill
        (users_id, provider_id,type ,total_amount, bill_DATE, due_DATE, start_DATE, end_DATE , bill_Number)
    VALUES
        (1 , 1 , 'electricity', 255 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (2 , 2 , 'water', 398.5 , '2020-03-7' , '2020-03-8', '2020-03-10', '2020-04-15', 507 ),
        (3, 3, 'internet', 255 , '2020-02-8' , ' 2020-02-17'   , '2020-02-20' , '2020-02-25' , 306) ,
        (4 , 4 , 'communication' , 574 , '2020-04-20', '2020-04-25', '2020-04-28', '2020-04-30' , 208 ),


        (2 , 1 , 'electricity', 255 , '2020-06-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (3 , 1 , 'electricity', 398.5 , '2020-05-7' , '2020-03-8', '2020-03-10', '2020-04-15', 507 ),
        (4, 3, 'internet', 255 , '2020-02-8' , ' 2020-02-17'   , '2020-02-20' , '2020-02-25' , 306) ,
        (5 , 4 , 'communication' , 574 , '2020-04-20', '2020-04-25', '2020-04-28', '2020-04-30' , 208 ),



        (5 , 1 , 'electricity', 255 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (4 , 2 , 'water', 398.5 , '2020-07-7' , '2020-03-8', '2020-03-10', '2020-04-15', 507 ),
        (2, 2, 'water', 255 , '2020-05-8' , ' 2020-02-17'   , '2020-02-20' , '2020-02-25' , 306) ,
        (1 , 4 , 'communication' , 574 , '2020-04-20', '2020-04-25', '2020-04-28', '2020-04-30' , 208 ),



        (6 , 1 , 'electricity', 2550 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (6 , 1 , 'electricity', 2815 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (7 , 1 , 'electricity', 1500 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (7 , 1 , 'electricity', 650 , '2020-05-19' , '2020-05-22' , '2020-05-23' , '2020-05-25' , 306) ,
        (1 , 2 , 'water', 398.5 , '2020-03-7' , '2020-03-8', '2020-03-10', '2020-04-15', 507 ),
        (2, 3, 'internet', 255 , '2020-04-8' , ' 2020-02-17'   , '2020-02-20' , '2020-02-25' , 306) ,
        (4 , 4 , 'internet' , 574 , '2020-07-20', '2020-04-25', '2020-04-28', '2020-04-30' , 208 );

    COMMIT;
