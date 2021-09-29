1: initialize npm using: "npm init"

2: run this command in your terminal
 "npm install express mysql ejs body-parser"
after installing nodemon [is optional], in package.json inside the script object type an object "start":"nodemon app.js"

3: Create a folder "frontend" and add all ejs files to the folder.

4: Create MySQL database using: Create database products

5: Create a table inside the database using: CREATE TABLE `products`.`prod_details` ( `prod_id` VARCHAR(20) NOT NULL , `prod_name` VARCHAR(25) NOT NULL , `description` VARCHAR(255) NOT NULL , `seller` VARCHAR(25) NOT NULL , `seller_email` VARCHAR(70) NOT NULL , `ph_no` BIGINT(11) NOT NULL , `seller_address` VARCHAR(255) NOT NULL , PRIMARY KEY (`prod_id`)) ENGINE = InnoDB;

6: Run the MySQL server

7: After placing the files on its respective folder, run "node app.js" or if you're using nodemon run "npm start" in the terminal