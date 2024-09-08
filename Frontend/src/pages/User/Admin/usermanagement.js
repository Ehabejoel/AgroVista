import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Client', status: 'Active', password: '******' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'Farmer', status: 'Inactive', password: '******' },
    { id: 3, username: 'bob_consultant', email: 'bob@example.com', role: 'Consultant', status: 'Active', password: '******' },
    { id: 4, username: 'alice_driver', email: 'alice@example.com', role: 'Driver', status: 'Active', password: '******' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRole === 'All' || user.role === selectedRole)
  );

  const handleAddOrEditUser = (userData) => {
    if (userData.id) {
      setUsers(users.map(user => user.id === userData.id ? userData : user));
    } else {
      setUsers([...users, { ...userData, id: users.length + 1 }]);
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const openUserModal = (user = null) => {
    setCurrentUser(user || { username: '', email: '', role: '', status: 'Active', password: '' });
    setIsUserModalOpen(true);
  };

  const openUserDetails = (user) => {
    setCurrentUser(user);
    setIsUserDetailsOpen(true);
  };

  const tabs = ['All', 'Client', 'Farmer', 'Consultant', 'Driver'];

  const UserModal = ({ isOpen, onClose, onSave, user }) => {
    const [localUser, setLocalUser] = useState(user);
  
    useEffect(() => {
      setLocalUser(user); // Reset the form when the modal opens with a new user
    }, [user]);
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg w-96 ">
          <h2 className="text-xl font-bold mb-4">{localUser.id ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            onSave(localUser); // Send local form data to the parent
          }}>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Username"
                value={localUser.username}
                onChange={(e) => setLocalUser({ ...localUser, username: e.target.value })}
                required
              />
              <input
                className="w-full p-2 border rounded"
                type="email"
                placeholder="Email"
                value={localUser.email}
                onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
                required
              />
              <select
                className="w-full p-2 border rounded"
                value={localUser.role}
                onChange={(e) => setLocalUser({ ...localUser, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="Client">Client</option>
                <option value="Farmer">Farmer</option>
                <option value="Consultant">Consultant</option>
                <option value="Driver">Driver</option>
              </select>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={localUser.status === 'Active'}
                  onChange={(e) => setLocalUser({ ...localUser, status: e.target.checked ? 'Active' : 'Inactive' })}
                />
                <span>{localUser.status}</span>
              </div>
              <input
                className="w-full p-2 border rounded"
                type="password"
                placeholder="Password"
                value={localUser.password}
                onChange={(e) => setLocalUser({ ...localUser, password: e.target.value })}
                required
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save User</button>
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  

  const UserDetailsPage = ({ user, onClose }) => {
    if (!isUserDetailsOpen) return null;

    return (
      <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
        <div className="bg-white p-6 rounded-lg w-96 ">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Status:</strong> {user.status}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Activity Logs</h3>
            <p>Recent activity will be displayed here.</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => openUserModal(user)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit User</button>
            <button onClick={() => {
              handleDeleteUser(user.id);
              onClose();
            }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete User</button>
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{height: '590px'}} className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <div className="mb-4">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="my-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All Roles</option>
          <option value="Client">Client</option>
          <option value="Farmer">Farmer</option>
          <option value="Consultant">Consultant</option>
          <option value="Driver">Driver</option>
        </select>
        <button
          onClick={() => openUserModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New User
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openUserDetails(user)} className="text-blue-500 hover:underline">
                  {user.username}
                </button>
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openUserModal(user)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleAddOrEditUser}
        user={currentUser}
      />

      {currentUser && (
        <UserDetailsPage
          user={currentUser}
          onClose={() => setIsUserDetailsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;