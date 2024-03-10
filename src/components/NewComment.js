import React from 'react'
import { SendOutlined } from '@mui/icons-material'
import { TextareaAutosize } from '@mui/base'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
const NewComment = ({ blogId, updateInfo }) => {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  function comment() {
    setLoading(true);
    fetch(`/api/comment/${blogId}`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment: text
      })
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data.msg)
        if (data.msg === 'saved') {
          setLoading(false);
          updateInfo();
        }
        else window.location.replace('/login')

      }

      )
      .catch(err => console.log(err))
  }
  return (
    <div className='w-full  lg:w-[60%]'>
      <form className="mb-6">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label for="comment" className="sr-only">Your comment</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} id="comment" rows="6"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..." required></textarea>
        </div>
        <button onClick={comment} type="submit"
          className="inline-flex items-center py-3 px-6 text-base font-medium text-center text-white bg-[#1d4ed8] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-[#1e3a8a] hover:bg-[#1e40af]">
          {
            loading ?
              <ClipLoader color="#36d7b7" loading={loading} width={'100%'} />
              :
              "Post"
          }
        </button>
      </form>
    </div>
  )
}

export default NewComment