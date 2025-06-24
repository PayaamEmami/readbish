import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create a new RDS instance
const dbInstance = new aws.rds.Instance("readbish-db", {
    allocatedStorage: 20,
    engine: "postgres",
    engineVersion: "13.3",
    instanceClass: "db.t3.micro",
    name: "readbishdb",
    username: "admin",
    password: "yourpassword", // Replace with a secure password
    dbSubnetGroupName: "your-subnet-group", // Replace with your subnet group
    vpcSecurityGroupIds: ["your-security-group-id"], // Replace with your security group ID
    skipFinalSnapshot: true,
});

// Export the database connection details
export const dbEndpoint = dbInstance.endpoint;
export const dbName = dbInstance.name;
export const dbUsername = dbInstance.username;