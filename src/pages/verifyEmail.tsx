// In VerifyEmail.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { email } = router.query;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Call API to verify OTP
//     // If OTP is valid, update isAuthenticated field
//   }

  return (
    <div>
      <p>OTP sent to: {email}</p>
      <form 
      //onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

export default VerifyEmail;
