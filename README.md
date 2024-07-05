
# Assessment Brudge

## Frontend https://bridge-client-teal.vercel.app/
## Backend https://bridge-lilac.vercel.app/
(issue: When using Vercel with a Hobby plan, serverless API routes can only be processed for 5 seconds.And xy finacne api service response in >5secs seconds, thus /quotes route responds with a 504 GATEWAY TIMEOUT error.
thus it is recommended to test in local machine
 )




## Table of Contents

- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Unit testing](#backend-unit-testing)
  - [Frontend Setup](#frontend-setup)
  - [API Docu](#api-documentation)



## Installation

To get started with this project, clone the repository and follow the installation steps below.

```bash
git clone https://github.com/NitinPSingh/Bridge.git
cd Bridge
```

## Backend Setup
In new terminal Navigate to the /server directory:

```
cd Server
```

Install the required dependencies:

```
npm install
```


Start the backend server:

```
nodemon index.js
```

The backend server should now be running on http://localhost:3001

## Backend Unit Testing
For testing Mocha ,Superset is used , run following command:

```
npm test
```
![Screenshot (660)](https://github.com/NitinPSingh/Bridge/assets/71833171/139e3674-48c9-470e-a298-f8f637598a3f)




## Frontend Setup

In new terminal Navigate to the /client directory:

```
cd client
```

Install the required dependencies:

```
npm install
```

change the local uri of backend 
```
services/api.js
export const uri = "https://bridge-lilac.vercel.app" (comment)
// export const uri = "http://localhost:3001" (uncomment)

```

Start the frontend development server:
```
npm start
```
The frontend server should now be running on http://localhost:3000.

![Screenshot (663)](https://github.com/NitinPSingh/Bridge/assets/71833171/a14207c9-fbc2-475d-9128-64d791ddf2df)


## API Documentation
### GET /tokens
Description :
Returns an array of supported tokens.

Example Request
```
GET /tokens 
```

Example Response
```
{
  "success": true,
  "recommendedTokens": [
    // Array of token objects
  ]
}
```


### POST /quotes
Description
Returns a quote based on input parameters.

Request Json Body

```

{
  "dstChainId": 1,
  "dstQuoteTokenAddress": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "slippage": 0,
  "srcChainId": 1,
  "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "srcQuoteTokenAmount": "1000000000000000000"
}
```

Example Request
```
POST /quotes HTTP/1.1
Content-Type: application/json

{
  "dstChainId": 1,
  "dstQuoteTokenAddress": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "slippage": 0,
  "srcChainId": 1,
  "srcQuoteTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  "srcQuoteTokenAmount": "1000000000000000000"
}
```

Example Response
```
{
  "success": true,
  "routes": [
    // Array of route objects
  ]
}
```


