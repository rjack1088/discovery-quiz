// Product catalog: SKU -> display name + image (all images live in public/images/)
export const products = {
  123842: { name: 'Nutrilite™ Ultra Focus + Energy Pack', image: '/images/ultra-focus.png' },
  126184: { name: 'XS™ Energy Drink 12oz – Citrus', image: '/images/126184-citrus.png' },
  110385: { name: 'XS™ Sports Protein Bar – Chocolate Peanut Butter', image: '/images/pb-choc.png' },
  110922: { name: 'Nutrilite™ Twist Tubes 2GO™', image: '/images/twist-tubes.png' },
  110601: { name: 'XS™ CocoWater Hydration Drink Mix – Strawberry/Watermelon', image: '/images/cocowater.png' },
  111045: { name: 'Nutrilite™ Wellness Bar – Nutty Dark Chocolate', image: '/images/ndc.png' },
  318668: { name: 'Nutrilite™ Organics All-in-One Shake – Chocolate', image: '/images/318668-shakes.png' },
  126001: { name: 'Glister™ Travel Size Multi-Action Toothpaste', image: '/images/glister.png' },
  126812: { name: "Nutrilite™ Organics Men's Daily Multi Gummies (Sample)", image: '/images/gummies-men.png' },
  126813: { name: "Nutrilite™ Organics Women's Daily Multi Gummies (Sample)", image: '/images/gummies-women.png' },
  110390: { name: 'XS™ Sports Twist Tubes – Fruit Punch', image: '/images/110390-fruit_punch.png' },
  323969: { name: 'Artistry Skin Nutrition™ Sleeping Mask (Foil Sample)', image: '/images/sleeping-mask.png' },
  125553: { name: 'n* by Nutrilite™ #nofilter Collagen Peptides', image: '/images/125553-collagen.png' },
  // Note: user's list said SKU 127881 for Ignite Powder, but the downloaded image is named
  // 127811-ignite.png — using 127811 here. Worth double-checking against the source SKU.
  127811: { name: 'XS™ Ignite Powder – Moro Blood Orange', image: '/images/127811-ignite.png' },
};

// Boxes keyed by the same ids used for quiz routing/scoring in App.jsx.
export const boxes = {
  fitness: {
    name: 'Jump Start Fitness Box',
    description: 'Built for the performance-driven. Clean fuel for your workouts and recovery.',
    itemIds: [127811, 126184, 110385, 318668, 110390, 110601],
  },
  health: {
    name: 'Jump Start Health Box',
    description: 'A well-rounded sampler of daily health, oral care, and energy essentials.',
    itemIds: [126184, 110385, 110922, 318668, 126001, 126812, 126813, 123842],
  },
  discovery: {
    name: 'The Core Discovery Box',
    description: 'The essential lineup across energy, protein, hydration, and on-the-go wellness.',
    itemIds: [123842, 126184, 110385, 110922, 110601, 111045],
  },
  sample: {
    name: 'The Complete Health & Home Sample Box',
    description: 'A well-rounded sampler of daily health, oral care, and energy essentials.',
    itemIds: [126184, 110385, 110922, 318668, 126001, 126812, 126813, 123842],
  },
  fuel: {
    name: 'The Mom Fuel Bundle',
    description: 'Quick energy and a touch of self-care for busy moms on the go.',
    itemIds: [126184, 110385, 126001, 110922, 110390, 318668, 126813, 123842, 323969],
  },
  super: {
    name: 'The Supermom Bundle',
    description: 'Comprehensive energy, wellness, and self-care support for the everyday supermom.',
    itemIds: [126184, 110385, 110922, 110390, 318668, 126813, 123842, 125553, 323969],
  },
};

export function getBoxItems(boxKey) {
  return boxes[boxKey].itemIds.map((id) => products[id]);
}
