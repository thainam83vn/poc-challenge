## Setup Instructions
This project use pdf-fill-form library to read fields from existing pdf files and fill data into them. Reason I chose this library is it supports reading field of pdf files, while I don't this feature in other library. It also requires to install Poppler QT5 library, and only be able to on MacOS and Linux at this time.
pdf-fill-form setup instruction is available at https://github.com/tpisto/pdf-fill-form

Then go to root folder to install packages of server:
npm i

Then go to client folder to install packages of reactjs:
cd client
npm i

After install packages sucessfully, we can run app by:
Open one terminal at root folder to run server:
node server.js

Open another terminal at client folder to run reactjs:
cd client
npm start

## Design
Because I spent much time to solve issue of setup pdf-fill-form
So I only applied Redux code for App component, state isLoading showing loader each time components are requesting to server.

## Trade offs
I had issue with the pdf library, because it could not installed on Windows, so I have to install VM Ubuntu environment