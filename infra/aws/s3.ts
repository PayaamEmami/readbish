import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("readbish-bucket", {
    acl: "private",
    versioning: {
        enabled: true,
    },
    tags: {
        Name: "Readbish Bucket",
        Environment: "Development",
    },
});

export const bucketName = bucket.id;
export const bucketEndpoint = bucket.websiteEndpoint;