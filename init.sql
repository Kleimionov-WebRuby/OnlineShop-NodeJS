-- If Database is exists we delete it
DROP DATABASE IF EXISTS `onlineshop`;

-- Create new Databese
CREATE DATABASE `onlineshop` DEFAULT CHARACTER SET utf8;

-- Use new Databese
USE `onlineshop`;

-- Create table @roles
CREATE TABLE `roles` (
	`id` int NOT NULL AUTO_INCREMENT,
	`role_name` varchar(100) NOT NULL UNIQUE,
	`create_at` date NOT NULL,
	`update_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @users
CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_avatar` varchar(255) NOT NULL,
	`user_full_name` varchar(255) NOT NULL,
	`user_email` varchar(100) NOT NULL UNIQUE,
	`user_password` varchar(255) NOT NULL,
	`user_remove_request` bit NOT NULL DEFAULT 0,
	`created_at` date NOT NULL,
	`update_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @products
CREATE TABLE `products` (
	`id` int NOT NULL AUTO_INCREMENT,
	`product_title` varchar(100) NOT NULL,
	`product_desc` text NOT NULL,
	`product_price` float NOT NULL,
	`product_picture` varchar(255) NOT NULL,
	`product_amount` int NOT NULL,
	`create_at` date NOT NULL,
	`update_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @rating
CREATE TABLE `rating` (
	`id` int NOT NULL AUTO_INCREMENT,
	`rating_value` int NOT NULL,
	`user_id` int NOT NULL,
	`product_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @categorys
CREATE TABLE `categories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`category_name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @orders
CREATE TABLE `orders` (
	`id` int NOT NULL AUTO_INCREMENT,
	`product_id` int NOT NULL,
	`count` int NOT NULL,
	`price` float NOT NULL,
	`is_paid` bit NOT NULL DEFAULT 0,
	`create_at` date NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @user_roles
CREATE TABLE `user_roles` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create table @product_categorys
CREATE TABLE `product_categories` (
	`id` int NOT NULL AUTO_INCREMENT,
	`product_id` int NOT NULL,
	`category_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Create table @user_orders
CREATE TABLE `user_orders` (
	`id` int NOT NULL AUTO_INCREMENT,
	`user_id` int NOT NULL,
	`order_id` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Association between tables @rating and @users
ALTER TABLE `rating` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION;
-- Association between tables @rating and @products
ALTER TABLE `rating` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;

-- Association between tables @users and @roles
ALTER TABLE `user_roles` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
ALTER TABLE `user_roles` ADD FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`);

-- Association between tables @products and @categorys
ALTER TABLE `product_categories` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE;
ALTER TABLE `product_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

-- Foreigh key for orders from products
ALTER TABLE `orders` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

-- Association between tables @users and @orders
ALTER TABLE `user_orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;
ALTER TABLE `user_orders` ADD FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE;



--  Insert Into for testng association between tables @users and @roles (ON DELET 'user' -> delete row with | user_id === user->id \  in table @user_roles)
INSERT INTO `roles` (`role_name`) VALUES ("user"), ("admin");

INSERT INTO `users` 
(`user_avatar`, `user_full_name`, `user_email`, `user_password`) 
VALUES 
("https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", "Egor Kleymonov", "egor@gmail.com", "$2a$10$At8koV4DfdoYpJ79CG0YHuwGbqU6zGrKYa/dSnuxzO3UsUIjpLteC");

INSERT INTO `users` 
(`user_avatar`, `user_full_name`, `user_email`, `user_password`) 
VALUES 
("https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", "Test Kleymonov", "test@gmail.com", "$2a$10$At8koVUaBomvwJ79CG0YHuwGbqU6zGrKYa/dSnuxzO3UsUIjpLteC");

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES (1,2);
INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES (2,1);

--  Insert Into for testng association between tables @products and @categories (ON DELET 'product' -> delete row with | product_id === product->id \  in table @product_categories)
INSERT INTO `categories` (`category_name`) VALUES ("jewelry"), ("cars");

INSERT INTO `products` 
(`product_title`, `product_desc`, `product_price`, `product_picture`,`product_amount`) 
VALUES 
("Test Prouct 1", "Test Prouct 1 desc", 50.5, "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", 6);

INSERT INTO `products` 
(`product_title`, `product_desc`, `product_price`, `product_picture`,`product_amount`) 
VALUES 
("Test Prouct 2", "Test Prouct 2 desc", 510.5, "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1", 2);

INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES (1,2);
INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES (2,1);


--  Insert Into for testng association between tables @users and @products

INSERT INTO `orders` (`count`, `price`, `product_id`) VALUES (5, 1250, 1);
INSERT INTO `orders` (`count`, `price`, `product_id`) VALUES (1, 120, 2);

INSERT INTO `user_orders` (`user_id`, `order_id`) VALUES (1, 1);
INSERT INTO `user_orders` (`user_id`, `order_id`) VALUES (2, 2);