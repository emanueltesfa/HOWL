import upload_image from "app/api/upload_image"
import updateUser from "app/users/mutations/updateUser"
import getUser from "app/users/queries/getUser"
import getUsers from "app/users/queries/getUsers"
import { Image, useMutation, useQuery } from "blitz"
import { useState } from "react"

const SelectImage = ({ container_name }) => {
  var selected_file
  const [{ users }] = useQuery(getUsers, { where: { name: container_name } })
  const [updateProfilePic] = useMutation(updateUser)
  const user = users[0]
  var tempFile: File = new File([], "", { type: "application/zip" })
  const [fileName, setFileName] = useState<string>("")
  const [file, setFile] = useState<File>(tempFile)
  var url: string =
    "https://howlimagestorage.blob.core.windows.net/profile1/default-profile-icon-24.jpg"
  const OnFileChange = (event: any) => {
    selected_file = event.target.files[0]
    setFileName(event.target.files[0].name)
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  }

  const OnFileUpload = () => {
    const form_data = new FormData()
    console.log("File Name", file)
    // const filename = fileName

    // url = upload_image(container_name, filename, file)

    // console.log(url)
  }

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const filename = fileName

          url = upload_image(container_name, filename, file)

          try {
            const res = await updateProfilePic({
              id: user!.id,
              name: user!.name!,
              dob: user!.dob,
              profile_pic_file: url,
            })
            if (res) {
              console.log(res)
            }
          } catch (error) {
            console.log(error.message)
          }

          console.log(url)
        }}
      >
        <input type="file" onChange={OnFileChange} />
        <button
        //onClick={OnFileUpload}
        >
          submit
        </button>
      </form>
      <Image src={url} alt="e" height="100px" width="100px" />
    </div>
  )
}

export default SelectImage
