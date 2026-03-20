import { X } from 'lucide-react'

import chatBotIcon from '@/assets/images/chat-bot.svg'
import { Button } from '@/components'
import { useChatWidgetContext } from '@/features/chat-widget/hooks/useChatWidgetContext'

export default function FloatingChatButton() {
  const { chat } = useChatWidgetContext()

  const handleOpen = () => {
    chat.setEntryMode(false)
    chat.setEntryData(null)
    chat.open()
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        variant="primary"
        rounded="full"
        type="button"
        className="shadow-modal h-19.5 w-19.5 p-5 transition hover:scale-[1.02]"
        onClick={chat.isOpen ? chat.close : handleOpen}
        aria-label="챗봇 열기"
      >
        {chat.isOpen ? (
          <X size={36} />
        ) : (
          <img src={chatBotIcon} alt="AI OZ" className="h-9 w-9" />
        )}
      </Button>
    </div>
  )
}
