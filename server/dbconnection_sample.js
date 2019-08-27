const mysql = require('mysql');
const connection = mysql.createPool({
    host: '니아이피주소',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'board'
});

module.exports = connection;


// 테이블 생성
// CREATE TABLE `board` (
// 	`idx` INT(11) NOT NULL AUTO_INCREMENT,
// 	`writer` VARCHAR(32) NULL DEFAULT NULL COMMENT '작성자',
// 	`context` TEXT NULL COMMENT '내용',
// 	`password` VARCHAR(20) NULL DEFAULT NULL,
// 	`subject` VARCHAR(100) NULL DEFAULT NULL,
// 	PRIMARY KEY (`idx`)
// );
