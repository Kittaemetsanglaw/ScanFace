/*
  Warnings:

  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_userId_fkey`;

-- DropTable
DROP TABLE `attendance`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Teacher` (
    `Teach_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Teach_Name` VARCHAR(191) NOT NULL,
    `Teach_User` VARCHAR(191) NOT NULL,
    `Teach_Pass` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Teacher_Teach_User_key`(`Teach_User`),
    PRIMARY KEY (`Teach_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course_Detail` (
    `Course_ID` VARCHAR(191) NOT NULL,
    `Course_Name` VARCHAR(191) NOT NULL,
    `Teach_ID` INTEGER NOT NULL,
    `Start_Time` VARCHAR(191) NOT NULL DEFAULT '00:00:00',
    `End_Time` VARCHAR(191) NOT NULL DEFAULT '00:00:00',

    PRIMARY KEY (`Course_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `Student_ID` INTEGER NOT NULL,
    `Student_Name` VARCHAR(191) NOT NULL,
    `Student_Email` VARCHAR(191) NOT NULL,
    `Student_Username` VARCHAR(191) NOT NULL,
    `Student_Password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Student_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassRoom` (
    `Class_no` INTEGER NOT NULL AUTO_INCREMENT,
    `Course_ID` VARCHAR(191) NOT NULL,
    `Student_ID` INTEGER NOT NULL,
    `Check_Status` VARCHAR(191) NOT NULL,
    `Class_Date` DATETIME(3) NOT NULL,
    `Class_Time` DATETIME(3) NOT NULL,
    `Section` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Class_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student_Check` (
    `Check_no` INTEGER NOT NULL AUTO_INCREMENT,
    `Course_ID` VARCHAR(191) NOT NULL,
    `Check_Date` DATETIME(3) NOT NULL,
    `Check_Time` VARCHAR(191) NOT NULL DEFAULT '00:00:00',
    `Student_ID` INTEGER NOT NULL,
    `Check_Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Check_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course_Detail` ADD CONSTRAINT `Course_Detail_Teach_ID_fkey` FOREIGN KEY (`Teach_ID`) REFERENCES `Teacher`(`Teach_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassRoom` ADD CONSTRAINT `ClassRoom_Course_ID_fkey` FOREIGN KEY (`Course_ID`) REFERENCES `Course_Detail`(`Course_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassRoom` ADD CONSTRAINT `ClassRoom_Student_ID_fkey` FOREIGN KEY (`Student_ID`) REFERENCES `Student`(`Student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student_Check` ADD CONSTRAINT `Student_Check_Course_ID_fkey` FOREIGN KEY (`Course_ID`) REFERENCES `Course_Detail`(`Course_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student_Check` ADD CONSTRAINT `Student_Check_Student_ID_fkey` FOREIGN KEY (`Student_ID`) REFERENCES `Student`(`Student_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
