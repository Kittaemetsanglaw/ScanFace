/*
  Warnings:

  - The primary key for the `attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `attendance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `attendance` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `attendance` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `deviceId` on table `attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_deviceId_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `Attendance_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `device` DROP FOREIGN KEY `Device_locationId_fkey`;

-- DropIndex
DROP INDEX `Attendance_deviceId_fkey` ON `attendance`;

-- DropIndex
DROP INDEX `Attendance_locationId_fkey` ON `attendance`;

-- DropIndex
DROP INDEX `Attendance_studentId_fkey` ON `attendance`;

-- DropIndex
DROP INDEX `Attendance_teacherId_fkey` ON `attendance`;

-- AlterTable
ALTER TABLE `attendance` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `locationId`,
    DROP COLUMN `studentId`,
    DROP COLUMN `teacherId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `confidence` DOUBLE NULL,
    ADD COLUMN `faceData` VARCHAR(191) NULL,
    ADD COLUMN `location` JSON NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `deviceId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL;

-- DropTable
DROP TABLE `device`;

-- DropTable
DROP TABLE `location`;

-- DropTable
DROP TABLE `student`;

-- DropTable
DROP TABLE `teacher`;
