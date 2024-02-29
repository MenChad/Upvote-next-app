import React, { Children, PropsWithChildren } from 'react'
import { notFound } from 'next/navigation';
import { prisma } from '~/src/db/prisma';



export default async function layoutBoard ({
  params,
  children,
}:PropsWithChildren <{
  params: { boardid : string };
}>) {
  const boardid = Number(params.boardid);

  if(isNaN(boardid)){
    return notFound();
  }

  const board = await prisma.board.findUniqueOrThrow({
    where:{
      id: boardid,
    }
  })
  return (
    <div className='flex flex-col gap-6'>
    <h2 className='text-4xl font-bold'>{board.title}</h2>
    {children}
    </div>
  )
}
