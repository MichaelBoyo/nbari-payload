import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, MessageCircle, Share, ThumbsUp } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Comment, CommentProps } from './comment'
import Image from 'next/image'

const cData: CommentProps[] = [
  {
    comment: 'What do you think about the design trends this year?',
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
  {
    comment:
      "Recently, I've been diving into some fantastic design courses online, and the amount of creativity I've unlocked is amazing! From learning about user interface design to experimenting with color palettes, each new skill feels like leveling up in a creative adventure. I can't wait to see what other design gems I can uncover!",
  },
]

export function Feed() {
  return (
    <div className="max-w-2xl md:p-0 p-2 mx-auto space-y-6">
      <FeedItem
        title="Design Interaction course"
        when="1w"
        from={{
          course: 'Design Interaction Course',
          length: '2hrs',
        }}
        likes={45}
        comments={2}
        hasVideo
        hasTopHeader
        commentsData={[cData[0], cData[1]]}
      />
      <div className="flex justify-between items-center">
        <Separator className="w-1/3  border-dotted" />
        <p className="text-[11px] text-gray-400">threads below</p>
        <Separator className="w-1/3" />
      </div>

      <Card className="border rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-yellow-400"></div>
            <Input className="flex-1 border-none" placeholder="Drop some bars" />
            <Button className="gap-2">
              POST <ArrowRight size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>

      <FeedItem
        title="Design Interaction course"
        when="1w"
        content="Lately, I've been exploring a variety of online courses, and it's incredible how much knowledge I've gained! Whether it's mastering a new programming language or perfecting a recipe, each skill feels like unlocking a new level in a game. I'm excited to discover what else is out there!"
        likes={45}
        comments={67}
        commentsData={[cData[2], cData[3], cData[4]]}
      />
      <FeedItem
        title="Design Interaction course"
        from={{
          course: 'Design Interaction Course',
          length: '2hrs',
        }}
        when="1w"
        content="Lately, I've been exploring a variety of online courses, and it's incredible how much knowledge I've gained! Whether it's mastering a new programming language or perfecting a recipe, each skill feels like unlocking a new level in a game. I'm excited to discover what else is out there!"
        likes={45}
        comments={67}
      />
      <FeedItem
        title="Design Interaction course"
        when="1w"
        imgSrc="https://github.com/shadcn.png"
        content=""
        likes={45}
        comments={67}
      />
    </div>
  )
}

interface FeedItemProps {
  title: string
  when: string
  content?: string
  likes: number
  comments: number
  hasVideo?: boolean
  hasTopHeader?: boolean
  commentsData?: CommentProps[]
  imgSrc?: string
  from?: { course: string; length: string }
}

function FeedItem({
  title,
  when,
  content,
  likes,
  comments,
  hasVideo,
  hasTopHeader,
  commentsData,
  from,
  imgSrc,
}: FeedItemProps) {
  return (
    <Card className="border shadow-md">
      <CardHeader className="p-4 pb-0">
        {hasTopHeader && (
          <div className="border-b -mx-4 p-2 px-4 -mt-4 text-[13px] ">
            Pick up from where you left, see what your colleagues are saying
          </div>
        )}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>DI</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center text-[16px] space-x-3 max-w-screen">
              <h3 className="font-medium ">{title}</h3>
              <p className="text-gray-400">.</p>
              <p className="text-sm text-gray-400">{when}</p>
            </div>
            {from && (
              <div className="flex gap-1 text-[11px]">
                <p>from</p>
                <p>{from.course}</p>
                <p className="text-gray-400">.</p>
                <p className=" text-gray-400">{from.length} long</p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {content && <p className="text-sm ">{content}</p>}
        {imgSrc && (
          <div className="flex gap-1 text-[11px] -mx-4">
            <Image
              src={imgSrc}
              width={100}
              height={100}
              alt="User"
              className="max-h-[445px] w-full  object-cover"
            />
          </div>
        )}
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
            <MessageCircle className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>

      <div>{commentsData?.map((comment, index) => <Comment key={index} {...comment} />)}</div>

      {commentsData && comments > commentsData?.length && (
        <div className="flex justify-center items-center  border-t ">
          <Button variant="ghost" size="sm" className="text-gray-500 text-[11px]">
            load {comments - commentsData.length} more comments
          </Button>
        </div>
      )}
    </Card>
  )
}
