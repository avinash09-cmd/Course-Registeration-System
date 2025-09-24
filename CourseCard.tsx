import React from 'react';
import { User, Clock, Users, DollarSign, BookOpen } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  isRegistered?: boolean;
  onRegister?: (courseId: string) => void;
  onUnregister?: (courseId: string) => void;
}

export function CourseCard({ course, isRegistered = false, onRegister, onUnregister }: CourseCardProps) {
  const enrollmentPercentage = (course.enrolledStudents / course.maxStudents) * 100;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {course.name}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            {course.code}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            ₹{course.fee.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {course.credits} Credits
          </p>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
        {course.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <User className="w-4 h-4 mr-2 text-orange-500" />
          <span>{course.professor}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
          <span>{course.branch} - Semester {course.semester}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Users className="w-4 h-4 mr-2 text-purple-500" />
          <span>{course.enrolledStudents}/{course.maxStudents} students enrolled</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-2 text-green-500" />
          <span>{course.timeSlots.length} sessions per week</span>
        </div>
      </div>

      {/* Enrollment Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span>Enrollment</span>
          <span>{Math.round(enrollmentPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              enrollmentPercentage > 80 ? 'bg-red-500' : 
              enrollmentPercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${enrollmentPercentage}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      {isRegistered ? (
        <button
          onClick={() => onUnregister?.(course.id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Unregister Course
        </button>
      ) : (
        <button
          onClick={() => onRegister?.(course.id)}
          disabled={course.enrolledStudents >= course.maxStudents}
          className={`w-full font-semibold py-3 rounded-lg transition-colors duration-200 ${
            course.enrolledStudents >= course.maxStudents
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {course.enrolledStudents >= course.maxStudents ? 'Course Full' : 'Register Course'}
        </button>
      )}
    </div>
  );
}
