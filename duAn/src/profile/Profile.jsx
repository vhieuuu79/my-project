import React from 'react'
import avatar from '../assets/avatar.jpg'
import { useSelector } from 'react-redux'
const Profile = () => {
    const {userName} = useSelector(state => state.authenSlice)
  return (
    <div className='mt-10 w-11/12 m-auto '>
    <b className='text-3xl'>Your Account</b>
    <div className='flex mt-10 rounded-md border'>
        <div className='mt-5 flex-1 flex justify-center'>
            <img className='w-1/2 h-2/3 justify-center items-center' src={avatar}/>
        </div>
        <div className='flex-1'>
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900">
                </thead>
                <tbody>
                <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           UserName
                        </th>
                        <td className="px-6 py-4">
                            {userName}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           First Name
                        </th>
                        <td className="px-6 py-4">
                            Hieu
                        </td>
                    </tr>
                    <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Last Name
                        </th>
                        <td className="px-6 py-4">
                            Vuong Dinh
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Email
                        </th>
                        <td className="px-6 py-4">
                            vuonghieu7a6ls@gmail.com
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Phone
                        </th>
                        <td className="px-6 py-4">
                            0966246101
                        </td>    
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Birday
                        </th>
                        <td className="px-6 py-4">
                            07/09/2004
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Gender
                        </th>
                        <td className="px-6 py-4">
                            male
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        <div className='flex-1 mt-3 flex flex-col gap-5'>
            <div>
            <b>Address</b>
            <div>Thuan Hung, Khoai Chau, Hung Yen</div>
            </div>
            <div>
            <b>University</b>
            <div>Hanoi University of Science and Technology</div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Profile