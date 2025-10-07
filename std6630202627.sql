-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2025 at 11:27 PM
-- Server version: 8.0.43-0ubuntu0.24.04.1
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_std6630202627`
--

-- --------------------------------------------------------

--
-- Table structure for table `electronic_devices`
--

CREATE TABLE `electronic_devices` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `stock` int NOT NULL,
  `location` varchar(50) NOT NULL,
  `status` int NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `electronic_devices`
--

INSERT INTO `electronic_devices` (`id`, `name`, `category`, `stock`, `location`, `status`, `image`) VALUES
(2, 'Razer Gaming Keyboard Huntsman Mini60 Clicky PP SW', 'Keyboard ', 10, 'Gaming equipment store', 1, 'https://media-cdn.bnn.in.th/227936/Razer-Gaming-Keyboard-Huntsman-Mini60-Clicky-PP-SW-square_medium.jpg'),
(3, 'Logitech G512 Carbon Clicky SW Mechanical Gaming Keyboard', 'Keyboard', 30, 'Gaming equipment store', 1, 'https://logitech.e-express.co.th/wp-content/uploads/2021/05/G512-GX-Blue-Clicky.jpg'),
(4, 'Ajazz AK832 Pro Black Mechanical Brown Switch', 'keyboard', 10, 'Gaming equipment store', 1, 'https://media.education.studio7thailand.com/91594/ajazz-gaming-keyboard-ak832-pro-black-mechanical-keyboard-brown-switch-1-square_medium.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `electronic_devices`
--
ALTER TABLE `electronic_devices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `electronic_devices`
--
ALTER TABLE `electronic_devices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
