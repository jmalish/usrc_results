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
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(45) DEFAULT NULL,
  `driverId` varchar(45) DEFAULT NULL,
  `reason` varchar(45) DEFAULT NULL,
  `currencyAdjustment` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1706 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1609,'17507090','112378','New driver signing bonus',500),(1610,'17507090','99602','New driver signing bonus',500),(1611,'17507090','86560','New driver signing bonus',500),(1612,'17507090','94446','New driver signing bonus',500),(1613,'17507090','128945','New driver signing bonus',500),(1614,'17507090','69269','New driver signing bonus',500),(1615,'17507090','158431','New driver signing bonus',500),(1616,'17507090','99598','New driver signing bonus',500),(1617,'17507090','157777','New driver signing bonus',500),(1618,'17507090','90201','New driver signing bonus',500),(1619,'17507090','179810','New driver signing bonus',500),(1620,'17507090','202534','New driver signing bonus',500),(1621,'17507090','211982','New driver signing bonus',500),(1622,'17507090','79656','New driver signing bonus',500),(1623,'17507090','48965','New driver signing bonus',500),(1624,'17507090','149726','New driver signing bonus',500),(1625,'17507090','163731','New driver signing bonus',500),(1626,'17507090','162326','New driver signing bonus',500),(1627,'17507090','152561','New driver signing bonus',500),(1628,'17507090','112378','Finished P1',43),(1629,'17507090','112378','Pole sitter',5),(1630,'17507090','112378','4 incidents',0),(1631,'17507090','86560','Finished P2',42),(1632,'17507090','86560','6 incidents',-25),(1633,'17507090','99602','Finished P3',41),(1634,'17507090','99602','12 incidents',-50),(1635,'17507090','94446','Finished P4',40),(1636,'17507090','94446','12 incidents',-50),(1637,'17507090','128945','Finished P5',39),(1638,'17507090','128945','18 incidents',-100),(1639,'17507090','162326','Finished P6',38),(1640,'17507090','162326','0 incidents',50),(1641,'17507090','79656','Finished P7',37),(1642,'17507090','79656','14 incidents',-100),(1643,'17507090','69269','Finished P8',36),(1644,'17507090','69269','0 incidents',50),(1645,'17507090','90201','Finished P9',35),(1646,'17507090','90201','18 incidents',-100),(1647,'17507090','158431','Finished P10',34),(1648,'17507090','158431','4 incidents',0),(1649,'17507090','152561','Finished P11',33),(1650,'17507090','152561','8 incidents',-25),(1651,'17507090','149726','Finished P12',32),(1652,'17507090','149726','14 incidents',-100),(1653,'17507090','157777','Finished P13',31),(1654,'17507090','157777','10 incidents',-50),(1655,'17507090','202534','Finished P14',30),(1656,'17507090','202534','12 incidents',-50),(1657,'17507090','163731','Finished P15',29),(1658,'17507090','163731','0 incidents',50),(1659,'17507090','179810','Finished P16',28),(1660,'17507090','179810','14 incidents',-100),(1661,'17507090','99598','Finished P17',27),(1662,'17507090','99598','4 incidents',0),(1663,'17507090','48965','Finished P18',26),(1664,'17507090','48965','8 incidents',-25),(1665,'17507090','211982','Finished P19',25),(1666,'17507090','211982','0 incidents',50),(1667,'14680358','186214','New driver signing bonus',500),(1668,'14680358','183281','New driver signing bonus',500),(1669,'14680358','100362','New driver signing bonus',500),(1670,'14680358','121493','New driver signing bonus',500),(1671,'14680358','64529','New driver signing bonus',500),(1672,'14680358','60664','New driver signing bonus',500),(1673,'14680358','202109','New driver signing bonus',500),(1674,'14680358','18201','New driver signing bonus',500),(1675,'14680358','186214','Finished P1',43),(1676,'14680358','186214','4 incidents',0),(1677,'14680358','128945','Finished P2',42),(1678,'14680358','128945','8 incidents',-25),(1679,'14680358','128945','Pole sitter',5),(1680,'14680358','90201','Finished P3',41),(1681,'14680358','183281','Finished P4',40),(1682,'14680358','90201','0 incidents',50),(1683,'14680358','183281','2 incidents',50),(1684,'14680358','100362','Finished P5',39),(1685,'14680358','100362','0 incidents',50),(1686,'14680358','99602','Finished P6',38),(1687,'14680358','99602','0 incidents',50),(1688,'14680358','99598','Finished P7',37),(1689,'14680358','99598','1 incidents',50),(1690,'14680358','79656','Finished P8',36),(1691,'14680358','79656','0 incidents',50),(1692,'14680358','149726','Finished P9',35),(1693,'14680358','149726','0 incidents',50),(1694,'14680358','64529','Finished P10',34),(1695,'14680358','64529','2 incidents',50),(1696,'14680358','121493','Finished P11',33),(1697,'14680358','121493','10 incidents',-50),(1698,'14680358','157777','8 incidents',-25),(1699,'14680358','157777','Finished P12',32),(1700,'14680358','60664','Finished P13',31),(1701,'14680358','202109','2 incidents',50),(1702,'14680358','60664','6 incidents',-25),(1703,'14680358','18201','Finished P15',29),(1704,'14680358','202109','Finished P14',30),(1705,'14680358','18201','0 incidents',50);
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `driverId` int(11) NOT NULL,
  `driverName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`driverId`),
  UNIQUE KEY `driverId_UNIQUE` (`driverId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (18201,'Michael Conn'),(48965,'Richard Allen'),(60664,'David Ohman'),(64529,'Brian Ray'),(69269,'John Huntington'),(79656,'Joe Petrich'),(86560,'Jamie Christenson'),(90201,'Jordan Malish'),(94446,'Chris Skala'),(99598,'James Willms'),(99602,'Rich Schwindt'),(100362,'Eddie Curry'),(112378,'Brett Punkari'),(121493,'Jason Garrett3'),(128945,'Cody Fowler'),(149726,'Andy Moore'),(152561,'Brent Rogers'),(157777,'Trent Zichterman'),(158431,'Nicolas Lalande Church'),(162326,'Dave Rowe'),(163731,'Riley Sherman'),(179810,'JW McAulay'),(183281,'Glen Wilson'),(186214,'Shawn Hughes'),(202109,'Nelson Austin2'),(202534,'Gloria Quintanilla'),(211982,'Scotty Channer');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` int(8) DEFAULT NULL,
  `finPos` int(11) DEFAULT NULL,
  `carId` int(11) DEFAULT NULL,
  `car` varchar(45) DEFAULT NULL,
  `carClassId` int(11) DEFAULT NULL,
  `carClass` varchar(45) DEFAULT NULL,
  `teamId` int(11) DEFAULT NULL,
  `custId` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `startPos` int(11) DEFAULT NULL,
  `carNum` int(11) DEFAULT NULL,
  `outId` int(11) DEFAULT NULL,
  `out` varchar(45) DEFAULT NULL,
  `interval` varchar(45) DEFAULT NULL,
  `lapsLed` varchar(45) DEFAULT NULL,
  `qualifyTime` varchar(45) DEFAULT NULL,
  `averageLapTime` varchar(45) DEFAULT NULL,
  `fastestLapTime` varchar(45) DEFAULT NULL,
  `fastLapNum` int(11) DEFAULT NULL,
  `lapsComp` int(11) DEFAULT NULL,
  `inc` int(11) DEFAULT NULL,
  `leaguePoints` int(11) DEFAULT NULL,
  `maxFuelFillPerc` varchar(45) DEFAULT NULL,
  `weightPenaltyKg` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1584 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (1550,17507090,1,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',112378,112378,'Brett Punkari',1,19,0,'Running','-00.000','121','','18.789','15.129',2,200,4,0,'100','0'),(1551,17507090,2,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',86560,86560,'Jamie Christenson',4,88,0,'Running','-00.639','44','','18.792','15.417',14,200,6,0,'100','0'),(1552,17507090,3,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',99602,99602,'Rich Schwindt',7,55,0,'Running','-00.640','0','','18.792','15.469',14,200,12,0,'100','0'),(1553,17507090,5,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',128945,128945,'Cody Fowler',3,24,0,'Running','-02.038','0','','18.799','15.151',2,200,18,0,'100','0'),(1554,17507090,4,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',94446,94446,'Chris Skala',2,5,0,'Running','-00.660','0','','18.792','15.670',14,200,12,0,'100','0'),(1555,17507090,6,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',162326,162326,'Dave Rowe',11,22,0,'Running','-02.220','34','','18.800','15.478',5,200,0,0,'100','0'),(1556,17507090,7,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',79656,79656,'Joe Petrich',15,67,0,'Running','-02.957','1','','18.803','15.634',57,200,14,0,'100','0'),(1557,17507090,8,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',69269,69269,'John Huntington',12,38,0,'Running','-04.392','0','','18.811','15.490',136,200,0,0,'100','0'),(1558,17507090,9,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',90201,90201,'Jordan Malish',5,94,0,'Running','-05.939','0','','18.818','15.221',3,200,18,0,'100','0'),(1559,17507090,10,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',158431,158431,'Nicolas Lalande Church',8,450,0,'Running','-1 L','0','','18.895','15.427',195,199,4,0,'100','0'),(1560,17507090,11,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',152561,152561,'Brent Rogers',13,13,0,'Running','-2 L','0','','18.994','15.588',195,198,8,0,'100','0'),(1561,17507090,12,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',149726,149726,'Andy Moore',6,45,0,'Running','-2 L','0','','18.996','15.477',5,198,14,0,'100','0'),(1562,17507090,13,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',157777,157777,'Trent Zichterman',17,42,0,'Running','-6 L','0','','19.434','15.727',56,194,10,0,'100','0'),(1563,17507090,16,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',179810,179810,'JW McAulay',18,5,0,'Running','-140 L','0','','57.582','15.517',4,60,14,0,'100','0'),(1564,17507090,14,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',202534,202534,'Gloria Quintanilla',14,48,0,'Running','-9 L','0','','18.312','15.574',7,191,12,0,'100','0'),(1565,17507090,15,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',163731,163731,'Riley Sherman',10,97,0,'Running','-9 L','0','','19.469','15.593',136,191,0,0,'100','0'),(1566,17507090,17,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',99598,99598,'James Willms',9,12,0,'Running','-153 L','0','','19.044','15.589',14,47,4,0,'100','0'),(1567,17507090,18,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',48965,48965,'Richard Allen',16,1,0,'Running','-156 L','0','','19.456','15.779',34,44,8,0,'100','0'),(1568,17507090,19,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',211982,211982,'Scotty Channer',19,7,32,'Disconnected','-198 L','0','','23.184','',0,2,0,0,'100','0'),(1569,14680358,1,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',186214,186214,'Shawn Hughes',6,13,0,'Running','-00.000','20','','1:12.461','57.276',29,67,4,0,'100','0'),(1570,14680358,3,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',90201,90201,'Jordan Malish',4,94,0,'Running','-03.342','10','','1:12.511','57.362',60,67,0,0,'100','0'),(1571,14680358,2,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',128945,128945,'Cody Fowler',1,24,0,'Running','-02.504','20','','1:12.498','57.056',15,67,8,0,'100','0'),(1572,14680358,6,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',99602,99602,'Rich Schwindt',9,55,0,'Running','-06.621','0','','1:11.904','57.732',62,67,0,0,'100','0'),(1573,14680358,4,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',183281,183281,'Glen Wilson',5,10,0,'Running','-05.738','1','','1:12.547','57.665',43,67,2,0,'100','0'),(1574,14680358,5,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',100362,100362,'Eddie Curry',3,420,0,'Running','-06.318','0','','1:12.555','57.788',53,67,0,0,'100','0'),(1575,14680358,7,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',99598,99598,'James Willms',7,12,0,'Running','-07.557','2','','1:12.574','57.367',3,67,1,0,'100','0'),(1576,14680358,8,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',79656,79656,'Joe Petrich',13,67,0,'Running','-09.615','0','','1:12.604','57.830',61,67,0,0,'100','0'),(1577,14680358,9,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',149726,149726,'Andy Moore',8,45,0,'Running','-12.635','0','','1:12.269','58.012',3,67,0,0,'100','0'),(1578,14680358,10,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',64529,64529,'Brian Ray',12,27,0,'Running','-22.111','7','','1:12.791','57.602',22,67,2,0,'100','0'),(1579,14680358,13,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',60664,60664,'David Ohman',11,50,0,'Running','-25 L','0','','1:17.503','58.893',4,42,6,0,'100','0'),(1580,14680358,11,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',121493,121493,'Jason Garrett3',2,73,0,'Running','-3 L','7','','1:13.480','57.263',29,64,10,0,'100','0'),(1581,14680358,12,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',157777,157777,'Trent Zichterman',14,42,0,'Running','-16 L','0','','1:20.282','59.062',4,51,8,0,'100','0'),(1582,14680358,14,62,'NASCAR Camping World Toyota Tundra',0,'Hosted All Cars Class',202109,202109,'Nelson Austin2',10,19,0,'Running','-32 L','0','','2:23.633','59.425',3,35,2,0,'100','0'),(1583,14680358,15,63,'NASCAR Camping World Chevrolet Silverado',0,'Hosted All Cars Class',18201,18201,'Michael Conn',15,30,0,'Running','-67 L','0','','00.000','',0,0,0,0,'100','0');
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
  `sessionId` int(8) DEFAULT NULL,
  `startTime` varchar(45) DEFAULT NULL,
  `Track` varchar(45) DEFAULT NULL,
  `leagueName` varchar(45) DEFAULT NULL,
  `leagueId` varchar(45) DEFAULT NULL,
  `leagueSeason` varchar(45) DEFAULT NULL,
  `leagueSeasonId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_details`
--

LOCK TABLES `session_details` WRITE;
/*!40000 ALTER TABLE `session_details` DISABLE KEYS */;
INSERT INTO `session_details` VALUES (114,17507090,'2016.08.20 12:00 AM GMT','Bristol Motor Speedway','1','63','NASCAR Camping World Chevrolet Silverado','0'),(115,14680358,'2015.09.26 1:00 AM GMT','Pocono Raceway - Oval','Gear Jammers','1514','ALL RIGHT DRIVERS SEASON 3','25815');
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

-- Dump completed on 2017-02-11 21:33:41
