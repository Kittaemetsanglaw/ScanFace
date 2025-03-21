/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // เพิ่มเส้นทางไฟล์ทั้งหมดในโฟลเดอร์ src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
