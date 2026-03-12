import MDEditor, { commands } from '@uiw/react-md-editor'
import { ClassNames } from 'storybook/theming'

import { cn } from '@/utils'

type EditorProps = {
  content: string
  contentChange: (value?: string) => void
}

// TODO: MDEditor -> Tiptap으로 변경 예정
const Editor = ({ content, contentChange }: EditorProps) => {
  return (
    <div
      className={cn(
        'border-border-line overflow-hidden rounded-[20px] border',
        ClassNames
      )}
    >
      <MDEditor
        height={677}
        autoFocus={false}
        value={content}
        onChange={contentChange}
        preview="live"
        visibleDragbar={false}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          commands.link,
          commands.image,
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
        ]}
        style={{ border: 'none', borderRadius: 0 }}
        extraCommands={[commands.fullscreen]}
      />
    </div>
  )
}
export default Editor
