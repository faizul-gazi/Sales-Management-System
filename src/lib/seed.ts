import { getDb } from './mongodb';

export const productsData = [
  {
    id: 1,
    name: "Sony WH-1000XM4 Wireless Headphones",
    price: 29999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    category: "headphones",
    rating: 4.8,
    isNew: true,
    description: "Industry-leading noise cancellation with Dual Noise Sensor technology",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "30 hours",
      warranty: "1 year",
      weight: "254g"
    },
    brand: "sony",
    reviews: [
      { user: "John D.", rating: 5, comment: "Amazing sound quality and noise cancellation!", date: "2024-02-15" },
      { user: "Sarah M.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-10" }
    ]
  },
  {
    id: 2,
    name: "Apple AirPods Pro",
    price: 24999,
    image: "https://images.unsplash.com/photo-1588449668338-d15168b3a493?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    rating: 4.7,
    isNew: true,
    description: "Active Noise Cancellation for immersive sound",
    specifications: {
      color: "White",
      connectivity: "Bluetooth 5.0",
      batteryLife: "24 hours",
      warranty: "1 year",
      weight: "183g"
    },
    brand: "apple",
    reviews: [
      { user: "Emily R.", rating: 5, comment: "Excellent noise cancellation and sound quality!", date: "2024-02-12" },
      { user: "Michael S.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-08" }
    ]
  },
  {
    id: 3,
    name: "Samsung Galaxy Watch 5",
    price: 27999,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    rating: 4.6,
    isNew: true,
    description: "Advanced health monitoring with elegant design",
    specifications: {
      color: "Silver",
      connectivity: "Bluetooth 5.0",
      batteryLife: "36 hours",
      warranty: "1 year",
      weight: "36.5g"
    },
    brand: "samsung",
    reviews: [
      { user: "Olivia T.", rating: 5, comment: "Excellent health monitoring and design!", date: "2024-02-10" },
      { user: "James K.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-05" }
    ]
  },
  {
    id: 4,
    name: "Anker PowerCore 26800mAh",
    price: 4999,
    image: "https://images.unsplash.com/photo-1609592424083-d9539d413155?w=800&auto=format&fit=crop&q=60",
    category: "powerbank",
    rating: 4.5,
    description: "High-capacity portable charger with 3 USB ports",
    specifications: {
      color: "Black",
      connectivity: "USB-C",
      batteryLife: "18 months",
      warranty: "1 year",
      weight: "216g"
    },
    brand: "anker",
    reviews: [
      { user: "Sophia L.", rating: 5, comment: "Excellent battery life and fast charging!", date: "2024-02-08" },
      { user: "Ethan H.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-03" }
    ]
  },
  {
    id: 5,
    name: "Apple Watch Series 8",
    price: 45999,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    upcoming: true,
    rating: 4.9,
    description: "Advanced health features with Always-On Retina display",
    specifications: {
      color: "Silver",
      connectivity: "Bluetooth 5.0",
      batteryLife: "18 hours",
      warranty: "1 year",
      weight: "36.5g"
    },
    brand: "apple",
    reviews: [
      { user: "Ava M.", rating: 5, comment: "Excellent health features and design!", date: "2024-02-07" },
      { user: "Noah P.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-02" }
    ]
  },
  {
    id: 6,
    name: "Google Pixel Buds Pro",
    price: 19999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    rating: 4.4,
    description: "Premium sound quality with Active Noise Cancellation",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "24 hours",
      warranty: "1 year",
      weight: "183g"
    },
    brand: "google",
    reviews: [
      { user: "Isabella R.", rating: 5, comment: "Excellent sound quality and noise cancellation!", date: "2024-02-06" },
      { user: "Mason S.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-01" }
    ]
  },
  {
    id: 7,
    name: "Samsung Galaxy Buds2 Pro",
    price: 18999,
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    upcoming: true,
    rating: 4.6,
    description: "Intelligent Active Noise Cancellation with premium sound",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "24 hours",
      warranty: "1 year",
      weight: "183g"
    },
    brand: "samsung",
    reviews: [
      { user: "Ava M.", rating: 5, comment: "Excellent sound quality and noise cancellation!", date: "2024-02-06" },
      { user: "Mason S.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-01" }
    ]
  },
  {
    id: 8,
    name: "Mi Power Bank 20000mAh",
    price: 2999,
    image: "https://images.unsplash.com/photo-1609592424083-d9539d413155?w=800&auto=format&fit=crop&q=60",
    category: "powerbank",
    rating: 4.3,
    description: "Fast charging power bank with dual USB ports",
    specifications: {
      color: "Black",
      connectivity: "USB-C",
      batteryLife: "18 months",
      warranty: "1 year",
      weight: "216g"
    },
    brand: "xiaomi",
    reviews: [
      { user: "Sophia L.", rating: 5, comment: "Excellent battery life and fast charging!", date: "2024-02-08" },
      { user: "Ethan H.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-03" }
    ]
  },
  {
    id: 9,
    name: "Bose QuietComfort 45",
    price: 32999,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60",
    category: "headphones",
    rating: 4.7,
    description: "World-class noise cancellation with premium comfort",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "20 hours",
      warranty: "1 year",
      weight: "254g"
    },
    brand: "bose",
    reviews: [
      { user: "Emma W.", rating: 5, comment: "Excellent noise cancellation and comfort!", date: "2024-02-09" },
      { user: "Liam H.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-04" }
    ]
  },
  {
    id: 10,
    name: "Nothing Ear (2)",
    price: 14999,
    image: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    isNew: true,
    rating: 4.5,
    description: "Hi-Res Audio Certified with Dual Connection",
    specifications: {
      color: "White",
      connectivity: "Bluetooth 5.0",
      batteryLife: "24 hours",
      warranty: "1 year",
      weight: "183g"
    },
    brand: "nothing",
    reviews: [
      { user: "Ava M.", rating: 5, comment: "Excellent sound quality and noise cancellation!", date: "2024-02-06" },
      { user: "Mason S.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-01" }
    ]
  },
  {
    id: 11,
    name: "Garmin Venu 2 Plus",
    price: 39999,
    image: "https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    rating: 4.8,
    description: "Advanced fitness tracking with built-in GPS",
    specifications: {
      color: "Silver",
      connectivity: "Bluetooth 5.0",
      batteryLife: "36 hours",
      warranty: "1 year",
      weight: "36.5g"
    },
    brand: "garmin",
    reviews: [
      { user: "Olivia T.", rating: 5, comment: "Excellent health monitoring and design!", date: "2024-02-10" },
      { user: "James K.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-05" }
    ]
  },
  {
    id: 12,
    name: "ROMOSS 30000mAh Power Bank",
    price: 3999,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=60",
    category: "powerbank",
    isNew: true,
    rating: 4.4,
    description: "30W PD Fast Charging with LED Display",
    specifications: {
      color: "Black",
      connectivity: "USB-C",
      batteryLife: "18 months",
      warranty: "1 year",
      weight: "216g"
    },
    brand: "romoss",
    reviews: [
      { user: "Sophia L.", rating: 5, comment: "Excellent battery life and fast charging!", date: "2024-02-08" },
      { user: "Ethan H.", rating: 4, comment: "Great battery life, comfortable for long use.", date: "2024-02-03" }
    ]
  },
  {
    id: 13,
    name: "JBL Tune 760NC Headphones",
    price: 12999,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=60",
    category: "headphones",
    rating: 4.5,
    isNew: true,
    description: "Active Noise Cancelling headphones with deep bass",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "35 hours",
      warranty: "1 year",
      weight: "220g"
    },
    brand: "jbl",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality headphones! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 14,
    name: "OnePlus Buds Pro 2",
    price: 16999,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    rating: 4.6,
    isNew: true,
    description: "Spatial Audio with Dynamic Head Tracking",
    specifications: {
      color: "Obsidian Black",
      connectivity: "Bluetooth 5.3",
      batteryLife: "25 hours",
      warranty: "1 year",
      weight: "4.9g"
    },
    brand: "oneplus",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality earbuds! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 15,
    name: "Huawei Watch GT 3 Pro",
    price: 32999,
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    rating: 4.7,
    description: "Premium design with comprehensive health monitoring",
    specifications: {
      color: "Titanium Gray",
      connectivity: "Bluetooth 5.2",
      batteryLife: "14 days",
      warranty: "1 year",
      weight: "54g"
    },
    brand: "huawei",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality smartwatch! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 16,
    name: "Baseus 65W Power Bank",
    price: 5999,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=60",
    category: "powerbank",
    rating: 4.6,
    isNew: true,
    description: "20000mAh with PD Fast Charging",
    specifications: {
      color: "Black",
      connectivity: "USB-C",
      batteryLife: "18 months",
      warranty: "1 year",
      weight: "439g"
    },
    brand: "baseus",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality powerbank! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 17,
    name: "Jabra Elite 85h",
    price: 24999,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60",
    category: "headphones",
    rating: 4.4,
    description: "SmartSound Audio with Advanced ANC",
    specifications: {
      color: "Titanium Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "36 hours",
      warranty: "2 years",
      weight: "296g"
    },
    brand: "jabra",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality headphones! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 18,
    name: "Xiaomi Redmi Watch 3",
    price: 8999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    rating: 4.3,
    isNew: true,
    description: "1.75\" AMOLED Display with GPS",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.2",
      batteryLife: "12 days",
      warranty: "1 year",
      weight: "37g"
    },
    brand: "xiaomi",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality smartwatch! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 19,
    name: "Soundcore Liberty Air 2 Pro",
    price: 9999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=60",
    category: "earbuds",
    rating: 4.5,
    description: "Targeted Active Noise Cancellation",
    specifications: {
      color: "Onyx Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "26 hours",
      warranty: "1.5 years",
      weight: "5.2g"
    },
    brand: "soundcore",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality earbuds! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 20,
    name: "UGREEN 145W Power Bank",
    price: 7999,
    image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?w=800&auto=format&fit=crop&q=60",
    category: "powerbank",
    rating: 4.7,
    isNew: true,
    description: "25000mAh with LED Display",
    specifications: {
      color: "Black",
      connectivity: "USB-C",
      batteryLife: "18 months",
      warranty: "1.5 years",
      weight: "485g"
    },
    brand: "ugreen",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality powerbank! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 21,
    name: "Fitbit Sense 2",
    price: 29999,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=60",
    category: "smartwatch",
    rating: 4.4,
    description: "Advanced Health Metrics with ECG App",
    specifications: {
      color: "Graphite",
      connectivity: "Bluetooth 5.0",
      batteryLife: "6+ days",
      warranty: "1 year",
      weight: "37.6g"
    },
    brand: "fitbit",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality smartwatch! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  },
  {
    id: 22,
    name: "Sennheiser HD 450BT",
    price: 14999,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=60",
    category: "headphones",
    rating: 4.6,
    description: "Active Noise Cancellation with Deep Bass",
    specifications: {
      color: "Black",
      connectivity: "Bluetooth 5.0",
      batteryLife: "30 hours",
      warranty: "2 years",
      weight: "238g"
    },
    brand: "sennheiser",
    reviews: [
      { user: "Alex M.", rating: 5, comment: "Excellent quality headphones! Highly recommended.", date: "2024-02-20" },
      { user: "Emma S.", rating: 4, comment: "Great value for money, very satisfied with the purchase.", date: "2024-02-18" }
    ]
  }
];

export async function seedProducts() {
  try {
    const db = await getDb();
    const count = await db.collection('products').countDocuments();
    if (count === 0) {
      console.log('Seeding products database...');
      await db.collection('products').insertMany(productsData);
      console.log('Seeded successfully!');
    }
  } catch (error) {
    console.error('Error seeding products database:', error);
  }
}
