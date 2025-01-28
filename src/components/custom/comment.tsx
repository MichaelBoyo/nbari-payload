import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
export type CommentProps = {
  comment: string
}
export const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex items-center p-3 space-x-4 border-t  ">
      <Avatar>
        <AvatarImage
          // className="h-6 w-6 rounded-full"
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>DI</AvatarFallback>
      </Avatar>
      <div className="">
        <p className=" text-[13px] text-sm text-gray-800 leading-snug line-clamp-2">{comment}</p>
      </div>
    </div>
  )
}
