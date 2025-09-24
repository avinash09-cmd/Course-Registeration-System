# Course Registration System - VIT Bhopal

A comprehensive web-based course registration system designed specifically for Vellore Institute of Technology (VIT), Bhopal campus. This system streamlines the course enrollment process for students, faculty, and administrative staff.

## 🏫 About VIT Bhopal

Vellore Institute of Technology (VIT) Bhopal is a premier educational institution offering undergraduate and postgraduate programs in Engineering, Technology, and Applied Sciences. This course registration system is built to handle the specific academic structure and requirements of VIT Bhopal.

## ✨ Features

### For Students
- **Secure Login**: Student-specific authentication using registration number
- **Course Catalog**: Browse available courses by school, semester, and category
- **Real-time Enrollment**: Register for courses with instant seat availability updates
- **Schedule Visualization**: Interactive timetable with conflict detection
- **Credit Tracking**: Monitor total credits and academic load
- **Waitlist Management**: Join waitlists for full courses
- **Drop/Add Period**: Modify registrations during designated periods
- **Grade Prerequisites**: Automatic validation of course prerequisites
- **Fee Calculation**: Dynamic fee computation based on selected courses

### For Faculty
- **Course Management**: Create and manage course offerings
- **Enrollment Reports**: View and export student enrollment data
- **Capacity Management**: Set and modify course capacity limits
- **Student Lists**: Access enrolled student information
- **Attendance Integration**: Link with attendance management systems

### For Administrators
- **Academic Calendar**: Manage registration periods and deadlines
- **Course Approval**: Review and approve new course offerings
- **System Analytics**: Comprehensive reporting and analytics dashboard
- **User Management**: Handle student and faculty account administration
- **Bulk Operations**: Import/export course and student data
- **Audit Trails**: Track all system changes and user activities

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for responsive design
- **Lucide React** for icons
- **React Query** for data fetching and caching
- **React Hook Form** for form management
- **React Router** for navigation

### Backend
- **Supabase** as Backend-as-a-Service
- **PostgreSQL** database
- **Row Level Security** (RLS) for data protection
- **Real-time subscriptions** for live updates

### Authentication
- **Supabase Auth** with email/password
- **Role-based access control** (Student, Faculty, Admin)
- **Session management** and automatic token refresh

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Supabase account for backend services

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vit-bhopal/course-registration-system.git
   cd course-registration-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run db:migrate
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🗄 Database Schema

### Core Tables

#### `students`
- `id` (UUID, Primary Key)
- `registration_number` (VARCHAR, Unique)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `school` (VARCHAR) - CSE, ECE, CIVIL, etc.
- `program` (VARCHAR) - B.Tech, M.Tech, etc.
- `current_semester` (INTEGER)
- `batch_year` (INTEGER)
- `created_at` (TIMESTAMP)

#### `courses`
- `id` (UUID, Primary Key)
- `course_code` (VARCHAR, Unique) - e.g., "CSE1001"
- `title` (VARCHAR)
- `description` (TEXT)
- `credits` (INTEGER)
- `school` (VARCHAR)
- `semester` (INTEGER)
- `prerequisites` (JSONB)
- `faculty_id` (UUID, Foreign Key)
- `capacity` (INTEGER)
- `current_enrollment` (INTEGER, Default: 0)
- `is_active` (BOOLEAN, Default: true)

#### `enrollments`
- `id` (UUID, Primary Key)
- `student_id` (UUID, Foreign Key)
- `course_id` (UUID, Foreign Key)
- `status` (ENUM: 'enrolled', 'waitlisted', 'dropped')
- `enrolled_at` (TIMESTAMP)
- `grade` (VARCHAR, Nullable)

#### `academic_calendar`
- `id` (UUID, Primary Key)
- `semester` (VARCHAR) - e.g., "Fall 2024"
- `registration_start` (TIMESTAMP)
- `registration_end` (TIMESTAMP)
- `add_drop_deadline` (TIMESTAMP)
- `semester_start` (TIMESTAMP)
- `semester_end` (TIMESTAMP)

## 🔐 Authentication & Authorization

### User Roles

1. **Student**
   - Can view and register for courses
   - Can manage their own enrollments
   - Access to personal academic records

2. **Faculty**
   - Can manage assigned courses
   - View enrollment reports for their courses
   - Cannot access other faculty's course data

