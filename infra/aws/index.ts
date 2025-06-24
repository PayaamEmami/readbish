import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an S3 bucket for file storage
const bucket = new aws.s3.Bucket("readbish-bucket", {
    acl: "private",
    versioning: {
        enabled: true,
    },
});

// Export the bucket name
export const bucketName = bucket.id;

// Create an RDS instance for the database
const dbInstance = new aws.rds.Instance("readbish-db", {
    allocatedStorage: 20,
    engine: "postgres",
    engineVersion: "13.3",
    instanceClass: "db.t3.micro",
    name: "readbish",
    username: "admin",
    password: "password123", // Change this to a secure password
    skipFinalSnapshot: true,
});

// Export the database instance endpoint
export const dbEndpoint = dbInstance.endpoint;