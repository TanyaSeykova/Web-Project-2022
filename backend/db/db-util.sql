-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 07:07 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `starwars_animations`
--

-- --------------------------------------------------------

--
-- Table structure for table `animations`
--

CREATE TABLE `animations` (
  `name` varchar(128) NOT NULL,
  `dataFileName` varchar(128) NOT NULL,
  `configFileName` varchar(128) NOT NULL,
  `audioFileName` varchar(128) NOT NULL,
  `commentsFileName` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `animations`
--

INSERT INTO `animations` (`name`, `dataFileName`, `configFileName`, `audioFileName`, `commentsFileName`) VALUES
('test-animation', 'test-animation-data.json', 'test-animation-config.json', 'starwars_audio.mp3', 'test-animation-comments.json');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animations`
--
ALTER TABLE `animations`
  ADD PRIMARY KEY (`name`);
COMMIT;