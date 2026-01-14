import { Recipe } from './types.ts';

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Macarrones con Berenjena y Tofu Ahumado",
    ingredients: "Un paquete de tofu ahumado, berenjena, macarrones, nata de soja, pimentón dulce, soja, cebolla en polvo.",
    instructions: "La noche antes se deja el tofu con una cucharada de pimentón, 2 de soja, 1 de cebolla en polvo, 1 de ágave, 2 flis de aceite. Se dora ajo si se tiene, se echa la berenjena cortada en cuartos y luego se echa el tofu, se dora todo un poco y luego se echa un poco de nata. Luego se cuece la pasta.",
    image: "https://i.postimg.cc/Yq8dDnFC/1768152111635.png",
    type: "caliente"
  },
  {
    id: 2,
    name: "Ensalada de Garbanzos",
    ingredients: "Garbanzos, tomate, queso fresco, huevo, quinoa, aguacate, ajo en polvo, aove y limón.",
    instructions: "Se mezcla todo.",
    image: "https://i.ibb.co/RGTv2ZqY/1768125655064.png",
    type: "fresco"
  },
  {
    id: 3,
    name: "Ensalada de Lentejas",
    ingredients: "Lentejas, tomate, aguacate, burrata o mozzarella, mango, mostaza, limón, jengibre y aove.",
    instructions: "Se mezcla todo.",
    image: "https://i.ibb.co/4nLGRzPj/1768125844135.png",
    type: "fresco"
  },
  {
    id: 4,
    name: "Legumbres con Boniato y Brócoli",
    ingredients: "Garbanzos o habas, boniato, brócoli, aove, ajo y jengibre.",
    instructions: "Se cuece y se sirve.",
    image: "https://i.ibb.co/6R4ZbFwC/1768125982173.png",
    type: "caliente"
  },
  {
    id: 5,
    name: "Pasta con Soja Texturizada y Zanahoria",
    ingredients: "Pasta, soja texturizada, zanahorias, tomate frito y ajo.",
    instructions: "Se dora el ajo, luego se añade la zanahoria y la soja una vez hidratada se echa a la sartén. Se le echa también un chorrito de tomate frito.",
    image: "https://i.ibb.co/7x61Dr9x/1768126175547.png",
    type: "caliente"
  },
  {
    id: 6,
    name: "Patatas Fritas con Heura y Salsa de Zanahoria",
    ingredients: "Patatas, heura, 2 zanahorias, 1 cebolla, 2 dientes de ajo, media pastilla de caldo de verduras y aove.",
    instructions: "Heura y patatas se fríen en airfryer. En una sartén se sofríe el ajo, la cebolla se pica y se echa un minuto después. Se cortan en rodajas y cuando la cebolla esté hecha se hechan las zanahorias. Se echa un vaso de agua hasta que la zanahoria esté cocida. Se echa la media pastilla de caldo de verduras. Todo junto se bate. Salpimentar y echar la Heura para que coja el sabor un par de minutos.",
    image: "https://i.ibb.co/VYmZnxjh/1768131071646.png",
    type: "caliente"
  },
  {
    id: 7,
    name: "Sopa de Lasaña",
    ingredients: "10 Láminas de lasaña, 2 zanahorias, soja texturizada, tomate frito, media pastilla de caldo de verduras, ajo y 1 cebolla, nata de soja, mozzarella.",
    instructions: "Sofreir ajo y cebolla, añadir zanahora, luego añadir soja texturizada hidratada. Añadir 1 vaso de agua, 1 brick pequeño de tomate frito y añadir media pastilla de caldo de verduras. Salar. Dejar así 15 o 20 minutos. Mientras hidratar láminas de lasaña 2 minutos. Se meten las láminas en la olla de la soja 1 por 1 echando un poco de nata por encima y parte de la mezcla. Se dejan ahí unos 7 minutos. Por último se apaga el fuego y se echa la mozzarella por encima.",
    image: "🍲",
    type: "caliente"
  },
  {
    id: 8,
    name: "Pizza de Berenjena",
    ingredients: "Harina, levadura, berenjena, mozzarella, queso parmesano, tomate natural, tomate frito y huevo cocido.",
    instructions: "Preparar la masa de pizza, hornear con láminas de berenjena, queso y tomate natural. Lo de siempre.",
    image: "https://i.postimg.cc/T1xpbcY2/1768131469817.png",
    type: "caliente"
  },
  {
    id: 9,
    name: "Arroz con Tofu y Zanahorias",
    ingredients: "Arroz, tofu, salsa de soja, 2 zanahorias, ajo, comino y semillas de sésamo.",
    instructions: "Se sofríe ajo y zanahorias y después echar agua, sal y arroz. La noche anterior se seca el tofu cortado por la mitad y luego se corta en láminas. En un táper se echa salsa de soja, uno por uno, ajo en polvo en las láminas, comino y semillas de sésamo. Se cocinan a la plancha hasta que se doren.",
    image: "https://i.postimg.cc/6q4GVQC4/1768131671222.png",
    type: "caliente"
  },
  {
    id: 10,
    name: "Arroz con Guisantes y Empanado",
    ingredients: "Arroz, ajo, guisantes y empanado.",
    instructions: "Cocer el arroz con los guisantes. Acompañar con la proteína vegetal empanada frita. Lo de siempre.",
    image: "🍚",
    type: "caliente"
  },
  {
    id: 11,
    name: "Pasta con Zanahoria y Brócoli",
    ingredients: "Pasta, 1 zanahoria, brócoli, mozzarella y 4 dientes de ajo.",
    instructions: "Se cuece la pasta. Se cuece un poco el brócoli. Se sofríe el ajo. Cuando esté dorado se echa la zanahoria bien picada y después el brócoli y cebolla en polvo. El brócoli que quede blando (se puede tapar para que se haga mejor). Se mezcla con la pasta y se echa la mozzarella.",
    image: "🍝",
    type: "caliente"
  },
  {
    id: 12,
    name: "Zorza con Patatas Fritas",
    ingredients: "200 gr de Soja Texturizada (cuanto más gruesa mejor), 4 dientes de ajo, caldo de verduras, 2 cucharas de pimentón dulce, un poco de pimentón picante, ajo, 2 hojas de laurel, 5 cucharas de salsa de soja, medio vaso de vino blanco, medio vaso de aove, 1 cucharada de orégano y sal.",
    instructions: "La noche antes: Hervir caldo de verduras y meter soja texturizada 15 min. Mezclar en bol soja, vino, aceite, ajo machacado, laurel, pimentón y sal. El día de cocinar, freír la soja marinada con las patatas.",
    image: "🥘",
    type: "caliente"
  },
  {
    id: 13,
    name: "NO Calamares a la Romana",
    ingredients: "Setas Ostreatus, harina, huevo, gaseosa, alga nori y limón.",
    instructions: "Se bate el huevo, se pica alga Nori y se mezcla la gaseosa. Pasar cada seta por el huevo, luego harina y freír. Echar limón al servir.",
    image: "https://i.postimg.cc/QxRJy2tp/1768131907798.png",
    type: "caliente"
  },
  {
    id: 14,
    name: "No Pulpo A Feira",
    ingredients: "Setas Shitake, alga Nori, patatas, aove y pimentón dulce y picante.",
    instructions: "Cocer setas en agua con alga Nori. Servir con pimentón al gusto, alga Nori muy picada, aove y sal. Acompañar con patatas cocidas.",
    image: "https://i.postimg.cc/xCJr9rvQ/1768152564339.png",
    type: "caliente"
  },
  {
    id: 15,
    name: "Garbanzos con Espinacas y Tofu",
    ingredients: "Garbanzos, espinacas, tofu, tomate frito, 3 dientes de ajo.",
    instructions: "Cocer espinacas y garbanzos. Sofreír ajo, añadir espinacas y tomate frito. Cocinar unos minutos, mezclar con garbanzos y añadir el tofu frito picado.",
    image: "https://i.postimg.cc/KcfWC8SB/1768132048124.png",
    type: "caliente"
  },
  {
    id: 16,
    name: "Garbanzos con Calabacín y Salsa de Yogur",
    ingredients: "Garbanzos, Calabacín, 4 Yogures griego, Media lima, Curry, Media cebolla, 1 Diente de ajo.",
    instructions: "Sofreír cebolla y ajo. Cocinar con calabacín picado. Añadir garbanzos, sal y curry. Servir con yogur mezclado con lima por encima.",
    image: "🥒",
    type: "caliente"
  },
  {
    id: 17,
    name: "Seitán con Champiñones",
    ingredients: "Seitán, Champiñones, 2 Dientes de ajo, Vino blanco, un poco de harina.",
    instructions: "Sofreír ajos y champiñones. Añadir seitán en filetes. Echar vino blanco, evaporar alcohol y añadir agua con una cucharada de harina para espesar.",
    image: "https://i.postimg.cc/d0cZ2v0r/1768151630760.png",
    type: "caliente"
  },
  {
    id: 18,
    name: "Soja al Curry",
    ingredients: "Soja texturizada, Curry, Zanahoria, Leche de coco, comino, Jengibre, Pimienta, 2 Dientes de ajo.",
    instructions: "Sofreír ajo y soja. Añadir leche de coco, jengibre, comino, sal, pimienta y varias cucharadas de curry. Cocinar a fuego medio 20 min.",
    image: "🥘",
    type: "caliente"
  },
  {
    id: 19,
    name: "Fajitas",
    ingredients: "Fajitas, Heura, alubias, tomate natural, tomate frito, aguacate, 1 cebolla, un poco de limón, 1 pimiento, ajo en polvo, comino, pimienta cayena, cilantro, sal.",
    instructions: "Sofreír ajo, cebolla, pimiento y tomate. Añadir alubias y especias. Mezclar con la Heura. Salsa: triturar aguacate, tomate, limón y tomate frito.",
    image: "https://i.postimg.cc/Hx4x47Nm/1768229670110.png",
    type: "caliente"
  },
  {
    id: 20,
    name: "Carne Mechada",
    ingredients: "200g tofu firme, media cebolla, 1 cucharadita de ajo en polvo, media cdita cayena, 1 cda salsa de soja, 150g aprox salsa barbacoa, 100 ml agua.",
    instructions: "Caramelizar cebolla. Añadir tofu rallado y dorar. Añadir especias, soja, barbacoa y agua. Cocinar a fuego lento hasta que espese como carne mechada.",
    image: "🥙",
    type: "caliente"
  },
  {
    id: 21,
    name: "Sobrasada",
    ingredients: "120 gr de tomate seco, 150 gr de anacardos, aceite de los propios tomates, 1 cucharadita de pimentón dulce, 1 cucharadita de pimentón picante, 1 cucharadita de ajo en polvo, sal.",
    instructions: "Triturar todos los ingredientes en una batidora hasta obtener una pasta homogénea.",
    image: "🥪",
    type: "fresco"
  },
  {
    id: 22,
    name: "Heura al limón",
    ingredients: "Heura, ajo en polvo, pimienta, sal, 200 ml de caldo de verduras, 30 ml de zumo de limón, 30 ml de salsa de soja, media cucharada de jengibre, 1 cucharada de maizena diluida en medio vaso de agua.",
    instructions: "Dorar Heura con especias. Hacer salsa con caldo, limón, soja, jengibre and maizena diluida. Hervir y añadir la heura.",
    image: "🍋",
    type: "caliente"
  },
  {
    id: 23,
    name: "Hamburguesas de lentejas y setas",
    ingredients: "Lentejas, Avena (la mitad que las lentejas), Cebolla, Ajo, Setas Ostreatus o Champiñones Portobelo, 1 o 2 Zanahorias, Harina de Garbanzo, Pimienta, Orégano.",
    instructions: "Sofreír verduras y setas. Mezclar con harina de garbanzo (textura huevo). Triturar con lentejas cocidas, avena y especias. Formar hamburguesas.",
    image: "https://i.ibb.co/Hf8Gs8DZ/Screenshot-20260111-104835-Google.jpg",
    type: "caliente"
  },
  {
    id: 24,
    name: "Fingers",
    ingredients: "Garbanzos, Panko, Avena, especias.",
    instructions: "Triturar garbanzos con avena y especias. Formar dedos, rebozar en panko y freír hasta que estén crujientes.",
    image: "https://i.postimg.cc/RZdqHt2j/1768151262981.png",
    type: "caliente"
  },
  {
    id: 25,
    name: "Salchichas",
    ingredients: "1 patata cocida, 2 zanahorias cocidas, 400 g de alubias cocidas, 70 g de harina de garbanzo, 100 g de pan rallado, 1 cucharada de ketchup, sal, pimienta 1 chorrito de salsa de soja y aove.",
    instructions: "Chafar verduras cocidas con alubias. Añadir ketchup, harina y pan rallado hasta que sea moldeable. Formar, freír y pincelar con soja.",
    image: "https://i.postimg.cc/hPrKyBMz/1768148631659.png",
    type: "caliente"
  },
  {
    id: 26,
    name: "Carrot Cake",
    ingredients: "2 plátanos maduros, 240 g de copos de avena, 1 zanahoria rallada, 40 g de nueces troceadas, 90 g de proteína en polvo (opcional), 1 cucharadita de canela, 1 cucharadita de levadura, 400 ml de leche vegetal.",
    instructions: "Mezclar todo. Hornear 12 min a 180 grados. Enfriar 2 horas. Cubrir con yogur y nueces.",
    image: "https://i.ibb.co/MDYqQr10/1768122791991.png",
    type: "fresco"
  },
  {
    id: 27,
    name: "Batido de Plátano y Chocolate",
    ingredients: "200 ml de leche de soja, 1 plátano maduro, 4 onzas de chocolate negro puro, 2 cucharadas de chía, media cucharadita de esencia de vainilla, media cucharadita de lino (opcional).",
    instructions: "Triturar todo muy bien. Dejar enfriar 2 horas para que las semillas hidraten.",
    image: "🥤",
    type: "fresco"
  },
  {
    id: 28,
    name: "Tortilla Francesa Vegana",
    ingredients: "300 gr de tofu firme o blando, 40 g de maizena, 40 g de harina de garbanzo, 20 g de levadura nutricional, cúrcuma, pimienta negra, cebolla en polvo, 250 ml de agua, 2 g de bicarbonato, sal negra.",
    instructions: "Triturar todos los ingredientes con 250ml de agua. Cocinar en sartén como una tortilla normal.",
    image: "https://i.ibb.co/XryZwkVg/Screenshot-20260111-173820-Google.jpg",
    type: "caliente"
  },
  {
    id: 29,
    name: "Porridge",
    ingredients: "500 ml de leche vegetal, 200 g de copos de avena, un puñado de arándanos, un plátano, frutos secos y canela",
    instructions: "En un cazo verter leche y la avena y remover continuamente hasta que se espese un poco. Después emplatar con el resto de ingredientes.",
    image: "https://i.postimg.cc/ZnrCHTT5/1768342089609.png",
    type: "caliente"
  }
];