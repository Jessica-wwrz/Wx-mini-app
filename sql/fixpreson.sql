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

 Date: 15/05/2022 18:29:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fixpreson
-- ----------------------------
DROP TABLE IF EXISTS `fixpreson`;
CREATE TABLE `fixpreson`  (
  `idx` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixpassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixtelnumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixAge` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `goodType` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `fixAvatarUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fixpreson
-- ----------------------------
INSERT INTO `fixpreson` VALUES ('82198', 'zzp', '123456', '16288889999', '0-5年', '11235', 'http://tmp/PmMaTt2GUm5V00eb9471c8d921a853cece4d28815fef.jpg');
INSERT INTO `fixpreson` VALUES ('43268', 'erb', '123456', '15566666666', '0-5年', '液压系统', 'http://tmp/PmMaTt2GUm5V00eb9471c8d921a853cece4d28815fef.jpg');
INSERT INTO `fixpreson` VALUES ('51314', 'repair', '666666', '18266663333', '0-5年', '射台装置', 'http://tmp/PmMaTt2GUm5V00eb9471c8d921a853cece4d28815fef.jpg');

SET FOREIGN_KEY_CHECKS = 1;
