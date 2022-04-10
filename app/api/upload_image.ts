import { BlobServiceClient } from "@azure/storage-blob"

async function upload_image(name: string, filename: string, data) {
  const AZURE_STORAGE_CONNECTION_STRING =  process.env.CONNECTION_STRING

  console.log(process.env)

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found")
  }

  const service_client = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)

  const container_name = name
  const container_client = service_client.getContainerClient(container_name)

  if (!(await container_client.exists())) {
    await container_client.create()
  }

  const blob_name = name + "/" + filename
  const blob_file = data
  const block_blob_client = container_client.getBlockBlobClient(blob_name)
  const upload_blob_response = await block_blob_client.upload(
    blob_file,
    Buffer.byteLength(blob_file)
  )
  console.log(
    "Blob was uploaded successfully. requestId: ",
    upload_blob_response.requestId,
    upload_blob_response._response
  )
}
export default upload_image
