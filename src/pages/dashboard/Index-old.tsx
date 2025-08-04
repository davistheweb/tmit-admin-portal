// import React from "react";
// import { 
//   CheckSquare, 
//   Users, 
//   CircleEllipsis, 
//   School, 
//   UserCheck,
//   Building2,
//   TrendingUp,
//   Calendar,
//   Mail,
//   FileText,
//   BarChart3
// } from "lucide-react";


// const useDashboardAnalytics = () => {
//   const [loading, setLoading] = React.useState(true);
  
//   React.useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const data = {
//     "totals": {
//       "students": 2,
//       "approved": 2,
//       "pending": 3,
//       "staff": 1,
//       "admins": 1,
//       "faculties": 4,
//       "departments": 11
//     },
//     "students_per_department": [
//       {
//         "id": 10,
//         "name": "Computer Science",
//         "code": "CMS",
//         "faculty_id": 4,
//         "created_at": "2025-08-03T11:38:04.000000Z",
//         "updated_at": "2025-08-03T11:38:04.000000Z",
//         "students_count": 2
//       },
//       {
//         "id": 1,
//         "name": "General Nursing",
//         "code": "GNS",
//         "faculty_id": 1,
//         "created_at": "2025-08-03T11:30:43.000000Z",
//         "updated_at": "2025-08-03T11:30:43.000000Z",
//         "students_count": 0
//       }
//     ],
//     "recent_students": [
//       {
//         "reg_number": "TMIT/CSC/24/2021",
//         "name": "Josiah Davis",
//         "email": "josiahdave001@outlook.com",
//         "status": "active",
//         "created_at": "2025-08-03T17:43:57.000000Z"
//       },
//       {
//         "reg_number": "TMIT/CSC/25/2345",
//         "name": "Josiah Davis",
//         "email": "josiahdave001@gmail.com",
//         "status": "active",
//         "created_at": "2025-08-03T12:43:59.000000Z"
//       }
//     ]
//   };

//   return { data, loading, error: null };
// };

// const DashboardLoader: React.FC = () => (
//   <div className="flex justify-center items-center py-20">
//     <div className="flex flex-col items-center space-y-4">
//       <div className="relative">
//         <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
//         <div className="absolute inset-0 h-12 w-12 border-4 border-transparent border-b-purple-600 rounded-full animate-spin animate-reverse" 
//              style={{ animationDuration: '0.8s' }} />
//       </div>
//       <div className="text-center">
//         <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
//           Loading Dashboard
//         </p>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           Fetching your analytics data...
//         </p>
//       </div>
//     </div>
//   </div>
// );

// const EmptyState: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ 
//   title, 
//   description, 
//   icon 
// }) => (
//   <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
//     <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
//       {icon}
//     </div>
//     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//       {title}
//     </h3>
//     <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
//       {description}
//     </p>
//   </div>
// );

// export const Index: React.FC = () => {
//   const { data, loading, error } = useDashboardAnalytics();
  
//   const totals = data?.totals;
//   const studentsPerDepartment = data?.students_per_department || [];
//   const recentStudents = data?.recent_students || [];

//   if (loading) {
//     return <DashboardLoader />;
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//             Unable to Load Data
//           </h3>
//           <p className="text-red-600 text-sm">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2">
//             Dashboard Analytics
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Real-time insights into your institutional data
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//           <StatCard
//             label="Total Students"
//             value={totals?.students ?? 0}
//             icon={<Users className="w-6 h-6" />}
//             gradient="from-blue-500 to-blue-600"
//             textColor="text-blue-600"
//             bgColor="bg-blue-50 dark:bg-blue-900/20"
//             trend="+12%"
//           />
//           <StatCard
//             label="Approved Students"
//             value={totals?.approved ?? 0}
//             icon={<CheckSquare className="w-6 h-6" />}
//             gradient="from-emerald-500 to-emerald-600"
//             textColor="text-emerald-600"
//             bgColor="bg-emerald-50 dark:bg-emerald-900/20"
//             trend="+8%"
//           />
//           <StatCard
//             label="Pending Students"
//             value={totals?.pending ?? 0}
//             icon={<CircleEllipsis className="w-6 h-6" />}
//             gradient="from-amber-500 to-amber-600"
//             textColor="text-amber-600"
//             bgColor="bg-amber-50 dark:bg-amber-900/20"
//             trend="+5%"
//           />
//           <StatCard
//             label="Administrators"
//             value={totals?.admins ?? 0}
//             icon={<UserCheck className="w-6 h-6" />}
//             gradient="from-purple-500 to-purple-600"
//             textColor="text-purple-600"
//             bgColor="bg-purple-50 dark:bg-purple-900/20"
//             trend="0%"
//           />
//           <StatCard
//             label="Faculties"
//             value={totals?.faculties ?? 0}
//             icon={<Building2 className="w-6 h-6" />}
//             gradient="from-pink-500 to-pink-600"
//             textColor="text-pink-600"
//             bgColor="bg-pink-50 dark:bg-pink-900/20"
//             trend="+2%"
//           />
//           <StatCard
//             label="Departments"
//             value={totals?.departments ?? 0}
//             icon={<School className="w-6 h-6" />}
//             gradient="from-orange-500 to-orange-600"
//             textColor="text-orange-600"
//             bgColor="bg-orange-50 dark:bg-orange-900/20"
//             trend="+15%"
//           />
//         </div>

