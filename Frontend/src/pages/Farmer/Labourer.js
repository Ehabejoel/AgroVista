import React, { useState } from 'react';

// Mock data for labourers
const mockLabourers = [
  { id: 1, name: 'John Doe', location: 'New York', skills: ['Harvesting', 'Planting'], available: true, rating: 4.5, bio: 'Experienced farm worker with 10 years in various crops.' },
  { id: 2, name: 'Jane Smith', location: 'California', skills: ['Irrigation', 'Pest Control'], available: false, rating: 4.8, bio: 'Specialized in sustainable farming practices and organic pest control.' },
  { id: 3, name: 'Bob Johnson', location: 'Texas', skills: ['Machinery Operation', 'Livestock Management'], available: true, rating: 4.2, bio: 'Expert in modern farming equipment and animal husbandry.' },
];

const LabourerCard = ({ labourer, onHire, onViewDetails }) => (
  <div className="border rounded-lg p-4 mb-4 bg-white">
    <div className="flex items-center space-x-4 mb-2">
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      <div>
        <h3 className="font-bold">{labourer.name}</h3>
        <p className="text-sm text-gray-600">{labourer.location}</p>
      </div>
    </div>
    <div className="mb-2">
      {labourer.skills.map((skill, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {skill}
        </span>
      ))}
    </div>
    <div className="flex items-center mb-2">
      <span className="text-yellow-500 mr-1">★</span>
      <span>{labourer.rating.toFixed(1)}</span>
    </div>
    <div className={`mb-2 ${labourer.available ? 'text-green-500' : 'text-red-500'}`}>
      {labourer.available ? 'Available' : 'Unavailable'}
    </div>
    <div className="flex justify-between">
      <button 
        onClick={() => onHire(labourer)} 
        disabled={!labourer.available}
        className={`px-4 py-2 rounded ${labourer.available ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
      >
        Hire
      </button>
      <button 
        onClick={() => onViewDetails(labourer)}
        className="px-4 py-2 bg-gray-200 rounded"
      >
        View Details
      </button>
    </div>
  </div>
);

const LabourerProfile = ({ labourer, onClose, onHire, onChat }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">{labourer.name}</h2>
      <p className="mb-2"><strong>Location:</strong> {labourer.location}</p>
      <p className="mb-2"><strong>Bio:</strong> {labourer.bio}</p>
      <p className="mb-2"><strong>Skills:</strong> {labourer.skills.join(', ')}</p>
      <p className="mb-4"><strong>Rating:</strong> {labourer.rating.toFixed(1)} ★</p>
      <div className="flex justify-between">
        <button 
          onClick={() => onHire(labourer)} 
          disabled={!labourer.available}
          className={`px-4 py-2 rounded ${labourer.available ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'}`}
        >
          Hire
        </button>
        <button 
          onClick={() => onChat(labourer)}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Chat
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ChatInterface = ({ labourer, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: 'You', content: inputMessage }]);
      setInputMessage('');
      // Simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: labourer.name, content: "Thank you for your message. How can I help you?" }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full h-3/4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Chat with {labourer.name}</h2>
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow border rounded-l px-2 py-1"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-1 rounded-r">Send</button>
        </div>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close Chat</button>
      </div>
    </div>
  );
};

const LabourersDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLabourer, setSelectedLabourer] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const filteredLabourers = mockLabourers.filter(labourer =>
    labourer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labourer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    labourer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleHire = (labourer) => {
    setNotifications([...notifications, `You've hired ${labourer.name}`]);
  };

  const handleChat = (labourer) => {
    setSelectedLabourer(labourer);
    setShowChat(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Labourers</h1>
      <input
        type="text"
        placeholder="Search labourers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-4"
      />
      {filteredLabourers.map(labourer => (
        <LabourerCard
          key={labourer.id}
          labourer={labourer}
          onHire={handleHire}
          onViewDetails={setSelectedLabourer}
        />
      ))}
      {selectedLabourer && !showChat && (
        <LabourerProfile
          labourer={selectedLabourer}
          onClose={() => setSelectedLabourer(null)}
          onHire={handleHire}
          onChat={handleChat}
        />
      )}
      {showChat && (
        <ChatInterface
          labourer={selectedLabourer}
          onClose={() => setShowChat(false)}
        />
      )}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-green-500 text-white p-2 rounded mb-2">
              {notification}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabourersDashboard;