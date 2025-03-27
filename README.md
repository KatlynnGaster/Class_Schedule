# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

To run:
1) cd into directory with PPL_Class_Schedule
2) npm install
3) npm run dev 

To run server:
1) cd into ./backend
2) node server.js (Should print out "Server is running on http://localhost:8787" )

To use endpoints:
1) Go to HttPie
2) Choose Method (GET, POST)
3) Url is http://127.0.0.1:8787 or http://localhost:8787
    - For GET Method - http://127.0.0.1:8787/csr - Response should be 200 and should fetch from the database and print on frontend
    - For POST Method - http://127.0.0.1:8787/csr - before you send you want to go into the body tag and follow this layout:
        {
        "id": 1,
        "code": 1234,
        "name": "Math 2",
        "section": "A",
        "days": "M,W,F",
        "time": "1000-1100",
        "room": 101
        }
    **Recommend doing GET Method first before you POST to make sure id matches up**


