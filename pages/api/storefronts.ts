// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from  '@/modules/db'
import { Prisma } from '@prisma/client'
import { Storefront } from '@/modules/storefront/types'
import { cors } from  '@/modules/middleware'
import { style } from '@/modules/storefront'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Storefront | object>
) {
  await cors(req, res)

  switch (req.method) {
    case 'POST': {
      try {
        const storefrontParams = { ...{ theme: {}, pubkey: '' }, ...req.body } as Storefront

        const themeUrl = await style(
          storefrontParams,
          storefrontParams.theme
        )

        const storefront = await prisma.storefront.create({ 
          data: { ...storefrontParams, themeUrl },
        }) as Storefront
        return res.status(201).json(storefront)
      } catch(error) {
        console.log({ error })
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(422).end(error.message)
        } else {
          return res.status(500).end()
        }
      }
    }
    default:
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
