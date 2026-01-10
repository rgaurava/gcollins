import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const search = searchParams.get('search') || ''
    const categoryId = searchParams.get('categoryId') || ''
    const productType = searchParams.get('productType') || ''
    const status = searchParams.get('status') || ''

    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { sku: { contains: search, mode: 'insensitive' as const } },
              ],
            }
          : {},
        categoryId ? { categoryId } : {},
        productType ? { productType: productType as any } : {},
        status ? { status: status as any } : {},
      ],
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          collection: { select: { id: true, name: true, slug: true } },
          images: { where: { isPrimary: true }, take: 1 },
          inventoryItems: {
            include: {
              location: { select: { id: true, name: true, type: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      data: products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const slug = body.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    const product = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        slug,
        description: body.description,
        shortDescription: body.shortDescription,
        price: body.price,
        costPrice: body.costPrice,
        compareAtPrice: body.compareAtPrice,
        isPOA: body.isPOA || false,
        currency: body.currency || 'GBP',
        productType: body.productType,
        status: body.status || 'DRAFT',
        categoryId: body.categoryId,
        collectionId: body.collectionId,
        metalType: body.metalType,
        metalPurity: body.metalPurity,
        attributes: body.attributes,
        isFeatured: body.isFeatured || false,
        isNew: body.isNew || false,
        isOnSale: body.isOnSale || false,
      },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
