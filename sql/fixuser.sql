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

 Date: 15/05/2022 18:30:21
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fixuser
-- ----------------------------
DROP TABLE IF EXISTS `fixuser`;
CREATE TABLE `fixuser`  (
  `idx` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `telNumber` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `avaterUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fixuser
-- ----------------------------
INSERT INTO `fixuser` VALUES ('57038', 'zsd', '13123221321', '男', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Xsl85maIJHic64jh859K7U0ibbic1bk8BOdR0MG7metTJR4SVK95079CMb9ib63yq99s4ic7qibSISwic1SOyYzoMvnDw/132', 'hh');
INSERT INTO `fixuser` VALUES ('94046', 'zzp', '18866669999', '男', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Xsl85maIJHic64jh859K7U0ibbic1bk8BOdR0MG7metTJR4SVK95079CMb9ib63yq99s4ic7qibSISwic1SOyYzoMvnDw/132', '桐原');

SET FOREIGN_KEY_CHECKS = 1;
