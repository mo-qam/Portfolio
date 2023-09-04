import React, { useState, useEffect  } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [strengthColor, setStrengthColor] = useState('white');
  const [length, setLength] = useState(12);
  const [easyToSay, setEasyToSay] = useState(false);
  const [easyToRead, setEasyToRead] = useState(false);
  const [allCharacters, setAllCharacters] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = () => {
    const easyToSayChars = 'bcdfghjklmnpqrstvwxyz';
    const easyToReadChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_-+=<>?/{}[]|';

    let chars = '';

    if (easyToSay) chars += easyToSayChars;
    if (easyToRead) chars += easyToReadChars;
    if (uppercase) chars += uppercaseChars;
    if (lowercase) chars += lowercaseChars;
    if (numbers) chars += numberChars;
    if (symbols) chars += symbolChars;
    if (allCharacters || chars.length === 0) chars = uppercaseChars + lowercaseChars + numberChars + symbolChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(newPassword);
  };


  const onLengthChange = (e) => {
    setLength(e.target.value);
    generatePassword();
    updateStrengthColor(e.target.value);
  };

  const updateStrengthColor = (length) => {
    let color;
    if (length >= 12) color = '#2E7D32';
    else if (length >= 10) color = '#43A047';
    else if (length >= 8) color = '#FFC107';
    else if (length >= 4) color = '#E53935';
    else color = '#E53935';
    setStrengthColor(color);
  };

  // Call generatePassword when the component mounts
  useEffect(() => {
    generatePassword();
    updateStrengthColor(length);
  }, []);

  // Added function to handle copy with notification
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard'); // Replace with your notification component or method
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-semibold mb-1 py-7">Mohammed Qamar's <br></br>Password Generator</h1>
      <h5 className="text-2xl font-semibold mb-4">Your password</h5>
      <div className="my-8">
        <div className="bg-tertiary p-4 rounded-lg font-semibold text-white">
          <input
            type="text"
            readOnly
            value={password}
            style={{ backgroundColor: strengthColor }}
            className="w-full text-white py-2 px-4 rounded-lg"
          />
        </div>
        <div className="flex my-4 space-x-2">
        <button
            onClick={generatePassword}
            className="bg-tertiary text-white py-3 px-5 rounded-lg"
          >
            Refresh
          </button>
        <button
            onClick={() => navigator.clipboard.writeText(password) && handleCopy()}
            className="bg-tertiary text-white py-3 px-5 rounded-lg"
          >
            Copy
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Customize your password</h3>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={length}
            onChange={onLengthChange}
            min={3}
            className="border border-gray-300 p-2 mr-2 rounded-lg"
          />
          <input
            type="range"
            value={length}
            onChange={onLengthChange}
            min={3}
            step={1}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer" // Add the desired Tailwind classes here
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;