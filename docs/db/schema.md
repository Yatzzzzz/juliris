CREATE TABLE `products` ( `id` varchar(36) NOT NULL, `slug` varchar(255) NOT
NULL, `status` enum('draft','published') DEFAULT 'draft', `collection_label`
varchar(255) DEFAULT 'Juliris Collection', `name` varchar(255) NOT NULL,
`subtitle` varchar(500) DEFAULT NULL, `show_reviews` tinyint(1) DEFAULT 1,
`review_count` int(11) DEFAULT 0, `star_rating` decimal(2,1) DEFAULT 4.5,
`short_description` text DEFAULT NULL, `regular_price` int(11) NOT NULL DEFAULT
0, `sale_price` int(11) DEFAULT NULL, `variant_type`
enum('none','size','color','ring_size','custom') DEFAULT 'size',
`variant_custom_label` varchar(100) DEFAULT NULL, `variant_options` longtext
DEFAULT NULL, `details` text DEFAULT NULL, `how_to_use` text DEFAULT NULL,
`ingredients` text DEFAULT NULL, `image_url` varchar(1000) DEFAULT NULL,
`image_alt` varchar(500) DEFAULT NULL, `sku` varchar(100) DEFAULT NULL,
`material` varchar(255) DEFAULT NULL, `tags` longtext DEFAULT NULL, `categories`
longtext DEFAULT NULL, `gallery_urls` longtext DEFAULT NULL, `created_at`
datetime DEFAULT current_timestamp(), `updated_at` datetime DEFAULT
current_timestamp() ON UPDATE current_timestamp(), PRIMARY KEY (`id`), UNIQUE
KEY (`slug`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-----------------up until here is what we actualy HAVE IN THE DB- from here and
down was completed Automatically!!!!

CREATE TABLE `orders` ( `id` varchar(36) NOT NULL, `order_number` varchar(50)
NOT NULL, `customer_name` varchar(255) NOT NULL, `customer_email` varchar(255)
NOT NULL, `customer_phone` varchar(50) DEFAULT NULL, `shipping_address` text NOT
NULL, `billing_address` text DEFAULT NULL, `payment_method` varchar(100) NOT
NULL, `payment_status` enum('pending','paid','failed','refunded') DEFAULT
'pending', `order_status`
enum('pending','processing','shipped','delivered','cancelled') DEFAULT
'pending', `subtotal` int(11) NOT NULL DEFAULT 0, `shipping_cost` int(11) NOT
NULL DEFAULT 0, `tax_amount` int(11) NOT NULL DEFAULT 0, `total_amount` int(11)
NOT NULL DEFAULT 0, `discount_amount` int(11) NOT NULL DEFAULT 0, `notes` text
DEFAULT NULL, `tracking_number` varchar(255) DEFAULT NULL, `tracking_url`
varchar(1000) DEFAULT NULL, `created_at` datetime DEFAULT current_timestamp(),
`updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
PRIMARY KEY (`id`), UNIQUE KEY (`order_number`) ) ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4;

CREATE TABLE `order_items` ( `id` varchar(36) NOT NULL, `order_id` varchar(36)
NOT NULL, `product_id` varchar(36) NOT NULL, `product_name` varchar(255) NOT
NULL, `product_sku` varchar(100) DEFAULT NULL, `quantity` int(11) NOT NULL
DEFAULT 1, `price` int(11) NOT NULL DEFAULT 0, `variant_details` longtext
DEFAULT NULL, `created_at` datetime DEFAULT current_timestamp(), PRIMARY KEY
(`id`), KEY `fk_order_items_order` (`order_id`), CONSTRAINT
`fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON
DELETE CASCADE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `reviews` ( `id` varchar(36) NOT NULL, `product_id` varchar(36) NOT
NULL, `customer_name` varchar(255) NOT NULL, `customer_email` varchar(255)
DEFAULT NULL, `rating` int(11) NOT NULL, `title` varchar(255) DEFAULT NULL,
`review_text` text NOT NULL, `is_verified_purchase` tinyint(1) DEFAULT 0,
`is_approved` tinyint(1) DEFAULT 0, `created_at` datetime DEFAULT
current_timestamp(), PRIMARY KEY (`id`), KEY `fk_reviews_product`
(`product_id`), CONSTRAINT `fk_reviews_product` FOREIGN KEY (`product_id`)
REFERENCES `products` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4;

CREATE TABLE `settings` ( `id` int(11) NOT NULL AUTO_INCREMENT, `site_name`
varchar(255) NOT NULL DEFAULT 'Juliris', `site_tagline` varchar(500) DEFAULT
NULL, `logo_url` varchar(1000) DEFAULT NULL, `favicon_url` varchar(1000) DEFAULT
NULL, `currency` varchar(3) DEFAULT 'NGN', `shipping_policy` text DEFAULT NULL,
`return_policy` text DEFAULT NULL, `privacy_policy` text DEFAULT NULL,
`terms_of_service` text DEFAULT NULL, `contact_email` varchar(255) DEFAULT NULL,
`contact_phone` varchar(50) DEFAULT NULL, `social_links` longtext DEFAULT NULL,
`payment_methods` longtext DEFAULT NULL, `shipping_methods` longtext DEFAULT
NULL, `maintenance_mode` tinyint(1) DEFAULT 0, `maintenance_message` text
DEFAULT NULL, `updated_at` datetime DEFAULT current_timestamp() ON UPDATE
current_timestamp(), PRIMARY KEY (`id`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` ( `id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL,
`email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role`
enum('admin','editor','viewer') DEFAULT 'viewer', `is_active` tinyint(1) DEFAULT
1, `last_login_at` datetime DEFAULT NULL, `created_at` datetime DEFAULT
current_timestamp(), `updated_at` datetime DEFAULT current_timestamp() ON UPDATE
current_timestamp(), PRIMARY KEY (`id`), UNIQUE KEY (`email`) ) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE `wishlists` ( `id` varchar(36) NOT NULL, `customer_email`
varchar(255) NOT NULL, `product_id` varchar(36) NOT NULL, `created_at` datetime
DEFAULT current_timestamp(), PRIMARY KEY (`id`), KEY `fk_wishlists_product`
(`product_id`), CONSTRAINT `fk_wishlists_product` FOREIGN KEY (`product_id`)
REFERENCES `products` (`id`) ON DELETE CASCADE ) ENGINE=InnoDB DEFAULT
CHARSET=utf8mb4;
