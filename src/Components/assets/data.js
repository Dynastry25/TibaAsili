import p1_img from './dawa 4.jpg'
import p2_img from './dawa 6.png'
import p3_img from './dawa 7.jpg'
import p4_img from './dawa 3.jpg'

let data_product = [
  {
    id: 1,
    name: "Nyanya za Mti (Kisamvu)",
    description: "Dawa za asili za kupunguza sukari na kuimarisha afya ya ini",
    new_price: 35000,
    old_price: 45000,
    rating: 4.8,
    reviews: 127,
    image: p1_img,
    badge: "Maarufu",
    medicalUse: "Kupunguza sukari mwilini na kuimarisha ini",
    category: "kisukari",
    ingredients: ["Nyanya za Mti", "Mlai", "Mwarobaini"],
    dosage: "Kijiko kimoja mara mbili kwa siku",
    tags: "Kisukari, Ini, Asili"
  },
  {
    id: 2,
    name: "Mti wa Muarubaini",
    description: "Mimea ya kitamaduni ya kutibu magonjwa ya tumbo na pressure",
    new_price: 28000,
    old_price: null,
    rating: 4.9,
    reviews: 89,
    image: p2_img,
    badge: "Mpya",
    medicalUse: "Matatizo ya tumbo na shinikizo la damu",
    category: "pressure",
    ingredients: ["Muarubaini", "Mtangawizi", "Mkarafuu"],
    dosage: "Kijiko kimoja kila asubuhi",
    tags: "Tumbo, Pressure, Muarubaini"
  },
  {
    id: 3,
    name: "Kitunguu Saumu Asili",
    description: "Kitunguu saumu cha asili cha kuimarisha kinga ya mwili",
    new_price: 15000,
    old_price: 20000,
    rating: 4.7,
    reviews: 203,
    image: p3_img,
    badge: "Punguzo",
    medicalUse: "Kuimarisha kinga ya mwili na kupambana na maambukizi",
    category: "uzazi",
    ingredients: ["Kitunguu Saumu", "Asali", "Mtangawizi"],
    dosage: "Vijiko viwili kila siku",
    tags: "Kinga, Maambukizi, Kitunguu Saumu"
  },
  {
    id: 4,
    name: "Mzizi wa Ginger Asili",
    description: "Tangawizi asili wa kuimarisha mmeng'enya na kupunguza maumivu",
    new_price: 22000,
    old_price: null,
    rating: 4.6,
    reviews: 156,
    image: p4_img,
    badge: null,
    medicalUse: "Kuimarisha mmeng'enyo na kupunguza maumivu",
    category: "mifupa",
    ingredients: ["Tangawizi", "Mdalasini", "Mkarafuu"],
    dosage: "Kijiko kimoja mara tatu kwa siku",
    tags: "Mmeng'enyo, Maumivu, Tangawizi"
  },
];

export default data_product;