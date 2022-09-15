import * as core from '@actions/core';
import { ApiClient, ApiClientInMemoryContextProvider } from '@northflank/js-client';

(async (): Promise<void> => {
  // Catch any errors so we can set them on the action's response.
  try {
    // Get the inputs to the action.
    const host = core.getInput('northflank-api-host');
    const token = core.getInput('northflank-api-key', { required: true });
    const projectId = core.getInput('project-id', { required: true });
    const serviceId = core.getInput('service-id');
    const jobId = core.getInput('job-id');
    const imagePath = core.getInput('image-path', { required: true });
    const credentials = core.getInput('credentials-id');

    // Throw an error if neither nor both the service and job id are defined.
    if ((!serviceId && !jobId) || (serviceId && jobId)) {
      core.setFailed(`Either 'service-id' or 'job-id' must be defined.`);
      return;
    }

    // Initialize the Northflank API client.
    const contextProvider = new ApiClientInMemoryContextProvider();
    await contextProvider.addContext({ name: 'main-context', token, host });
    const client = new ApiClient(contextProvider);

    // Update the Docker image deployed on the Northflank service or job.
    const response = await client.update[serviceId ? 'service' : 'job'].deployment({
      parameters: {
        projectId,
        serviceId,
        jobId,
      },
      data: {
        external: {
          imagePath,
          ...(credentials && { credentials }),
        },
      },
    });

    // Check for any errors returned by the Northflank API.
    if (response.error) {
      // Set the error on the action's response.
      core.setFailed(`Failed to deploy image to Northflank:\n${JSON.stringify(response.error)}`);
    } else {
      // Set the success on the action's response.
      core.info('Successfully deployed image to Northflank.');
    }
  } catch (err) {
    // Set the error on the action's response.
    core.setFailed(`Failed to deploy image to Northflank:\n${err}`);
  }
})();
