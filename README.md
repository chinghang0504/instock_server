# InStock

## Project Information

**Developers:**
- Ching Hang Lam
- Harpreet Jagra
- Jonathan Sage
- Thiago Gil Silva Mussa

**Last Modified:** June 23, 2024

## Table of Contents

- [Project Information](#project-information)
- [Project Setup](#project-setup)
  - [Download the Project Files](#download-the-project-files)
  - [Database Setup](#database-setup)
    - [Create the Database](#create-the-database)
    - [Setup the Database](#setup-the-database)
  - [Running the Application](#running-the-application)
    - [Server Side](#server-side)
    - [Client Side](#client-side)

## Project Setup

### Download the Project Files

- **Client Side Project:** [GitHub Repository](https://github.com/chinghang0504/instock_client)
- **Server Side Project:** [GitHub Repository](https://github.com/chinghang0504/instock_server)

### Database Setup

#### Create the Database

1. Open your SQL Workbench.
2. Execute the following SQL command to create a database named `instock`:
```sql
CREATE DATABASE instock;
```

#### Setup the Database
1. Navigate to the project directory.
2. Run the following command to create the required table schemas:

```shell
npm run migrate
```

3. Insert data into the tables by running:
```shell
npm run seed
```

Note: To delete all tables, use the following command:
```shell
npm run rollback
```

### Running the Application
#### Server Side
To start the server, run:
```shell
npm run start
```

#### Client Side
To start the client, run:
```shell
npm run dev
```
