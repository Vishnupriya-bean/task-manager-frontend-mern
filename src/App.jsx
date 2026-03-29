import React, { useContext, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './routes/PrivateRoute';
import UserProvider from './context/userContext';
import UserContext from './context/userContext1';

// Lazy load page components
const Login = React.lazy(() => import('./pages/Auth/Login'));
const SignUp = React.lazy(() => import('./pages/Auth/SignUp'));
const UserDashboard = React.lazy(() => import('./pages/User/UserDashboard'));
const ManageTasks = React.lazy(() => import('./pages/Admin/ManageTasks'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const CreateTask = React.lazy(() => import('./pages/Admin/CreateTask'));
const ManageUsers = React.lazy(() => import('./pages/Admin/ManageUsers'));
const MyTasks = React.lazy(() => import('./pages/User/MyTasks'));
const ViewTaskDetails = React.lazy(() => import('./pages/User/ViewTaskDetails'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-lg text-gray-600 font-medium">Loading...</div>
  </div>
);

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Admin Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/tasks" element={<ManageTasks />} />
                <Route path="/admin/create-task" element={<CreateTask />} />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>

              {/* User Routes */}
              <Route element={<PrivateRoute allowedRoles={["member", "admin"]} />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/tasks" element={<MyTasks />} />
                <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
              </Route>

              {/* Default Route */}
              <Route path="/" element={<Root />} />
            </Routes>
          </Suspense>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '14px',
          },
        }}
      />

    </UserProvider>
  )
}

export default App


const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to="/login" />
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}