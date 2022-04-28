import { AnonymousCredential, BlobServiceClient, newPipeline } from "@azure/storage-blob"
import * as CryptoJS from "crypto-js"
import image from "next/image"

function upload_image(name: string, filename: string, data: File) {
  const AZURE_STORAGE_CONNECTION_STRING =
    "DefaultEndpointsProtocol=https;AccountName=howlimagestorage;AccountKey=RPooP/NLpuH1Yr3d07/uhyYLkxE18hFucXKXVsMeg8bN5RciEEKhcELT26I/E9+vQXpQcHPOoA0I+ASt5Nse/g==;EndpointSuffix=core.windows.net"

  const accountName = "howlimagestorage"
  const key =
    "RPooP/NLpuH1Yr3d07/uhyYLkxE18hFucXKXVsMeg8bN5RciEEKhcELT26I/E9+vQXpQcHPOoA0I+ASt5Nse/g=="
  const start = new Date(new Date().getTime() - 15 * 60 * 1000)
  const end = new Date(new Date().getTime() + 30 * 60 * 1000)
  const signedpermissions = "rwdlac"
  const signedservice = "b"
  const signedresourcetype = "sco"
  const signedexpiry = end.toISOString().substring(0, end.toISOString().lastIndexOf(".")) + "Z"
  const signedProtocol = "https"
  const signedversion = "2018-03-28"

  const StringToSign =
    accountName +
    "\n" +
    signedpermissions +
    "\n" +
    signedservice +
    "\n" +
    signedresourcetype +
    "\n" +
    "\n" +
    signedexpiry +
    "\n" +
    "\n" +
    signedProtocol +
    "\n" +
    signedversion +
    "\n"
  console.log("hi")
  var str = CryptoJS.HmacSHA256(StringToSign, CryptoJS.enc.Base64.parse(key))
  var sig = CryptoJS.enc.Base64.stringify(str)
  const sasToken = `sv=${signedversion}&ss=${signedservice}&srt=${signedresourcetype}&sp=${signedpermissions}&se=${encodeURIComponent(
    signedexpiry
  )}&spr=${signedProtocol}&sig=${encodeURIComponent(sig)}`

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error("Azure Storage Connection string not found")
  }
  const pipeline = newPipeline(new AnonymousCredential())

  const service_client = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net?${sasToken}`,
    pipeline
  )

  const container_name = name
  const container_client = service_client.getContainerClient(container_name)

  if (!(container_client.exists())) {
    container_client.create()
  }

  const blob_name = filename
  const blob_file = data
  const block_blob_client = container_client.getBlockBlobClient(blob_name)

  const upload_blob_response = block_blob_client.upload(blob_file, blob_file.size)

  console.log(
    "Blob was uploaded successfully."
  )
  return `https://${accountName}.blob.core.windows.net/${name}/${filename}`
}
export default upload_image
// module.exports = function (context, req) {
//     context.res = {
//         status: 200,
//         body: "Hello " + req.name,
//         headers: {
//             'Content-Type': 'text/plain',
//             'MyCustomHeader': 'Testing'
//         }
//     };
//     context.done();
// }
