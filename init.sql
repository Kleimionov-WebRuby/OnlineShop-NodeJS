-- If Database is exists we delete it
DROP DATABASE IF EXISTS `online_shop`;

-- Create new Databese
CREATE DATABASE `online_shop` DEFAULT CHARACTER SET utf8;

-- Use new Databese
USE `online_shop`;

-- Create table @roles
CREATE TABLE `roles` (
	`id` int NOT NULL AUTO_INCREMENT,
	`role_name` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @users
CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(100) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`remove_request` bit NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @products
CREATE TABLE `products` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(100) NOT NULL,
	`desc` text NOT NULL,
	`price` float NOT NULL,
	`picture` varchar(255) NOT NULL,
	`amount` int NOT NULL,
	`created_at` date NOT NULL,
	`updated_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @rating
CREATE TABLE `rating` (
	`id` int NOT NULL AUTO_INCREMENT,
	`rating_value` int NOT NULL,
	`user_id` int DEFAULT NULL,
	`product_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @categorys
CREATE TABLE `categories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`category_name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @categorys
CREATE TABLE `users_remove` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`remove_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @user_roles
CREATE TABLE `users_roles` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @product_categorys
CREATE TABLE `products_categories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`product_id` int NOT NULL,
	`category_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Association between tables @rating and @users
ALTER TABLE `rating` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL;
-- Association between tables @rating and @products
ALTER TABLE `rating` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

-- Association between tables @users and @roles
ALTER TABLE `users_roles` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
ALTER TABLE `users_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`);

-- Association between tables @products and @categorys
ALTER TABLE `products_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;
ALTER TABLE `products_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);



--  Insert Into for testng association between tables @users and @roles (ON DELET 'user' -> delete row with | user_id === user->id \  in table @user_roles)
INSERT INTO `roles` (`role_name`) VALUES ("user"), ("admin");


INSERT INTO `users` 
(`first_name`, `last_name`, `email`, `password`) 
VALUES 
("Egor", "Kleymonov", "egor@gmail.com", "$2a$10$At8koV4DfdoYpJ79CG0YHuwGbqU6zGrKYa/dSnuxzO3UsUIjpLteC");

INSERT INTO `users` 
(`first_name`, `last_name`, `email`, `password`) 
VALUES 
("Test", "Testing", "test@gmail.com", "$2a$10$At8koV4DfdoYpJ79CG0YHuwGbqU6zGrKYa/dSnuxzO3UsUIjpLteC");

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (1,2);
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (1,1);
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (2,1);

--  Insert Into for testng association between tables @products and @categories (ON DELET 'product' -> delete row with | product_id === product->id \  in table @product_categories)
INSERT INTO `categories` (`category_name`) VALUES ("jewelry"), ("cars");

INSERT INTO `products` 
(`title`, `desc`, `price`, `picture`,`amount`) 
VALUES 
("Test Prouct 1", "Test Prouct 1 desc", 50.5, "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", 6);

INSERT INTO `products` 
(`title`, `desc`, `price`, `picture`,`amount`) 
VALUES 
("Test Prouct 2", "Test Prouct 2 desc", 510.5, "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", 2);

INSERT INTO `products_categories` (`product_id`, `category_id`) VALUES (1,2);
INSERT INTO `products_categories` (`product_id`, `category_id`) VALUES (2,1);
INSERT INTO `products_categories` (`product_id`, `category_id`) VALUES (2,2);
INSERT INTO `products_categories` (`product_id`, `category_id`) VALUES (1,1);


INSERT INTO `ratings` (`rating_value`, `product_id`, `user_id`) VALUES (2,1,2);
INSERT INTO `ratings` (`rating_value`, `product_id`, `user_id`) VALUES (5,2,1);
INSERT INTO `ratings` (`rating_value`, `product_id`, `user_id`) VALUES (2,2,2);
INSERT INTO `ratings` (`rating_value`, `product_id`, `user_id`) VALUES (5,1,1);
