-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 04, 2022 at 05:36 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hospital1`
--

-- --------------------------------------------------------

--
-- Table structure for table `blooddon`
--

CREATE TABLE `blooddon` (
  `bloodDonId` int(11) NOT NULL,
  `donorId` int(11) NOT NULL,
  `birthDay` date NOT NULL,
  `bloodGroup` varchar(10) NOT NULL,
  `weight` int(11) NOT NULL,
  `tattoo` tinyint(1) NOT NULL,
  `std` tinyint(1) NOT NULL,
  `hiv` tinyint(1) NOT NULL,
  `cardiac` tinyint(1) NOT NULL,
  `hepatitis` tinyint(1) NOT NULL,
  `cancer` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blooddon`
--

INSERT INTO `blooddon` (`bloodDonId`, `donorId`, `birthDay`, `bloodGroup`, `weight`, `tattoo`, `std`, `hiv`, `cardiac`, `hepatitis`, `cancer`) VALUES
(5, 3, '2000-04-29', 'AB-', 57, 0, 0, 0, 0, 0, 0),
(8, 7, '1996-05-26', 'A-', 58, 0, 0, 0, 0, 0, 0),
(9, 2, '1998-05-05', 'B+', 53, 1, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `temp_donor` int(11) NOT NULL,
  `reserved_date` date NOT NULL,
  `reserved_in` date NOT NULL,
  `reserve_status` tinyint(4) NOT NULL,
  `reserve_delete` tinyint(4) NOT NULL,
  `approve` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `temp_donor`, `reserved_date`, `reserved_in`, `reserve_status`, `reserve_delete`, `approve`) VALUES
(1, 4, '2022-05-26', '2022-05-09', 1, 0, 'approve'),
(2, 8, '2022-05-26', '2022-05-29', 1, 0, 'approve'),
(3, 8, '2022-05-26', '2022-05-29', 1, 0, 'approve'),
(4, 8, '2022-07-06', '2022-05-29', 1, 0, 'approve'),
(5, 8, '2022-05-26', '2022-05-29', 1, 1, 'pending'),
(6, 8, '2022-06-24', '2022-05-29', 1, 0, 'pending'),
(7, 8, '2022-05-31', '2022-05-29', 1, 0, 'pending'),
(8, 8, '2022-06-30', '2022-05-29', 1, 0, 'approve'),
(9, 8, '2022-06-07', '2022-05-30', 1, 0, 'pending'),
(10, 8, '2022-06-15', '2022-05-30', 1, 0, 'pending'),
(11, 8, '2022-06-01', '2022-06-01', 1, 0, 'pending'),
(12, 8, '2022-07-07', '2022-06-01', 1, 0, 'pending'),
(13, 8, '2022-06-11', '2022-06-02', 1, 0, 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dep_id` int(11) NOT NULL,
  `dep_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dep_id`, `dep_name`) VALUES
(1, 'Administrative Department'),
(2, 'Finance Division'),
(3, 'Ward No 01'),
(4, 'Ward No 02'),
(5, 'Ward No 03'),
(6, 'Ward No 04'),
(7, 'Ward No 05'),
(8, 'Ward No 07'),
(9, 'Ward No 09'),
(10, 'Ward No 10'),
(11, 'Ward No 11'),
(12, 'Ward No 12'),
(13, 'Ward No 13'),
(14, 'Ward No 14'),
(15, 'Ward No 15A'),
(16, 'Ward No 15B'),
(17, 'Ward No 15C'),
(18, 'Ward No 17'),
(19, 'Ward No 18'),
(20, 'Ward No 19'),
(21, 'Ward No 20'),
(22, 'Ward No 21'),
(23, 'Ward No 22'),
(24, 'Ward No 23'),
(25, 'Ward No 24'),
(26, 'Ward No 25'),
(27, 'Ward No 26'),
(28, 'Ward No 27'),
(29, 'Ward No 28'),
(30, 'Ward No 29'),
(31, 'Ward No 30'),
(32, 'SICU'),
(33, 'MICU'),
(34, 'Theater'),
(35, 'Pharmacy'),
(36, 'Dental'),
(37, 'Biochemistry Lab'),
(38, 'Blood Bank'),
(39, 'Hematology Lab'),
(40, 'Drugs Store'),
(41, 'Histopathology Lab'),
(42, 'MRO Room'),
(43, 'Clinic'),
(44, 'CRU'),
(45, 'CT Unit'),
(46, 'Counselling Unit'),
(47, 'BTU'),
(48, 'ETU'),
(49, 'ECG Room'),
(50, 'Relaxation Unit'),
(51, 'Physiotherapy'),
(52, 'Radiology Department'),
(53, 'Surgical Stores'),
(54, 'General Stores'),
(55, 'Health Education Unit'),
(56, 'Kitchen'),
(57, 'Linac'),
(59, 'Ward No 16'),
(61, 'Bleeding Room'),
(62, 'DTU'),
(63, 'CT Reporting Unit');

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

CREATE TABLE `designation` (
  `desig_id` int(11) NOT NULL,
  `desig_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`desig_id`, `desig_name`) VALUES