3. **Admin**
   - Full system access
   - User management capabilities
   - System configuration and reporting

### Row Level Security Policies

```sql
-- Students can only access their own data
CREATE POLICY "Students can view own records" ON students
    FOR SELECT USING (auth.uid() = id);

-- Students can only enroll in courses during registration period
CREATE POLICY "Students can enroll during registration" ON enrollments
    FOR INSERT WITH CHECK (
        auth.uid() = student_id AND
        EXISTS (
            SELECT 1 FROM academic_calendar 
            WHERE NOW() BETWEEN registration_start AND registration_end
        )
    );
```

## 🌐 API Endpoints

### Student Operations
- `GET /api/courses` - List available courses
- `POST /api/enrollments` - Register for a course
- `DELETE /api/enrollments/:id` - Drop a course
- `GET /api/students/schedule` - Get student's current schedule
- `GET /api/students/transcript` - Get academic transcript

### Faculty Operations
- `GET /api/faculty/courses` - Get assigned courses
- `GET /api/courses/:id/students` - Get enrolled students
- `PUT /api/courses/:id` - Update course details

### Admin Operations
- `GET /api/admin/analytics` - System analytics
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/calendar` - Update academic calendar
- `GET /api/admin/reports` - Generate system reports

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 📱 Mobile Support

The system is fully responsive and optimized for mobile devices, ensuring students can register for courses from their smartphones during high-traffic registration periods.

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Bolt Hosting
```bash
npm run deploy
```

### Environment Variables for Production
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_NAME=VIT Bhopal Course Registration`
- `VITE_APP_VERSION`

## 📊 Performance Considerations

- **Caching**: Redis caching for frequently accessed course data
- **Database Indexing**: Optimized indexes on course_code, student_id, and registration_number
- **Rate Limiting**: API rate limiting during peak registration periods
- **CDN**: Static assets served via CDN for faster loading

## 🔧 Configuration

### Academic Settings
```javascript
// src/config/academic.ts
export const ACADEMIC_CONFIG = {
  maxCreditsPerSemester: 27,
  minCreditsPerSemester: 12,
  maxWaitlistPosition: 10,
  registrationTimeoutMinutes: 15,
  schools: ['CSE', 'ECE', 'CIVIL', 'MECH', 'EEE', 'CHE'],
  programs: ['B.Tech', 'M.Tech', 'PhD', 'Integrated M.Tech']
};
```

## 🆘 Support

### For Students
- **Help Desk**: helpdesk@vitbhopal.ac.in
- **Phone**: +91-755-2770800
- **Office Hours**: Monday-Friday, 9:00 AM - 5:00 PM

### For Faculty
- **Technical Support**: tech-support@vitbhopal.ac.in
- **Academic Office**: academic@vitbhopal.ac.in

### For Developers
- **GitHub Issues**: Use the issue tracker for bug reports
- **Documentation**: Comprehensive docs available in `/docs` folder
- **Wiki**: Project wiki with detailed guides

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write unit tests for new features
- Update documentation for API changes

## 🐛 Known Issues

- [ ] Occasional timeout during peak registration periods
- [ ] Mobile keyboard issues on iOS Safari
- [ ] PDF transcript generation performance on large datasets

## 🔄 Changelog

### Version 2.1.0 (Latest)
- Added real-time seat availability updates
- Improved mobile responsiveness
- Enhanced search functionality
- Bug fixes in prerequisite validation

### Version 2.0.0
- Complete UI/UX redesign
- Migrated to React 18
- Implemented Supabase backend
- Added role-based access control

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏗 Architecture

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── stores/             # State management
├── types/              # TypeScript type definitions
├── utils/              # Helper functions
└── config/             # Configuration files
```

## 🎯 Roadmap

### Short Term (Next 3 months)
- [ ] Mobile app development
- [ ] Integration with LMS
- [ ] Advanced analytics dashboard
- [ ] Automated prerequisite checking

### Long Term (6-12 months)
- [ ] AI-powered course recommendations
- [ ] Blockchain-based transcript verification
- [ ] Multi-campus support
- [ ] Advanced reporting and analytics

---

**Developed with ❤️ for VIT Bhopal Community**

For more information about VIT Bhopal, visit [https://vitbhopal.ac.in](https://vitbhopal.ac.in)
