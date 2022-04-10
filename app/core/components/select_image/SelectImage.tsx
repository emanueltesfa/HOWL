import upload_image from "app/api/upload_image"

const SelectImage = ({ container_name }) => {
  var selected_file

  const OnFileChange = (event: any) => {
    selected_file = event.target.files[0]
    console.log(selected_file.name)
  }

  const OnFileUpload = () => {
    const form_data = new FormData()
    const filename = selected_file.name

    upload_image(container_name, filename, selected_file)

    console.log(selected_file)
  }

  return (
    <div>
      <input type="file" onChange={OnFileChange} />
      <button onClick={OnFileUpload}>submit</button>
    </div>
  )
}

export default SelectImage
