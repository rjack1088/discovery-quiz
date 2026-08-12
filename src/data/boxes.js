// Product catalog: SKU -> display name + image (all images live in public/images/)
// `highlights` are short, non-health-claim facts (pack count, ingredients, format,
// certifications) paraphrased from each product's official amway.com page, shown
// on the back of the flip card in the results screen.
export const products = {
  123842: {
    name: 'Nutrilite™ Ultra Focus + Energy Pack',
    image: '/images/ultra-focus.png',
    highlights: [
      '20 individually wrapped packets',
      'No artificial flavors, colors, or preservatives',
      'Combines B Dual-Action, Memory Builder, XS Energy+Focus',
      'Includes rhodiola and cistanche tubulosa extracts',
    ],
  },
  126184: {
    name: 'XS™ Energy Drink 12oz – Citrus',
    image: '/images/126184-citrus.png',
    highlights: [
      '12-pack of 12oz cans',
      'Sugar free, 15 calories per can',
      '114mg caffeine plus B vitamins',
      'Citrus flavor, dairy and lactose free',
    ],
  },
  110385: {
    name: 'XS™ Sports Protein Bar – Chocolate Peanut Butter',
    image: '/images/pb-choc.png',
    highlights: [
      '12 bars per box',
      '20g whey and casein protein blend',
      'Gluten free, caffeine free',
      'No artificial colors, flavors, or preservatives',
    ],
  },
  110922: {
    name: 'Nutrilite™ Twist Tubes 2GO™',
    image: '/images/twist-tubes.png',
    highlights: [
      '20 single-serve twist tubes',
      'Variety pack: Mango Citrus, Strawberry Kiwi, Raspberry',
      'Gluten free',
      'Just twist and stir into water',
    ],
  },
  110601: {
    name: 'XS™ CocoWater Hydration Drink Mix – Strawberry/Watermelon',
    image: '/images/cocowater.png',
    highlights: [
      '12 single-serve packets',
      'Made with 12% real coconut water',
      'Contains vitamins A, C, E and B vitamins',
      'Strawberry Watermelon flavor',
    ],
  },
  111045: {
    name: 'Nutrilite™ Wellness Bar – Nutty Dark Chocolate',
    image: '/images/ndc.png',
    highlights: [
      '12 bars per box',
      'Made with almonds, peanuts, dark chocolate',
      '8g protein per bar',
      'Gluten free, non-GMO, no artificial ingredients',
    ],
  },
  318668: {
    name: 'Nutrilite™ Organics All-in-One Shake – Chocolate',
    image: '/images/318668-shakes.png',
    highlights: [
      '12 ready-to-drink 11oz shakes',
      'USDA Organic, non-GMO, gluten free, vegan',
      '20g plant protein, 5g fiber',
      'Made with real fruits and vegetables',
    ],
  },
  126001: {
    name: 'Glister™ Travel Size Multi-Action Toothpaste',
    image: '/images/glister.png',
    highlights: [
      'Six 50g travel-size tubes',
      'Alcohol free, sugar free formula',
      'Free from animal-derived ingredients',
      'Nutrilite-certified peppermint flavor',
    ],
  },
  126812: {
    name: "Nutrilite™ Organics Men's Daily Multi Gummies (Sample)",
    image: '/images/gummies-men.png',
    highlights: [
      '10 individually wrapped foil samples',
      '13 vitamins and minerals per gummy',
      'Made with tomato, acerola cherry, purple carrot',
      'Grown on USDA-certified organic farms',
    ],
  },
  126813: {
    name: "Nutrilite™ Organics Women's Daily Multi Gummies (Sample)",
    image: '/images/gummies-women.png',
    highlights: [
      '10 individually wrapped foil samples',
      '15 vitamins and minerals per gummy',
      'Made with cranberry, acerola cherry, purple carrot',
      'Grown on USDA-certified organic farms',
    ],
  },
  110390: {
    name: 'XS™ Sports Twist Tubes – Fruit Punch',
    image: '/images/110390-fruit_punch.png',
    highlights: [
      '20 single-serve twist tubes',
      'Only 5g sugar per tube',
      'Contains B vitamins and selenium',
      'Caffeine free, dairy free, no artificial ingredients',
    ],
  },
  323969: {
    name: 'Artistry Skin Nutrition™ Sleeping Mask (Foil Sample)',
    image: '/images/sleeping-mask.png',
    highlights: [
      'Single-use foil sample packet',
      'Formulated with Fermented CICA and Niacinamide',
      'Contains Nutrilite white chia seed extract',
      'Dermatologist tested, allergy tested',
    ],
  },
  125553: {
    name: 'n* by Nutrilite™ #nofilter Collagen Peptides',
    image: '/images/125553-collagen.png',
    highlights: [
      '15 individual 12g sachets',
      '13g collagen plus aloe per packet',
      'Gluten free, no artificial flavors/colors/preservatives',
      'No high fructose corn syrup',
    ],
  },
  127811: {
    name: 'XS™ Ignite Powder – Moro Blood Orange',
    image: '/images/127811-ignite.png',
    highlights: [
      '30 single-serving stick packs',
      'Made with Morosil Moro blood orange extract',
      'Contains antioxidant anthocyanins',
      'Caffeine free, gluten free, soy free, dairy free',
    ],
  },
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
