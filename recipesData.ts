
import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Macarrones con Berenjena y Tofu Ahumado",
    ingredients: "Un paquete de tofu ahumado, berenjena, macarrones, nata de soja, pimentón dulce, soja, cebolla en polvo, ágave, aceite, ajo.",
    instructions: "La noche antes se deja el tofu con una cucharada de pimentón, 2 de soja, 1 de cebolla en polvo, 1 de ágave, 2 flis de aceite. Se dora ajo si se tiene, se echa la berenjena cortada en cuartos y luego se echa el tofu, se dora todo un poco y luego se echa un poco de nata. Luego se cuece la pasta.",
    image: "🍝",
    type: "caliente"
  },
  {
    id: 2,
    name: "Ensalada de Garbanzos",
    ingredients: "Garbanzos, tomate, queso fresco, huevo, quinoa, aguacate, ajo en polvo, aove y limón",
    instructions: "Se mezcla todo.",
    image: "🥗",
    type: "fresco"
  },
  {
    id: 3,
    name: "Ensalada de Lentejas",
    ingredients: "Lentejas, tomate, aguacate, burrata o mozzarella, mango, mostaza, limón, jengibre y aove",
    instructions: "Se mezcla todo.",
    image: "🥣",
    type: "fresco"
  },
  {
    id: 4,
    name: "Legumbres con Boniato y Brócoli",
    ingredients: "Garbanzos o habas, boniato, brócoli, aove, ajo y jengibre",
    instructions: "Se cuece y se sirve.",
    image: "🍠",
    type: "caliente"
  },
  {
    id: 5,
    name: "Pasta con Soja Texturizada y Zanahoria",
    ingredients: "Pasta, soja texturizada, zanahorias, tomate frito y ajo",
    instructions: "Se dora el ajo, luego se añade la zanahoria y la soja una vez hidratada se echa a la sartén. Se le echa también un chorrito de tomate frito.",
    image: "🍝",
    type: "caliente"
  },
  {
    id: 6,
    name: "Patatas Fritas con Heura y Salsa de Zanahoria",
    ingredients: "Patatas, heura, 2 zanahorias, 1 cebolla, 2 dientes de ajo, media pastilla de caldo de verduras y aove",
    instructions: "Heura y patatas se fríen en airfryer. En una sartén se sofríe el ajo, la cebolla se pica y se echa un minuto después. Se cortan en rodajas y cuando la cebolla esté hecha se hechan las zanahorias. Se echa un vaso de agua hasta que la zanahoria esté cocida. Se echa la media pastilla de caldo de verduras. Todo junto se bate. Salpimentar y echar la Heura para que coja el sabor un par de minutos.",
    image: "🍟",
    type: "caliente"
  },
  {
    id: 7,
    name: "Sopa de Lasaña",
    ingredients: "10 Láminas de lasaña, 2 zanahorias, soja texturizada, tomate frito, media pastilla de caldo de verduras, ajo y 1 cebolla, nata de soja, mozzarella",
    instructions: "Sofreir ajo y cebolla, añadir zanahora, luego añadir soja texturizada hidratada. Añadir 1 vaso de agua, 1 brick pequeño de tomate frito y añadir media pastilla de caldo de verduras. Salar. Dejar así 15 o 20 minutos. Mientras hidratar láminas de lasaña 2 minutos. Se meten las láminas en la olla de la soja 1 por 1 echando un poco de nata por encima y parte de la mezcla. Se dejan ahí unos 7 minutos. Por último se apaga el fuego y se echa la mozzarella por encima.",
    image: "🍲",
    type: "caliente"
  },
  {
    id: 8,
    name: "Pizza de Berenjena",
    ingredients: "Harina, levadura, berenjena, mozzarella, queso parmesano, tomate natural, tomate frito y huevo cocido",
    instructions: "Preparar la masa de pizza, hornear con láminas de berenjena, queso y tomate.",
    image: "🍕",
    type: "caliente"
  },
  {
    id: 9,
    name: "Arroz con Tofu y Zanahorias",
    ingredients: "Arroz, tofu, salsa de soja, 2 zanahorias, ajo, comino y semillas de sésamo",
    instructions: "Se sofríe ajo y zanahorias y después echar agua, sal y arroz. La noche anterior se seca el tofu y se marina con soja y comino.",
    image: "🍛",
    type: "caliente"
  },
  {
    id: 10,
    name: "Arroz con Guisantes y Empanado",
    ingredients: "Arroz, ajo, guisantes y empanado (proteína vegetal empanada)",
    instructions: "Cocer arroz con guisantes y acompañar con el empanado frito.",
    image: "🍚",
    type: "caliente"
  },
  {
    id: 11,
    name: "Pasta con Zanahoria y Brócoli",
    ingredients: "Pasta, 1 zanahoria, brócoli, mozzarella y 4 dientes de ajo",
    instructions: "Se cuece la pasta y el brócoli. Se sofríe ajo y zanahoria. Se mezcla todo con mozzarella.",
    image: "🍝",
    type: "caliente"
  },
  {
    id: 12,
    name: "Zorza con Patatas Fritas",
    ingredients: "Soja Texturizada, pimentón, ajo, laurel, salsa de soja, vino blanco, aceite, orégano y patatas",
    instructions: "Marinar la soja texturizada hidratada con las especias y vino. Freír con patatas.",
    image: "🥘",
    type: "caliente"
  },
  {
    id: 13,
    name: "NO Calamares a la Romana",
    ingredients: "Setas Ostreatus, harina, huevo, gaseosa, alga nori y limón",
    instructions: "Rebozar las setas en una mezcla de huevo, gaseosa y nori picada. Freír.",
    image: "🦑",
    type: "caliente"
  },
  {
    id: 14,
    name: "No Pulpo A Feira",
    ingredients: "Setas Shitake, alga Nori, patatas, aove y pimentón",
    instructions: "Cocer setas con alga nori. Servir sobre patatas con pimentón y aove.",
    image: "🐙",
    type: "caliente"
  },
  {
    id: 15,
    name: "Garbanzos con Espinacas y Tofu",
    ingredients: "Garbanzos, espinacas, tofu, tomate frito, ajo",
    instructions: "Sofreír ajo y espinacas, añadir tomate y garbanzos. Mezclar con tofu frito.",
    image: "🥬",
    type: "caliente"
  },
  {
    id: 16,
    name: "Garbanzos con Calabacín y Salsa de Yogur",
    ingredients: "Garbanzos, Calabacín, Yogur griego, lima, Curry, cebolla, ajo",
    instructions: "Sofreír cebolla, ajo y calabacín. Añadir garbanzos y curry. Servir con yogur y lima.",
    image: "🥒",
    type: "caliente"
  },
  {
    id: 17,
    name: "Seitán con Champiñones",
    ingredients: "Seitán, Champiñones, ajo, Vino blanco, harina",
    instructions: "Sofreír champiñones y seitán. Añadir vino blanco y espesar con harina y agua.",
    image: "🥩",
    type: "caliente"
  },
  {
    id: 18,
    name: "Soja al Curry",
    ingredients: "Soja texturizada, Curry, Zanahoria, Leche de coco, comino, Jengibre",
    instructions: "Sofreír soja y zanahoria, añadir leche de coco y especias. Cocinar 20 min.",
    image: "🥘",
    type: "caliente"
  },
  {
    id: 19,
    name: "Fajitas Veganas",
    ingredients: "Fajitas, Heura, alubias, tomate, aguacate, cebolla, pimiento, especias",
    instructions: "Sofreír verduras con alubias y especias. Rellenar fajitas con crema de aguacate y heura.",
    image: "🌮",
    type: "caliente"
  },
  {
    id: 20,
    name: "Carne Mechada de Tofu",
    ingredients: "Tofu firme, cebolla, especias, salsa barbacoa, soja",
    instructions: "Rallar tofu, mezclar con cebolla caramelizada y salsa barbacoa hasta espesar.",
    image: "🥙",
    type: "caliente"
  },
  {
    id: 21,
    name: "Sobrasada Vegana",
    ingredients: "Tomate seco, anacardos, aceite, pimentón, ajo",
    instructions: "Triturar todos los ingredientes hasta obtener una pasta untable.",
    image: "🥪",
    type: "fresco"
  },
  {
    id: 22,
    name: "Heura al Limón",
    ingredients: "Heura, caldo verduras, limón, soja, jengibre, maizena",
    instructions: "Dorar heura. Hacer salsa con caldo, limón y maizena. Cocinar todo junto.",
    image: "🍋",
    type: "caliente"
  },
  {
    id: 23,
    name: "Hamburguesas de Lentejas",
    ingredients: "Lentejas, Avena, Cebolla, Ajo, Setas, Zanahoria, Harina de Garbanzo",
    instructions: "Triturar lentejas cocidas con sofrito de verduras y avena. Formar y cocinar.",
    image: "🍔",
    type: "caliente"
  },
  {
    id: 24,
    name: "Fingers de Garbanzos",
    ingredients: "Garbanzos, Panko, Avena, Especias",
    instructions: "Triturar garbanzos, formar palitos, rebozar en panko y freír.",
    image: "🍗",
    type: "caliente"
  }
];
