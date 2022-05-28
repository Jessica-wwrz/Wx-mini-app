/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : zzp

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 15/05/2022 18:29:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fixopinion
-- ----------------------------
DROP TABLE IF EXISTS `fixopinion`;
CREATE TABLE `fixopinion`  (
  `idx` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `wxName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `opinions` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `photos` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fixopinion
-- ----------------------------
INSERT INTO `fixopinion` VALUES ('62903', NULL, 'dasd', 'da', 'http://tmp/29hipaiwj2kO00eb9471c8d921a853cece4d28815fef.jpg', '2022-05-07 20:14:43');
INSERT INTO `fixopinion` VALUES ('14122', NULL, 'qewwqe', 'ew', 'http://tmp/B5UNNeVEFIGA00eb9471c8d921a853cece4d28815fef.jpg', '2022-05-07 20:16:55');
INSERT INTO `fixopinion` VALUES ('46445', NULL, 'adasd', 'dasdasd', 'http://tmp/kUDqE5cVdD8a00eb9471c8d921a853cece4d28815fef.jpg', '2022-05-08 17:27:42');
INSERT INTO `fixopinion` VALUES ('43868', '231123', 'rrr', 'weweq', 'http://tmp/qOAQaYW3aeka00eb9471c8d921a853cece4d28815fef.jpg', '2022-05-14 18:49:19');

SET FOREIGN_KEY_CHECKS = 1;
