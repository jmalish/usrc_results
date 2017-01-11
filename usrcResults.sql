-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: jordanmalish.com    Database: usrc_results
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(45) DEFAULT NULL,
  `finPos` varchar(45) DEFAULT NULL,
  `carId` varchar(45) DEFAULT NULL,
  `car` varchar(45) DEFAULT NULL,
  `carClassId` varchar(45) DEFAULT NULL,
  `carClass` varchar(45) DEFAULT NULL,
  `teamId` varchar(45) DEFAULT NULL,
  `custId` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `startPos` varchar(45) DEFAULT NULL,
  `carNum` varchar(45) DEFAULT NULL,
  `outId` varchar(45) DEFAULT NULL,
  `out` varchar(45) DEFAULT NULL,
  `interval` varchar(45) DEFAULT NULL,
  `lapsLed` varchar(45) DEFAULT NULL,
  `qualifyTime` varchar(45) DEFAULT NULL,
  `averageLapTime` varchar(45) DEFAULT NULL,
  `fastestLapTime` varchar(45) DEFAULT NULL,
  `fastLapNum` varchar(45) DEFAULT NULL,
  `lapsComp` varchar(45) DEFAULT NULL,
  `inc` varchar(45) DEFAULT NULL,
  `leaguePoints` varchar(45) DEFAULT NULL,
  `maxFuelFillPerc` varchar(45) DEFAULT NULL,
  `weightPenaltyKg` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_details`
--

DROP TABLE IF EXISTS `session_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(45) DEFAULT NULL,
  `startTime` varchar(45) DEFAULT NULL,
  `Track` varchar(45) DEFAULT NULL,
  `leagueName` varchar(45) DEFAULT NULL,
  `leagueId` varchar(45) DEFAULT NULL,
  `leagueSeason` varchar(45) DEFAULT NULL,
  `leagueSeasonId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_details`
--

LOCK TABLES `session_details` WRITE;
/*!40000 ALTER TABLE `session_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-10 22:13:07
