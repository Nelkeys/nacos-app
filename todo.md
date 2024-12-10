Here's a structured plan for your web app:

---

### **1. Core Features**
1. **Course Materials**  
   - Organized by **Level** (100, 200, 300, 400) and **Courses**.
   - Each course will have sections for **lecture notes**, **videos**, and **assignments**.

2. **Past Questions**  
   - Categorized by **Level**, **Course**, and **Year**.  
   - Downloadable PDFs or viewable directly in the app.

3. **Timetables**  
   - **Class Timetable**: Filterable by level and semester.  
   - **Exam Timetable**: Filterable by level and course.  
   - Displayed in a **calendar view** or **list view**.

---

### **2. Layout and Structure**
#### **Navigation**
- Use a **tab bar** navigation for seamless movement between sections. Tabs include:
  1. **Home**
  2. **Courses**
  3. **Past Questions**
  4. **Timetables**
  5. **Profile/Settings**

#### **Screen Sizes**
- Optimize for typical mobile resolutions (360px - 768px width).  
- Responsive designs with Tailwind CSS or CSS Grid/Flexbox.

---

### **3. Page Designs**
#### **Home Page**
- Quick links to key sections (Materials, Timetables, Past Questions).  
- Notifications or announcements from the department.  

#### **Course Materials Page**
- **Search Bar** to quickly find courses.
- Levels listed as collapsible menus (e.g., "Level 100").  
- Courses shown as a grid or list under each level.

#### **Past Questions Page**
- Dropdown filters: **Year**, **Level**, and **Course**.  
- Results displayed as downloadable/viewable items.

#### **Timetables Page**
- Toggle between **Class** and **Exam Timetables**.
- Filter options for personalization.

#### **Profile/Settings Page**
- Allow users to set preferences:
  - Default level and semester.  
  - Theme options (light/dark mode).

---

### **4. Backend Structure**
- **Database Design**
  - **Users**: `id`, `name`, `email`, `level`, `preferences`.
  - **Courses**: `id`, `level`, `name`, `materials (links)`.
  - **Past Questions**: `id`, `course_id`, `year`, `file`.
  - **Timetables**: `id`, `type`, `level`, `semester`, `details`.

---

### **5. Tech Stack**
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript (Vue/React).  
- **Backend**: Node.js/Express.js or Firebase.  
- **Database**: Firebase Firestore or MySQL.  
- **Authentication**: Firebase Auth for secure access.

---

### **6. Additional Enhancements**
- **Push Notifications**: For timetable updates or new materials.  
- **Offline Mode**: Cache key content for use without the internet.  
- **Search Functionality**: Global search for quick access to resources.  
- **User Profiles**: To save progress and access frequently used content.

---

Let me know if you'd like assistance with specific implementation steps!