(1, 'Director'),
(2, 'Medical Officer'),
(3, 'Nurse'),
(4, 'Sister'),
(5, 'Chief MLT (Medical Laboratory Technologist)'),
(6, 'Consultant Radiologist'),
(7, 'Consultant Hematologist'),
(8, 'Consultant Histopathologist'),
(9, 'Consultant Anesthetic'),
(10, 'Consultant Oncologist'),
(11, 'Consultant Gynecologist'),
(12, 'Pediatric Oncologist'),
(13, 'Chief Pharmacist'),
(14, 'Health service AID');

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `donation_id` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `donorName` int(11) NOT NULL,
  `donationDate` date NOT NULL,
  `donation_delet` tinyint(1) NOT NULL,
  `donationstatus` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donation`
--

INSERT INTO `donation` (`donation_id`, `user`, `donorName`, `donationDate`, `donation_delet`, `donationstatus`) VALUES
(1, 'Damith Hashan', 3, '2022-05-20', 0, 1),
(2, 'Damith Hashan', 2, '2022-05-20', 0, 1),
(3, 'DAMITH HASHAN', 5, '2022-05-27', 0, 1),
(4, 'Damith Hashan', 5, '2022-05-27', 0, 1),
(5, 'Damith Hashan', 6, '2022-05-29', 0, 1),
(6, 'Damith Hashan', 4, '2022-05-30', 0, 1),
(7, 'Damith Hashan', 7, '2022-05-30', 0, 1),
(8, 'Damith Hashan', 8, '2022-05-31', 0, 1),
(9, 'Damith Hashan', 1, '2022-06-01', 0, 1),
(10, 'Damith Hashan', 8, '2022-06-01', 0, 1),
(11, 'Damith Hashan', 1, '2022-06-01', 0, 1),
(12, 'Damith Hashan', 4, '2022-06-01', 0, 1),
(13, 'Damith Hashan', 6, '2022-06-01', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `donor_all`
--

CREATE TABLE `donor_all` (
  `donor_id` int(11) NOT NULL,
  `R/D` varchar(10) NOT NULL DEFAULT 'D',
  `donor_type` varchar(10) NOT NULL,
  `title` varchar(10) NOT NULL,
  `national_id` varchar(13) NOT NULL,
  `donor_name` varchar(100) NOT NULL,
  `address_line1` varchar(40) NOT NULL,
  `address_line2` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `contact_no2` varchar(10) NOT NULL,
  `reg_date` date NOT NULL,
  `donor_password` varchar(200) NOT NULL,
  `isVerified` tinyint(1) NOT NULL,
  `isBloodDon` tinyint(1) NOT NULL,
  `delete_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `donor_all`
--

