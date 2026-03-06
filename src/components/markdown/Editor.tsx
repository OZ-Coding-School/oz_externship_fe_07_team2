import MDEditor from '@uiw/react-md-editor'

type EditorProps = {
  content: string
  contentChange: (value?: string) => void
}

const Editor = ({ content, contentChange }: EditorProps) => {
  return (
    <MDEditor
      height={350}
      autoFocus={false}
      value={content}
      onChange={contentChange}
    />
  )
}

export default Editor

// import './App.css'
// import { useState } from 'react'
// import Editor from './components/markdown/Editor.tsx'

// function App() {
//   const [content, setContent] = useState('')
//   const handleChange = (value?: string) => {
//     setContent(value || '')
//   }

//   return (
//     <div>
//       <Editor content={content} contentChange={handleChange} />
//     </div>
//   )
// }

// export default App
