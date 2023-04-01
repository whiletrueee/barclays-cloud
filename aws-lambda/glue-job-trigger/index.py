from __future__ import print_function
import boto3
import urllib

print('Loading function')

glue = boto3.client('glue')

def lambda_handler(event, context):
    gluejobname="job"

    try:
        runId = glue.start_job_run(JobName=gluejobname)
        print(runId)
        return runId
        print("Job Status : ", status['JobRun']['JobRunState'])
    except Exception as e:
        print(e)
        return "NO "
    return "OK"