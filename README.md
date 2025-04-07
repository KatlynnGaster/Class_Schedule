# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

To run:
1) cd into directory with PPL_Class_Schedule
2) npm install & need to npm install xlsx
3) npm run dev 

To run server:
To test the server from a fresh git pull:
- Install Node.js
- Install Rust (1.80.1)
- To install rust, run the following commands: `Invoke-WebRequest -Uri https://sh.rustup.rs -OutFile rustup-init.exe; .\rustup-init.exe`, and `rustup install 1.80.1`

To test the API:
- Install HTTPie (https://httpie.io/). You will need to install the desktop version of the application. 
- Run the client by running `npx wrangler dev` in the `./server` directory (navigate to this).
- Once the local server is running, press `b` or copy the local server link (should be something like `http://127.0.0.1:8787/`).
- Navigate to HTTPie
- Post the link, and add an endpoint. For example, http://127.0.0.1:8787/admin/define will create a database if one does not already exist (see `docs/api` for the list of endpoints).
- To test if the define works, navigate to `server/.wrangler` and delete the `state` folder (note: the server cannot be running).
- Rerun `npx wrangler dev`. 
- In HTTPie, set the request type to `POST`. The link should be http://127.0.0.1:8787/admin/define.
- In the dropdown menu that has `params` selected, change it to `Body`. Select `text`, and it should automatically default to json. Pass in an empty json object (`{}`).
- Press `send`, and you should receive a success message. This indicates that the db was successfully made. You should now be able to interact with the frontend html by opening a file in a browser, assuming the server has been started. 
---

Theoretically, the server worker may be deployed to cloudflare servers using the deploy command (for example `npx wrangler deploy`), though this has not been tested.
The frontend itself should be completely static, and can be served via any typical webserver. Cloudflare already provides a service for this in the form of "Static Assets", though this has also not been tested in this case.

**Below is out of date, don't use** 
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


