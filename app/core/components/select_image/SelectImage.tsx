import upload_image from "app/api/upload_image"
import { Image } from "blitz"

const SelectImage = ({ container_name }) => {
  var selected_file
  var url: string =
    "https://howlimagestorage.blob.core.windows.net/profile1/default-profile-icon-24.jpg"
  const OnFileChange = (event: any) => {
    selected_file = event.target.files[0]
    console.log(selected_file.name)
  }

  const OnFileUpload = () => {
    const form_data = new FormData()
    const filename = selected_file.name

    url = upload_image(container_name, filename, selected_file)
    
    console.log(url)
  }

  return (
    <div>
      <input type="file" onChange={OnFileChange} />
      <button onClick={OnFileUpload}>submit</button>
      <Image src={url} alt="e" height="100px" width="100px" />
    </div>
  )
}

export default SelectImage
