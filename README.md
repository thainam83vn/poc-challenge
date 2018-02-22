## Setup Instructions
This project use pdf-fill-form library to read fields from existing pdf files and fill data into them. Reason I chose this library is it supports reading field of pdf files, while I don't this feature in other library. It also requires to install Poppler QT5 library, and only be able to on MacOS and Linux at this time.
pdf-fill-form setup instruction is available at https://github.com/tpisto/pdf-fill-form


## Design
Because I spent much time to solve issue of setup pdf-fill-form, so I don't apply Redux into this project.

##Tade offs
I had issue with the pdf library, because I cannot install on Windows, so I have to install VM Ubuntu environment