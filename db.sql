# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.25)
# Database: livramento
# Generation Time: 2015-09-09 20:01:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table acruxtable_email
# ------------------------------------------------------------

DROP TABLE IF EXISTS `acruxtable_email`;

CREATE TABLE `acruxtable_email` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `subject` varchar(55) NOT NULL,
  `send_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `acruxtable_email` WRITE;
/*!40000 ALTER TABLE `acruxtable_email` DISABLE KEYS */;

INSERT INTO `acruxtable_email` (`id`, `name`, `subject`, `send_date`)
VALUES
	(1,'Douglas Bastos','Primeiro email enviado','2015-09-05 18:34:23.000000'),
	(2,'Joaquim barboza','Está tudo bem com você?','2015-09-01 12:00:00.000000'),
	(3,'Rayssa Bastos','Oi, tudo bem?','2015-08-11 20:19:51.000000'),
	(4,'Davi Henrique','Eu tenho o melhor pai do mundo!','2015-09-03 10:20:33.000000'),
	(5,'Joaquim barboza','Você viu meu email?','2015-09-07 19:38:28.000000'),
	(6,'Maysa Souza','Confirmado para amanhã','2015-09-10 19:38:58.000000'),
	(7,'Carlos Henrique','[IMPORTANTE] - Reunião amanhã','2015-09-07 22:23:06.000000'),
	(8,'Carla Ramos','Ramal Cidade nova','2015-09-08 22:23:33.000000'),
	(9,'Playstation','Você vai ficar bem até o amanhecer?','2015-09-01 22:25:36.000000'),
	(10,'Facebook','Solicitação de redefinição de senha','2015-09-10 22:26:02.000000'),
	(11,'Shell','Promoção Experiências dos Sonhos - Cadastro','2015-09-30 22:26:26.000000'),
	(12,'Itaú','Confira as ofertas imperdíveis do Sempre Presente','2015-09-09 22:26:46.000000'),
	(13,'Globosat Play!','Temporadas fresquinhas chegaram no Globosat Play!','2015-09-07 22:27:21.000000'),
	(14,'Hugo Pacheco','Para quem se interessa','2015-09-08 18:27:10.000000');

/*!40000 ALTER TABLE `acruxtable_email` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
