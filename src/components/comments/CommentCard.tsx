import { formateDate, getS3URL } from '@/lib/helper'
import React from 'react'
import UserAvatar from '../common/UserAvatar'
import ImageViewModel from '../common/ImageViewModel'

export default function CommentCard({comment}:{comment:CommentType}) {
  return (
    <div className="w-full mt-4 bg-muted rounded-2xl">
    {/* Header */}
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <UserAvatar
          name={comment.users?.name}
          image={
            comment?.users?.profile_image? getS3URL(comment?.users?.profile_image):""
          }
        />
        <div className="flex flex-col p-2">
          <p className="font-bold">{comment?.users?.name}</p>
          <p className="text-sm">{formateDate(comment.created_at)}</p>
        </div>
      </div>
    </div>
    {/* Image & content */}
    {comment.image && <ImageViewModel image={comment.image}/>
    }
    <p className="p-2">{comment.content}</p>
   </div>
  )
}
