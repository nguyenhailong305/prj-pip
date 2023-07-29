import React, { useEffect, useState } from "react";
import useEmployeeList from "./controller";
<<<<<<< HEAD
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Modal } from "antd";

export default function HomeContainer() {
  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );
  const {
    fetchEmployees,
    employees,
    errorText,
    username,
    fullName,
    avatarUrl,
    setErrorText,
    setFullName,
    setAvatarUrl,
    setUsername,
    deleteEmployee,
    addEmployee,
    resetForm,
    setIsFormOpen,
    isFormOpen,
    updateEmployee,
    status,
    sessionAuth,
  } = useEmployeeList();

  

  useEffect(() => {
    fetchEmployees();
  }, [status]);

  const handleEdit = (employee) => {
    // Fill in the form with the current employee's data
    setUsername(employee.username);
    setFullName(employee.full_name);
    setAvatarUrl(employee.avatar_url);
    setEditingEmployeeId(employee.id);
    // Open the form
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (username && fullName && avatarUrl) {
      if (editingEmployeeId) {
        console.log(editingEmployeeId , "aaaaaaa")
        updateEmployee(editingEmployeeId, {
          username,
          full_name: fullName,
          avatar_url: avatarUrl,
          created_by : sessionAuth,
        });
      } else {
        // Add new employee
        addEmployee();
      }
      resetForm();
    } else {
      setErrorText("Username and Full Name are required.");
=======
import { Alert, Button, Input, Modal } from "antd";
import { supabase } from "@/utils/supabase";

export default function HomeContainer({ session }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [sessionAuth, setSessionAuth] = useState();

  const { employees, errorText, setErrorText, loading, addEmployee } =
    useEmployeeList({ session });

    useEffect(() => {
      supabase.auth
        .getSession()
        .then(({ data }) => {
          const newSession = data.session;
          if (newSession && newSession.user) {
            setSessionAuth(newSession.user.id);
          }
        })
        .catch((error) => console.error(error));
    }, [session]);
  

   

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fetch roles for current user
    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", sessionAuth);


    if (rolesError) {
      console.error("Error fetching roles: ", rolesError);
      return;
    }

    const userRoles = roles.map((userRole) => userRole.role);

    // Fetch permissions for user's roles
    if ( !userRoles.includes("moderator")) {
      console.error("User is not an admin");
      return;
    }
  
    // If user is an admin, proceed with creating the employee
    const { data, error } = await supabase
      .from("employees")
      .insert([{ username, full_name: fullName, avatar_url: avatarUrl , created_by : sessionAuth }]);

    // If user has permission, proceed with creating the employee
    if (error) {
      console.error("Error adding user: ", error);
    } else {
      console.log("User added successfully: ", data);
      setUsername("");
      setFullName("");
      setAvatarUrl("");
      setIsFormOpen(false);
>>>>>>> 18f79bd66aeffd09e8d0cf3fa7217d1a956bc9c5
    }
  };

  return (
<<<<<<< HEAD
    <div className="w-full ">
      <h1 className="mb-5">Employee List.</h1>
=======
    <div className="w-full">
>>>>>>> 18f79bd66aeffd09e8d0cf3fa7217d1a956bc9c5
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Add User
      </button>

<<<<<<< HEAD
      <Modal
        open={isFormOpen}
        onCancel={resetForm}
        footer={null}
        title="Add new employee"
      >
=======
      {isFormOpen && (
>>>>>>> 18f79bd66aeffd09e8d0cf3fa7217d1a956bc9c5
        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block">
            <span className="text-gray-700">Username:</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Full Name:</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>

          <label className="block mt-4">
            <span className="text-gray-700">Avatar URL:</span>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            />
          </label>

<<<<<<< HEAD
          <div className="flex justify-end">
            <button
              onClick={resetForm}
              className="mt-6  bg-slate-500 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="mt-6 ml-7 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>

=======
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
      <h1 className="mb-12">Employee List.</h1>
      {!!errorText && <Alert text={errorText} />}
>>>>>>> 18f79bd66aeffd09e8d0cf3fa7217d1a956bc9c5
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {employees.map((employee: any) => (
            <Employee
              key={employee.id}
              employee={employee}
              onDelete={() => deleteEmployee(employee.id)}
              onEdit={() => handleEdit(employee)} // Add this line
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const Employee = ({ employee, onDelete, onEdit }) => {
  return (
    <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <img
            src={employee.avatar_url}
            alt={employee.full_name}
            width={50}
            height={50}
            className="rounded-full h-12 w-12"
          />
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium truncate">
              {employee.full_name}
            </div>
            <div className="text-sm leading-5 text-gray-500 truncate">
              {employee.username}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit()
          }}
        >
          <EditOutlined />
        </button>

=======
>>>>>>> 18f79bd66aeffd09e8d0cf3fa7217d1a956bc9c5
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          <DeleteOutlined />
        </button>
      </div>
    </li>
  );
};
