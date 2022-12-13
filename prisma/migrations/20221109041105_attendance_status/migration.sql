/*
  Warnings:

  - Added the required column `attendanceStatus` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "attendanceStatus" "AttendanceStatus" NOT NULL;
