-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 07:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tryusbd`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `phone`, `email`, `message`, `created_at`) VALUES
(1, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'rrr', '2025-01-10 16:57:45'),
(2, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', ';llllllllll', '2025-01-10 17:29:14'),
(3, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'eeeeeeeeeeeeeeeeeeeeeeeeee', '2025-01-10 17:37:01');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text NOT NULL,
  `delivery_location` varchar(20) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `delivery_charge` decimal(10,2) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `order_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_name`, `phone`, `email`, `address`, `delivery_location`, `subtotal`, `delivery_charge`, `total_amount`, `order_date`, `created_at`, `status`) VALUES
(1, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'outside', 163992.00, 110.00, 164102.00, '2025-01-10 22:46:55', '2025-01-10 16:46:55', 'pending'),
(2, 'Bishwaprotap', '01788974534', 'baburay214@gmail.com', '10\r\n62', 'outside', 117996.00, 110.00, 118106.00, '2025-01-10 22:47:58', '2025-01-10 16:47:58', 'pending'),
(3, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'inside', 52998.00, 60.00, 53058.00, '2025-01-10 22:49:50', '2025-01-10 16:49:50', 'pending'),
(4, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'inside', 54998.00, 60.00, 55058.00, '2025-01-10 23:29:05', '2025-01-10 17:29:05', 'pending'),
(5, 'rrrrrrrrrrrr', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'inside', 82997.00, 60.00, 83057.00, '2025-01-10 23:37:25', '2025-01-10 17:37:25', 'completed'),
(6, 'rrrrrr', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'outside', 29999.00, 110.00, 30109.00, '2025-01-10 23:52:05', '2025-01-10 17:52:05', 'pending'),
(7, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'outside', 36997.00, 110.00, 37107.00, '2025-01-11 00:03:43', '2025-01-10 18:03:43', 'pending'),
(8, 'Bishwaprotap RAy', '01788974534', 'baburay214@gmail.com', 'House 62, Road 10 ,Sector 10 , Uttara Dhaka', 'inside', 40998.00, 60.00, 41058.00, '2025-01-11 00:18:01', '2025-01-10 18:18:01', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `quantity`, `price`, `created_at`) VALUES
(1, 1, 1, 'Sony WH-1000XM4 Wireless Headphones', 2, 29999.00, '2025-01-10 16:46:55'),
(2, 1, 3, 'Samsung Galaxy Watch 5', 2, 27999.00, '2025-01-10 16:46:55'),
(3, 1, 4, 'Anker PowerCore 26800mAh', 2, 4999.00, '2025-01-10 16:46:55'),
(4, 1, 7, 'Samsung Galaxy Buds2 Pro', 2, 18999.00, '2025-01-10 16:46:55'),
(5, 2, 1, 'Sony WH-1000XM4 Wireless Headphones', 2, 29999.00, '2025-01-10 16:47:58'),
(6, 2, 3, 'Samsung Galaxy Watch 5', 1, 27999.00, '2025-01-10 16:47:58'),
(7, 2, 21, 'Fitbit Sense 2', 1, 29999.00, '2025-01-10 16:47:58'),
(8, 3, 2, 'Apple AirPods Pro', 1, 24999.00, '2025-01-10 16:49:50'),
(9, 3, 3, 'Samsung Galaxy Watch 5', 1, 27999.00, '2025-01-10 16:49:50'),
(10, 4, 1, 'Sony WH-1000XM4 Wireless Headphones', 1, 29999.00, '2025-01-10 17:29:05'),
(11, 4, 2, 'Apple AirPods Pro', 1, 24999.00, '2025-01-10 17:29:05'),
(12, 5, 1, 'Sony WH-1000XM4 Wireless Headphones', 1, 29999.00, '2025-01-10 17:37:25'),
(13, 5, 2, 'Apple AirPods Pro', 1, 24999.00, '2025-01-10 17:37:25'),
(14, 5, 3, 'Samsung Galaxy Watch 5', 1, 27999.00, '2025-01-10 17:37:25'),
(15, 6, 1, 'Sony WH-1000XM4 Wireless Headphones', 1, 29999.00, '2025-01-10 17:52:05'),
(16, 7, 12, 'ROMOSS 30000mAh Power Bank', 1, 3999.00, '2025-01-10 18:03:43'),
(17, 7, 8, 'Mi Power Bank 20000mAh', 1, 2999.00, '2025-01-10 18:03:43'),
(18, 7, 1, 'Sony WH-1000XM4 Wireless Headphones', 1, 29999.00, '2025-01-10 18:03:43'),
(19, 8, 20, 'UGREEN 145W Power Bank', 1, 7999.00, '2025-01-10 18:18:01'),
(20, 8, 15, 'Huawei Watch GT 3 Pro', 1, 32999.00, '2025-01-10 18:18:01');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `status` enum('available','upcoming','out_of_stock') DEFAULT 'available',
  `rating` decimal(3,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category`, `status`, `rating`, `created_at`) VALUES
(1, 'Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 2999.99, 'images/products/headphones1.jpg', 'headphones', 'available', 0.00, '2025-01-10 17:48:12'),
(2, 'TWS Earbuds', 'True wireless stereo earbuds with touch controls', 1499.99, 'images/products/earbuds1.jpg', 'earbuds', 'available', 0.00, '2025-01-10 17:48:12'),
(3, 'Smart Watch', 'Fitness tracking smartwatch with heart rate monitor', 3999.99, 'images/products/smartwatch1.jpg', 'smartwatch', 'available', 0.00, '2025-01-10 17:48:12'),
(4, 'Power Bank', '20000mAh high-capacity power bank with fast charging', 1999.99, 'images/products/powerbank1.jpg', 'powerbank', 'available', 0.00, '2025-01-10 17:48:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
