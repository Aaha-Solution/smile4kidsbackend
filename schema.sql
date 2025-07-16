-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 16, 2025 at 07:03 AM
-- Server version: 8.0.42
-- PHP Version: 8.3.22

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
(1, '/assets/images/1752644031919.png', '2025-07-16 05:33:52', '2025-07-16 05:33:52'),
(2, '/assets/images/1752644036297.png', '2025-07-16 05:33:56', '2025-07-16 05:33:56'),
(3, '/assets/images/1752644040795.png', '2025-07-16 05:34:01', '2025-07-16 05:34:01'),
(4, '/assets/images/1752644045181.png', '2025-07-16 05:34:05', '2025-07-16 05:34:05'),
(5, '/assets/images/1752644049182.png', '2025-07-16 05:34:09', '2025-07-16 05:34:09'),
(6, '/assets/images/1752644055558.png', '2025-07-16 05:34:15', '2025-07-16 05:34:15');

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
(1, 'pi_3RlPGiH6OK1hLW4i0n80bFMQ', 4500, 'gbp', 'Hindi-Pre_Junior', 'pending', '2025-07-16 06:56:44', NULL);
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
(2, 'geethu', 'geethus1202@gmail.com', 'Geethu@03', NULL, NULL, NULL, NULL, NULL, '2025-07-16 06:57:58', '2025-07-16 06:57:58', 0, NULL);

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
(1, 2, 'Hindi', 'Pre_Junior', '2025-07-16 06:59:20');

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
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `filename`, `language`, `level`, `path`, `title`, `description`, `thumbnailUrl`, `created_at`, `updated_at`) VALUES
(1, '1752648828648-1.Colours Hindi Video - PRE - V4.mp4', 'Hindi', 'Pre_Junior', 'uploads/videos/1752648828648-1.Colours Hindi Video - PRE - V4.mp4', 'Colours', 'Pre_Junior - learning video', 'uploads/thumbnails/1752648836432-splash.png', '2025-07-16 06:53:56', '2025-07-16 06:53:56'),
(2, '1752649351464-2.Numbers - PRE - Hindi v2.mp4', 'Hindi', 'Pre_Junior', 'uploads/videos/1752649351464-2.Numbers - PRE - Hindi v2.mp4', 'Numbers', 'Pre_Junior - learning video', 'uploads/thumbnails/1752649371720-splash.png', '2025-07-16 07:02:51', '2025-07-16 07:02:51');

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

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_paid_videos`
--
ALTER TABLE `user_paid_videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_paid_videos`
--
ALTER TABLE `user_paid_videos`
  ADD CONSTRAINT `user_paid_videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`users_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
