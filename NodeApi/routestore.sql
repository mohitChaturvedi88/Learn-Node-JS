DROP DATABASE IF EXISTS routestore;
CREATE DATABASE routestore;

\c routestore;

CREATE TABLE ProjectDetails (
  ProjectCode VARCHAR PRIMARY KEY,
  ProjectName VARCHAR,
  ProjectType VARCHAR,
  StartDate DATE,
  ContactName VARCHAR,
  ContactNo VARCHAR, 
  Address VARCHAR,
  District VARCHAR,
  State VARCHAR,
  Status VARCHAR,
  Pincode VARCHAR
);

INSERT INTO ProjectDetails (ProjectCode, ProjectName, ProjectType, StartDate, ContactName, ContactNo, Address, District, State,Status,Pincode)
VALUES ('UPSOII', 'Geo-RTD and Route verification For Uttar Pradesh State Office II', 'Petrolium', '12-01-2016', 'Ananda Barman', '9812398123', 'Sector-1', 'Noida', 'UP','inactive','400090');

INSERT INTO ProjectDetails (ProjectCode, ProjectName, ProjectType, StartDate, ContactName, ContactNo, Address, District, State,Status,Pincode)
VALUES ('MSO', 'Geo-RTD and Route verification for Maharashtra State Office', 'Petrolium', '03-01-2015', 'PN Sonawane', '9812398125', 'Mumbai', 'Mumbai', 'Maharashtra','active','201301');

CREATE TABLE Source (
  SourceCode VARCHAR PRIMARY KEY,
  SourceName VARCHAR,
  Latitude REAL,
  Longitude REAL,
  ContactName VARCHAR,
  ContactEmail VARCHAR,
  ContactAddress VARCHAR,
  District VARCHAR,
  State VARCHAR,
  Pincode VARCHAR,
  ProjectCode VARCHAR references ProjectsDetail(ProjectCode)
);
INSERT INTO Source (SourceCode, SourceName, Latitude, Longitude, ContactName, ContactEmail, ProjectCode,ContactAddress,District,State,Pincode)
VALUES ('UP761', 'IOCL Noida', '77.359285', '28.594559', 'Vishnu Gupta', 'vishnu.gupta@gmail.com', 'UPSOII','Sector 32','Noida','Uttar Pradesh','204594');

INSERT INTO Source (SourceCode, SourceName, Latitude, Longitude, ContactName, ContactEmail, ProjectCode,ContactAddress,District,State,Pincode)
VALUES ('MS673', 'HPCL Mumbai', '72.825527', '18.929380', 'Shyam Singhal', 'shyamsinghal325@gmail.com', 'MSO','Lokhandwala','Mumbai','Maharashtra','400013');

CREATE TABLE Destination (
  CustomerCode VARCHAR PRIMARY KEY,
  CustomerType VARCHAR,
  CustomerName VARCHAR,
  CustomerAddress VARCHAR,
  Latitude REAL,
  Longitude REAL,
  District VARCHAR,
  State VARCHAR,
  FOName VARCHAR,
  FOCode VARCHAR,
  Pincode VARCHAR,
  ProjectCode VARCHAR references ProjectsDetail(ProjectCode)
);

INSERT INTO Destination (CustomerCode, CustomerType, CustomerName, CustomerAddress, Latitude, Longitude, District,State,FOName, FOCode,Pincode, ProjectCode)
VALUES ('CO345', 'Regular', 'MHS', 'Preet Vihar', '77.2928','28.6364' ,'Delhi', 'Delhi','Gopal','674','110301','UPSOII');

INSERT INTO Destination (CustomerCode, CustomerType, CustomerName, CustomerAddress, Latitude, Longitude, District,State,FOName, FOCode,Pincode, ProjectCode)
VALUES ('CO710', 'Regular', 'YSF', 'dlf phase 1', '77.0883',' 28.4936' ,'gurgaon','haryana', 'Madhavan','496','122001','MSO');

CREATE TABLE Toll (
  TollID VARCHAR PRIMARY KEY,
  TollName VARCHAR,
  Location VARCHAR,
  Latitude REAL,
  Longitude REAL,
  RoadName VARCHAR,
  District VARCHAR,
  State VARCHAR,
  UpTo3Axle INTEGER,
  From4To6Axle INTEGER,
  MoreThan7Axle INTEGER
);

INSERT INTO Toll (TollID, TollName, Location, Latitude, Longitude, RoadName, District, State, UpTo3Axle, From4To6Axle, MoreThan7Axle)
VALUES ('TDGE', 'Delhi Gurgaon Expressway Toll', 'Delhi Gurgaon Expressway', 77.0266, 28.4595,'Delhi Gurgaon Expressway' ,'gurgaon', 'Haryana', 175,5770,260);

INSERT INTO Toll (TollID, TollName, Location, Latitude, Longitude, RoadName, District, State, UpTo3Axle, From4To6Axle, MoreThan7Axle)
VALUES (' TNH48','Mumbai Pune Expressway Toll', 'Khalapur', 73.2846,18.8306,'Mumbai Pune Expressway' ,'Mumbai', 'Maharashtra', 200,580,2295);

CREATE TABLE POI (
  POIName VARCHAR PRIMARY KEY,
  Latitude VARCHAR,
  Longitude VARCHAR,
  Category VARCHAR
);
INSERT INTO POI (POIName, Latitude, Longitude, Category)
VALUES ('POI836', '77.89', '28.91', 'Petroleum');

INSERT INTO POI (POIName, Latitude, Longitude, Category)
VALUES ('POI521', '77.12', '28.09', 'Petroleum');

CREATE TABLE ProjectUserMapping (
  UserName VARCHAR PRIMARY KEY,
  ProjectCode VARCHAR references ProjectsDetail(ProjectCode)
);
INSERT INTO ProjectUserMapping (UserName, ProjectCode)
VALUES ('Manjari', 'UPSOII');

INSERT INTO ProjectUserMapping (UserName, ProjectCode)
VALUES ('Shruti', 'MSO');

CREATE TABLE ProductTypes (
  ProductTypeID SERIAL PRIMARY KEY,
  ProjectType VARCHAR,
  CustomerType VARCHAR
);

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Petroleum', 'CO');

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Petroleum', 'RO');

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Petroleum', 'Bridging');

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Gas', 'CO');

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Gas', 'RO');

INSERT INTO ProductTypes (ProjectType, CustomerType)
VALUES ('Gas', 'Bridging');

CREATE TABLE State (
  StateName VARCHAR,
  DistrictName VARCHAR PRIMARY KEY
);

INSERT INTO State (StateName, DistrictName)
VALUES ('Uttar Pradesh', 'Jhansi');

INSERT INTO State (StateName, DistrictName)
VALUES ('Uttar Pradesh', 'Fatehpur');
