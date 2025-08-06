-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 06, 2025 at 08:34 PM
-- Server version: 8.0.37-cll-lve
-- PHP Version: 8.3.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tmitogoj_tmit-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `faculty_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `code`, `faculty_id`, `created_at`, `updated_at`) VALUES
(1, 'General Nursing', 'GNS', 1, '2025-08-05 13:40:08', '2025-08-05 13:40:08'),
(2, 'Electrical and Electronics Engineering', 'EET', 2, '2025-08-05 13:41:24', '2025-08-05 13:41:24'),
(3, 'Computer Engineering Technology', 'CET', 2, '2025-08-05 13:44:43', '2025-08-05 13:44:43'),
(4, 'Computer Science', 'CMS', 2, '2025-08-05 13:45:31', '2025-08-05 13:45:31'),
(5, 'Statistics', 'STA', 2, '2025-08-05 13:45:49', '2025-08-05 13:45:49'),
(6, 'Accountancy', 'ACT', 3, '2025-08-05 13:46:11', '2025-08-05 13:46:11'),
(7, 'Business Administration and Management', 'BAM', 3, '2025-08-05 13:47:09', '2025-08-05 13:47:09'),
(8, 'Public Administration', 'PAD', 3, '2025-08-05 13:47:29', '2025-08-05 13:47:29'),
(9, 'Community Health', 'CHT', 4, '2025-08-05 13:48:43', '2025-08-05 13:48:43'),
(10, 'Medical Laboratory Technology', 'MLT', 4, '2025-08-05 13:50:17', '2025-08-05 13:50:17'),
(11, 'Health Information Management', 'MIT', 4, '2025-08-05 13:50:48', '2025-08-05 13:50:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `departments_code_unique` (`code`),
  ADD KEY `departments_faculty_id_foreign` (`faculty_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_faculty_id_foreign` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
