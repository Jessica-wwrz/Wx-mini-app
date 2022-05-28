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

 Date: 15/05/2022 18:30:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fixs
-- ----------------------------
DROP TABLE IF EXISTS `fixs`;
CREATE TABLE `fixs`  (
  `idx` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `things` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `howToFix` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `process` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `repairMan` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `repairManTel` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fixs
-- ----------------------------
INSERT INTO `fixs` VALUES ('2', '桐原', '修电脑', 'http://tmp/Wk5zyUffyyyodf531c87ad5fe9fe7bdd87b8cee3d3f4.jpeg', 'loading', '18818881888', NULL, '', NULL, NULL, NULL, NULL, '2022-04-25 23:16:01');
INSERT INTO `fixs` VALUES ('5', '二贝', '修冰箱', 'http://tmp/Wk5zyUffyyyodf531c87ad5fe9fe7bdd87b8cee3d3f4.jpeg', 'loaded', '16616661666', 'wqeqw', 'smart', NULL, 'zzp', '16288889999', NULL, '2022-04-28 19:39:07');
INSERT INTO `fixs` VALUES ('68446', '桐原', '键盘', 'http://tmp/Wk5zyUffyyyodf531c87ad5fe9fe7bdd87b8cee3d3f4.jpeg', 'loaded', '19333336666', 'hhhhhhhhhhhh', '', NULL, 'zzp', NULL, NULL, '2021-10-20 11:12:12');
INSERT INTO `fixs` VALUES ('79324', '桐原', '海天国际(海天塑机集团有限公司)', 'http://tmp/X7S7lNn5TaAu00eb9471c8d921a853cece4d28815fef.jpg', 'isGood', '12312323123', 'dfsdfdfdsfsdf', 'person', '注射过程动作', 'zzp', '16288889999', NULL, '2022-05-10 21:26:35');
INSERT INTO `fixs` VALUES ('06912', '二贝', '其他（具体描述）', 'http://tmp/2Z6mxRLdTQP400eb9471c8d921a853cece4d28815fef.jpg', 'isGood', '18866669999', 'sadsadas\nssd', 'person', '注射过程动作', 'zzp', '16288889999', '金碧世纪花园(西南门)', '2022-05-14 21:54:13');

SET FOREIGN_KEY_CHECKS = 1;
