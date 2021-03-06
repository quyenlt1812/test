// Collection item
const collection = {
  id: collection.id,
  image: collection.image.src,
  title: collection.title,
};

// Reward item
// const reward = {
//   id: product.id,
//   title: product.title,
//   image: product.images[0].src (or) product.image.src,
//   cover: product.images[1].src,
//   vendor: {
//     title: product.title,
//     image: product.images[2].src,
//   },
//   points/values: product.variants[n].price,
//   description: '',
//   accepted_venues: ''
// };

// Voucher item
const voucher = {
  vendor: {
    title: '',
    image: '',
  },
  title: '',
  description: '',
  accepted_venues: '',
  code: '',
  bar_code: '',
  qr_code: '',
  expired_date: '',
};

const product = {
  admin_graphql_api_id: 'gid://shopify/Product/5980167176364',
  body_html: '',
  created_at: '2020-10-26T15:47:22+07:00',
  handle: 'tiki-voucher-2',
  id: 5980167176364,
  image: null,
  images: [],
  options: [
    {
      id: 7689225830572,
      name: 'Code',
      position: 1,
      product_id: 5980167176364,
      values: [Array],
    },
  ],
  product_type: '',
  published_at: '2020-10-26T15:47:24+07:00',
  published_scope: 'global',
  tags: 'tiki',
  template_suffix: '',
  title: 'Tiki Voucher 2',
  updated_at: '2020-10-26T16:05:43+07:00',
  variants: [
    {
      admin_graphql_api_id: 'gid://shopify/ProductVariant/37248666304684',
      barcode: '',
      compare_at_price: null,
      created_at: '2020-10-26T15:47:22+07:00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37248666304684,
      image_id: null,
      inventory_item_id: 39341464158380,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      option1: 'CODE2_1234',
      option2: null,
      option3: null,
      position: 1,
      price: '0',
      product_id: 5980167176364,
      requires_shipping: true,
      sku: '',
      taxable: true,
      title: 'CODE2_1234',
      updated_at: '2020-10-26T15:47:22+07:00',
      weight: 0,
      weight_unit: 'kg',
    },
    {
      admin_graphql_api_id: 'gid://shopify/ProductVariant/37248666337452',
      barcode: '',
      compare_at_price: null,
      created_at: '2020-10-26T15:47:22+07:00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37248666337452,
      image_id: null,
      inventory_item_id: 39341464191148,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      option1: 'CODE2_583928',
      option2: null,
      option3: null,
      position: 2,
      price: '0',
      product_id: 5980167176364,
      requires_shipping: true,
      sku: '',
      taxable: true,
      title: 'CODE2_583928',
      updated_at: '2020-10-26T15:47:22+07:00',
      weight: 0,
      weight_unit: 'kg',
    },
    {
      admin_graphql_api_id: 'gid://shopify/ProductVariant/37248666370220',
      barcode: '',
      compare_at_price: null,
      created_at: '2020-10-26T15:47:22+07:00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37248666370220,
      image_id: null,
      inventory_item_id: 39341464223916,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      option1: 'CODE2_2345829',
      option2: null,
      option3: null,
      position: 3,
      price: '0',
      product_id: 5980167176364,
      requires_shipping: true,
      sku: '',
      taxable: true,
      title: 'CODE2_2345829',
      updated_at: '2020-10-26T15:47:22+07:00',
      weight: 0,
      weight_unit: 'kg',
    },
    {
      admin_graphql_api_id: 'gid://shopify/ProductVariant/37248666402988',
      barcode: '',
      compare_at_price: null,
      created_at: '2020-10-26T15:47:22+07:00',
      fulfillment_service: 'manual',
      grams: 0,
      id: 37248666402988,
      image_id: null,
      inventory_item_id: 39341464256684,
      inventory_management: 'shopify',
      inventory_policy: 'deny',
      inventory_quantity: 1,
      old_inventory_quantity: 1,
      option1: 'CODE2_293929',
      option2: null,
      option3: null,
      position: 4,
      price: '0',
      product_id: 5980167176364,
      requires_shipping: true,
      sku: '',
      taxable: true,
      title: 'CODE2_293929',
      updated_at: '2020-10-26T15:47:22+07:00',
      weight: 0,
      weight_unit: 'kg',
    },
  ],
  vendor: 'Tribee Store',
};
