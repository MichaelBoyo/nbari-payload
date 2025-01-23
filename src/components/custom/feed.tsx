import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThumbsUp, MessageCircle, Download, Play } from 'lucide-react'

export function Feed() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <FeedItem
        title="Design Interaction course"
        subtitle="from Design Interaction course • 2hrs long"
        likes={45}
        comments={67}
        hasVideo
        hasTopHeader
      />

      <Card className="border rounded-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-yellow-400"></div>
            <Input className="flex-1" placeholder="Drop some bars" />
            <Button>POST</Button>
          </div>
        </CardContent>
      </Card>

      <FeedItem
        title="Design Interaction course"
        subtitle="1w"
        content="Lately, I've been exploring a variety of online courses, and it's incredible how much knowledge I've gained! Whether it's mastering a new programming language or perfecting a recipe, each skill feels like unlocking a new level in a game. I'm excited to discover what else is out there!"
        likes={45}
        comments={67}
      />
    </div>
  )
}

interface FeedItemProps {
  title: string
  subtitle: string
  content?: string
  likes: number
  comments: number
  hasVideo?: boolean
  hasTopHeader?: boolean
}

function FeedItem({
  title,
  subtitle,
  content,
  likes,
  comments,
  hasVideo,
  hasTopHeader,
}: FeedItemProps) {
  return (
    <Card className="border ">
      <CardHeader className="p-4 pb-0">
        {hasTopHeader && (
          <div className="border-b -mx-4 p-2 -mt-4 text-sm ">
            Pick up from where you left, see what your colleagues are saying
          </div>
        )}
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarFallback>DI</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {content && <p className="text-sm">{content}</p>}
        {hasVideo && (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.loom.com/embed/62d6df1312854aeea3b4735a4a1e6284?sid=56bbf703-a952-4385-be2e-62c314063dc0"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="space-x-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
