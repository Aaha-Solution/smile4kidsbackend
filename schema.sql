-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 17, 2025 at 05:51 AM
-- Server version: 8.0.42
-- PHP Version: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elevenplus_mobile_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int NOT NULL,
  `path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `path`, `created_at`, `updated_at`) VALUES
(1, '/assets/images/1752659686710.png', '2025-07-16 09:54:46', '2025-07-16 09:54:46'),
(2, '/assets/images/1752659693840.png', '2025-07-16 09:54:53', '2025-07-16 09:54:53'),
(3, '/assets/images/1752659699454.png', '2025-07-16 09:54:59', '2025-07-16 09:54:59'),
(4, '/assets/images/1752659706697.png', '2025-07-16 09:55:06', '2025-07-16 09:55:06'),
(5, '/assets/images/1752659715320.png', '2025-07-16 09:55:15', '2025-07-16 09:55:15'),
(6, '/assets/images/1752659720437.png', '2025-07-16 09:55:20', '2025-07-16 09:55:20');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int NOT NULL,
  `stripe_session_id` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `course_type` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `stripe_session_id`, `amount`, `currency`, `course_type`, `status`, `created_at`, `user_id`) VALUES
(1, 'pi_3RlPGiH6OK1hLW4i0n80bFMQ', 4500, 'gbp', 'Hindi-Pre_Junior', 'pending', '2025-07-16 06:56:44', NULL),
(2, 'pi_3RlPIqH6OK1hLW4i0r9ZCXhB', 4500, 'gbp', 'Hindi-Pre_Junior', 'pending', '2025-07-16 06:58:57', NULL);


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `users_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm_password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `ph_no` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0',
  `otp` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`users_id`, `username`, `email_id`, `password`, `confirm_password`, `dob`, `ph_no`, `address`, `avatar`, `created_at`, `updated_at`, `is_admin`, `otp`) VALUES
(1, 'admin', 'admin@gmail.com', 'admin@123', 'admin@123', NULL, NULL, NULL, NULL, '2025-07-16 06:57:06', '2025-07-16 06:57:06', 1, NULL),
(2, 'geethu', 'geethus1202@gmail.com', 'Geethu@03', NULL, NULL, '07968555666', 'Asdfghjkklqwerrtyyuuiiioozxvbnnnk', 'https://smile4kidsbackend-production-2970.up.railway.app/assets/images/1752659706697.png', '2025-07-16 06:57:58', '2025-07-16 11:29:14', 0, '378743');

-- --------------------------------------------------------

--
-- Table structure for table `user_paid_videos`
--

CREATE TABLE `user_paid_videos` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `language` varchar(50) NOT NULL,
  `level` varchar(50) NOT NULL,
  `paid_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_paid_videos`
--

INSERT INTO `user_paid_videos` (`id`, `user_id`, `language`, `level`, `paid_at`) VALUES
(1, 2, 'Hindi', 'Pre_Junior', '2025-07-16 06:59:20'),
(2, 4, 'Panjabi', 'Pre_Junior', '2025-07-16 07:08:36');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int NOT NULL,
  `filename` varchar(255) NOT NULL,
  `language` varchar(50) NOT NULL,
  `level` varchar(50) NOT NULL,
  `path` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `thumbnailUrl` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_id` (`email_id`);

--
-- Indexes for table `user_paid_videos`
--
ALTER TABLE `user_paid_videos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_video` (`user_id`,`language`,`level`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

-- Constraints for table `user_paid_videos`
--
ALTER TABLE `user_paid_videos`
  ADD CONSTRAINT `user_paid_videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
