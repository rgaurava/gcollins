import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Starting database seed...')

  // Create Users
  console.log('Creating users...')
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gcollinsandsons.com' },
    update: {},
    create: {
      email: 'admin@gcollinsandsons.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  const sarah = await prisma.user.upsert({
    where: { email: 'sarah.collins@gcollinsandsons.com' },
    update: {},
    create: {
      email: 'sarah.collins@gcollinsandsons.com',
      passwordHash: userPassword,
      firstName: 'Sarah',
      lastName: 'Collins',
      role: 'STORE_MANAGER',
    },
  })

  const thomas = await prisma.user.upsert({
    where: { email: 'thomas.williams@gcollinsandsons.com' },
    update: {},
    create: {
      email: 'thomas.williams@gcollinsandsons.com',
      passwordHash: userPassword,
      firstName: 'Thomas',
      lastName: 'Williams',
      role: 'SALES_ASSOCIATE',
    },
  })

  // Create Categories
  console.log('Creating categories...')
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'engagement-rings' },
      update: {},
      create: { name: 'Engagement Rings', slug: 'engagement-rings', sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: 'necklaces-pendants' },
      update: {},
      create: { name: 'Necklaces & Pendants', slug: 'necklaces-pendants', sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: 'earrings' },
      update: {},
      create: { name: 'Earrings', slug: 'earrings', sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: 'bracelets-bangles' },
      update: {},
      create: { name: 'Bracelets & Bangles', slug: 'bracelets-bangles', sortOrder: 4 },
    }),
    prisma.category.upsert({
      where: { slug: 'dress-rings' },
      update: {},
      create: { name: 'Dress Rings', slug: 'dress-rings', sortOrder: 5 },
    }),
    prisma.category.upsert({
      where: { slug: 'watches' },
      update: {},
      create: { name: 'Watches', slug: 'watches', sortOrder: 6 },
    }),
    prisma.category.upsert({
      where: { slug: 'eternity-rings' },
      update: {},
      create: { name: 'Eternity Rings', slug: 'eternity-rings', sortOrder: 7 },
    }),
  ])

  // Create Collections
  console.log('Creating collections...')
  const collections = await Promise.all([
    prisma.collection.upsert({
      where: { slug: 'sienna' },
      update: {},
      create: { name: 'Sienna', slug: 'sienna', sortOrder: 1 },
    }),
    prisma.collection.upsert({
      where: { slug: 'skyline' },
      update: {},
      create: { name: 'Skyline', slug: 'skyline', sortOrder: 2 },
    }),
    prisma.collection.upsert({
      where: { slug: 'nectar' },
      update: {},
      create: { name: 'Nectar', slug: 'nectar', sortOrder: 3 },
    }),
    prisma.collection.upsert({
      where: { slug: 'infinity' },
      update: {},
      create: { name: 'Infinity', slug: 'infinity', sortOrder: 4 },
    }),
    prisma.collection.upsert({
      where: { slug: 'trefoil' },
      update: {},
      create: { name: 'Trefoil', slug: 'trefoil', sortOrder: 5 },
    }),
    prisma.collection.upsert({
      where: { slug: 'ravello' },
      update: {},
      create: { name: 'Ravello', slug: 'ravello', sortOrder: 6 },
    }),
    prisma.collection.upsert({
      where: { slug: 'wave' },
      update: {},
      create: { name: 'Wave', slug: 'wave', sortOrder: 7 },
    }),
  ])

  // Create Locations
  console.log('Creating locations...')
  const locations = await Promise.all([
    prisma.location.upsert({
      where: { name: 'Showroom' },
      update: {},
      create: { name: 'Showroom', type: 'SHOWROOM', address: 'Royal Tunbridge Wells' },
    }),
    prisma.location.upsert({
      where: { name: 'Vault' },
      update: {},
      create: { name: 'Vault', type: 'VAULT' },
    }),
    prisma.location.upsert({
      where: { name: 'Workshop' },
      update: {},
      create: { name: 'Workshop', type: 'WORKSHOP' },
    }),
  ])

  // Create Products from G. Collins & Sons website data
  console.log('Creating products...')

  // Engagement Rings
  const engagementCategory = categories.find((c) => c.slug === 'engagement-rings')!
  const watchCategory = categories.find((c) => c.slug === 'watches')!
  const braceletCategory = categories.find((c) => c.slug === 'bracelets-bangles')!
  const earringCategory = categories.find((c) => c.slug === 'earrings')!
  const necklaceCategory = categories.find((c) => c.slug === 'necklaces-pendants')!

  const ravelloCollection = collections.find((c) => c.slug === 'ravello')!
  const siennaCollection = collections.find((c) => c.slug === 'sienna')!
  const skylineCollection = collections.find((c) => c.slug === 'skyline')!

  const showroom = locations.find((l) => l.name === 'Showroom')!
  const vault = locations.find((l) => l.name === 'Vault')!

  const products = [
    // Engagement Rings
    {
      sku: '00038359',
      name: '1.87cts Round Brilliant Cut Diamond Ravello Cluster Ring',
      price: 38286,
      costPrice: 22000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      collectionId: ravelloCollection.id,
      location: showroom,
    },
    {
      sku: '00021022',
      name: '3.50ct Cushion Cut Diamond Engagement Ring',
      price: 72264,
      costPrice: 45000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: vault,
    },
    {
      sku: '00015073',
      name: '5.01ct Emerald Cut Diamond Three Stone Ring',
      price: 184590,
      costPrice: 120000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: vault,
    },
    {
      sku: '00035023',
      name: '5.30ct Radiant Cut Yellow Diamond Engagement Ring',
      price: 250222,
      costPrice: 175000,
      metalType: 'YELLOW_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: vault,
    },
    {
      sku: '00032396',
      name: '1.52ct Round Brilliant Cut Diamond Engagement Ring',
      price: 68791,
      costPrice: 45000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: vault,
    },
    {
      sku: '00025001',
      name: '0.90ct Round Brilliant Cut Diamond Solitaire Ring',
      price: 17913,
      costPrice: 11000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: showroom,
    },
    {
      sku: '00025002',
      name: '1.00ct Round Brilliant Cut Diamond Solitaire Engagement Ring',
      price: 25296,
      costPrice: 16000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: engagementCategory.id,
      location: showroom,
    },
    // Watches - Patek Philippe
    {
      sku: 'PP-5811/1G-001',
      name: 'Patek Philippe Nautilus 5811/1G-001',
      price: 87072,
      costPrice: 65000,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'WATCH',
      categoryId: watchCategory.id,
      location: showroom,
    },
    {
      sku: 'PP-6300/401G-001',
      name: 'Patek Philippe Grand Complications 6300/401G-001',
      price: 5371681,
      costPrice: 4500000,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'WATCH',
      categoryId: watchCategory.id,
      location: vault,
    },
    {
      sku: 'PP-5167A-001',
      name: 'Patek Philippe Aquanaut 5167A-001',
      price: 28988,
      costPrice: 22000,
      metalType: 'STAINLESS_STEEL',
      metalPurity: null,
      productType: 'WATCH',
      categoryId: watchCategory.id,
      location: showroom,
    },
    {
      sku: 'PP-5227R-001',
      name: 'Patek Philippe Calatrava 5227R-001',
      price: 50099,
      costPrice: 38000,
      metalType: 'ROSE_GOLD',
      metalPurity: '18ct',
      productType: 'WATCH',
      categoryId: watchCategory.id,
      location: showroom,
    },
    {
      sku: 'PP-4910/1200A-011',
      name: 'Patek Philippe Twenty~4 4910/1200A-011',
      price: 19047,
      costPrice: 14000,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'WATCH',
      categoryId: watchCategory.id,
      location: showroom,
    },
    // Bracelets & Bangles
    {
      sku: '00045678',
      name: '11.78cts Round Brilliant Cut Diamond Line Bracelet',
      price: 71102,
      costPrice: 48000,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: braceletCategory.id,
      location: showroom,
    },
    {
      sku: '00045679',
      name: '20.28ct Emerald Cut Diamond Line Bracelet',
      price: 143570,
      costPrice: 95000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: braceletCategory.id,
      location: vault,
    },
    {
      sku: '00067890',
      name: 'Sienna Collection Diamond Set 18ct Rose Gold Bangle 6mm',
      price: 35825,
      costPrice: 22000,
      metalType: 'ROSE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: braceletCategory.id,
      collectionId: siennaCollection.id,
      location: showroom,
    },
    {
      sku: '00067891',
      name: 'Skyline Collection Diamond Set 18ct Rose Gold Bangle',
      price: 35825,
      costPrice: 22000,
      metalType: 'ROSE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: braceletCategory.id,
      collectionId: skylineCollection.id,
      location: showroom,
    },
    // Earrings
    {
      sku: '00056789',
      name: '3.02ct Cushion Cut Diamond Drop Earrings',
      price: 72469,
      costPrice: 50000,
      metalType: 'PLATINUM',
      metalPurity: '950',
      productType: 'FINISHED_JEWELRY',
      categoryId: earringCategory.id,
      location: vault,
    },
    {
      sku: '00056790',
      name: '1.05cts Round Brilliant Cut Diamond Stud Earrings',
      price: 6837,
      costPrice: 4200,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: earringCategory.id,
      location: showroom,
    },
    {
      sku: '00056791',
      name: '1.94ct Aquamarine Stud Earrings',
      price: 2393,
      costPrice: 1500,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: earringCategory.id,
      location: showroom,
    },
    // Necklaces & Pendants
    {
      sku: '00078901',
      name: '0.50ct Emerald Cut Diamond Pendant',
      price: 7726,
      costPrice: 4500,
      metalType: 'WHITE_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: necklaceCategory.id,
      location: showroom,
    },
    {
      sku: '00078902',
      name: "'Ava' Diamond Set Yellow Gold Name Pendant",
      price: null, // POA
      costPrice: null,
      metalType: 'YELLOW_GOLD',
      metalPurity: '18ct',
      productType: 'FINISHED_JEWELRY',
      categoryId: necklaceCategory.id,
      location: showroom,
      isPOA: true,
    },
  ]

  for (const productData of products) {
    const slug = productData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    const product = await prisma.product.upsert({
      where: { sku: productData.sku },
      update: {},
      create: {
        sku: productData.sku,
        name: productData.name,
        slug,
        price: productData.price,
        costPrice: productData.costPrice,
        isPOA: (productData as any).isPOA || false,
        currency: 'GBP',
        productType: productData.productType as any,
        status: 'ACTIVE',
        categoryId: productData.categoryId,
        collectionId: (productData as any).collectionId || null,
        metalType: productData.metalType as any,
        metalPurity: productData.metalPurity,
      },
    })

    // Create inventory item
    await prisma.inventoryItem.upsert({
      where: { serialNumber: productData.sku },
      update: {},
      create: {
        productId: product.id,
        serialNumber: productData.sku,
        locationId: productData.location.id,
        quantity: 1,
        status: 'IN_STOCK',
        condition: 'NEW',
        costPrice: productData.costPrice,
      },
    })
  }

  // Create Vendors
  console.log('Creating vendors...')
  await Promise.all([
    prisma.vendor.upsert({
      where: { code: 'PP-001' },
      update: {},
      create: {
        name: 'Patek Philippe SA',
        code: 'PP-001',
        vendorType: 'WATCH_BRAND',
        email: 'retail@patek.com',
        phone: '+41 22 884 20 20',
        country: 'Switzerland',
        categories: ['Luxury Watches', 'Complications'],
        reliabilityScore: 0.98,
        averageLeadDays: 90,
        isApproved: true,
      },
    }),
    prisma.vendor.upsert({
      where: { code: 'DB-001' },
      update: {},
      create: {
        name: 'De Beers Diamond Trading',
        code: 'DB-001',
        vendorType: 'STONE_SUPPLIER',
        email: 'trading@debeers.com',
        phone: '+44 20 7430 3434',
        country: 'United Kingdom',
        categories: ['Diamonds', 'Certified Stones'],
        reliabilityScore: 0.95,
        averageLeadDays: 14,
        isApproved: true,
      },
    }),
    prisma.vendor.upsert({
      where: { code: 'JM-001' },
      update: {},
      create: {
        name: 'Johnson Matthey',
        code: 'JM-001',
        vendorType: 'METAL_SUPPLIER',
        email: 'precious.metals@matthey.com',
        phone: '+44 20 7269 8000',
        country: 'United Kingdom',
        categories: ['Platinum', 'Gold', 'Precious Metals'],
        reliabilityScore: 0.99,
        averageLeadDays: 3,
        isApproved: true,
      },
    }),
  ])

  // Create Sample Customers
  console.log('Creating customers...')
  await Promise.all([
    prisma.customer.upsert({
      where: { email: 'elizabeth.windsor@email.com' },
      update: {},
      create: {
        email: 'elizabeth.windsor@email.com',
        firstName: 'Elizabeth',
        lastName: 'Windsor',
        phone: '+44 7700 900123',
        preferredContact: 'PHONE',
        customerType: 'INDIVIDUAL',
        vipLevel: 'PLATINUM',
        country: 'United Kingdom',
        lifetimeValue: 485000,
        totalOrders: 12,
        assignedToId: sarah.id,
      },
    }),
    prisma.customer.upsert({
      where: { email: 'james.harrison@company.com' },
      update: {},
      create: {
        email: 'james.harrison@company.com',
        firstName: 'James',
        lastName: 'Harrison',
        phone: '+44 7700 900456',
        preferredContact: 'EMAIL',
        customerType: 'CORPORATE',
        vipLevel: 'GOLD',
        country: 'United Kingdom',
        lifetimeValue: 156000,
        totalOrders: 8,
        assignedToId: thomas.id,
      },
    }),
    prisma.customer.upsert({
      where: { email: 'sophie.chen@email.com' },
      update: {},
      create: {
        email: 'sophie.chen@email.com',
        firstName: 'Sophie',
        lastName: 'Chen',
        phone: '+44 7700 900789',
        preferredContact: 'WHATSAPP',
        customerType: 'INDIVIDUAL',
        vipLevel: 'SILVER',
        country: 'United Kingdom',
        lifetimeValue: 78500,
        totalOrders: 5,
        assignedToId: sarah.id,
      },
    }),
    prisma.customer.upsert({
      where: { email: 'michael.roberts@email.com' },
      update: {},
      create: {
        email: 'michael.roberts@email.com',
        firstName: 'Michael',
        lastName: 'Roberts',
        phone: '+44 7700 900321',
        preferredContact: 'PHONE',
        customerType: 'INDIVIDUAL',
        vipLevel: 'COLLECTOR',
        country: 'United Kingdom',
        lifetimeValue: 1250000,
        totalOrders: 28,
        assignedToId: sarah.id,
      },
    }),
  ])

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
