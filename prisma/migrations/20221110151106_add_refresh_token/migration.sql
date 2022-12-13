/*
  Warnings:

  - The `semester` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `attendanceStatus` on the `Attendance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "refreshToken" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "attendanceStatus",
ADD COLUMN     "attendanceStatus" "AttendanceStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "semester",
ADD COLUMN     "semester" "Semester" NOT NULL DEFAULT 'FIRST',
DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'ND1',
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';
