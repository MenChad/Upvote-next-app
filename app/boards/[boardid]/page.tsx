import { notFound } from 'next/navigation';
import React from 'react'
import { Proposition } from '~/src/components/proposition/PropositionLine';
import { prisma } from '~/src/db/prisma';
import { PropositionForm } from './PropositionForm';

export default async function BoardPage({
  params,
}: {
  params: { boardid : string };
}) {

  const boardid = Number(params.boardid);

  const propositions = await prisma.proposition.findMany({
    where:{
      boardId: boardid
    },
    orderBy:{
      vote: {
        _count: 'desc',
      },
        },
    select:{
      title: true,
      id: true,
      _count: {
        select:{
          vote:true,
        },
      },
    },
  });

  return (
    <div className='flex flex-col gap-8'>
      <PropositionForm boardid={boardid} />
    <ul className='flex flex-col gap-4'>
      {propositions.map((proposition)=> (
        <Proposition
        key={proposition.id}
        voteCount={proposition._count.vote}
        {...proposition}
        />
      ))}
    </ul>
    </div>
  );
}
