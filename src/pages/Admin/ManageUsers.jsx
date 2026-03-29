import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { LuFileSpreadsheet } from 'react-icons/lu'
import UserCard from '../../components/Cards/UserCard'
import toast from 'react-hot-toast'

function ManageUsers() {
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(API_PATHS.USERS.GET_TEAM_STATS)
      console.log("✓ Team stats response:", response.data)
      if (response.data?.length > 0) {
        setAllUsers(response.data)
      } else {
        setAllUsers([])
      }
    } catch (error) {
      console.error("❌ Error fetching users:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      })
      toast.error("Failed to load users. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      })

      // Create URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "user_details.xlsx")
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading expense details", error)
      toast.error("Failed to download expense details. Please try again")
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  if (loading) {
    return (
      <DashboardLayout activeMenu="Team Members">
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading users...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className='mt-5 mb-10'>
        <div className='flex md:flex-row md:items-center justify-between'>
          <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>

          <button className='flex md:flex download-btn p-2' onClick={handleDownloadReport}>
            <LuFileSpreadsheet className='text-lg' />
            Download Report
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))
          ) : (
            <div className='col-span-3 text-center text-gray-400 mt-10'>
              No users found.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
