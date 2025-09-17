import p1_img from "./dawa 1.jpeg";
import p2_img from "./dawa 2.jpg";
import p3_img from "./dawa 3.jpg";
import p4_img from "./dawa 4.jpg";
import p5_img from "./dawa 5.png";
import p6_img from "./dawa 6.png";
import p7_img from "./dawa 7.jpg";
import p8_img from "./dawa 4.jpg";

let new_collections = [
  {
    id: 21,
    name: "Dawa ya Kupunguza Uzito",
    image: p1_img,
    new_price: 50000,
    old_price: 65000,
    description: "Dawa ya asili inayosaidia kupunguza uzito wa mwili kwa njia ya asili",
    rating: 4.6,
    reviews: 45,
    medicalUse: "Kupunguza uzito na kusawazisha mwili",
    category: "uzazi",
    ingredients: ["Mkunde Mwitu", "Mtangawizi", "Mlai"],
    dosage: "Kijiko kimoja kabla ya kila mlo",
    tags: "Uzito, Asili, Sawazisha"
  },
  {
    id: 22,
    name: "Dawa ya Kuongeza Nguvu za Kiume",
    image: p2_img,
    new_price: 45000,
    old_price: 60000,
    description: "Dawa ya asili inayosaidia kuongeza nguvu za kiume na uwezo wa ndoa",
    rating: 4.8,
    reviews: 78,
    medicalUse: "Kuongeza nguvu za kiume na uwezo wa ndoa",
    category: "uzazi",
    ingredients: ["Mkomamanga", "Mwarobaini", "Asali"],
    dosage: "Kijiko kimoja usiku kabla ya kulala",
    tags: "Nguvu, Kiume, Ndoa"
  },
  {
    id: 23,
    name: "Dawa ya Kukinga Saratani",
    image: p3_img,
    new_price: 75000,
    old_price: 90000,
    description: "Dawa ya asili inayosaidia kukinga mwili dhidi ya saratani",
    rating: 4.7,
    reviews: 32,
    medicalUse: "Kinga dhidi ya saratani na magonjwa sugu",
    category: "saratani",
    ingredients: ["Mwarobaini", "Mlai", "Mkunde Mwitu"],
    dosage: "Kijiko kimoja mara tatu kwa siku",
    tags: "Saratani, Kinga, Magonjwa Sugu"
  },
  {
    id: 24,
    name: "Dawa ya Kupunguza Maumivu ya Migongo",
    image: p4_img,
    new_price: 35000,
    old_price: 45000,
    description: "Dawa ya asili inayopunguza maumivu ya migongo na mishipa",
    rating: 4.5,
    reviews: 67,
    medicalUse: "Kupunguza maumivu ya migongo na mishipa",
    category: "mifupa",
    ingredients: ["Mkarafuu", "Mdalasini", "Mafuta ya Mnana"],
    dosage: "Laza eneo linalouma mara mbili kwa siku",
    tags: "Maumivu, Migongo, Mishipa"
  },
  {
    id: 25,
    name: "Dawa ya Kurekebisha Usingizi",
    image: p5_img,
    new_price: 30000,
    old_price: 40000,
    description: "Dawa ya asili inayosaidia kurekebisha usingizi na kupunguza wasiwasi",
    rating: 4.4,
    reviews: 53,
    medicalUse: "Kurekebisha usingizi na kupunguza wasiwasi",
    category: "pressure",
    ingredients: ["Mlai", "Mkarafuu", "Mtangawizi"],
    dosage: "Kijiko kimoja usiku kabla ya kulala",
    tags: "Usingizi, Wasiwasi, Amani"
  },
  {
    id: 26,
    name: "Dawa ya Kuondoa Uchovu",
    image: p6_img,
    new_price: 25000,
    old_price: 35000,
    description: "Dawa ya asili inayosaidia kuondoa uchovu na kukuza nishati ya mwili",
    rating: 4.3,
    reviews: 89,
    medicalUse: "Kuondoa uchovu na kukuza nishati ya mwili",
    category: "kisukari",
    ingredients: ["Mkunde Mwitu", "Asali", "Mwarobaini"],
    dosage: "Kijiko kimoja kila asubuhi",
    tags: "Uchovu, Nishati, Uhai"
  },
  {
    id: 27,
    name: "Dawa ya Kuimarisha Mifupa",
    image: p7_img,
    new_price: 40000,
    old_price: 50000,
    description: "Dawa ya asili inayosaidia kuimarisha mifupa na kupunguza hatari ya kuvunjika",
    rating: 4.6,
    reviews: 41,
    medicalUse: "Kuimarisha mifupa na kupunguza hatari ya kuvunjika",
    category: "mifupa",
    ingredients: ["Mkomamanga", "Mlai", "Mkarafuu"],
    dosage: "Kijiko kimoja mara mbili kwa siku",
    tags: "Mifupa, Nguvu, Uimara"
  },
  {
    id: 28,
    name: "Dawa ya Kusafisha Damu",
    image: p8_img,
    new_price: 32000,
    old_price: 42000,
    description: "Dawa ya asili inayosaidia kusafisha damu na kuondoa sumu mwilini",
    rating: 4.7,
    reviews: 62,
    medicalUse: "Kusafisha damu na kuondoa sumu mwilini",
    category: "pressure",
    ingredients: ["Mwarobaini", "Mtangawizi", "Mlai"],
    dosage: "Kijiko kimoja kila siku",
    tags: "Damu, Usafi, Sumu"
  }
];

export default new_collections;