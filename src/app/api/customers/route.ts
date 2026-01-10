import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const search = searchParams.get('search') || ''
    const customerType = searchParams.get('customerType') || ''
    const vipLevel = searchParams.get('vipLevel') || ''

    const where = {
      AND: [
        search
          ? {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' as const } },
                { lastName: { contains: search, mode: 'insensitive' as const } },
                { email: { contains: search, mode: 'insensitive' as const } },
              ],
            }
          : {},
        customerType ? { customerType: customerType as any } : {},
        vipLevel ? { vipLevel: vipLevel as any } : {},
      ],
    }

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          assignedTo: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.customer.count({ where }),
    ])

    return NextResponse.json({
      data: customers,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const customer = await prisma.customer.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        whatsappNumber: body.whatsappNumber,
        preferredContact: body.preferredContact || 'EMAIL',
        addressLine1: body.addressLine1,
        addressLine2: body.addressLine2,
        city: body.city,
        county: body.county,
        postcode: body.postcode,
        country: body.country || 'United Kingdom',
        customerType: body.customerType || 'INDIVIDUAL',
        vipLevel: body.vipLevel || 'STANDARD',
        source: body.source,
        dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        anniversary: body.anniversary ? new Date(body.anniversary) : null,
        assignedToId: body.assignedToId,
        preferences: body.preferences,
      },
    })

    return NextResponse.json({ success: true, data: customer })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