INSERT INTO `donor_all` (`donor_id`, `R/D`, `donor_type`, `title`, `national_id`, `donor_name`, `address_line1`, `address_line2`, `email`, `contact_no`, `contact_no2`, `reg_date`, `donor_password`, `isVerified`, `isBloodDon`, `delete_status`) VALUES
(1, 'D', 'person', 'MR', '970440160V', 'Dami Rathnayaka', 'Warakapolaa', 'Kegalle', 'damithhashanlive@gmail.com', '0112300300', '0115566564', '2022-04-28', '', 0, 0, 0),
(6, 'D', 'person', 'MR', '980520320022', 'Gihana shehani', 'pannalawa', 'delgoda', 'hettinade29@gmail.com', '0779562358', '', '2022-05-27', '', 0, 0, 0),
(8, 'B', 'person', 'MRS', '923596895566', 'Nadimi malsha', '', '', 'hettinadee29@gmail.com', '0115688988', '', '2022-05-29', '$2a$10$qwid/ITDBw7O5C9ElLr2luV93kJCEB8uzYXjapSfzSvmMLPbFHXoa', 1, 0, 0),
(4, 'B', 'person', 'MS', '985623258523', 'nawanji heianthuduwa', 'makola', 'kiribathgoda', 'mm@gmail.com', '0115423562', '0112522533', '2022-05-08', '123', 1, 0, 0),
(5, 'D', 'person', 'DR', '663580426v', 'nandasiri hettiarachchi', 'makola north', 'makola', 'nandasiri@example.com', '0712300322', '0112355988', '2022-05-16', '', 0, 0, 0),
(9, 'D', 'person', 'MR', '884562025565', 'Nimal Kumaran', 'Weliwita south', 'Weliwita', 'nimal@example.com', '0712655988', '', '2022-05-30', '$2a$10$PYFvAl/pmwdxTHanZ3D2zOVOq9Lax0BYz5JcodZX3nU9TUCXykJZS', 0, 0, 0),
(3, 'D', 'person', 'MS', '956303202V', 'Sandu Pererawa', 'Mabima South', 'Mabima', 'Sandu@example.com', '0114562633', '0115356254', '2022-05-05', '', 0, 1, 0),
(2, 'D', 'person', 'DR', '980550223V', 'Rathna Silvaa', 'Mabola', 'wattala', 'silva@example.com', '0714693655', '0112566899', '2022-04-28', '', 0, 1, 0),
(7, 'D', 'person', 'DR', '962303565858', 'sunil kumara', 'colombo', 'colombo', 'sunil@example.com', '0112655988', '0112355688', '2022-05-27', '', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `donor_team`
--

CREATE TABLE `donor_team` (
  `teamid` int(11) NOT NULL,
  `donor_name` int(11) NOT NULL,
  `title` varchar(10) NOT NULL,
  `membername` varchar(50) NOT NULL,
  `national_idt` varchar(13) NOT NULL,
  `address_line1t` varchar(40) NOT NULL,
  `address_line2t` varchar(40) NOT NULL,
  `contact_not` varchar(10) NOT NULL,
  `emailt` varchar(50) NOT NULL,
  `reg_datet` date NOT NULL,
  `deletestatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `issuance`
--

CREATE TABLE `issuance` (
  `issuance_id` int(11) NOT NULL,
  `issued_by` varchar(100) NOT NULL,
  `issue_dep` int(11) NOT NULL,
  `to_whom` varchar(100) NOT NULL,
  `issue_date` date NOT NULL,
  `issue_delet` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `issuance`
--

INSERT INTO `issuance` (`issuance_id`, `issued_by`, `issue_dep`, `to_whom`, `issue_date`, `issue_delet`) VALUES
(1, 'Damith Hashan', 3, 'gg', '2022-05-21', 0),
(2, 'Damith Hashan', 1, 'Damith Hashan', '2022-05-27', 0),
(3, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-27', 0),
(4, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-27', 0),
(5, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-27', 0),
(6, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-30', 0),
(7, 'nandana hetti', 3, 'kamal rathna', '2022-05-30', 0),
(8, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(9, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(10, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(11, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(12, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(13, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(14, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(15, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(16, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(17, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(18, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(19, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(20, 'Damith Hashan', 15, 'Damith Hashan', '2022-05-31', 0),
(21, 'Damith Hashan', 2, 'Damith Hashan', '2022-05-31', 0),
(22, 'Damith Hashan', 3, 'nimal rathna', '2022-06-01', 0),
(23, 'Damith Hashan', 4, 'Damith Hashan', '2022-06-01', 0),
(24, 'Damith Hashan', 4, 'Damith Hashan', '2022-06-01', 0),
(25, 'Damith Hashan', 4, 'Namila Perera', '2022-06-01', 0),
(26, 'Damith Hashan', 3, 'nadee', '2022-06-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `issue_item`
--

CREATE TABLE `issue_item` (
  `issueId` int(11) NOT NULL,
  `issuance` int(11) NOT NULL,
  `issue_type` varchar(20) NOT NULL,
  `issue_item` varchar(20) NOT NULL,
  `issue_itemqty` int(11) NOT NULL,
  `issue_delete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `issue_item`
--

INSERT INTO `issue_item` (`issueId`, `issuance`, `issue_type`, `issue_item`, `issue_itemqty`, `issue_delete`) VALUES
(1, 1, 'SC', 'SC0001', 1, 0),
(2, 1, 'SI', 'SI0003', 1, 0),
(3, 2, 'SC', 'SC0001', 1, 0),
(4, 3, 'CI', 'CI0008', 1, 0),
(5, 4, 'CI', 'CI0008', 1, 0),
(6, 5, 'FD', 'FD00014', 2, 0),
(7, 6, 'SI', 'SI0003', 2, 0),
(8, 7, 'CI', 'CI0004', 1, 0),
(9, 7, 'FD', 'FD00014', 2, 0),
(10, 8, 'FD', 'FD00014', 2, 0),
(11, 15, 'FD', 'FD00014', 1, 0),
(12, 16, 'FD', 'FD00014', 1, 0),
(13, 21, 'FD', 'FD00014', 1, 0),
(14, 22, 'CI', 'CI0004', 1, 0),
(15, 23, 'SC', 'SC0001', 1, 0),
(16, 24, 'SC', 'SC0001', 1, 0),
(17, 25, 'SI', 'SI0003', 2, 0),
(18, 26, 'CI', 'CI0005', 5000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `itemtype`
--

CREATE TABLE `itemtype` (
  `type_id` int(11) NOT NULL,
  `type_code` varchar(20) NOT NULL,
  `type_name` varchar(30) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `itemtype`
--

INSERT INTO `itemtype` (`type_id`, `type_code`, `type_name`, `status`) VALUES
(1, 'SC', 'Surgical Consumables', 0),
(2, 'SI', 'Surgical Items', 0),
(3, 'CI', 'Consumable Items', 0),
(4, 'DR', 'Drugs', 0),
(5, 'GI', 'General Items', 0),
(6, 'FD', 'Foods', 0),
(29, 'ML', 'Meal', 0),
(30, 'SP', 'Soup', 0);

-- --------------------------------------------------------

--
-- Table structure for table `item_name`
--

CREATE TABLE `item_name` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `type_cd` varchar(20) NOT NULL,
  `itemname` varchar(100) DEFAULT NULL,
  `delete_name` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_name`
--

INSERT INTO `item_name` (`id`, `code`, `type_cd`, `itemname`, `delete_name`) VALUES
(126, 'CI0004', 'CI', 'A4 Paper Pack', 0),
(127, 'CI0005', 'CI', 'Soap', 0),
(128, 'CI0006', 'CI', 'Tooth Brush', 0),
(129, 'CI0007', 'CI', 'Tooth Paste', 0),
(130, 'CI0008', 'CI', 'Pillow Covers', 0),
(131, 'CI0009', 'CI', 'X-ray Film', 0),
(132, 'DR00010', 'DR', 'Amoxicillin Capsule 250mg', 0),
(133, 'DR00011', 'DR', 'Amoxicillin Capsule 500mg', 1),
(138, 'FD00014', 'FD', 'Marie Biscuit', 0),
(139, 'GI00015', 'GI', 'Pen', 0),
(140, 'GI00016', 'GI', 'Pencil', 1),
(136, 'ML0001', 'ML', 'Meal', 0),
(123, 'SC0001', 'SC', 'Gloves', 0),
(124, 'SC0002', 'SC', 'Surgical Mask', 0),
(125, 'SI0003', 'SI', 'Surgical Scissor', 0),
(137, 'SP0001', 'SP', 'Soup', 0);

-- --------------------------------------------------------

--
-- Table structure for table `item_table`
--

CREATE TABLE `item_table` (
  `item_id` int(11) NOT NULL,
  `donationNum` int(11) NOT NULL,
  `type_code` varchar(20) NOT NULL,
  `item_name` varchar(100) DEFAULT NULL,
  `item_qty` int(50) NOT NULL,
  `item_description` varchar(50) NOT NULL,
  `receive_date` date NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_table`
--

INSERT INTO `item_table` (`item_id`, `donationNum`, `type_code`, `item_name`, `item_qty`, `item_description`, `receive_date`, `deleted`) VALUES
(1, 1, 'SC', 'SC0001', 1, '', '2022-05-20', 0),
(2, 2, 'SC', 'SC0001', 1, '', '2022-05-20', 0),
(3, 2, 'SI', 'SI0003', 1, '', '2022-05-20', 0),
(4, 2, 'CI', 'CI0004', 2, '', '2022-05-20', 0),
(5, 2, 'CI', 'CI0005', 2, '', '2022-05-20', 0),
(6, 2, 'CI', 'CI0006', 4, '', '2022-05-20', 0),
(7, 2, 'CI', 'CI0007', 3, '', '2022-05-20', 0),
(8, 2, 'CI', 'CI0008', 2, '', '2022-05-20', 0),
(9, 3, 'SI', 'SI0003', 1, '', '2022-05-27', 0),
(10, 3, 'DR', 'DR00010', 2, 'cards', '2022-05-27', 0),
(11, 4, 'FD', 'FD00014', 10, 'packets', '2022-05-27', 0),
(12, 4, 'DR', 'DR00010', 1, '', '2022-05-27', 0),
(13, 5, 'SI', 'SI0003', 4, '', '2022-05-29', 0),
(14, 5, 'FD', 'FD00014', 3, '', '2022-05-29', 0),
(16, 7, 'GI', 'GI00015', 4, '', '2022-05-30', 0),
(18, 9, 'GI', 'GI00015', 2, '', '2022-06-01', 0),
(19, 9, 'CI', 'CI0005', 2, '', '2022-06-01', 0),
(20, 9, 'SI', 'SI0003', 1, '', '2022-06-01', 0),
(22, 11, 'SC', 'SC0001', 2, '', '2022-06-01', 0),
(23, 11, 'CI', 'CI0005', 1, '', '2022-06-01', 0),
(24, 11, 'GI', 'GI00015', 1, '', '2022-06-01', 0),
(26, 13, 'CI', 'CI0005', 10, '', '2022-06-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `req_id` int(11) NOT NULL,
  `requestBy` varchar(50) NOT NULL,
  `department` int(11) NOT NULL,
  `designation` int(11) NOT NULL,
  `date` date NOT NULL,
  `delete_req` tinyint(1) NOT NULL,
  `req_status` tinyint(1) NOT NULL,
  `accept_by` varchar(50) DEFAULT NULL,
  `accept_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`req_id`, `requestBy`, `department`, `designation`, `date`, `delete_req`, `req_status`, `accept_by`, `accept_date`) VALUES
(1, 'Damith Hashan', 7, 4, '2022-05-17', 0, 1, NULL, '0000-00-00'),
(2, 'Damith Hashan', 5, 2, '2022-05-20', 0, 1, NULL, '0000-00-00'),
(3, 'Damith Hashan', 1, 6, '2022-05-20', 0, 1, NULL, '0000-00-00'),
(4, 'Damith Hashan', 1, 3, '2022-05-20', 0, 1, NULL, '0000-00-00'),
(5, 'Damith Hashan', 2, 1, '2022-05-20', 0, 0, 'Damith Hashan', '2022-05-31'),
(6, 'Damith Hashan', 15, 8, '2022-05-20', 0, 0, 'Damith Hashan', '2022-05-31'),
(7, 'Damith Hashan', 5, 4, '2022-06-01', 0, 1, NULL, '0000-00-00'),
(8, 'Nadeesha Hetti', 6, 4, '2022-06-01', 0, 1, NULL, '0000-00-00'),
(9, 'Nadeesha Hetti', 6, 4, '2022-06-01', 0, 1, NULL, '0000-00-00'),
(10, 'Nadeesha Hetti', 6, 3, '2022-06-01', 0, 1, NULL, '0000-00-00'),
(11, 'Damith Hashan', 4, 4, '2022-06-01', 0, 0, 'Damith Hashan', '2022-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `request_inventory`
--

CREATE TABLE `request_inventory` (
  `req_stk_id` int(11) NOT NULL,
  `requestId` int(11) NOT NULL,
  `itemCode` varchar(20) NOT NULL,
  `cd_name` varchar(20) NOT NULL,
  `request_qty` int(11) NOT NULL,
  `receive_qty` int(11) NOT NULL,
  `req_rec_date` date NOT NULL,
  `delete_record` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request_inventory`
--

INSERT INTO `request_inventory` (`req_stk_id`, `requestId`, `itemCode`, `cd_name`, `request_qty`, `receive_qty`, `req_rec_date`, `delete_record`) VALUES
(22, 1, 'CI', 'CI0006', 6, 0, '2022-05-17', 0),
(23, 2, 'SC', 'SC0001', 3, 0, '2022-05-20', 0),
(24, 2, 'SC', 'SC0002', 3, 0, '2022-05-20', 0),
(25, 2, 'SI', 'SI0003', 3, 0, '2022-05-20', 0),
(26, 2, 'CI', 'CI0004', 1, 0, '2022-05-20', 0),
(32, 3, 'CI', 'CI0005', 2, 0, '2022-05-20', 0),
(33, 3, 'CI', 'CI0006', 2, 0, '2022-05-20', 0),
(34, 4, 'DR', 'DR00010', 2, 0, '2022-05-20', 0),
(35, 4, 'SC', 'SC0002', 4, 0, '2022-05-20', 0),
(36, 4, 'SC', 'SC0001', 3, 0, '2022-05-20', 0),
(37, 4, 'CI', 'CI0004', 2, 0, '2022-05-20', 0),
(38, 5, 'SI', 'SI0003', 2, 0, '2022-05-20', 0),
(39, 5, 'CI', 'CI0007', 4, 0, '2022-05-20', 0),
(40, 5, 'CI', 'CI0009', 3, 0, '2022-05-20', 0),
(41, 5, 'DR', 'DR00010', 6, 0, '2022-05-20', 0),
(42, 5, 'FD', 'FD00014', 10, 5, '2022-05-20', 0),
(43, 6, 'SC', 'SC0001', 1, 0, '2022-05-20', 1),
(44, 6, 'SC', 'SC0002', 2, 0, '2022-05-20', 1),
(45, 6, 'SI', 'SI0003', 2, 2, '2022-05-20', 0),
(46, 6, 'FD', 'FD00014', 2, 2, '2022-05-20', 0),
(47, 6, 'CI', 'CI0009', 6, 0, '2022-05-20', 0),
(48, 6, 'CI', 'CI0008', 6, 2, '2022-05-20', 0),
(51, 7, 'GI', 'GI00015', 5, 0, '2022-06-01', 0),
(52, 7, 'FD', 'FD00014', 3, 0, '2022-06-01', 0),
(55, 8, 'CI', 'CI0009', 4, 0, '2022-06-01', 0),
(56, 9, 'SI', 'SI0003', 5, 0, '2022-06-01', 0),
(57, 9, 'DR', 'DR00010', 3, 0, '2022-06-01', 0),
(58, 10, 'SC', 'SC0001', 5, 0, '2022-06-01', 0),
(59, 10, 'SC', 'SC0002', 5, 0, '2022-06-01', 0),
(60, 11, 'SC', 'SC0001', 2, 2, '2022-06-01', 1);

-- --------------------------------------------------------

--
-- Table structure for table `soup`
--

CREATE TABLE `soup` (
  `soup_id` int(11) NOT NULL,
  `donation_num` int(11) NOT NULL,
  `morning` tinyint(1) NOT NULL,
  `evening` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `soup`
--

INSERT INTO `soup` (`soup_id`, `donation_num`, `morning`, `evening`) VALUES
(38, 3, 0, 1),
(39, 4, 1, 0),
(40, 5, 1, 0),
(41, 1, 1, 0),
(42, 8, 0, 1),
(43, 10, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL,
  `item_num` int(11) DEFAULT NULL,
  `issue_num` int(11) DEFAULT NULL,
  `enteredBy` varchar(50) NOT NULL,
  `codeid` varchar(20) NOT NULL,
  `codename` varchar(100) NOT NULL,
  `item_qty_in` int(11) NOT NULL,
  `item_qty_out` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  `delete_stk` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `item_num`, `issue_num`, `enteredBy`, `codeid`, `codename`, `item_qty_in`, `item_qty_out`, `date`, `status`, `delete_stk`) VALUES
(367, 1, NULL, 'Damith Hashan', 'SC', 'SC0001', 1, 0, '2022-04-20 00:00:00', 0, 0),
(368, 2, NULL, 'Damith Hashan', 'SC', 'SC0001', 1, 0, '2022-05-20 00:00:00', 0, 0),
(369, 3, NULL, 'Damith Hashan', 'SI', 'SI0003', 1, 0, '2022-05-20 00:00:00', 0, 0),
(370, 4, NULL, 'Damith Hashan', 'CI', 'CI0004', 2, 0, '2022-05-20 00:00:00', 0, 0),
(371, 5, NULL, 'Damith Hashan', 'CI', 'CI0005', 2, 0, '2022-05-20 00:00:00', 0, 0),
(372, 6, NULL, 'Damith Hashan', 'CI', 'CI0006', 4, 0, '2022-05-20 00:00:00', 0, 0),
(373, 7, NULL, 'Damith Hashan', 'CI', 'CI0007', 3, 0, '2022-05-20 00:00:00', 0, 0),
(374, 8, NULL, 'Damith Hashan', 'CI', 'CI0008', 2, 0, '2022-05-20 00:00:00', 0, 0),
(378, NULL, 1, 'Damith Hashan', 'SC', 'SC0001', 0, 1, '2022-05-21 00:00:00', 0, 0),
(379, NULL, 2, 'Damith Hashan', 'SI', 'SI0003', 0, 1, '2022-05-21 00:00:00', 0, 0),
(380, 9, NULL, 'DAMITH HASHAN', 'SI', 'SI0003', 1, 0, '2022-05-27 00:00:00', 0, 0),
(381, 10, NULL, 'DAMITH HASHAN', 'DR', 'DR00010', 2, 0, '2022-05-27 00:00:00', 0, 0),
(382, NULL, 3, 'DAMITH HASHAN', 'SC', 'SC0001', 0, 1, '2022-04-27 00:00:00', 0, 0),
(383, NULL, 4, 'DAMITH HASHAN', 'CI', 'CI0008', 0, 1, '2022-05-27 00:00:00', 0, 0),
(386, NULL, 5, 'Damith Hashan', 'CI', 'CI0008', 0, 1, '2022-05-27 00:00:00', 0, 0),
(387, 11, NULL, 'Damith Hashan', 'FD', 'FD00014', 10, 0, '2022-05-27 00:00:00', 0, 0),
(388, 12, NULL, 'Damith Hashan', 'DR', 'DR00010', 1, 0, '2022-05-27 00:00:00', 0, 0),
(389, NULL, 6, 'Damith Hashan', 'FD', 'FD00014', 0, 2, '2022-05-27 00:00:00', 0, 0),
(390, 13, NULL, 'Damith Hashan', 'SI', 'SI0003', 4, 0, '2022-05-29 00:00:00', 0, 0),
(391, 14, NULL, 'Damith Hashan', 'FD', 'FD00014', 3, 0, '2022-05-29 00:00:00', 0, 0),
(398, NULL, 7, 'Damith Hashan', 'SI', 'SI0003', 0, 2, '2022-05-30 00:00:00', 0, 0),
(399, NULL, 8, 'nandana hetti', 'CI', 'CI0004', 0, 1, '2022-05-30 00:00:00', 0, 0),
(400, NULL, 9, 'nandana hetti', 'FD', 'FD00014', 0, 2, '2022-05-30 00:00:00', 0, 0),
(401, 16, NULL, 'Damith Hashan', 'GI', 'GI00015', 4, 0, '2022-05-30 00:00:00', 0, 0),
(408, NULL, 10, 'Damith Hashan', 'FD', 'FD00014', 0, 2, '2022-05-31 00:00:00', 0, 0),
(409, NULL, 11, 'Damith Hashan', 'FD', 'FD00014', 0, 1, '2022-05-31 00:00:00', 0, 0),
(410, NULL, 12, 'Damith Hashan', 'FD', 'FD00014', 0, 1, '2022-05-31 00:00:00', 0, 0),
(411, NULL, 13, 'Damith Hashan', 'FD', 'FD00014', 0, 1, '2022-05-31 00:00:00', 0, 0),
(412, 18, NULL, 'Damith Hashan', 'GI', 'GI00015', 2, 0, '2022-06-01 00:00:00', 0, 0),
(413, 19, NULL, 'Damith Hashan', 'CI', 'CI0005', 2, 0, '2022-06-01 00:00:00', 0, 0),
(414, 20, NULL, 'Damith Hashan', 'SI', 'SI0003', 1, 0, '2022-06-01 00:00:00', 0, 0),
(415, NULL, 14, 'Damith Hashan', 'CI', 'CI0004', 0, 1, '2022-06-01 00:00:00', 0, 0),
(416, 22, NULL, 'Damith Hashan', 'SC', 'SC0001', 2, 0, '2022-06-01 00:00:00', 0, 0),
(417, 23, NULL, 'Damith Hashan', 'CI', 'CI0005', 1, 0, '2022-06-01 00:00:00', 0, 0),
(418, 24, NULL, 'Damith Hashan', 'GI', 'GI00015', 1, 0, '2022-06-01 00:00:00', 0, 0),
(419, NULL, 15, 'Damith Hashan', 'SC', 'SC0001', 0, 1, '2022-06-01 00:00:00', 0, 0),
(420, NULL, 16, 'Damith Hashan', 'SC', 'SC0001', 0, 1, '2022-06-01 00:00:00', 0, 0),
(421, NULL, 17, 'Damith Hashan', 'SI', 'SI0003', 0, 2, '2022-06-01 00:00:00', 0, 0),
(422, NULL, 18, 'Damith Hashan', 'CI', 'CI0005', 0, 5000, '2022-06-01 00:00:00', 0, 0),
(423, 26, NULL, 'Damith Hashan', 'CI', 'CI0005', 10, 0, '2022-06-01 00:00:00', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `temp_item_table`
--

CREATE TABLE `temp_item_table` (
  `temp_item_id` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `item_name` varchar(40) NOT NULL,
  `item_qty` int(50) NOT NULL,
  `item_description` varchar(50) NOT NULL,
  `action` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `temp_item_table`
--

INSERT INTO `temp_item_table` (`temp_item_id`, `bookingId`, `code`, `item_name`, `item_qty`, `item_description`, `action`) VALUES
(101, 1, 'SP', 'SP0001', 0, 'soup', 0),
(122, 2, 'ML', 'ML0001', 0, 'meal', 0),
(124, 3, 'SP', 'SP0001', 0, 'soup', 0),
(126, 4, 'SP', 'SP0001', 0, 'soup', 0),
(127, 5, 'SP', 'SP0001', 0, 'soup', 0),
(129, 6, 'ML', 'ML0001', 0, 'meal', 0),
(130, 7, 'ML', 'ML0001', 0, 'meal', 0),
(131, 8, 'SP', 'SP0001', 0, 'meal', 0),
(137, 9, 'ML', 'ML0001', 0, 'meal', 0),
(140, 10, 'SP', 'SP0001', 0, 'soup', 0),
(210, 11, 'ML', 'ML0001', 0, 'meal', 0),
(215, 12, 'ML', 'ML0001', 0, 'meal', 0),
(216, 13, 'ML', 'ML0001', 0, 'meal', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `user_full_name` varchar(50) NOT NULL,
  `user_nic` varchar(13) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_contact` varchar(10) NOT NULL,
  `user_address1` varchar(50) NOT NULL,
  `user_address2` varchar(50) NOT NULL,
  `designation` int(11) NOT NULL,
  `user_department` int(11) NOT NULL,
  `user_role` varchar(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `deleted_user` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `user_full_name`, `user_nic`, `user_email`, `user_contact`, `user_address1`, `user_address2`, `designation`, `user_department`, `user_role`, `username`, `user_password`, `deleted_user`) VALUES
(8, 'nandana hetti', '663580420v', 'n@gmail.com', '0115688966', '', '', 6, 12, 'front user', 'nanda', '$2a$10$H05Z2g7MVpPf/LIbBbcsSOelIgPjya.vFQU4tYjeGdPDdw8hmFB1.', 0),
(10, 'Kamal gunasena', '663580426v', 'kamal@gmail.com', '0112355688', '', '', 14, 56, 'other', 'Kamal', '$2a$10$mFS3sH8Lc37miPNswabKH..yI1x2USq8tJwijG7vV16LvQlQk4p6q', 0),
(3, 'Damith Hashan', '946202088V', 'Dami@gmail.com', '0112355688', 'M', 'N', 1, 1, 'admin', 'Damith', '$2a$10$6dEfSXzsuQrGuTyIgxnqtOFCL2IQWPo1g3tloR8vrkD2/cOhaRJgi', 0),
(4, 'Nadeesha Hetti', '970440160V', 'Nadee@gmail.com', '0712300324', 'N', 'N', 2, 1, 'receiver', 'Nadee', '$2a$10$oJOe0VNgrt/Pip2sOUM9/.eP69/KEBZKZ38LZ/SHerYUv5bg41P/a', 0),
(9, 'manel', '980550236202', 'manel@gmail.com', '0115688956', '', '', 13, 15, 'other', 'manel', 'manel123', 1),
(5, 'namal', '986502033556', 'namal@gmail.com', '0115622322', 'nm', 'nm', 14, 2, 'other', 'namal', '123', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`role_id`, `role_name`) VALUES
(1, 'admin'),
(2, 'front user'),
(4, 'other'),
(3, 'receiver');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blooddon`
--
ALTER TABLE `blooddon`
  ADD PRIMARY KEY (`bloodDonId`),
  ADD KEY `donorId` (`donorId`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `temp_donor` (`temp_donor`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indexes for table `designation`
--
ALTER TABLE `designation`
  ADD PRIMARY KEY (`desig_id`);

--
-- Indexes for table `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `donorName` (`donorName`),
  ADD KEY `user` (`user`);

--
-- Indexes for table `donor_all`
--
ALTER TABLE `donor_all`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `donor_id` (`donor_id`) USING BTREE,
  ADD UNIQUE KEY `national_id` (`national_id`),
  ADD KEY `donor_name` (`donor_name`);

--
-- Indexes for table `donor_team`
--
ALTER TABLE `donor_team`
  ADD PRIMARY KEY (`national_idt`),
  ADD UNIQUE KEY `emailt` (`emailt`),
  ADD KEY `teamname` (`donor_name`),
  ADD KEY `teamid` (`teamid`);

--
-- Indexes for table `issuance`
--
ALTER TABLE `issuance`
  ADD PRIMARY KEY (`issuance_id`),
  ADD KEY `issuance_ibfk_1` (`issued_by`),
  ADD KEY `issuance_ibfk_4` (`issue_dep`);

--
-- Indexes for table `issue_item`
--
ALTER TABLE `issue_item`
  ADD PRIMARY KEY (`issueId`),
  ADD KEY `issuance` (`issuance`),
  ADD KEY `issue_type` (`issue_type`),
  ADD KEY `issue_item` (`issue_item`);

--
-- Indexes for table `itemtype`
--
ALTER TABLE `itemtype`
  ADD PRIMARY KEY (`type_id`),
  ADD UNIQUE KEY `type_code` (`type_code`);

--
-- Indexes for table `item_name`
--
ALTER TABLE `item_name`
  ADD PRIMARY KEY (`code`),
  ADD KEY `type_cd` (`type_cd`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `item_table`
--
ALTER TABLE `item_table`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `type_code` (`type_code`),
  ADD KEY `item_name` (`item_name`),
  ADD KEY `donationNum` (`donationNum`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`req_id`),
  ADD KEY `requestBy` (`requestBy`),
  ADD KEY `department` (`department`),
  ADD KEY `designation` (`designation`),
  ADD KEY `accept_by` (`accept_by`);

--
-- Indexes for table `request_inventory`
--
ALTER TABLE `request_inventory`
  ADD PRIMARY KEY (`req_stk_id`),
  ADD KEY `requestedBy` (`requestId`),
  ADD KEY `cd_name` (`cd_name`),
  ADD KEY `itemCode` (`itemCode`);

--
-- Indexes for table `soup`
--
ALTER TABLE `soup`
  ADD PRIMARY KEY (`soup_id`),
  ADD KEY `soup_ibfk_1` (`donation_num`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`) USING BTREE,
  ADD KEY `code` (`codename`),
  ADD KEY `enteredBy` (`enteredBy`),
  ADD KEY `codeid` (`codeid`),
  ADD KEY `donation_num` (`item_num`),
  ADD KEY `issue_num` (`issue_num`);

--
-- Indexes for table `temp_item_table`
--
ALTER TABLE `temp_item_table`
  ADD PRIMARY KEY (`temp_item_id`),
  ADD KEY `temp_donor_name` (`bookingId`),
  ADD KEY `type_code` (`code`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `item_name` (`item_name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_nic`),
  ADD KEY `user_full_name` (`user_full_name`),
  ADD KEY `user_department` (`user_department`),
  ADD KEY `uid` (`uid`),
  ADD KEY `designation` (`designation`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`),
  ADD KEY `role_name` (`role_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blooddon`
--
ALTER TABLE `blooddon`
  MODIFY `bloodDonId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `designation`
--
ALTER TABLE `designation`
  MODIFY `desig_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `donor_team`
--
ALTER TABLE `donor_team`
  MODIFY `teamid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `issuance`
--
ALTER TABLE `issuance`
  MODIFY `issuance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `itemtype`
--
ALTER TABLE `itemtype`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `item_name`
--
ALTER TABLE `item_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT for table `request_inventory`
--
ALTER TABLE `request_inventory`
  MODIFY `req_stk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `soup`
--
ALTER TABLE `soup`
  MODIFY `soup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=424;

--
-- AUTO_INCREMENT for table `temp_item_table`
--
ALTER TABLE `temp_item_table`
  MODIFY `temp_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blooddon`
--
ALTER TABLE `blooddon`
  ADD CONSTRAINT `blooddon_ibfk_1` FOREIGN KEY (`donorId`) REFERENCES `donor_all` (`donor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`temp_donor`) REFERENCES `donor_all` (`donor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`donorName`) REFERENCES `donor_all` (`donor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donation_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`user_full_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donor_team`
--
ALTER TABLE `donor_team`
  ADD CONSTRAINT `donor_team_ibfk_1` FOREIGN KEY (`donor_name`) REFERENCES `donor_all` (`donor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issuance`
--
ALTER TABLE `issuance`
  ADD CONSTRAINT `issuance_ibfk_1` FOREIGN KEY (`issued_by`) REFERENCES `user` (`user_full_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issuance_ibfk_4` FOREIGN KEY (`issue_dep`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `issue_item`
--
ALTER TABLE `issue_item`
  ADD CONSTRAINT `issue_item_ibfk_1` FOREIGN KEY (`issuance`) REFERENCES `issuance` (`issuance_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `issue_item_ibfk_2` FOREIGN KEY (`issue_type`) REFERENCES `itemtype` (`type_code`),
  ADD CONSTRAINT `issue_item_ibfk_3` FOREIGN KEY (`issue_item`) REFERENCES `item_name` (`code`);

--
-- Constraints for table `item_name`
--
ALTER TABLE `item_name`
  ADD CONSTRAINT `item_name_ibfk_1` FOREIGN KEY (`type_cd`) REFERENCES `itemtype` (`type_code`);

--
-- Constraints for table `item_table`
--
ALTER TABLE `item_table`
  ADD CONSTRAINT `item_table_ibfk_2` FOREIGN KEY (`item_name`) REFERENCES `item_name` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_table_ibfk_3` FOREIGN KEY (`donationNum`) REFERENCES `donation` (`donation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`requestBy`) REFERENCES `user` (`user_full_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`department`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_3` FOREIGN KEY (`designation`) REFERENCES `designation` (`desig_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_ibfk_4` FOREIGN KEY (`accept_by`) REFERENCES `user` (`user_full_name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request_inventory`
--
ALTER TABLE `request_inventory`
  ADD CONSTRAINT `request_inventory_ibfk_2` FOREIGN KEY (`cd_name`) REFERENCES `item_name` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_inventory_ibfk_3` FOREIGN KEY (`itemCode`) REFERENCES `itemtype` (`type_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_inventory_ibfk_4` FOREIGN KEY (`requestId`) REFERENCES `request` (`req_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `soup`
--
ALTER TABLE `soup`
  ADD CONSTRAINT `soup_ibfk_1` FOREIGN KEY (`donation_num`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`enteredBy`) REFERENCES `user` (`user_full_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`codeid`) REFERENCES `itemtype` (`type_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_3` FOREIGN KEY (`codename`) REFERENCES `item_name` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_5` FOREIGN KEY (`item_num`) REFERENCES `item_table` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stock_ibfk_6` FOREIGN KEY (`issue_num`) REFERENCES `issue_item` (`issueId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `temp_item_table`
--
ALTER TABLE `temp_item_table`
  ADD CONSTRAINT `temp_item_table_ibfk_2` FOREIGN KEY (`item_name`) REFERENCES `item_name` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `temp_item_table_ibfk_3` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_department`) REFERENCES `department` (`dep_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`designation`) REFERENCES `designation` (`desig_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
