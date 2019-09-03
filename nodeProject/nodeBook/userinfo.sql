/*
Navicat MySQL Data Transfer

Source Server         : book
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : mybook

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2019-09-03 15:49:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `count` int(11) NOT NULL COMMENT '访问次数',
  PRIMARY KEY (`id`,`count`) USING BTREE,
  UNIQUE KEY `name` (`username`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
