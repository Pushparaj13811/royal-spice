import { Product, Testimonial, ChoosingUs } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Kashmiri Saffron',
    description:
      'Hand-picked, premium quality Kashmiri saffron known for its distinct aroma and flavor.',
    price: 999,
    images: [
      'https://media.istockphoto.com/id/540601628/photo/raw-organic-red-saffron-spice.jpg?s=612x612&w=0&k=20&c=Ana18gJZs154u3ATgDMj_hmRw6kwLnPAiNtOtqL5Sbo=',
      'https://media.istockphoto.com/id/832115652/photo/saffron-threads-with-spice-shovel-on-wooden-background.jpg?s=612x612&w=0&k=20&c=J3V5AENuaEZfSQAiqGut8o_g5xnkNsL9CByy1v8VdH0=',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '2',
    name: 'Organic California Almonds',
    description:
      'Premium grade, naturally grown California almonds packed with nutrients.',
    price: 799,
    images: [
      'https://images.pexels.com/photos/1013420/pexels-photo-1013420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4753649/pexels-photo-4753649.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4033329/pexels-photo-4033329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4033322/pexels-photo-4033322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '3',
    name: 'Cardamom Pods',
    description: 'Fresh green cardamom pods with intense aromatic flavor.',
    price: 299,
    images: [
      'https://images.pexels.com/photos/6086300/pexels-photo-6086300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/9142634/pexels-photo-9142634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/10487768/pexels-photo-10487768.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '4',
    name: 'Premium Cashews',
    description: 'Large, premium quality cashews perfect for snacking.',
    price: 899,
    images: [
      'https://images.pexels.com/photos/4663476/pexels-photo-4663476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4499222/pexels-photo-4499222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6804188/pexels-photo-6804188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '5',
    name: 'Cinnamon Sticks',
    description: 'High-quality cinnamon sticks perfect for cooking and baking.',
    price: 349,
    images: [
      'https://images.pexels.com/photos/5498005/pexels-photo-5498005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/301669/pexels-photo-301669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1008747/pexels-photo-1008747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/10484637/pexels-photo-10484637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '6',
    name: 'Dried Mango Slices',
    description: 'Sweet and tangy dried mango slices packed with flavor.',
    price: 399,
    images: [
      'https://media.istockphoto.com/id/1214539599/photo/dried-mango-slices-close-up-on-a-white-top-view.jpg?s=612x612&w=0&k=20&c=7lgU4AK49ocNad3uyagQ3nnBdomSsy4kDVT7_i3H9_4=',
      'https://thumbs.dreamstime.com/b/dried-mango-strips-wooden-bowl-over-white-sliced-dehydrated-mangoes-juicy-tropical-stone-fruit-yellow-orange-color-137960973.jpg',
      'https://images.pexels.com/photos/4499212/pexels-photo-4499212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '7',
    name: 'Organic Walnuts',
    description:
      'Fresh organic walnuts, rich in omega-3 fatty acids and antioxidants.',
    price: 899,
    images: [
      'https://images.pexels.com/photos/4761952/pexels-photo-4761952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12826706/pexels-photo-12826706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3640631/pexels-photo-3640631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '8',
    name: 'Turmeric Root',
    description: 'Fresh turmeric root known for its medicinal properties.',
    price: 499,
    images: [
      'https://images.pexels.com/photos/7988013/pexels-photo-7988013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7988018/pexels-photo-7988018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/12122270/pexels-photo-12122270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '9',
    name: 'Premium Pistachios',
    description: 'Organic, roasted pistachios perfect for snacks.',
    price: 799,
    images: [
      'https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/52521/pistachio-nuts-pistachios-crisps-52521.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '10',
    name: 'Organic Black Pepper',
    description: 'Fresh, organic black pepper for a spicy kick to your dishes.',
    price: 299,
    images: [
      'https://images.pexels.com/photos/5001423/pexels-photo-5001423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/17208737/pexels-photo-17208737/free-photo-of-close-up-of-grains-of-pepper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/27679768/pexels-photo-27679768/free-photo-of-a-close-up-of-a-bowl-of-spices.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5988689/pexels-photo-5988689.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '11',
    name: 'Fennel Seeds',
    description:
      'Aromatic fennel seeds perfect for adding flavor to your dishes.',
    price: 199,
    images: [
      'https://media.istockphoto.com/id/1152072821/photo/fennel-seeds-in-a-bowl-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=HMu6k6N56BnV465K015xvPRuzAqJWT7iUxnww1qPXyA=',
      'https://images.pexels.com/photos/5988041/pexels-photo-5988041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '12',
    name: 'Premium Dates',
    description: 'Sweet and nutrient-rich premium dates from the Middle East.',
    price: 599,
    images: [
      'https://images.pexels.com/photos/3993529/pexels-photo-3993529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7469433/pexels-photo-7469433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/20632756/pexels-photo-20632756/free-photo-of-close-up-of-a-glass-container-of-dried-dates.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '13',
    name: 'Rosemary Herbs',
    description: 'Fresh rosemary herbs ideal for seasoning your dishes.',
    price: 349,
    images: [
      'https://images.pexels.com/photos/10487769/pexels-photo-10487769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://piccoloseeds.com/cdn/shop/products/RosemaryCommonSingleSeedPacket2_grande.png?v=1679510689',
    ],
    category: 'spices',
    featured: true,
  },
  {
    id: '14',
    name: 'Dried Apricots',
    description:
      'Dried apricots that are naturally sweet and high in vitamins.',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1595412017587-b7f3117dff54?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHJpZWQlMjBhcHJpY290c3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.pexels.com/photos/4499214/pexels-photo-4499214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://media.istockphoto.com/id/175384554/photo/dried-apricots.jpg?s=612x612&w=0&k=20&c=gwC_nVRm_zWQET3krFqHppWkwvvc0D3GyCxCq0RBR0U=',
      'https://storadvancersa.blob.core.windows.net/images/202207e029_dried-apricots.jpg',
      'https://131818403.cdn6.editmysite.com/uploads/1/3/1/8/131818403/s160318697902263644_p7_i2_w2641.jpeg?width=2560',
    ],
    category: 'dryfruits',
    featured: true,
  },
  {
    id: '15',
    name: 'Chili Flakes',
    description: 'Spicy chili flakes to add heat to your favorite dishes.',
    price: 199,
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2022/3/KH/RD/MG/145345077/red-chilli-flakes.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNY65cRBvtwIVdS5QTv5oQki70XDfumKs_S9BqZ-YouOsL2kgQ6Xx_bESp1jk7JTCHpHE&usqp=CAU',
      'https://i0.wp.com/www.taturafamilybutchers.com/wp-content/uploads/2021/02/original-13.png?fit=940%2C788&ssl=1',
      'https://static.wixstatic.com/media/5127b6_00714a58268a4746b264c14720ac7fca~mv2.jpg/v1/fill/w_480,h_322,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/5127b6_00714a58268a4746b264c14720ac7fca~mv2.jpg',
    ],
    category: 'spices',
    featured: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    content:
      'The quality of spices is exceptional. My dishes have never tasted better!',
    avatar:
      'https://images.pexels.com/photos/15181108/pexels-photo-15181108/free-photo-of-woman-in-traditional-bridal-saree-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    id: '2',
    name: 'Rahul Patel',
    content: 'Fresh dry fruits delivered right to my doorstep. Great service!',
    avatar:
      'https://images.pexels.com/photos/5528835/pexels-photo-5528835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
  {
    id: '3',
    name: 'Aarti Desai',
    content:
      'The customer support team was very helpful when I had an issue with my order. Highly recommended!',
    avatar:
      'https://images.pexels.com/photos/7275701/pexels-photo-7275701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4,
  },
  {
    id: '4',
    name: 'Kunal Mehta',
    content:
      'The delivery was quick, but one of the products didn’t meet my expectations. Hoping for improvement.',
    avatar:
      'https://images.pexels.com/photos/15404454/pexels-photo-15404454/free-photo-of-pensive-brunette-with-beard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 3,
  },
  {
    id: '5',
    name: 'Neha Kapoor',
    content:
      'An excellent shopping experience! I found everything I was looking for, and the quality is top-notch.',
    avatar:
      'https://images.pexels.com/photos/27790205/pexels-photo-27790205/free-photo-of-cute-brunette-woman-in-traditional-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5,
  },
];

export const ReasonsToChooseUs: ChoosingUs[] = [
  {
    id: '1',
    title: 'Premium Quality',
    description:
      'We ensure only the finest products reach your hands, rigorously tested for quality and authenticity.',
    image:
      'https://images.pexels.com/photos/678414/pexels-photo-678414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    title: 'Authentic Sourcing',
    description:
      'Our products are sourced directly from trusted farms and suppliers to maintain their natural integrity.',
    image:
      'https://t4.ftcdn.net/jpg/07/08/07/21/360_F_708072155_k6rBFoteJrYLnosUZgsWVQjZV84ZTW7V.jpg',
  },
  {
    id: '3',
    title: 'Customer Trust',
    description:
      'Your satisfaction is our priority. We strive to build lasting relationships with our customers.',
    image:
      'https://images.pexels.com/photos/13443801/pexels-photo-13443801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];