//         {/* Secondary Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
//           {/* Students per Department */}
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
//                   <BarChart3 className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     Students by Department
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Distribution across departments
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               {studentsPerDepartment.length === 0 ? (
//                 <EmptyState
//                   title="No Departments Found"
//                   description="No department data available at the moment. Departments will appear here once they are created."
//                   icon={<School className="w-8 h-8 text-gray-400" />}
//                 />
//               ) : (
//                 <div className="space-y-3">
//                   {studentsPerDepartment.slice(0, 5).map((dept) => (
//                     <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
//                           {dept.code}
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
//                             {dept.name}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             {dept.students_count} student{dept.students_count !== 1 ? 's' : ''}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
//                           {dept.students_count}
//                         </div>
//                         <div className="w-12 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
//                           <div 
//                             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
//                             style={{ width: `${Math.max((dept.students_count / Math.max(...studentsPerDepartment.map(d => d.students_count), 1)) * 100, 5)}%` }}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {studentsPerDepartment.length > 5 && (
//                     <div className="text-center pt-3">
//                       <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
//                         View all {studentsPerDepartment.length} departments
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Recent Students */}
//           <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl">
//             <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
//                   <Users className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     Recent Students
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     Latest student registrations
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="p-6">
//               {recentStudents.length === 0 ? (
//                 <EmptyState
//                   title="No Recent Students"
//                   description="No recent student registrations found. New student registrations will appear here."
//                   icon={<Users className="w-8 h-8 text-gray-400" />}
//                 />
//               ) : (
//                 <div className="space-y-4">
//                   {recentStudents.map((student, index) => (
//                     <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//                       <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
//                         {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2 mb-1">
//                           <p className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
//                             {student.name}
//                           </p>
//                           <span className={`px-2 py-1 text-xs rounded-full font-medium ${
//                             student.status === 'active' 
//                               ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
//                               : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
//                           }`}>
//                             {student.status}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
//                           <div className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             <span className="truncate">{student.reg_number}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Mail className="w-3 h-3" />
//                             <span className="truncate">{student.email}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1 text-xs text-gray-400">
//                         <Calendar className="w-3 h-3" />
//                         <span>{new Date(student.created_at).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface StatCardProps {
//   label: string;
//   value: number;
//   icon: React.ReactNode;
//   gradient?: string;
//   textColor?: string;
//   bgColor?: string;
//   trend?: string;
// }

// const StatCard: React.FC<StatCardProps> = ({
//   label,
//   value,
//   icon,
//   // gradient = "from-gray-500 to-gray-600",
//   textColor = "text-gray-600",
//   bgColor = "bg-gray-50 dark:bg-gray-800",
//   trend = "+0%"
// }) => {
//   const isPositive = trend.startsWith('+') && !trend.startsWith('+0');
//   const isNegative = trend.startsWith('-');

//   return (
//     <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className={`p-3 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
//             <div className={`${textColor}`}>
//               {icon}
//             </div>
//           </div>
//           <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
//             isPositive 
//               ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
//               : isNegative 
//                 ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
//                 : 'text-gray-500 bg-gray-50 dark:bg-gray-700'
//           }`}>
//             <TrendingUp className={`w-3 h-3 ${isNegative ? 'rotate-180' : ''}`} />
//             {trend}
//           </div>
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
//             {label}
//           </p>
//           <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
//             {value.toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };